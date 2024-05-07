import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { renderer, getOrientation } from "./three/file";
@Component({
  selector: 'app-orientation',
  templateUrl: './orientation.component.html',
  styleUrls: ['./orientation.component.scss']
})
export class OrientationComponent implements AfterViewInit {
  @ViewChild('orientation') orientationElement!: ElementRef<HTMLDivElement>
  public orientationObj: any = {
    alpha: 0,
    gamma: 0,
    beta: 0,
  }

  ngAfterViewInit(): void {
    this.orientationElement.nativeElement.appendChild(renderer.domElement)
    setInterval(()=>{
      const temp = getOrientation()
      this.orientationObj.alpha = temp.alpha
      this.orientationObj.gamma = temp.gamma
      this.orientationObj.beta = temp.beta
    }, 100)
  }
}
