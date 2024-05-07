import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { renderer } from './three/file'

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent {
  @ViewChild('model') model!: ElementRef<HTMLDivElement>

  ngAfterViewInit(): void {
    // FAZ COISAS
    this.model.nativeElement.appendChild(renderer.domElement)
  }
}
