import { Component, Input, OnInit, OnDestroy } from "@angular/core";

import { Page } from "tns-core-modules/ui/page";
import { Step } from "../../shared/step/step.model";
import { padTwoDigits } from "../../util";
import { AudioService } from "../../shared/audio.service";
import { NotificationService } from "~/shared/notification.service";


@Component({
    selector: "tmr-step",
    templateUrl: "pages/step/step.component.html",
    styleUrls: ["pages/step/step.component.css"]
})
export class StepComponent implements OnInit, OnDestroy {

    @Input() step: Step;
    interval: number; //an ID for a JS interval
    seconds: number; //a copy of step.seconds that's lowered as time passes
    minutes: number; //a copy of step.minutes that's lowered as time passes
    timerOn = false;
    paused = false; //whether the timer is paused mid-timing (so the reset button knows
                    //to be visible when timer's paused)
    padTwoDigits = padTwoDigits;
    alarmOn: boolean;

    constructor(private page: Page, private audioService: AudioService,
        private notificationService: NotificationService) {
        
    }

    ngOnInit() {
        this.minutes = this.step.minutes;
        this.seconds = this.step.seconds;
    }

    ngOnDestroy() {
        this.audioService.stopAlarm();
    }

    handleTimerEnd() {
        this.stopTimer();
        this.audioService.playAlarm();
        this.notificationService.makeNotification(this.step.name);
        this.alarmOn = true;
    }

    updateClock() {
        this.seconds -= 1;
        if (this.seconds < 0) {
            //end of step has been reached
            if (this.minutes === 0) {
                this.seconds = 0;
                this.handleTimerEnd();
            }
            else {
                this.minutes -= 1;
                this.seconds = 59;
            }
        }
    }

    createInterval() {
        this.interval = setInterval(() => { this.updateClock() }, 1000);
    }

    isOutOfTime() {
        return (this.minutes == 0 && this.seconds == 0);
    }

    stopTimer() {
        clearInterval(this.interval);
        this.timerOn = false;
    }

    stopAlarm() {
        this.audioService.stopAlarm();
        this.alarmOn = false;
    }

    startTimer() {
        if (this.timerOn) {
            return;
        }
        this.paused = false;
        this.stopAlarm();
        if (this.isOutOfTime()) {
            //reset the timer so it can start from the beginning
            this.minutes = this.step.minutes;
            this.seconds = this.step.seconds;
        }
        this.timerOn = true;
        this.createInterval();
    }

    pauseTimer() {
        if (!this.timerOn) {
            return;
        }
        this.paused = true;
        this.stopTimer();
    }

    resetTimer() {
        if (this.timerOn) {
            //make sure it counts down from the top of the first second.
            //Otherwise the first second might be there for like 0.02 seconds, so the time's off
            clearInterval(this.interval);
            this.createInterval();
        }
        this.paused = false; //since technically it's not suspended mid-tick. Helps control the UI
        this.stopAlarm();
        this.minutes = this.step.minutes;
        this.seconds = this.step.seconds;
    }

    playPauseBtnAction() {
        if (this.timerOn) {
            this.pauseTimer();
        }
        else {
            this.startTimer();
        }
    }

}
