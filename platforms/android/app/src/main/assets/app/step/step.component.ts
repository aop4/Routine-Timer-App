import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import { Step } from "../shared/step/step.model";
import { padTwoDigits } from "../util";
import { AudioService } from "../shared/audio.service";

@Component({
    selector: "tmr-step",
    templateUrl: "step/step.component.html",
    styleUrls: ["step/step.component.css"]
})
export class StepComponent implements OnInit, OnDestroy {

    @Input() step: Step;
    interval: number; //an ID for a JS interval
    seconds: number; //a copy of step.seconds that's lowered as time passes
    minutes: number; //a copy of step.minutes that's lowered as time passes
    timerOn = false;
    padTwoDigits = padTwoDigits;

    constructor(private page: Page, private audioService: AudioService) {
        
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

    startTimer() {
        if (this.timerOn) {
            return;
        }
        this.audioService.stopAlarm();
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
        this.stopTimer();
    }

    resetTimer() {
        if (this.timerOn) {
            //make sure it counts down from the top of the first second.
            //Otherwise the first second might be there for like 0.02 seconds, so the time's off
            clearInterval(this.interval);
            this.createInterval();
        }
        this.audioService.stopAlarm();
        this.minutes = this.step.minutes;
        this.seconds = this.step.seconds;
    }
}
