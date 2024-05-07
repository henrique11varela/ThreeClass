import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { renderer } from "./three/file";
@Component({
  selector: 'app-orientation',
  templateUrl: './orientation.component.html',
  styleUrls: ['./orientation.component.scss']
})
export class OrientationComponent implements AfterViewInit {
  public alpha: any = 0;
  public gamma: any = 0;
  public beta: any = 0;
  @ViewChild('orientation') orientation!: ElementRef<HTMLDivElement>

  ngAfterViewInit(): void {
    this.orientation.nativeElement.appendChild(renderer.domElement)
    // if (window.DeviceOrientationEvent) {
    //   window.addEventListener(
    //     "deviceorientation",
    //     (event) => {
    //       const rotateDegrees: number = Number(event.alpha); // alpha: rotation around z-axis
    //       const leftToRight: number = Number(event.gamma); // gamma: left to right
    //       const frontToBack: number = Number(event.beta); // beta: front back motion

    //       handleOrientationEvent(Math.floor(frontToBack), Math.floor(leftToRight), Math.floor(rotateDegrees));
    //     },
    //     true,
    //   );
    // }

    // const handleOrientationEvent = (frontToBack: number, leftToRight: number, rotateDegrees: number) => {
    //   this.alpha = rotateDegrees
    //   this.gamma = leftToRight
    //   this.beta = frontToBack
    // };
  }
}
