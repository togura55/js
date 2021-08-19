
window.addEventListener('load', () => {

    const mainCanvas = document.getElementById('mainCanvas')

    mainCanvas.width = 500
    mainCanvas.height = 500

    const context = mainCanvas.getContext('2d')

    function log(tag, e) {
        console.log(tag, e.pointerId, e.offsetX, e.offsetY, e.buttons, e.pressure)
    }

    function drawPointer(e) {
        const x = e.offsetX
        const y = e.offsetY
        const radius = 5.0 + e.pressure * 10.0
        const red = e.pressure * 255
        context.beginPath()
        context.moveTo((x + radius), y)
        context.arc(x, y, radius, 0, Math.PI * 2)
        context.closePath()
        context.fill()
        if (e.buttons != 0 || e.pressure > 0.0) {
            context.fillStyle = `rgba(${red}, 0, 255, 1.0)`
        }
        // in case of drawing the Pen Hover
        else if (e.buttons == 0 && e.pressure == 0.0) {
            context.fillStyle = `rgba(200, 200, 200, 1.0)`
        }
    }

    mainCanvas.addEventListener('pointerdown', (e) => {
        log('pointerdown', e)
        drawPointer(e)
        e.preventDefault()
    })

    mainCanvas.addEventListener('pointermove', (e) => {
        log('pointermove', e)
        drawPointer(e)
        e.preventDefault()
    })

    mainCanvas.addEventListener('pointerup', (e) => {
        log('pointerup', e)
        e.preventDefault()
    })
})
