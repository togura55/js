let app = {
	get downsampling() { return localStorage.getItem("downsampling") == "true" },

	init() {
		let sample = parseInt(localStorage.getItem("sample"));

		if (sample) {
			document.querySelector(".app").className = "app";

			if (sample != 2) document.querySelector(".app").className += " vector";
			if (sample != 1) document.querySelector(".app").className += " raster";

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

		Object.defineProperty(app, "inkCanvas", {value: inkCanvas, enumerable: true});
		Object.defineProperty(app, "type", {value: pureGLCanvas ? app.Type.RASTER : app.Type.VECTOR, enumerable: true});

		window.WILL = inkCanvas;

		config.tools.eraser = (sample == 1) ? config.tools.eraserVector : config.tools.eraserRaster;

		layout.selectTool(inkCanvas.toolID);

		InputListener.open(inkCanvas);
		this.enableTouch = true;

		// added for #212
		// window.addEventListener("touchmove", function(e) {
		// 	e.preventDefault();
		// });
	},

	redirect(sample) {
		if (!sample)
			localStorage.removeItem("sample");
		else
			localStorage.setItem("sample", sample);

		location.reload();
	},

	disbaleZoom: function() {
		var keyCodes = [61, 107, 173, 109, 187, 189];

		window.addEventListener("keydown", function(e) {
			if ((e.ctrlKey || e.metaKey) && (keyCodes.indexOf(e.which) != -1))
				e.preventDefault();
		});

		window.addEventListener("DOMMouseScroll", function(e) {
			if (e.cancelable && (e.ctrlKey || e.metaKey))
				e.preventDefault();
		});

		window.addEventListener("mousewheel", function(e) {
			if (e.cancelable && (e.ctrlKey || e.metaKey))
				e.preventDefault();
		});
	},

	// Surround all strokes with a rectangle
	selectAll(input){
		let inkModel = this.model.inkModel;		
		let origin;

		inkModel.strokes.forEach(stroke => {
			origin = stroke.bounds.union(origin);
		});
	
		let canvas = window.WILL.canvas;
		canvas.ctx.strokeRect(origin.left, origin.top, origin.width, origin.height); 
	},
	
	// Enable/Disable touch operation by users
	toggleTouch(){
		if (this.enableTouch){
			InputListener.stop(InputListener.PointerType.TOUCH);
			document.getElementById("touch").src="/images/btn_tools/btn_touch_off.png" ;
		}
		else{
			InputListener.start(InputListener.PointerType.TOUCH);
			document.getElementById("touch").src="/images/btn_tools/btn_touch_on.png" ;
		}
		this.enableTouch = !this.enableTouch;
	},

	// Load background image from a file
	loadBackground(){
//		document.querySelector(".Wrapper").style.backgroundImage = `url('/images/AnswerSheet.png')`;
//		document.querySelector(".Wrapper").style.backgroundRepeat = "no-repeat";

		// Update CSS
		let sheet = Array.from(document.styleSheets).filter(sheet => sheet.title == "main").first;
		let rule = Array.from(sheet.rules).filter(rule => rule.selectorText == ".Wrapper::before").first;

		rule.style.backgroundImage = `url('/images/AnswerSheet.png')`;
		rule.style.backgroundRepeat = "no-repeat";

		this.isLoadBackground = true;
	}
};

Function.createEnum.call(app, "Type", ["VECTOR", "RASTER"]);
