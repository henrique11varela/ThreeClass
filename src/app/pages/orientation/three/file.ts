import * as THREE from "three"

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
// camera.position.z = 10

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
const material = new THREE.MeshLambertMaterial({color: 0x888888})
const geometry = new THREE.BoxGeometry(1, 1, 1)
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)
const materialX = new THREE.MeshLambertMaterial({color: 0xff0000})
const geometryX = new THREE.BoxGeometry(.5, .5, .5)
const cubeX = new THREE.Mesh(geometryX, materialX)
cubeX.position.x = 1
cube.add(cubeX)
const materialY = new THREE.MeshLambertMaterial({color: 0x0000ff})
const geometryY = new THREE.BoxGeometry(.5, .5, .5)
const cubeY = new THREE.Mesh(geometryY, materialY)
cubeY.position.y = 1
cube.add(cubeY)
const materialZ = new THREE.MeshLambertMaterial({color: 0x00ff00})
const geometryZ = new THREE.BoxGeometry(.5, .5, .5)
const cubeZ = new THREE.Mesh(geometryZ, materialZ)
cubeZ.position.z = 1
cube.add(cubeZ)




////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                  ORIENTATION                                               //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const orientation: any = {
    alpha: 0,
    gamma: 0,
    beta: 0,
}

if (window.DeviceOrientationEvent) {
    window.addEventListener(
        "deviceorientation",
        (event) => {
            handleOrientationEvent(Math.round(Number(event.beta)), Math.round(Number(event.gamma)), Math.round(Number(event.alpha)));
        },
        true,
    );
}

const handleOrientationEvent = (frontToBack: number, leftToRight: number, rotateDegrees: number) => {
    orientation.alpha = rotateDegrees
    orientation.gamma = leftToRight
    orientation.beta = frontToBack
};

function degToRad(deg: number) {
    return deg * ( Math.PI / 180)
}

const CAMERA_DISTANCE = 10

animations.push(function (deltaTime: number) {
    // const rad: any = {
    //     alpha: orientation.alpha * (Math.PI / 180),
    //     gamma: orientation.gamma * (Math.PI / 180),
    //     beta: orientation.beta * (Math.PI / 180),
    // }
    // camera.rotation.x = -rad.beta
    // camera.rotation.y = -rad.alpha
    // camera.rotation.z = -rad.gamma
    const beta = degToRad(orientation.beta - 90)
    const gamma = degToRad(orientation.gamma)
    const alpha = degToRad(orientation.alpha)

    const pos: [number, number, number] = [0, 10, 0]
    const h = CAMERA_DISTANCE * Math.sin(beta- (Math.PI / 2)) * -1
    pos[1] = CAMERA_DISTANCE * Math.cos(beta- (Math.PI / 2)) * -1
    pos[2] = h * Math.sin(alpha)
    pos[0] = h * Math.cos(alpha)
    camera.position.set(...pos)
    camera.rotation.set(beta - (Math.PI / 2), gamma, (alpha * 0))
})




////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                              END OF ORIENTATION                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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



export {
    renderer,
    camera
}
