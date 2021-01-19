import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare var ProgressBar: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isClockRunning: boolean = false;
  displayStopButton: boolean = false;
  workSessionDuration = 20;
  currentTimeLeftInSession = 20;
  breakSessionDuration = 300;
  intervalRef;
  timeSpentInCurrentSession = 0;
  type = 'Work';
  @ViewChild('timer') timer: ElementRef;
  constructor() {}

  ngOnInit() {
    this.initBar();
  }

  initBar() {
    let progressBar = new ProgressBar.Circle('.timer', {
      strokeWidth: 2,
      text: {
        value: `${this.updateClock()}`,
        className: 'progressbar__label',
      },
      color: '#f4f4f4',
      trailWidth: 0.5,
      trailColor: '#010770',
    });
  }

  startClock() {
    this.intervalRef = setInterval(() => {
      this.stepDownOrChange();
      console.log(this.currentTimeLeftInSession);
    }, 1000);
  };

  displayClock(result) {
    this.timer.nativeElement.innerText = `${result}`;
  }

  toggleClock = (reset = false) => {
    console.log('toggle clock function');
    if (reset) {
      this.isClockRunning = false;
      this.stopClock();
      this.currentTimeLeftInSession = this.workSessionDuration;
      let result = this.updateClock();
      this.displayClock(result);
      this.displayStopButton = false;
    } else if (this.isClockRunning) {
      this.isClockRunning = false;
      this.stopClock();
    } else {
      this.isClockRunning = true;
      this.startClock();
      this.displayStopButton = true;
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
    return result;
  };

  stopClock() {
    clearInterval(this.intervalRef);
  }

  stepDownOrChange() {
    if(this.currentTimeLeftInSession > 0) {
      this.currentTimeLeftInSession--;
      this.timeSpentInCurrentSession++;
    } else if (this.currentTimeLeftInSession === 0) {
      if(this.type === 'Work') {
        this.currentTimeLeftInSession = this.breakSessionDuration;
        this.type = 'Break';
      } else {
        this.currentTimeLeftInSession = this.workSessionDuration;
        this.type = 'Work';
      }
    }
    let result = this.updateClock();
    this.displayClock(result);

  }
}
