class Selection {
	constructor(options = {}) {
		this.active = false;

		this.frame = null;
		this.frameSelector = null;

		this.minWidth = options.minWidth || 80;
		this.minHeight = options.minHeight || 80;
		this.strokeWidth = options.strokeWidth || 1;

		this.canvasTransform = MatTools.makeGLMatrix();

		this.onTransformStart = this.onTransformStart.bind(this);
		this.onTransform = this.onTransform.bind(this);
	}

	connect(frameSelector = this.selectionSelector) {
		if (this.frame) throw new Error("Selection is already connected");

		this.frameSelector = frameSelector;
		this.frame = document.querySelector(frameSelector);

		if (this.frame.mounted) throw new Error("Selection is already connected");
		this.frame.mounted = true;

		this.frame.innerHTML = this.html();

		this.frame.onmousedown = (e) => {
			if (e.button != 0) return;
			this.frame.style.cursor = "move";
		};

		this.frame.onmouseup = () => (this.frame.style.cursor = "");

		this.frame.querySelector(".drag-handle").style.display = "none";

		Transformer.addTranslate(this.frame);
		Transformer.addScale(this.frame, {KeepRatio: true});
		// Transformer.addScale(this.frame, {KeepRatio: true, ExcludeRotation: true});

		Transformer.addRotate(this.frame, {
			Handles: [this.frame.querySelector(".rotate-handle.top"), this.frame.querySelector(".rotate-handle.bottom")]
		});

		this.frame.addEventListener("TransformStart", this.onTransformStart);
		this.frame.addEventListener("Transform", this.onTransform);

		SelectionListener.add(this);

		this.linkContextMenu();
	}

	html() {
		const dragHandleImage = "/images/selection/btn_move.png";
		const topHandleImage = "/images/selection/btn_rotate_top.png";
		const bottomHandleImage = "/images/selection/btn_rotate_bottom.png";

		return `
			<div class="FlexWrapper">
				<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" version="1.1">
					<path stroke-miterlimit="1" />
				</svg>
				<div class="drag-handle">
					<img src="${dragHandleImage}" alt="" />
				</div>
				<div class="rotate-handle top">
					<img src="${topHandleImage}" alt="" />
				</div>
				<div class="rotate-handle bottom">
					<img src="${bottomHandleImage}" alt="" />
				</div>

				<input type="color">
				<input type="file" class="import-file" accept="application/protobuf; proto=WacomInkFormat3.InkData" />
				<input type="file" class="import-image" accept="image/*" />
			</div>
		`;
	}

	linkContextMenu() {
		$.contextMenu({
			selector: this.frameSelector,
			hideOnSecondTrigger: true,
			events: {
				show() {
					SelectionListener.contextMenuActive = true;
				},
				hide() {
					setTimeout(() => {
						SelectionListener.contextMenuActive = false;
					}, SelectionListener.timeout + 5);
				}
			},
			callback: (key, options) => this[key](),
			items: {
				cut: {name: "Cut", icon: "cut"},
				copy: {name: "Copy", icon: "copy"},
				delete: {name: "Delete", icon: "delete"},
				sep: "---------",
				changeColor: {
					name: "Change color",
					visible: typeof this.changeStrokesColor == "function",
					callback: () => {
						let input = this.frame.querySelector("input[type=color]");
						input.onchange = (e) => this.changeStrokesColor(Color.fromHex(e.target.value))
						input.click();
					}
				},
				export: {name: "Export"}
			}
		});
	}

	onTransformStart(e) {
		this.frame.transform = this.canvasTransform;
	}

	onTransform(e) {
		if (!this.lastTransformArea)
			this.beginTransform();

		this.transform(e.detail);
	}

	disconnect() {
		if (!this.frame || !this.frame.mounted) return;

		this.frame.removeEventListener("TransformStart", this.onTransformStart);
		this.frame.removeEventListener("Transform", this.onTransform);

		delete this.frame;
		delete this.clipboard;

		SelectionListener.remove(this);
	}

	open(origin, path, transform, pos) {
		origin = origin.ceil(true);

		this.bounds = Rect.create(-origin.width / 2, -origin.height / 2, origin.width, origin.height);
		this.path = [];

		if (!path) {
			let width = Math.max(this.minWidth, this.bounds.width);
			let height = Math.max(this.minHeight, this.bounds.height);
			let frame = Rect.create(this.bounds.left, this.bounds.top, width, height);

			path = frame.toPath().points;
		}

		let center = {x: origin.width / 2, y: origin.height / 2};

		for (let i = 2; i < path.length - 2; i += 2) {
			let point = {x: path[i], y: path[i+1]};

			if (this.type == Selection.Type.PATH) {
				point.x -= center.x + origin.left;
				point.y -= center.y + origin.top;
			}

			this.path.push(point.x + "," + point.y);
		}

		let translate = MatTools.makeTranslate(center.x, center.y);
		transform = MatTools.multiply(transform, translate);
		transform = MatTools.multiply(this.canvasTransform, transform);

		this.origin = MatTools.transformRect(this.bounds, transform);
		this.originTransform = MatTools.makeGLMatrix();
		this.lastTransformArea = null;
		this.dirtyArea = origin;

		if (pos) {
			let offsetX = pos.x - transform[mat4x.MAT2D_INDEX.dx];
			let offsetY = pos.y - transform[mat4x.MAT2D_INDEX.dy];

			translate = MatTools.makeTranslate(offsetX, offsetY);

			this.originTransform = translate;
			this.transform(MatTools.makeGLMatrix());

			transform = MatTools.multiply(transform, translate);
		}

		this.showFrame(transform);
	}

	showFrame(transform) {
		let width = Math.max(this.minWidth, this.bounds.width);
		let height = Math.max(this.minHeight, this.bounds.height);

		this.frame.style.left = this.bounds.left + "px";
		this.frame.style.top = this.bounds.top + "px";
		this.frame.style.width = width + "px";
		this.frame.style.height = height + "px";
		this.frame.style.transform = this.frame.style.webkitTransform = mat4x.toCSS(transform);

		this.frame.querySelector("svg").setAttribute("viewBox", this.bounds.left + " " + this.bounds.top + " " + width + " " + height);
		this.frame.querySelector("path").setAttribute("d", "M " + this.path.join(" L ") + " Z");
		this.frame.querySelector("path").style.strokeWidth = this.strokeWidth;

		this.frame.classList.add(`selection-${this.type}`);
		this.frame.style.display = "";

		this.active = true;
		InputListener.stop();
	}

	beginTransform() {
		throw new Error("This method is abstract and should be implemented");
	}

	/**
	 * Executes transformation
	 *
	 * @param {mat4} matrix Transform matrix
	 * @see {@link http://glmatrix.net/docs/module-mat4.html|mat4}
	 */
	transform(mat) {
		this.originTransform = MatTools.multiply(mat, this.originTransform);

		let lastTransformArea = this.lastTransformArea;
		this.lastTransformArea = MatTools.transformRect(this.origin, this.originTransform);

		this.dirtyArea = this.lastTransformArea.union(lastTransformArea).ceil();
	}

	completeTransform() {
		throw new Error("This method is abstract and should be implemented");
	}

	async close(onClose) {
		if (!this.active) return;

		this.hideFrame();

		if (this.lastTransformArea)
			this.completeTransform();

		if (onClose) {
			const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

			if (onClose instanceof AsyncFunction)
				await onClose();
			else
				onClose();
		}

		this.reset();
	}

	hideFrame() {
		this.frame.style.display = "none";
		this.frame.classList.remove(`selection-${this.type}`);

		this.active = false;
		InputListener.start();
	}

	update(canvasTransform) {
		this.canvasTransform = canvasTransform;
	}
/*
	translate(pos) {
		let transform = mat4x.fromCSS(this.frame);

		let offsetX = pos.x - transform[mat4x.MAT2D_INDEX.dx];
		let offsetY = pos.y - transform[mat4x.MAT2D_INDEX.dy];
		let translate = MatTools.makeTranslate(offsetX, offsetY);

		transform = MatTools.multiply(translate, transform);

		let width = Math.max(this.minWidth, this.bounds.width);
		let height = Math.max(this.minHeight, this.bounds.height);

		this.frame.style.left = this.bounds.left + "px";
		this.frame.style.top = this.bounds.top + "px";
		this.frame.style.width = width + "px";
		this.frame.style.height = height + "px";
		this.frame.style.transform = this.frame.style.webkitTransform = mat4x.toCSS(transform);

		this.transform(translate);
	}
*/
	cut() {
		this.copy(true);
	}

	copy(cut) {
		throw new Error("This method is abstract and should be implemented");
	}

	paste(pos) {
		throw new Error("This method is abstract and should be implemented");
	}

	delete() {
		throw new Error("This method is abstract and should be implemented");
	}

	import(pos, data) {
		throw new Error("This method is abstract and should be implemented");
	}

	async read(input) {
		let reader = new FileReader();

		return new Promise((resolve, reject) => {
			reader.onload = (e) => resolve(e.target.result);
			reader.readAsArrayBuffer(input.files[0]);

			input.value = "";
		});
	}

	export() {
		throw new Error("This method is abstract and should be implemented");
	}

	reset() {
		this.type = null;
		this.bounds = null;
		this.path = null;

		this.origin = null;
		this.originTransform = null;
		this.lastTransformArea = null;
		this.dirtyArea = null;
	}
}

Selection.Type = {RECT: "rect", PATH: "path"};
