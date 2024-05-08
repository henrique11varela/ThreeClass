import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 10

const scene: THREE.Scene = new THREE.Scene()

// const animations: any[] = []

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





let lastFrameTime: number = 0

function animate(time: number) {
    const deltaTime: number = (time - lastFrameTime) / 1000
    lastFrameTime = time
    renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)

const controls = new OrbitControls(camera, renderer.domElement)

export {
    renderer,
    camera
}
