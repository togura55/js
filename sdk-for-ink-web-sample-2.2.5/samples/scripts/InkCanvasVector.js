class InkCanvasVector extends InkCanvas {
	constructor(canvas, width, height) {
		super();

		this.canvas = InkCanvas2D.createInstance(canvas, width, height);
		this.strokesLayer = this.canvas.createLayer();
		this.bitmapLayer = this.canvas.createLayer();

		this.strokeRenderer = new StrokeRenderer2D(this.canvas);

		this.lens = new Lens(this.canvas, transform => {
			this.strokeRenderer.setTransform(transform);
			this.redraw();

			layout.updatePaper(transform);
		}, this.abort.bind(this));

		this.selection = new SelectionVector(this.dataModel, {
			lens: this.lens,
			canvas: this.canvas,
			redraw: this.redraw.bind(this)
		});

		this.selection.connect();

		Object.defineProperty(this, "transform", {get: () => this.lens.transform, set: value => (this.lens.transform = value), enumerable: true});
	}

	streamUpdatedArea(data, updatedArea, complete) {
		this.bitmapLayer.clear();
		this.bitmapLayer.putImageData(data, updatedArea.x, updatedArea.y);

		this.canvas.clear(updatedArea);
		this.canvas.blend(this.strokesLayer, {rect: updatedArea});
		this.canvas.blend(this.bitmapLayer, {rect: updatedArea});

		if (complete) {
			this.strokesLayer.blend(this.bitmapLayer, {rect: updatedArea});

			this.canvas.clear(updatedArea);
			this.canvas.blend(this.strokesLayer, {rect: updatedArea});
		}
	}

	setTool(toolID) {
		super.setTool(toolID);

		if (config.getBrush(toolID) instanceof BrushGL) {
			this.inkCanvasRaster.setTool(this.toolID);
			this.forward = true;
		}
		else
			this.forward = false;
	}
}
