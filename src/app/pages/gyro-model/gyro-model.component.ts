
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { renderer, init } from "./three/file";
@Component({
  selector: 'app-gyro-model',
  templateUrl: './gyro-model.component.html',
  styleUrls: ['./gyro-model.component.scss']
})
export class GyroModelComponent implements AfterViewInit {
  @ViewChild('gyro') gyroElement!: ElementRef<HTMLDivElement>
  // public cameraObj: any = camera
  // public orientationObj: any = orientation

  ngAfterViewInit(): void {
    this.gyroElement.nativeElement.appendChild(renderer.domElement)
    init()
    // setInterval(()=>{
    //   this.cameraObj = camera
    //   this.orientationObj = orientation
    // }, 100)
  }

  // round(n:number){
  //   return Math.round(n * 1000) / 1000
  // }
}