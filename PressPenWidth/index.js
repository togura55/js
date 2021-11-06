let penUp = 0;
var prev_X, prev_Y;
var zArr = new Array();
var zMax = 0, zMin = 1;
const coefTable = [1,1,1,2,3,7,20,30,30,30];

window.addEventListener('load', () => {

    const mainCanvas = document.getElementById('mainCanvas')

    mainCanvas.width = 500
    mainCanvas.height = 500

    const context = mainCanvas.getContext('2d')

    function log(tag, e) {
        console.log(tag, e.pointerId, e.offsetX, e.offsetY, e.buttons, e.pressure)
    }

    var elData = document.getElementById("pointerData");
    var elZMaxMin = document.getElementById("zMaxMin");

  
    function drawPointer(e, p) {
        const x = e.offsetX
        const y = e.offsetY
        const z = e.pressure
//        const radius = 5.0 + e.pressure * 10.0
        const radius = coefTable[Math.floor(e.pressure * 10)];
       const red = e.pressure * 255
        context.beginPath()
        context.moveTo((x + radius), y)
        context.arc(x, y, radius, 0, Math.PI * 2)
        context.closePath()
        context.fill()

        if (e.buttons != 0 || e.pressure > 0.0) {
            var color = `rgba(${red}, 0, 255, 1.0)`;
            context.fillStyle = color;

            // If a pen is down, draw line
            if (penUp == 0 && p == 0) {
                // Reset the current path
                context.beginPath();
                context.lineWidth = radius * 2;
                context.strokeStyle = color;
                context.moveTo(x, y);
                context.lineTo(prev_X, prev_Y);
                // Make the line visible
                context.stroke();

                if (zMax < z) zMax = z;
                if (zMin > z) zMin = z;
                elData.innerHTML = 'x=' + x + ', y=' + y + ', z=' + z + ', r=' + radius;
                elZMaxMin.innerHTML = 'zMax=' + zMax + ', zMin=' + zMin;
                zArr.push(z);
            }
            prev_X = x;
            prev_Y = y;
        }
        // in case of drawing the Pen Hover
        else if (e.buttons == 0 && e.pressure == 0.0) {
            context.fillStyle = `rgba(200, 200, 200, 1.0)`

            elData.innerHTML = 'x=' + x + ', y=' + y + ', z=' + z + ', Hover';
        }
    }

    mainCanvas.addEventListener('pointerdown', (e) => {
//        log('pointerdown', e)
        drawPointer(e, 1)
        penUp = 0;
        e.preventDefault()
    })

    mainCanvas.addEventListener('pointermove', (e) => {
//        log('pointermove', e)
        drawPointer(e, 0)
        penUp = 0;
        e.preventDefault()
    })

    mainCanvas.addEventListener('pointerup', (e) => {
 //       log('pointerup', e)
        penUp = 1;
        e.preventDefault()
    })
})

document.getElementById('buttonExport').onclick = function(){
	exportTextFile(zArr,'z.txt');
}

function exportTextFile(data, filename) {
    let blob = new Blob([data], { type: "text/plan" }); // テキスト形式でBlob定義
    let link = document.createElement('a'); // HTMLのaタグを作成
    link.href = URL.createObjectURL(blob); // aタグのhref属性を作成
    link.download = filename; // aタグのdownload属性を作成
    link.click(); // 定義したaタグをクリック（実行）
};

