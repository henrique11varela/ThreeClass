import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { renderer, camera, orientation, init } from "./three/file";
@Component({
  selector: 'app-orientation',
  templateUrl: './orientation.component.html',
  styleUrls: ['./orientation.component.scss']
})
export class OrientationComponent implements AfterViewInit {
  @ViewChild('orientation') orientationElement!: ElementRef<HTMLDivElement>
  public cameraObj: any = camera
  public orientationObj: any = orientation

  ngAfterViewInit(): void {
    this.orientationElement.nativeElement.appendChild(renderer.domElement)
    init()
    setInterval(()=>{
      this.cameraObj = camera
      this.orientationObj = orientation
    }, 100)
  }

  round(n:number){
    return Math.round(n * 1000) / 1000
  }
}
