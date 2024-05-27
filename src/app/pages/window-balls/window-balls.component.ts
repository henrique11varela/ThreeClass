import { Component } from '@angular/core';
import { open } from "./ts";

@Component({
  selector: 'app-window-balls',
  templateUrl: './window-balls.component.html',
  styleUrls: ['./window-balls.component.scss']
})
export class WindowBallsComponent {
  open() {
    open()
  }



}
