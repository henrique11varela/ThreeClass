import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { renderer, getOrientation } from "./three/file";
@Component({
  selector: 'app-orientation',
  templateUrl: './orientation.component.html',
  styleUrls: ['./orientation.component.scss']
})
export class OrientationComponent implements AfterViewInit {
  @ViewChild('orientation') orientationElement!: ElementRef<HTMLDivElement>
  public getOrientation = () => getOrientation()

  ngAfterViewInit(): void {
    this.orientationElement.nativeElement.appendChild(renderer.domElement)
  }
}
