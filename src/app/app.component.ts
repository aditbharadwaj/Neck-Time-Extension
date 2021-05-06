import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  config: CountdownConfig;
  title = 'first-angular-extension';
  status = 'Stopped';
  showText: boolean = false;
  showConfirmText: boolean = false;
  leftTimeValue: number = 1200;
  textValue: any;
  buttonText: string = 'Open Settings';
  showAccordion: boolean = false;
  @ViewChild('countdown') countdown: CountdownComponent;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor() {
    let localVal = localStorage.getItem('TIME_LEFT');
    console.log('localVal :', localVal);
    if (localVal) {
      this.leftTimeValue = +localVal;
      this.config = { leftTime: +localVal, demand: true };
    } else {
      this.config = { leftTime: this.leftTimeValue, demand: true };
    }
  }

  handleEvent(ev: any) {
    console.log('ev :', ev);
    if (ev.action === 'done') {
      this.showText = true;
    }
  }

  onStart() {
    this.config = { leftTime: this.leftTimeValue, demand: false };
    this.status = 'Started';
    this.showText = false;
  }

  handleAccordion() {
    if (!this.showAccordion) {
      this.accordion.openAll();
      this.showAccordion = true;
      this.buttonText = 'Close Settings';
    } else {
      this.accordion.closeAll();
      this.showAccordion = false;
      this.showConfirmText = false;
      this.buttonText = 'Open Settings';
    }
  }

  convertMinutesToSeconds(minutes) {
    return Math.floor(minutes * 60);
  }

  onChangeTimerValue() {
    const val = this.convertMinutesToSeconds(this.textValue);
    console.log('val :', val);
    this.leftTimeValue = val;
    localStorage.setItem('TIME_LEFT', JSON.stringify(val));
    this.config = { leftTime: val, demand: true };
    this.showConfirmText = true;
  }

  onStop() {
    this.config = { leftTime: this.leftTimeValue, demand: true };
    this.status = 'Stopped';
    this.showText = false;
  }
}
