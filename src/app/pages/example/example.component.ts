import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { renderer } from './three/file';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements AfterViewInit {
  @ViewChild('example') example!: ElementRef<HTMLDivElement>

  ngAfterViewInit(): void {
    // FAZ COISAS
    this.example.nativeElement.appendChild(renderer.domElement)
  }
}
