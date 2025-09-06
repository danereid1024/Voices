import { Injectable } from '@angular/core';
import RecordRTC from 'recordrtc';

@Injectable({
  providedIn: 'root',
})
export class AudioRecording {
  private recorder!: RecordRTC;
  private stream!: MediaStream;
  isRecording = false;

  async startRecording(): Promise<void> {
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.recorder = new RecordRTC(this.stream, { type: 'audio' });
    this.recorder.startRecording();
    this.isRecording = true;
  }

  stopRecording(): Promise<string> {
    return new Promise((resolve) => {
      this.recorder.stopRecording(() => {
        const audioBlob = this.recorder.getBlob();
        const audioUrl = URL.createObjectURL(audioBlob);

        // stop microphone access after recording
        this.stream.getTracks().forEach((track) => track.stop());

        this.isRecording = false;
        resolve(audioUrl);
      });
    });
  }
}
