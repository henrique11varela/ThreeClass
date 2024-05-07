import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-orientation',
  templateUrl: './orientation.component.html',
  styleUrls: ['./orientation.component.scss']
})
export class OrientationComponent implements AfterViewInit {
  public alpha: any = 0;
  public gamma: any = 0;
  public beta: any = 0;

  ngAfterViewInit(): void {
    if (window.DeviceOrientationEvent) {
      window.addEventListener(
        "deviceorientation",
        (event) => {
          const rotateDegrees = event.alpha; // alpha: rotation around z-axis
          const leftToRight = event.gamma; // gamma: left to right
          const frontToBack = event.beta; // beta: front back motion

          handleOrientationEvent(frontToBack, leftToRight, rotateDegrees);
        },
        true,
      );
    }

    const handleOrientationEvent = (frontToBack: any, leftToRight: any, rotateDegrees: any) => {
      this.alpha = rotateDegrees
      this.gamma = leftToRight
      this.beta = frontToBack
    };
  }
}
