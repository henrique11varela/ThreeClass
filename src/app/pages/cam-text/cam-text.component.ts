import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as TESSERACT from 'tesseract.js'

@Component({
  selector: 'app-cam-text',
  templateUrl: './cam-text.component.html',
  styleUrls: ['./cam-text.component.scss']
})
export class CamTextComponent implements AfterViewInit {

  @ViewChild('vid') public vid!: ElementRef<HTMLVideoElement>;
  @ViewChild('result') public result!: ElementRef<HTMLTextAreaElement>;
  public worker!: TESSERACT.Worker;

  ngAfterViewInit(): void {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(async (stream) => {
        this.worker = await TESSERACT.createWorker('eng')

        this.vid.nativeElement.srcObject = stream

      })
      .catch(err => console.log(err))
  }

  async snap() {
    const canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d'),
          width = this.vid.nativeElement.videoWidth,
          height = this.vid.nativeElement.videoHeight

    canvas.width = width
    canvas.height = height
    ctx?.drawImage(this.vid.nativeElement, 0, 0, width, height)

    const res = await this.worker.recognize(canvas.toDataURL('image/png'))
    this.result.nativeElement.value = res.data.text
  }
}