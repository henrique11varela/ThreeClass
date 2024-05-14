import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

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

// color logic
let color: any[] = [255, 0, 0]
let currentMode = 0;
const colorModes: any = [
    {
        rate: 10,
        direction: 1,
        index: 1,
        target: [255, 255, 0]
    },
    {
        rate: 10,
        direction: -1,
        index: 0,
        target: [0, 255, 0]
    },
    {
        rate: 10,
        direction: 1,
        index: 2,
        target: [0, 255, 255]
    },
    {
        rate: 10,
        direction: -1,
        index: 1,
        target: [0, 0, 255]
    },
    {
        rate: 10,
        direction: 1,
        index: 0,
        target: [255, 0, 255]
    },
    {
        rate: 10,
        direction: -1,
        index: 2,
        target: [255, 0, 0]
    },
]


// new material
const materialOptions: any = {
    color: new THREE.Color(`rgb(${color.join(',')})`)
}

// const material = new THREE.MeshLambertMaterial(materialOptions)
const material = new THREE.MeshLambertMaterial({
    color: 0x888888
})
const controls = new OrbitControls(camera, renderer.domElement)

function init() {

    const loader: GLTFLoader = new GLTFLoader();
    loader.load('../../../../assets/PDRW-2.2.glb',
        function (glb: any) {
            console.log(glb);
            let importedObj: any = null
            importedObj = glb.scene
            importedObj.traverse(function (n: THREE.Mesh) {
                n.material = material
            })
            animations.push(function (deltaTime: number) {
                // importedObj.rotateX(Math.PI / 10 * deltaTime)
                // importedObj.rotateY(Math.PI / 4 * deltaTime)
                // importedObj.rotateZ(Math.PI / 6 * deltaTime)
                // importedObj.traverse(function (n: any) {
                //     n.material.color.set(new THREE.Color(`rgb(${color.join(',')})`))
                // })
            })
            scene.add(importedObj)
        },
        function (xhr: any) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error: any) {
            console.log(error);
        }
    )


    setInterval(() => {
        let reachedTarget = true
        color.forEach((item, index) => {
            if (item !== colorModes[currentMode].target[index]) {
                reachedTarget = false
            }
        })
        if (reachedTarget) {
            currentMode++
            if (currentMode === colorModes.length) {
                currentMode = 0
            }
        }
        color[colorModes[currentMode].index] += colorModes[currentMode].rate * colorModes[currentMode].direction
        if (color[colorModes[currentMode].index] > 255) {
            color[colorModes[currentMode].index] = 255
        }
        else if (color[colorModes[currentMode].index] < 0) {
            color[colorModes[currentMode].index] = 0
        }
    }, 100);

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
}

export {
    renderer,
    init
}