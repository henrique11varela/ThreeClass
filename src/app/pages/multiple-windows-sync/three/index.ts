import * as THREE from "three";

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({alpha: true})
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 10
let scene: THREE.Scene;

/**
 * Array of functions that animate
*/
const animations: any[] = []

const materials = {
    red: new THREE.MeshLambertMaterial({ color: 0xff0000 }),
    blue: new THREE.MeshBasicMaterial({ color: 0x0000ff }),
    green: new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    yellow: new THREE.MeshBasicMaterial({ color: 0xffff00 }),
    white: new THREE.MeshBasicMaterial({ color: 0xffffff }),
    black: new THREE.MeshBasicMaterial({ color: 0x000000 }),
}

function addBall() {
    const geometry = new THREE.SphereGeometry()
    const ball = new THREE.Mesh(geometry, materials.red)
    scene.add(ball)
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

/**
 * Auto resizes Renderer with window
 */
function resizeRenderer() {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
}

/**
 * Initiates everything needed for the threejs animation
 * @param wrapperEl a div element that will wrap the canvas
 */
function init(wrapperEl: HTMLDivElement) {
    // Append Canvas to Wrapper
    wrapperEl.appendChild(renderer.domElement)
    // Resize Renderer
    resizeRenderer()
    window.addEventListener('resize', resizeRenderer)
    // Instantiate 
    scene = new THREE.Scene()
    // Animation loop start
    let lastFrameTime: number = 0
    function animate(time: number) {
        const deltaTime: number = (time - lastFrameTime) / 1000
        lastFrameTime = time
        animations.forEach((item: Function) => {
            item(deltaTime)
        })
        renderer.render(scene, camera)
    }
    renderer.setAnimationLoop(animate)
    addDirectionalLight()
    addAmbientLight()
    addBall()
}

export {
    init
}
