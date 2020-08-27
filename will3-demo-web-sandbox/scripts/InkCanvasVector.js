class InkCanvasVector extends InkCanvas {
	constructor(canvas, width, height) {
		super();

		this.canvas = InkCanvas2D.createInstance(canvas, width, height);
		this.strokesLayer = this.canvas.createLayer();
		this.bitmapLayer = this.canvas.createLayer();

		this.strokeRenderer = new StrokeRenderer2D(this.canvas);

		this.canvasTransformer = new CanvasTransformer(width, height);

		this.selection = new SelectionVector(this.dataModel, {
			canvas: this.canvas,
			canvasTransformer: this.canvasTransformer,
			redraw: this.redraw.bind(this)
		});

		this.selection.connect();
	}

	streamUpdatedArea(data, updatedArea, complete) {
		this.bitmapLayer.clear();
		this.bitmapLayer.writePixels(data, updatedArea);

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
