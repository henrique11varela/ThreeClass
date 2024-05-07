import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { renderer, orientation } from "./three/file";
@Component({
  selector: 'app-orientation',
  templateUrl: './orientation.component.html',
  styleUrls: ['./orientation.component.scss']
})
export class OrientationComponent implements AfterViewInit {
  @ViewChild('orientation') orientationElement!: ElementRef<HTMLDivElement>
  public angles = orientation

  ngAfterViewInit(): void {
    this.orientationElement.nativeElement.appendChild(renderer.domElement)
  }
}
