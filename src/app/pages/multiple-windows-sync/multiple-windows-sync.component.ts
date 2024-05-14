import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from "./three";

@Component({
  selector: 'app-multiple-windows-sync',
  templateUrl: './multiple-windows-sync.component.html',
  styleUrls: ['./multiple-windows-sync.component.scss']
})
export class MultipleWindowsSyncComponent implements AfterViewInit {
  @ViewChild('canvas') canvasWrapper!: ElementRef<HTMLDivElement>

  ngAfterViewInit(): void {
    THREE.init(this.canvasWrapper.nativeElement)
  }

}
