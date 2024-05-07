import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 10

const scene: THREE.Scene = new THREE.Scene()

//cube
const cubeGeometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 5)
const cubeMaterial: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ff0000'),
})
const cube: THREE.Mesh = new THREE.Mesh(cubeGeometry, cubeMaterial)

scene.add(cube)

const ballGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(.25)
const ballMaterial: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#00ff00'),
})
const ball1: THREE.Mesh = new THREE.Mesh(ballGeometry, ballMaterial)
ball1.position.set(.5, -.5, 1.5)
const ball2: THREE.Mesh = new THREE.Mesh(ballGeometry, ballMaterial)
ball2.position.set(-.5, -.5, 1.5)
const ball3: THREE.Mesh = new THREE.Mesh(ballGeometry, ballMaterial)
ball3.position.set(.5, -.5, -1.5)
const ball4: THREE.Mesh = new THREE.Mesh(ballGeometry, ballMaterial)
ball4.position.set(-.5, -.5, -1.5)
cube.add(ball1, ball2, ball3, ball4)

const a: THREE.Mesh = new THREE.Mesh()
a.copy(cube)
a.position.x += 2
scene.add(a)

//directional light
const dLight: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 15)
dLight.position.set(3, 2, 1)
scene.add(dLight)

//ambient light
const aLight: THREE.AmbientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(aLight)

const controls = new OrbitControls(camera, renderer.domElement)

let lastFrameTime: number = 0
function animate(time: number) {
    const deltaTime: number = (time - lastFrameTime) / 1000
    lastFrameTime = time
    cube.rotateX(Math.PI * deltaTime)
    cube.rotateY(Math.PI * deltaTime)
    a.rotateX(Math.PI * deltaTime)
    a.rotateY(Math.PI * deltaTime)
    renderer.render(scene, camera)
}
renderer.setAnimationLoop(animate)


export {
    renderer,
}