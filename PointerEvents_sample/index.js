let penUp = 0;
var prev_X, prev_Y;

window.addEventListener('load', () => {

    const mainCanvas = document.getElementById('mainCanvas')

    mainCanvas.width = 500
    mainCanvas.height = 500

    const context = mainCanvas.getContext('2d')

    function log(tag, e) {
        console.log(tag, e.pointerId, e.offsetX, e.offsetY, e.buttons, e.pressure)
    }

    var elData = document.getElementById("pointerData");

    function drawPointer(e, p) {
        const x = e.offsetX
        const y = e.offsetY
        const z = e.pressure
        const radius = 5.0 + e.pressure * 10.0
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
            if (penUp == 0 && p == 0){
              // Reset the current path
              context.beginPath(); 
              context.lineWidth = radius * 2;
              context.strokeStyle = color;
              context.moveTo(x, y);
              context.lineTo(prev_X,prev_Y);
              // Make the line visible
              context.stroke();
              
              elData.innerHTML = 'x=' + x + ', y=' + y + ', z=' + z;
            }
            prev_X = x;
            prev_Y = y;
        }
        // in case of drawing the Pen Hover
        else if (e.buttons == 0 && e.pressure == 0.0) {
            context.fillStyle = `rgba(200, 200, 200, 1.0)`
        }
    }

    mainCanvas.addEventListener('pointerdown', (e) => {
        log('pointerdown', e)
        drawPointer(e, 1)
        penUp = 0;
        e.preventDefault()
    })

    mainCanvas.addEventListener('pointermove', (e) => {
        log('pointermove', e)
        drawPointer(e, 0)
        penUp = 0;
        e.preventDefault()
    })

    mainCanvas.addEventListener('pointerup', (e) => {
        log('pointerup', e)
        penUp = 1;
        e.preventDefault()
    })
})
