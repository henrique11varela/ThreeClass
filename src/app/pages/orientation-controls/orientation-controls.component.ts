import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { renderer, toggleModel, init } from "./three/file";

@Component({
  selector: 'app-orientation-controls',
  templateUrl: './orientation-controls.component.html',
  styleUrls: ['./orientation-controls.component.scss']
})
export class OrientationControlsComponent implements AfterViewInit {
  @ViewChild('orientation') orientationElement!: ElementRef<HTMLDivElement>
  public toggleModelBtn = toggleModel
  ngAfterViewInit(): void {
    this.orientationElement.nativeElement.appendChild(renderer.domElement)
    init()
  }
}
