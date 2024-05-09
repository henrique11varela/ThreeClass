import * as THREE from "three"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 10

const controls = new OrbitControls(camera, renderer.domElement)
controls.enablePan = false
controls.enableRotate = false
controls.enableZoom = false


const scene: THREE.Scene = new THREE.Scene()

const animations: any[] = []

//directional light
const dLight: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 15)
dLight.position.set(3, 2, 1)
scene.add(dLight)

//ambient light
const aLight: THREE.AmbientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(aLight)



const material = new THREE.MeshLambertMaterial({
    color: 0x888888
})

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
            //around x, y, z
            // console.log(event);
            
            // handleOrientationEvent(90, 0, 45);
            if (event.beta && event.alpha && event.gamma) {
                handleOrientationEvent(Math.round(Number(event.beta)), Math.round(Number(event.alpha)), Math.round(Number(event.gamma)));
            }
        },
        true,
    );
}

const handleOrientationEvent = (pitch: number, yaw: number, roll: number) => {
    orientation.beta = pitch
    orientation.alpha = yaw
    orientation.gamma = roll
};

function degToRad(deg: number) {
    return deg * ( Math.PI / 180)
}


const CAMERA_DISTANCE = controls.getDistance()

animations.push(function (deltaTime: number) {
    const beta = degToRad(orientation.beta)
    const gamma = degToRad(orientation.gamma)
    const alpha = degToRad(orientation.alpha)

    const pos: [number, number, number] = [0, 10, 0]
    pos[0] = Math.sin(beta) * Math.sin(alpha) * CAMERA_DISTANCE
    pos[1] = Math.cos(beta) * CAMERA_DISTANCE 
    pos[2] = Math.sin(beta) * Math.cos(alpha) * CAMERA_DISTANCE
    camera.position.set(...pos)
    if (beta < 0) {
        camera.up.set(0,-1,0)
    }
    else  {
        camera.up.set(0,1,0)
    }
    controls.update()
})
console.log(controls);




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
    camera,
    orientation
}
