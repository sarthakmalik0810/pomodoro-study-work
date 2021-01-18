import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare var ProgressBar: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isClockRunning: boolean = false;
  workSessionDuration = 4000;
  currentTimeLeftInSession = 4000;
  breakSessionDuration = 300;
  @ViewChild('timer') timer: ElementRef;
  constructor() {}

  ngOnInit() {
    this.initBar();
  }

  initBar() {
    let progressBar = new ProgressBar.Circle('.timer', {
      strokeWidth: 2,
      text: {
        value: `25:00`,
        className: 'progressbar__label',
      },
      color: '#f4f4f4',
      trailWidth: 0.5,
      trailColor: '#010770',
    });
  }

  clockTimer = () =>
    setInterval(() => {
      this.currentTimeLeftInSession--;
      console.log(this.currentTimeLeftInSession);
      this.updateClock();
    }, 1000);

  toggleClock = (reset = false) => {
    console.log('toggle clock function');
    if (reset) {
    } else if (this.isClockRunning) {
      this.isClockRunning = false;
    } else {
      this.isClockRunning = true;
      this.clockTimer();
    }
  };

  updateClock = () => {
    const secondsLeft = this.currentTimeLeftInSession;
    let result = '';
    const seconds = Math.floor((secondsLeft % 3600) % 60);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const hours = Math.floor(secondsLeft / 3600);
    console.log(seconds, minutes, hours);
    function addLeadingZeroes(time) {
      return time < 10 ? `0${time}` : time;
    }
    if (hours > 0) {
      result += `0${hours}:`;
    }
    result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
    this.timer.nativeElement.innerText = `${result}`;
  };
}
