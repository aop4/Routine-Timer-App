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
/* Represents a step in the page that displays a task and its
associated steps, timers, etc. */
export class StepComponent implements OnInit, OnDestroy {

    @Input() step: Step; //input from parent component
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

    /* Initialize timer interval */
    ngOnInit() {
        this.minutes = this.step.minutes;
        this.seconds = this.step.seconds;
    }

    /* Turn off vibration/alarm tones when the user navigates away from the page */
    ngOnDestroy() {
        this.audioService.stopAlarm();
    }

    /* Called when the timer's time is up */
    handleTimerEnd() {
        //keep the timer from "ticking" any longer
        this.stopTimer();
        //play the alarm (if the user wants an alarm)
        this.audioService.playAlarm();
        //send a notification if the user has left the app or their display
        //is off, and they want notifications
        this.notificationService.makeNotification(this.step.name);
        //used to control the UI components
        this.alarmOn = true;
    }

    /* Decrements the timer by a second */
    updateClock() {
        this.seconds -= 1;
        //if time is up
        if (this.seconds === 0 && this.minutes === 0) {
            this.handleTimerEnd();
        }
        //if the end of a minute (other than the last minute) was reached
        else if (this.seconds < 0) {
            this.minutes -= 1;
            this.seconds = 59;
        }
    }

    /* Creates an interval that decrements the clock each second */
    createInterval() {
        this.interval = setInterval(() => { this.updateClock() }, 1000);
    }

    /* Returns true if the timer has previously gone down to 0 and
    not yet been reset. */
    isOutOfTime() {
        return (this.minutes === 0 && this.seconds === 0);
    }

    /* Halts the timer */
    stopTimer() {
        //clear the interval that decrements the timer
        clearInterval(this.interval);
        this.timerOn = false;
    }

    /* Halts the alarm so it doesn't play anymore */
    stopAlarm() {
        this.audioService.stopAlarm();
        this.alarmOn = false;
    }

    /* Begins the timer if it's not already going */
    startTimer() {
        if (this.timerOn) {
            return;
        }
        this.paused = false;
        //turn any previous alarms off--the user would have noticed them already
        //and may be using this to restart a timer that ran to completion
        this.stopAlarm();
        //if the timer previously ran to completion
        if (this.isOutOfTime()) {
            //reset the timer so it can start from the beginning
            this.minutes = this.step.minutes;
            this.seconds = this.step.seconds;
        }
        this.timerOn = true;
        //create an interval that decrements the timer
        this.createInterval();
    }

    /* Pauses the timer */
    pauseTimer() {
        if (!this.timerOn) {
            return;
        }
        this.paused = true;
        this.stopTimer();
    }

    /*  */
    resetTimer() {
        //if the timer's already going and the user is restarting it as it goes
        if (this.timerOn) {
            //make sure it counts down from the top of the first second instead of where the
            //current interval would count from.
            //Otherwise the first second might be there for, say, 0.2 seconds, so the time's off
            clearInterval(this.interval);
            this.createInterval();
        }
        this.paused = false; //since technically it's not suspended mid-tick. Helps control the UI
        //if the alarm tone/vibration was going off, get rid of it
        this.stopAlarm();
        this.minutes = this.step.minutes;
        this.seconds = this.step.seconds;
    }

    /* Handles both the play and pause features. Basically, if the play button is being displayed,
    it starts the timer, and if the pause button is being displayed, it pauses it. */
    playPauseBtnAction() {
        if (this.timerOn) {
            this.pauseTimer();
        }
        else {
            this.startTimer();
        }
    }

}
