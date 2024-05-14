import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as THREE from "./three";

@Component({
  selector: 'app-multiple-windows-sync',
  templateUrl: './multiple-windows-sync.component.html',
  styleUrls: ['./multiple-windows-sync.component.scss']
})
export class MultipleWindowsSyncComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasWrapper!: ElementRef<HTMLDivElement>

  ngAfterViewInit(): void {
    THREE.init(this.canvasWrapper.nativeElement)
  }
  
  ngOnDestroy(): void {
    THREE.destroy()
  }

}
