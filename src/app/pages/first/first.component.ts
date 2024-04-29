import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from "three";
import ball from "./three_components/ball";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent implements AfterViewInit {
  @ViewChild('first') first!: ElementRef<HTMLDivElement>;

  private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
  private scene: THREE.Scene = new THREE.Scene()
  private camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
  private light: THREE.DirectionalLight = new THREE.DirectionalLight(new THREE.Color('#ffffff'), 1)
  private lastFrameTime: number = 0


  private animate: XRFrameRequestCallback = (time: any) => {
    const deltaTime = (time - this.lastFrameTime)




    // ball.position.y += this.velocity.y / deltaTime
    this.renderer.render(this.scene, this.camera)
    this.lastFrameTime = time
  }

  ngAfterViewInit(): void {
    // add canvas to page
    this.first.nativeElement.appendChild(this.renderer.domElement)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    // camera setup
    this.camera.position.z = 10
    // light setup
    this.light.position.set(50, 0, 50)
    this.scene.add(this.light)
    
    const lslsl = new THREE.DirectionalLight()
    lslsl.position.set(-50, 0, 50)
    this.scene.add(lslsl)

    const a = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial({color: new THREE.Color('#ff0000')}))
    a.position.x = 1.5
    this.scene.add(a)
    const b = ball()
    b.position.y = 2
    b.position.x = 1.25
    this.scene.add(b)
    this.scene.add(ball())
    const controls = new OrbitControls(this.camera, this.renderer.domElement)

    // set animation loop
    this.renderer.setAnimationLoop(this.animate)
    // resize fix
    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
    })
  }

}
