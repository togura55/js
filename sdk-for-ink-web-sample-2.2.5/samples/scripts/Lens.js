const ENDLESS_CANVAS = location.search.includes("endless");
const MIN_SCALE_FACTOR = ENDLESS_CANVAS ? 0.2 : 1;
const MAX_SCALE_FACTOR = 4;

class Lens {
	constructor(canvas, refresh, abort) {
		this.canvas = canvas;
		this.abort = abort;

		let matrix = new Matrix();

		Object.defineProperty(this, "transform", {
			get: function () {
				return matrix;
			},
			set: function (value) {
				matrix = value;

				refresh(value);
			},
			enumerable: true
		});

		this.initEvents();
		this.enable();
	}

	initEvents() {
		let lastPoint;

		this.onZoom = this.zoom.bind(this);

		this.onPanStart = function onPanStart(e) {
			if (e.buttons == 2) lastPoint = { x: e.offsetX, y: e.offsetY };
		}.bind(this);

		this.onPan = function onPan(e) {
			if (e.buttons != 2) return;

			let delta = { x: e.offsetX - lastPoint.x, y: e.offsetY - lastPoint.y };
			lastPoint = { x: e.offsetX, y: e.offsetY };

			this.pan(delta);
		}.bind(this);

		this.onPanEnd = function onPanEnd(e) {
			lastPoint = null;
		}.bind(this);

		let pincher = PinchEvent.register(this.canvas.surface);
		pincher.reset(new Point(0, 0));

		this.onPinchStart = function onPinchStart(e) {
			this.abort();
		}.bind(this);

		this.onPinch = function onPinch(e) {
			// Temporary workaround: 21AP_HWI-5, #WILL3-214
			this.zoom(e.detail.pin, e.detail.scale);
			this.pan(e.detail.translation);
		}.bind(this);
	}

	enable() {
		// Temporary workaround: 21AP_HWI-5, #WILL3-214
		this.canvas.surface.addEventListener("wheel", this.onZoom, { passive: true });

		this.canvas.surface.addEventListener("mousedown", this.onPanStart);
		this.canvas.surface.addEventListener("mousemove", this.onPan);
		this.canvas.surface.addEventListener("mouseup", this.onPanEnd);

		this.canvas.surface.addEventListener("pinchstart", this.onPinchStart);
		this.canvas.surface.addEventListener("pinch", this.onPinch);
	}

	disable() {
		this.canvas.surface.removeEventListener("wheel", this.onZoom);

		this.canvas.surface.removeEventListener("mousedown", this.onPanStart);
		this.canvas.surface.removeEventListener("mousemove", this.onPan);
		this.canvas.surface.removeEventListener("mouseup", this.onPanEnd);

		this.canvas.surface.removeEventListener("pinchstart", this.onPinchStart);
		this.canvas.surface.removeEventListener("pinch", this.onPinch);
	}

	zoom(e, scaleFactor) {
		let pos = scaleFactor ? e : { x: e.offsetX, y: e.offsetY };
		let factor = scaleFactor ? scaleFactor : (e.deltaY > 0) ? 0.97 : 1.03;

		if (this.transform.a * factor < MIN_SCALE_FACTOR)
			factor = MIN_SCALE_FACTOR / this.transform.a;
		else if (this.transform.a * factor > MAX_SCALE_FACTOR)
			factor = MAX_SCALE_FACTOR / this.transform.a;

		let scale = this.transform.scale(factor, pos);

		if ((this.transform.a == MIN_SCALE_FACTOR && scale.a < MIN_SCALE_FACTOR) || (this.transform.a == MAX_SCALE_FACTOR && scale.a > MAX_SCALE_FACTOR))
			return;

		let sx = scale.a;
		let sy = scale.d;

		if (scale.a < MIN_SCALE_FACTOR) {
			sx = MIN_SCALE_FACTOR;
			sy = MIN_SCALE_FACTOR;
		}
		else if (scale.a > MAX_SCALE_FACTOR) {
			sx = MAX_SCALE_FACTOR;
			sy = MAX_SCALE_FACTOR;
		}

		if (scale.a != sx || scale.d != sy)
			scale = Matrix.fromMatrix({ a: sx, b: scale.b, c: scale.c, d: sy, tx: scale.tx, ty: scale.ty });

		this.normalizeTransform(scale);
	}

	pan(delta) {
		let translation = this.transform.translate(delta);

		this.normalizeTransform(translation);
	}

	normalizeTransform(matrix) {
		if (ENDLESS_CANVAS) {
			this.transform = matrix;
			return;
		}

		let surfaceBounds = this.canvas.bounds;
		let modelBounds = this.modelToView(this.canvas.bounds);

		let tx = matrix.tx;
		let ty = matrix.ty;

		if (this.transform.a < 1) {
			if (modelBounds.left < 0) tx -= modelBounds.left;
			if (modelBounds.right > surfaceBounds.width) tx += surfaceBounds.width - modelBounds.right;
			if (modelBounds.top < 0) ty -= modelBounds.top;
			if (modelBounds.bottom > surfaceBounds.height) ty += surfaceBounds.height - modelBounds.bottom;
		}
		else {
			if (modelBounds.left > 0) tx -= modelBounds.left;
			if (modelBounds.right < surfaceBounds.width) tx += surfaceBounds.width - modelBounds.right;
			if (modelBounds.top > 0) ty -= modelBounds.top;
			if (modelBounds.bottom < surfaceBounds.height) ty += surfaceBounds.height - modelBounds.bottom;
		}

		if (matrix.tx != tx || matrix.ty != ty)
			this.transform = Matrix.fromMatrix({ a: matrix.a, b: matrix.b, c: matrix.c, d: matrix.d, tx, ty });
		else
			this.transform = matrix;
	}

	reset() {
		this.transform = new Matrix();
	}

	modelToView(modelRect) {
		if (this.transform.isIdentity)
			return modelRect;
		else
			return modelRect.transform(this.transform);
	}

	viewToModel(viewRect) {
		if (this.transform.isIdentity)
			return viewRect;
		else
			return viewRect.transform(this.transform.invert());
	}
}
