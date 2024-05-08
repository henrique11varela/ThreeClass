import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { renderer, camera } from "./three/file";

@Component({
  selector: 'app-orientation-controls',
  templateUrl: './orientation-controls.component.html',
  styleUrls: ['./orientation-controls.component.scss']
})
export class OrientationControlsComponent implements AfterViewInit {
  @ViewChild('orientation') orientationElement!: ElementRef<HTMLDivElement>
  public cameraObj: any = camera

  ngAfterViewInit(): void {
    this.orientationElement.nativeElement.appendChild(renderer.domElement)
    setInterval(() => {
      this.cameraObj = camera
    }, 100)
  }
  round(n:number){
    return Math.round(n * 1000) / 1000
  }
}
