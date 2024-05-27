import * as THREE from "three";

const LS_VERSION = 'v'
const LS_PAYLOAD = 'p'

let version: number = 0
let globalStats: any[] = []
let index = -1
let length = 0

let renderer: THREE.WebGLRenderer;
let camera: THREE.OrthographicCamera;
let scene: THREE.Scene;

/**
 * Array of functions that animate
*/
const animations: any[] = []

////////////////////////////////////////////////////////////
//                     Specific Logic                     //
////////////////////////////////////////////////////////////
const geometry = new THREE.SphereGeometry(window.screen.height / 10)

const colors = ['red', 'blue', 'yellow', 'green', 'cyan', 'purple', 'black', 'white']

const materials: any = {
    red: new THREE.MeshLambertMaterial({ color: 0xff0000 }),
    blue: new THREE.MeshLambertMaterial({ color: 0x0000ff }),
    yellow: new THREE.MeshLambertMaterial({ color: 0xffff00 }),
    green: new THREE.MeshLambertMaterial({ color: 0x00ff00 }),
    cyan: new THREE.MeshLambertMaterial({ color: 0x00ffff }),
    purple: new THREE.MeshLambertMaterial({ color: 0xff00ff }),
    black: new THREE.MeshLambertMaterial({ color: 0x000000 }),
    white: new THREE.MeshLambertMaterial({ color: 0xffffff }),
}

function readLocalStorage(deltaTime: number = 0) {
    const currVersion = Number(localStorage.getItem(LS_VERSION))
    if (version < currVersion) {
        const payload = localStorage.getItem(LS_PAYLOAD)
        globalStats = JSON.parse(payload ? payload : '[]')
        if (length != globalStats.length) {
            length = globalStats.length
            reDrawBalls()
        }
    }
}
animations.push(readLocalStorage)

function writeLocalStorage(deltaTime: number = 0) {
    const currVersion = Number(localStorage.getItem(LS_VERSION))
    localStorage.setItem(LS_VERSION, currVersion + 1 + '')
    localStorage.setItem(LS_PAYLOAD, JSON.stringify(globalStats))
}


function addBall() {
    globalStats.push({
        index: index,
        x: window.screenLeft + window.innerWidth / 2,
        y: window.screenTop + window.innerHeight / 2
    })
    globalStats.sort((a, b) => a.index - b.index)
    writeLocalStorage()
}

function drawBalls() {
    globalStats.forEach((item, localIndex) => {
        const ball = new THREE.Mesh(geometry, materials[colors[localIndex]])
        scene.add(ball)
        // if this ball
        if (index == localIndex) {
            ball.add(camera)
            animations.push((deltaTime: number) => {
                const i = globalStats.indexOf(globalStats.find(item => item.index == index))
                const currStats = {
                    x: window.screenLeft + window.innerWidth / 2,
                    y: window.screenTop + window.innerHeight / 2
                }
                if (currStats.x != globalStats[i].x || currStats.y != globalStats[i].y) {
                    globalStats[i].x = currStats.x
                    globalStats[i].y = currStats.y
                    ball.position.set(globalStats[i].x, globalStats[i].y, 0)
                    writeLocalStorage()
                }
            })
        }
        // if other balls
        else {
            animations.push((deltaTime: number) => {
                ball.position.set(globalStats[localIndex].x, globalStats[localIndex].y, 0)
            })
        }
    })
}

function reDrawBalls() {
    animations.length = 0
    for (let i = scene.children.length - 1; i >= 0; i--) {
        if (scene.children[i].type === "Mesh") {
            const a = scene.children[i] as THREE.Mesh
            a.geometry.dispose()
            scene.remove(scene.children[i]);
        }
    }
    drawBalls()
}

function addDirectionalLight() {
    const dLight = new THREE.DirectionalLight(0xffffff, 10)
    dLight.position.set(1, 1, 1)
    scene.add(dLight)
}

function addAmbientLight() {
    const aLight = new THREE.AmbientLight(0xffffff, 1)
    scene.add(aLight)
}

function setup() {
    readLocalStorage()
    // index atribution
    globalStats.forEach((item, localIndex) => {
        if (index == -1 && item.index != localIndex) {
            index = localIndex
        }
    })
    if (index == -1) {
        index = globalStats.length
    }
    //adding elements
    addDirectionalLight()
    addAmbientLight()
    addBall()
    drawBalls()
}

////////////////////////////////////////////////////////////
//                      GENERAL SETUP                     //
////////////////////////////////////////////////////////////

/**
 * Auto resizes Renderer with window
 */
function resizeRenderer() {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.left = -window.innerWidth / 2
    camera.right = window.innerWidth / 2
    camera.top = -window.innerHeight / 2
    camera.bottom = window.innerHeight / 2
    camera.updateProjectionMatrix()
}

/**
 * Initiates everything needed for the threejs animation
 * @param wrapperEl a div element that will wrap the canvas
 */
function init(wrapperEl: HTMLDivElement) {
    // Instantiate 
    renderer = new THREE.WebGLRenderer({ alpha: true })
    camera = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2 , -window.innerHeight / 2, window.innerHeight / 2, 0.1, 1000)
    // camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 10
    scene = new THREE.Scene()
    // Append Canvas to Wrapper
    wrapperEl.appendChild(renderer.domElement)
    // Resize Renderer
    resizeRenderer()
    window.addEventListener('resize', resizeRenderer)
    // Animation loop start
    let lastFrameTime: number = 0
    function animate(time: number) {
        const deltaTime: number = (time - lastFrameTime) / 1000
        lastFrameTime = time
        readLocalStorage()
        animations.forEach((item: Function) => {
            item(deltaTime)
        })
        renderer.render(scene, camera)
    }
    renderer.setAnimationLoop(animate)
    setup()
}

function destroy() {
    globalStats.splice(index, 1)
    writeLocalStorage()
    renderer.dispose()
}

window.addEventListener("beforeunload", destroy);

export {
    init,
    destroy
}
