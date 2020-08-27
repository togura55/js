class SelectionVector extends Selection {
	constructor(dataModel, canvasBridge, options) {
		super(options);

		this.dataModel = dataModel;
		this.canvasBridge = canvasBridge;
		this.canvasTransformer = canvasBridge.canvasTransformer;

		this.strokes = [];

		this.codec = new InkCodec();

		this.canvasSelector = this.canvasBridge.canvas.surface.className;
		this.selectionSelector = ".selection-vector";
		this.importSelector = ".import-file";
	}

	open(stroke, selector) {
		let selection = selector.select(stroke);

		if (selection.selected.length == 0 && Object.keys(selection.intersected).length == 0) {
			console.warn("data not found");
			return;
		}

		let origin;
		let path;

		if (selector.mode == Selector.Mode.WHOLE_STROKE) {
			this.type = Selection.Type.RECT;
			this.strokes = this.dataModel.getStrokes(selection.selected);

			this.strokes.forEach(stroke => {
				origin = stroke.bounds.union(origin);
			});

			this.canvasTransformer.drawStrokes(this.strokes);
		}
		else {
			this.type = Selection.Type.PATH;
			this.selection = selection;

			origin = stroke.bounds;
			path = stroke.points;
		}

		super.open(origin, path, MatTools.makeTranslate(origin.left, origin.top));
	}

	openData(pos, strokes) {
		let origin;

		this.type = Selection.Type.RECT;
		this.strokes = strokes.clone();

		this.strokes.forEach(stroke => {
			this.dataModel.add(stroke);

			origin = stroke.bounds.union(origin);
		});

		this.canvasTransformer.drawStrokes(this.strokes);
		super.open(origin, undefined, MatTools.makeTranslate(origin.left, origin.top), pos);
		this.canvasTransformer.show();
	}

	beginTransform() {
		if (this.selection)
			this.splitArea = this.split();

		if (this.type == Selection.Type.PATH)
			this.canvasTransformer.drawStrokes(this.strokes);

		this.canvasBridge.redraw(this.splitArea || this.dirtyArea, this.strokes);
		this.canvasTransformer.show();
	}

	/**
	 * Executes transformation
	 *
	 * @param {mat4} matrix Transform matrix
	 * @see {@link http://glmatrix.net/docs/module-mat4.html|mat4}
	 */
	transform(mat) {
		super.transform(mat);

		let dirtyArea = this.splitArea || this.dirtyArea;
		delete this.splitArea;

		/*
		// this.strokes.forEach(stroke => stroke.updateTransform(mat));
		this.strokes.forEach(stroke => stroke.setTransform(this.originTransform));

		this.canvasBridge.redraw(this.dirtyArea);
		*/

		this.canvasTransformer.refresh(this.originTransform);
	}

	split() {
		let selected = this.dataModel.getStrokes(this.selection.selected);

		let split = this.dataModel.update(this.selection.intersected);
		let dirtyArea = split.dirtyArea;

		for (let stroke of selected)
			dirtyArea = stroke.bounds.union(dirtyArea);

		selected.push(...split.selected);

		this.strokes = selected;
		delete this.selection;

		return dirtyArea;
	}

	completeTransform() {
		this.strokes.forEach(stroke => this.dataModel.transform(stroke, this.originTransform));

		let dirtyArea = MatTools.transformRect(this.origin, this.originTransform);

		this.canvasBridge.redraw(dirtyArea);
	}

	changeStrokesColor(color) {
		if (this.selection)
			this.split();

		this.strokes.forEach(stroke => (stroke.color = color));

		this.canvasTransformer.drawStrokes(this.strokes);
		this.canvasTransformer.refresh(this.originTransform);
	}

	copy(cut) {
		let strokes;

		this.close(() => {
			if (this.selection) {
				if (cut) {
					this.dirtyArea = this.split();

					strokes = this.strokes.clone();
				}
				else {
					strokes = this.dataModel.getStrokes(this.selection.selected).clone();

					let intersected = this.selection.intersected;

					this.dataModel.getStrokes(Object.keys(intersected)).forEach(stroke => {
						intersected[stroke.id].intervals.filter(interval => interval.inside).forEach(interval => {
							strokes.push(stroke.subStroke(interval));
						});
					});
				}
			}
			else
				strokes = this.strokes.clone();

			if (cut)
				this.delete();
		});

		delete this.clipboard;
		if (strokes.length > 0) this.clipboard = strokes;
	}

	paste(pos) {
		this.openData(pos, this.clipboard);
	}

	delete() {
		let dirtyArea = this.selection ? this.split() : this.dirtyArea || this.origin;

		this.dataModel.remove(...this.strokes);
		this.strokes.clear();

		this.canvasBridge.redraw(dirtyArea);

		this.close();
	}

	export() {
		this.close(() => {
			let data = this.codec.encodeInkData(this.strokes);
			fsx.saveAs(data, "selection.ink", "application/protobuf; proto=WacomInkFormat3.InkData");
		});
	}

	import(pos, input) {
		let strokes = this.codec.decodeInkData(input);
		this.openData(pos, strokes);
	}

	reset() {
		super.reset();

		delete this.selection;

		this.strokes.clear();
		this.canvasTransformer.hide();
	}
}
