import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public w: any;
  
  open() {
    this.w = window.open('/multiple-windows-sync', '_blank', 'popup');
  }

  up() {
    this.w.moveBy(0, -10)
  }

  down() {
    this.w.moveBy(0, 10)
  }

  left() {
    this.w.moveBy(-10, 0)
  }

  right() {
    this.w.moveBy(10, 0)
  }
}
