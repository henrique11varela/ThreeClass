import * as THREE from "three"

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 10

const scene: THREE.Scene = new THREE.Scene()

const animations: any[] = []

//directional light
const dLight: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 15)
dLight.position.set(3, 2, 1)
scene.add(dLight)

//ambient light
const aLight: THREE.AmbientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(aLight)


// const material = new THREE.MeshLambertMaterial(materialOptions)
const material = new THREE.MeshLambertMaterial({
    color: 0x888888
})

const geometry = new THREE.BoxGeometry(1, 1, 1)

const cube = new THREE.Mesh(geometry, material)

scene.add(cube)

const orientation: any = {
    alpha: 0,
    gamma: 0,
    beta: 0,
}

if (window.DeviceOrientationEvent) {
    window.addEventListener(
        "deviceorientation",
        (event) => {
            const rotateDegrees: number = Number(event.alpha); // alpha: rotation around z-axis
            const leftToRight: number = Number(event.gamma); // gamma: left to right
            const frontToBack: number = Number(event.beta); // beta: front back motion

            handleOrientationEvent(Math.floor(frontToBack), Math.floor(leftToRight), Math.floor(rotateDegrees));
        },
        true,
    );
}

const handleOrientationEvent = (frontToBack: number, leftToRight: number, rotateDegrees: number) => {
    orientation.alpha = rotateDegrees
    orientation.gamma = leftToRight
    orientation.beta = frontToBack
    // cube.rotation.set(frontToBack, rotateDegrees, leftToRight)
};

animations.push(function (deltaTime: number) {
    cube.rotation.x = orientation.beta * Math.PI / 180
    cube.rotation.y = orientation.alpha * Math.PI / 180
    cube.rotation.z = orientation.gamma * Math.PI / 180
})


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

function getOrientation() {
    return orientation
}

export {
    renderer,
    getOrientation
}