import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
})
export class ImageUploaderComponent {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  @Output() imageSelected = new EventEmitter<string>();

  isCameraActive = false;

  constructor() {}

  openCamera() {
    this.isCameraActive = true; // Activa la cámara
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      this.videoElement.nativeElement.srcObject = stream;
      this.videoElement.nativeElement.play();
    });
  }

  takePicture() {
    const canvas = this.canvasElement.nativeElement;
    const video = this.videoElement.nativeElement;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64Image = canvas.toDataURL('image/png');
    this.imageSelected.emit(base64Image); // Emitir la imagen capturada

    // Detener el video y desactivar la cámara
    const stream = video.srcObject as MediaStream;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    video.srcObject = null;
    this.isCameraActive = false; // Desactiva la cámara
  }
}
