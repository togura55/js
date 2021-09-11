var canvas, ctx;
var division_number = 50;
var c_x = [];
var c_y = [];
let opinion;
var output = [];
var output_filename = 'output_strokes.txt';

//
// Export data to a file
//
const save = function () {
    console.log("save");

    output = [];
    c_x.forEach((value, index, c_x) => {
        console.log(`${value}は、[${c_x}]の中で ${index} 番目の要素です`);
        output.push(`${value}` + ',' + c_y[index] + '\n');
    });
    let indexLast = output.length - 1;
    if (output[indexLast].slice(-1) == '\n'){
        output[indexLast] = output[indexLast].slice(0, -1); // delete a last \n
    }

    let blob = new Blob(output, { type: "text/plan" });
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = output_filename;
    link.click();
};

//
// Read the file operation
//
let fileInput = document.getElementById('fileElem');
let fileReader = new FileReader();
fileInput.onchange = () => {
    let file = fileInput.files[0];
    fileReader.readAsText(file);
};

fileReader.onload = function () {
    console.log(fileReader.result);
    let lines = fileReader.result.split(/\r?\n/);
    let rslt = lines.map(line => line.split(","));
    c_x = [];
    c_y = [];
    rslt.forEach((value, index, rlst) => {
        c_x.push(value[0]);
        c_y.push(value[1]);

        draw_shape();
    });
};


const load = function () {
    console.log("load");

    // var input = document.getElementById('fileElem');
    // input.click();

    // // 1.
    // let lines = data.split(/\r?\n/);

    // // 2.
    // let rslt = lines.map(line => line.split(" "));

    // console.log(rslt);

};

const clean = function () {
    console.log("clean");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    c_x = [];
    c_y = [];
};

window.addEventListener('DOMContentLoaded', init, false);

function init() {
    canvas = document.getElementById('canvasMain');
    ctx = canvas.getContext("2d");
    canvas.addEventListener('mousedown', function (e) {
        e.preventDefault();
        var rect = e.target.getBoundingClientRect();
        c_x.push(e.clientX - rect.left);
        c_y.push(e.clientY - rect.top);
        draw_shape();
    }, false);
};

function draw_shape() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#0000ff";
    var number_p = c_x.length;
    for (var i = 0; i < number_p; i++) {
        ctx.beginPath();
        ctx.arc(c_x[i], c_y[i], 2, 0, Math.PI * 2, false);
        ctx.fillStyle = "#ff0000";
        ctx.fill();
        ctx.closePath();
    }
    if (number_p == 2) {
        ctx.beginPath();
        ctx.moveTo(c_x[0], c_y[0]);
        ctx.lineTo(c_x[1], c_y[1]);
        ctx.stroke();
        ctx.closePath();
    }
    if (number_p > 2) {
        var cs_xy = catmulrom_splinecurve(c_x, c_y);
        var number_c = cs_xy[0].length;
        ctx.beginPath();
        ctx.moveTo(cs_xy[0][0], cs_xy[1][0]);
        var max_len = number_c - division_number;
        for (var i = 1; i < max_len; i++) {
            ctx.lineTo(cs_xy[0][i], cs_xy[1][i]);
        }
        ctx.stroke();
        ctx.closePath();
    }
};

function catmulrom_splinecurve(xi, yi) {
    var number_p = xi.length;
    var x = [];
    var y = [];
    var qx = [];
    var qy = [];
    x.push(xi[number_p - 1]);
    y.push(yi[number_p - 1]);
    x.push(xi[0]);
    y.push(yi[0]);
    for (var i = 1; i < number_p; i++) {
        x.push(xi[i]);
        y.push(yi[i]);
    }
    x.push(xi[0]);
    y.push(yi[0]);
    x.push(xi[1]);
    y.push(yi[1]);
    number_p++;
    for (var i = 1; i < number_p; i++) {
        var p0_x = 0 * x[i - 1] + 2 * x[i] + 0 * x[i + 1] + 0 * x[i + 2];
        var p0_y = 0 * y[i - 1] + 2 * y[i] + 0 * y[i + 1] + 0 * y[i + 2];
        var p1_x = -1 * x[i - 1] + 0 * x[i] + 1 * x[i + 1] + 0 * x[i + 2];
        var p1_y = -1 * y[i - 1] + 0 * y[i] + 1 * y[i + 1] + 0 * y[i + 2];
        var p2_x = 2 * x[i - 1] - 5 * x[i] + 4 * x[i + 1] - 1 * x[i + 2];
        var p2_y = 2 * y[i - 1] - 5 * y[i] + 4 * y[i + 1] - 1 * y[i + 2];
        var p3_x = -1 * x[i - 1] + 3 * x[i] - 3 * x[i + 1] + 1 * x[i + 2];
        var p3_y = -1 * y[i - 1] + 3 * y[i] - 3 * y[i + 1] + 1 * y[i + 2];
        for (var j = 0; j <= division_number; j++) {
            var t = j / division_number;
            qx.push((p0_x + p1_x * t + p2_x * Math.pow(t, 2) + p3_x * Math.pow(t, 3)) * 0.5);
            qy.push((p0_y + p1_y * t + p2_y * Math.pow(t, 2) + p3_y * Math.pow(t, 3)) * 0.5);
        }
    }
    return [qx, qy];
};


export { save, load, clean };