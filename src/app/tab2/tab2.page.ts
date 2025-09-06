import { Component, OnDestroy } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { AudioRecording } from '../audio-recording';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
  ],
})
export class Tab2Page {
  posts: string[] = [];

  constructor(public recorderService: AudioRecording) {}

  async startRecording() {
    await this.recorderService.startRecording();
  }

  async stopRecording() {
    const audioUrl = await this.recorderService.stopRecording();
    this.posts.unshift(audioUrl); // add to top of timeline
  }
}
