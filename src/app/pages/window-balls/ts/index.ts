const width = 300
const height = 300
const settings = `width=${width},height=${height},resizable=no,top=100,left=100`
const windowsArr: {
    window: Window,
    velocity: {
        x: number,
        y: number
    },
    position: {
        x: number,
        y: number
    }
}[] = [];
const isColiding: { x: boolean, y: boolean } = {
    x: false,
    y: false
}

let lastTimestamp: number = 0

function checkColision(timestamp: number) {
    const dt = timestamp - lastTimestamp
    lastTimestamp = timestamp
    // console.log(dt, windowsArr);

    windowsArr.forEach((wind) => {
        const nextCoords = {
            x: wind.position.x + wind.velocity.x * (dt / 1000),
            y: wind.position.y + wind.velocity.y * (dt / 1000)
        }

        if (nextCoords.x < 0) {//hit x
            isColiding.x = true
            wind.position.x = nextCoords.x * -1
            wind.velocity.x = Math.abs(wind.velocity.x)
        }
        else if (nextCoords.x + width > screen.availWidth && !isColiding.x) {
            isColiding.x = true
            wind.velocity.x = Math.abs(wind.velocity.x) * -1
        }
        else {
            isColiding.x = false
            wind.position.x = nextCoords.x
        }

        if (nextCoords.y < 0) {//hit y
            isColiding.y = true
            wind.position.y = nextCoords.y * -1
            wind.velocity.y = Math.abs(wind.velocity.y)
        }
        else if (nextCoords.y + height > screen.availHeight && !isColiding.y) {
            isColiding.y = true
            wind.velocity.y = Math.abs(wind.velocity.y) * -1
        }
        else {
            isColiding.y = false
            wind.position.y = nextCoords.y
        }

        wind.window.moveTo(wind.position.x, wind.position.y)
    })
    window.requestAnimationFrame(checkColision)
}

function open() {
    for (let i = 0; i < 2; i++) {
        const w = window.open('/window-balls', `w${i}`, settings)
        if (w) {
            windowsArr.push({
                window: w,
                velocity: {
                    x: Math.floor(100 + 150 * Math.random()),
                    y: Math.floor(100 + 150 * Math.random())
                },
                position: {
                    x: 100,
                    y: 100
                }
            });
        }
    }
    checkColision(lastTimestamp)
}

export {
    open
}