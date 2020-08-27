let app = {
	init() {
		let sample = parseInt(localStorage.getItem("sample"));

		if (sample) {
			document.querySelector(".app").className = "app";

			if (sample != 2) document.querySelector(".app").className += " vector";
			if (sample != 1) document.querySelector(".app").className += " raster";

			document.querySelector("#basic").style.display = (sample == 1) ? "" : "none";

			if (sample == 1 || sample == 2)
				document.querySelector("#analyse").style.display = "";

			document.querySelector(".title").innerText = sample + ". " + document.querySelector("#sample" + sample).innerHTML;
			document.querySelector(".app").style.display = "";
		}
		else
			document.querySelector(".menu").style.display = "";

		window.sample = sample;
	},

	async initInkController() {
		this.model = new DataModel();

		let width = $(".Wrapper").width();
		let height = $(".Wrapper").height();
		let color = layout.extractColor($("nav .Color")[0]);

		let pureGLCanvas = (sample == 2 || sample == 3);
		let canvas = document.querySelector("#canvas");
		canvas.className = pureGLCanvas ? "raster-canvas" : "vector-canvas";

		let glCanvas = new OffscreenCanvas(width, height);

		let inkCanvasVector = pureGLCanvas ? null : new InkCanvasVector(canvas, width, height)
		let inkCanvasRaster = new InkCanvasRaster(pureGLCanvas ? canvas : glCanvas, width, height)

		await BrushPalette.configure(inkCanvasRaster.canvas.ctx);

		if (!pureGLCanvas) {
			inkCanvasRaster.strokeRenderer.streamUpdatedArea = inkCanvasVector.streamUpdatedArea.bind(inkCanvasVector);
			inkCanvasVector.inkCanvasRaster = inkCanvasRaster;
		}

		let device = await InputDevice.createInstance({"app.id": "will3-sdk-for-ink-web-demo", "app.version": "1.0.0"});

		if (inkCanvasVector) inkCanvasVector.init(device, "pen", color);
		inkCanvasRaster.init(device, "pencil", color);

		let inkCanvas = pureGLCanvas ? inkCanvasRaster : inkCanvasVector;

		window.WILL = inkCanvas;
		WILL.Color = Color;
		WILL.type = pureGLCanvas ? "raster" : "vector";

		config.tools.eraser = pureGLCanvas ? config.tools.eraserRaster : config.tools.eraserVector;

		layout.selectTool(inkCanvas.toolID);

		InputListener.open(inkCanvas);
	},

	importPaper(input) {
		let reader = new FileReader();

		reader.onload = (e) => {

			let src = "data:image/png;base64," + btoa(String.fromCharArray(new Uint8Array(e.target.result)));

			$("nav .Paper")[1].src = src;

			document.querySelector(".Wrapper").style.backgroundImage = `url("${src}")`;
			document.querySelector(".Wrapper").style.backgroundRepeat = "no-repeat";
		};

		reader.readAsArrayBuffer(input.files[0]);

		input.value = "";
	},

	redirect(sample) {
		if (!sample)
			localStorage.clear()
		else
			localStorage.setItem("sample", sample);

		location.reload();
	}
};
