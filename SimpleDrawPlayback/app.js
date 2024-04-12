//
// SimpleDrawPlayback
//

class Point {
    constructor(e, f) {
        this._offsetX = e.offsetX;
        this._offsetY = e.offsetY;
        this._pressure = e.pressure;
        this._buttons = e.buttons;

        this._first = f;  // flag of 1st point in each stroke
        this._time = (new Date).getTime(); // time (msec) for being generated the point
    };

    // getter / setter
    get offsetX() { return this._offsetX }; set offsetX(e) { this._offsetX = e.offsetX };
    get offsetY() { return this._offsetY }; set offsetY(e) { this._offsetY = e.offsetY };
    get pressure() { return this._pressure }; set pressure(e) { this._pressure = e.pressure };
    get buttons() { return this._buttons }; set buttons(e) { this._buttons = e.buttons };
    get first() { return this._first }; set first(f) { this._first = f };
    get time() { return this._time }; set time(t) { this._time = t };

    // method
}
class Stroke {
    constructor() {
        this._points = Array(); 
    };

    // getter / setter
    get points() {return this._points }; set points(p){this._points = p};

    // method
    addLastPoint(point) {
        this._points.push(point)
    }

}
class InkObject {
    // within the class internal use only
    #z_range;
    #prev;

    constructor() {
        this._radius = 2.0;
        this._color =  `rgba('black')`;
        this.#z_range = {
            max: 0,
            min: 1,
        };
        this.#prev = {
            x: 0,
            y: 0,
        };
        this._strokes = Array();
    };

    // getter / setter
    get strokes(){return this._strokes }; set strokes(s){this._strokes = s};
    get radius(){return this._radius}; set radius(r){this._radius = r};
    get color(){return this._color}; set color(c){this._color = c};
    get maxZ(){return this.#z_range.max}; //set maxZ(max){this._maxZ = max};
    get minZ(){return this.#z_range.min}; //set minZ(min){this._minZ = min};

    // method
    add(stroke) {
        this._strokes.push(stroke);
        return;
    }
    addLastPoint(point) {
        let stroke = this._strokes.slice(-1)[0]; // get the last stroke
        stroke.addLastPoint(point);
        return;
    }
    // p: Point
    drawPoint(p) {
        const f = p.first;
        
        const x = p.offsetX
        const y = p.offsetY
        const z = p.pressure
        const b = p.buttons
        // const radius = 2.0 // + e.pressure * 10.0
        const red = z * 255
        context.beginPath()
        context.moveTo((x + this.radius), y)
        context.arc(x, y, this.radius, 0, Math.PI * 2)
        context.closePath()
        context.fill()

        if (b != 0 || z > 0.0) {
        // if (e.buttons != 0 || e.pressure > 0.0) {
            context.fillStyle = this.color;

            // If a pen is down, draw line
            // if (penUp == 0 && p == 0) {
            if (f == 0) {
                // Reset the current path
                context.beginPath();
                context.lineWidth = this.radius * 2;
                context.strokeStyle = this.color;
                context.moveTo(x, y);
                context.lineTo(this.#prev.x, this.#prev.y);
                
                console.log("(" + x + ":"+ y + ")-(" + this.#prev.x + ":" + this.#prev.y);

                // Make the line visible
                context.stroke();

                if (this.#z_range.max < z) this.#z_range.max = z;
                if (this.#z_range.min > z) this.#z_range.min = z;
            }
            this.#prev.x = x;
            this.#prev.y = y;
        }
        // in case of drawing the Pen Hover
        // else if (e.buttons == 0 && e.pressure == 0.0) {
        //     penUp = 1;
        // }
        return;
    }
    // 全体からの最後のStrokeオブジェクトを返す
    getLastStroke(){
        return this.strokes.slice(-1)[0]; 
    }
    // 全体からの最後のPointオブジェクトを返す
    getLastPoint(){
        let s = this.getLastStroke();
        return s.points.slice(-1)[0];
    }
    // canvasのクリア
    clear(canvas){
        context.clearRect(0, 0, canvas.width, canvas.height)
        return;
    }
    // オブジェクトの破棄、canvasのクリア
    reset(){
        return;
    }
    // ink: InkObject
    // start: start lag time (msec)
    playback(ink, start){
        this.clear(canvas);

        let delay = 0;
        let i_s = 0;
        let i_p = 0;
        let end = 0;
        let nextTime = 0;

        const playbackLoop = (ink) =>{
            let s, p;

            if (i_s < ink.strokes.length){
                s = ink.strokes[i_s];

                // Since there is no next point in this stroke, set the next stroke
                if (i_p == s.points.length){
                    i_p = 0;
                    i_s ++;
                    s = ink.strokes[i_s]; // resetting
                }

                p = s.points[i_p];
                
                ink.drawPoint(p);

                if (i_p + 1 < s.points.length){
                    nextTime = s.points[i_p + 1].time;
                }
                else if ((i_p + 1 == s.points.length) && (i_s + 1 < ink.strokes.length)){
                    nextTime = ink.strokes[i_s + 1].points[0].time;
                }
                else{
                    end = 1;
                }                    
                delay = nextTime - p.time;
                i_p ++;
            }

            if (end != 1){
                // Set the next drawing with delay
                setTimeout(playbackLoop, delay, ink);
            }
            // else - stop looping

            return;
        }

        // Trigger to start drawing
        setTimeout(playbackLoop, start, ink);

        return;
    }
}


let inkObj;
let elDelta;
let elZMaxMin;
let elVersion;
let canvas;
let context;
let start = true;

window.addEventListener('load', () => {

    canvas = document.getElementById('mainCanvas')
    canvas.style.cursor = 'url(pen_u_b.png), auto';

    canvas.width = 500
    canvas.height = 500

    context = canvas.getContext('2d')

    elData = document.getElementById("pointerData");
    elZMaxMin = document.getElementById("zMaxMin");
    elVersion = document.getElementById("version");

    // UI 
    elVersion.innerHTML = "Version: " + getVersion();
    initUIs(true);

    inkObj = new InkObject();

    canvas.addEventListener('pointerdown', (e) => {
        if (start){
            initUIs(false); // activate
            start != start;
        }

        // Strokeオブジェクトを作成し、追加
        inkObj.add(new Stroke());

        // pointを追加
        inkObj.addLastPoint(new Point(e, 1));

        // 最後尾pointの描画
        let p = inkObj.getLastPoint();
        inkObj.drawPoint(p);
        displayData(inkObj, p);
        // 
        // drawPointer(e, 1)
        // penUp = 0;
        e.preventDefault()
    })

    canvas.addEventListener('pointermove', (e) => {
        // log('pointermove', e)

        if (e.buttons != 0 || e.pressure > 0.0) {
            // ホバー除外、ペンダウン時のみ 

            // pointを追加
            inkObj.addLastPoint(new Point(e, 0));

            // 最後尾pointと直前のpointまでの線を描画
            let p = inkObj.getLastPoint();
            inkObj.drawPoint(p);
            displayData(inkObj, p);

            // if(penUp == 0)
            //     drawPointer(e, 0)
            //       penUp = 0;
        }
        e.preventDefault()
    })

    canvas.addEventListener('pointerup', (e) => {
        // log('pointerup', e)
        // penUp = 1;
        e.preventDefault()
    })

    // Button: Export to a file
    document.getElementById('buttonExport').onclick = () => {
        console.log("Export data to a file.");

        exportTextFile(JSON.stringify(inkObj), 'points.txt');
    };

    // Button: Import data from a file
    document.getElementById("buttonImport").onchange = (event) => {
        console.log("Import data from a file.");

        const file = event.target.files[0];
        importTextFile(file);
    };

    // Button: Reset
    document.getElementById("buttonReset").onclick = () => {
        console.log("Reset all data and clear canvas.");
        inkObj.clear(canvas);
        inkObj = new InkObject();
        initUIs(true);
        start = true;
    };

    // Button: Playback
    document.getElementById("buttonPlayback").onclick = () => {
        console.log("Playback the recorded strokes.");
        inkObj.playback(inkObj, 500);
    };
});

const log = (tag, e) => {
    // console.log(tag, e.pointerId, e.offsetX, e.offsetY, e.buttons, e.pressure);
}
// mode:
const initUIs = (mode) => {
    if(mode){
        document.getElementById("buttonExport").setAttribute("disabled", true); // disable
        setGrayout("customBtn", "buttonExport", true); 
        document.getElementById("buttonPlayback").setAttribute("disabled", true); // disable
        setGrayout("customBtn", "buttonPlayback", true); 
    }else{
        document.getElementById("buttonExport").removeAttribute("disabled"); // enable
        setGrayout("customBtn", "buttonExport", false); 
        document.getElementById("buttonPlayback").removeAttribute("disabled"); // enable
        setGrayout("customBtn", "buttonPlayback", false); 
    }
}
// data:
// filename: 
const exportTextFile = (data, filename) => {
    let blob = new Blob([data], { type: "text/plan" }); // テキスト形式でBlob定義
    let link = document.createElement('a'); // HTMLのaタグを作成
    link.href = URL.createObjectURL(blob); // aタグのhref属性を作成
    link.download = filename; // aタグのdownload属性を作成
    link.click(); // 定義したaタグをクリック（実行）
};
// file: file object
const importTextFile = (file) => {
    const reader = new FileReader();

    // Once loading is complete, display the results
    reader.onload = function (event) {
        let json = event.target.result;
        // console.log(json);
        decodeJson(json);
    };

    // Load file as text
    reader.readAsText(file);
}
// json: 
const decodeJson = (json) => {
    const regexp = /"_/g; // Detects if there is a pattern of '"_'
    const j = json.replace(regexp, "\""); // delete all specified chars
    const obj = JSON.parse(j);
    
    let ink = new InkObject;
    ink.color = obj.color;
    ink.radius = obj.radius;
    ink.strokes = obj.strokes;

    inkObj.playback(ink, 500);  // ToDo: just a redraw
}

// Enable/disable custom button
// className: class name of button element
// id: id of button element
// mode: true - add disabled, false - remove disabled attribute
const setGrayout = (className, id, mode) => {
    var btnClassList = document.getElementsByClassName(className); // retrieve by class name
    var index = Array.from( btnClassList ).findIndex((e) => e.control.id === id); // try to find by class id 
    if (index !== -1) {
        var classList = btnClassList[index].classList;
        mode? classList.add("gray-out"): classList.remove("gray-out"); // set/remove gray-out for element specified by class id
    } else {
        console.log("Could not find class name: " + className);
    }
};

// ink: InkObject for UI
// p: Point to be output
const displayData = (ink, p) => {
    elData.innerHTML = 'x=' + p.offsetX + ', y=' + p.offsetY + ', z=' + p.pressure;
    elZMaxMin.innerHTML = 'zMax=' + ink.maxZ + ', zMin=' + ink.minZ;
}

const getVersion = () => {
    let ver;
    const major = "0";
    const minor = "9";
    const patch = "3";

    ver = major + "." + minor + "." + patch 
    return ver;
}

