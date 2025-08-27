import { Component, OnDestroy } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { AudioRecording } from '../audio-recording';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonButton]
})
export class Tab2Page implements OnDestroy {
  isRecording = false;
  recordedTime: any;
  blobUrl: any;
  test: any;

  constructor(
    private audioRecording: AudioRecording,
    private sanitizer: DomSanitizer
  ) {
    this.audioRecording
    .recordingFailed()
    .subscribe(() => (this.isRecording = false));
    this.audioRecording
    .getRecordedTime()
    .subscribe(time => (this.recordedTime = time));
    this.audioRecording.getRecordedBlob().subscribe(data => {
      this.test = data;
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(data.blob)
      );
    });
  }

  startRecording() {
    if(!this.isRecording) {
      this.isRecording = true;
      this.audioRecording.startRecording();
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecording.abortRecording();
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioRecording.stopRecording();
      this.isRecording = false;
    }
  }

  clearRecordedData() {
    this.blobUrl = null;
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }


}
