"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page");
var step_model_1 = require("../../shared/step/step.model");
var util_1 = require("../../util");
var audio_service_1 = require("../../shared/audio.service");
var notification_service_1 = require("~/shared/notification.service");
var StepComponent = /** @class */ (function () {
    function StepComponent(page, audioService, notificationService) {
        this.page = page;
        this.audioService = audioService;
        this.notificationService = notificationService;
        this.timerOn = false;
        this.paused = false; //whether the timer is paused mid-timing (so the reset button knows
        //to be visible when timer's paused)
        this.currentRepetition = 0; //which repetition is in progress for a timed step
        this.padTwoDigits = util_1.padTwoDigits;
    }
    /* Initialize timer interval */
    StepComponent.prototype.ngOnInit = function () {
        this.minutes = this.step.minutes;
        this.seconds = this.step.seconds;
    };
    /* Turn off vibration/alarm tones when the user navigates away from the page */
    StepComponent.prototype.ngOnDestroy = function () {
        this.audioService.stopAlarm();
    };
    /* Called when the timer's time is up */
    StepComponent.prototype.handleTimerEnd = function () {
        //keep the timer from "ticking" any longer
        this.stopTimer();
        //play the alarm (if the user wants an alarm)
        this.audioService.playAlarm();
        //send a notification if the user has left the app or their display
        //is off, and they want notifications
        this.notificationService.makeNotification(this.step.name);
        //used to control the UI components
        this.alarmOn = true;
    };
    /* Decrements the timer by a second */
    StepComponent.prototype.updateClock = function () {
        this.seconds -= 1;
        //if time is up
        if (this.seconds === 0 && this.minutes === 0) {
            this.handleTimerEnd();
        }
        else if (this.seconds < 0) {
            this.minutes -= 1;
            this.seconds = 59;
        }
    };
    /* Creates an interval that decrements the clock each second */
    StepComponent.prototype.createInterval = function () {
        var _this = this;
        this.interval = setInterval(function () { _this.updateClock(); }, 1000);
    };
    /* Returns true if the timer has previously gone down to 0 and
    not yet been reset. */
    StepComponent.prototype.isOutOfTime = function () {
        return (this.minutes === 0 && this.seconds === 0);
    };
    /* Halts the timer */
    StepComponent.prototype.stopTimer = function () {
        //clear the interval that decrements the timer
        clearInterval(this.interval);
        this.timerOn = false;
    };
    /* Halts the alarm so it doesn't play anymore */
    StepComponent.prototype.stopAlarm = function () {
        this.audioService.stopAlarm();
        this.alarmOn = false;
    };
    /* Begins the timer if it's not already going */
    StepComponent.prototype.startTimer = function () {
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
    };
    /* Pauses the timer */
    StepComponent.prototype.pauseTimer = function () {
        if (!this.timerOn) {
            return;
        }
        this.paused = true;
        this.stopTimer();
    };
    /* Restarts the timer for this step at the top of the clock */
    StepComponent.prototype.resetTimer = function () {
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
    };
    /* Handles both the play and pause features. Basically, if the play button is being displayed,
    it starts the timer, and if the pause button is being displayed, it pauses it. */
    StepComponent.prototype.playPauseBtnAction = function () {
        if (this.timerOn) {
            this.pauseTimer();
        }
        else {
            this.startTimer();
            //if the timer is being restarted from the beginning
            //or after the timer ran out of time
            if (!this.paused) {
                this.currentRepetition++;
            }
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", step_model_1.Step)
    ], StepComponent.prototype, "step", void 0);
    StepComponent = __decorate([
        core_1.Component({
            selector: "tmr-step",
            templateUrl: "pages/step/step.component.html",
            styleUrls: ["pages/step/step.component.css"]
        })
        /* Represents a step in the page that displays a task and its
        associated steps, timers, etc. */
        ,
        __metadata("design:paramtypes", [page_1.Page, audio_service_1.AudioService,
            notification_service_1.NotificationService])
    ], StepComponent);
    return StepComponent;
}());
exports.StepComponent = StepComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGVwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRTtBQUVwRSxpREFBZ0Q7QUFDaEQsMkRBQW9EO0FBQ3BELG1DQUEwQztBQUMxQyw0REFBMEQ7QUFDMUQsc0VBQW9FO0FBVXBFO0lBYUksdUJBQW9CLElBQVUsRUFBVSxZQUEwQixFQUN0RCxtQkFBd0M7UUFEaEMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQ3RELHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFScEQsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsbUVBQW1FO1FBQ25FLG9DQUFvQztRQUNwRCxzQkFBaUIsR0FBVyxDQUFDLENBQUMsQ0FBQyxrREFBa0Q7UUFDakYsaUJBQVksR0FBRyxtQkFBWSxDQUFDO0lBTTVCLENBQUM7SUFFRCwrQkFBK0I7SUFDL0IsZ0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUNyQyxDQUFDO0lBRUQsK0VBQStFO0lBQy9FLG1DQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRCx3Q0FBd0M7SUFDeEMsc0NBQWMsR0FBZDtRQUNJLDBDQUEwQztRQUMxQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsNkNBQTZDO1FBQzdDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDOUIsbUVBQW1FO1FBQ25FLHFDQUFxQztRQUNyQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMs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bnQsIElucHV0LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XG5pbXBvcnQgeyBTdGVwIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9zdGVwL3N0ZXAubW9kZWxcIjtcbmltcG9ydCB7IHBhZFR3b0RpZ2l0cyB9IGZyb20gXCIuLi8uLi91dGlsXCI7XG5pbXBvcnQgeyBBdWRpb1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2F1ZGlvLnNlcnZpY2VcIjtcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvbm90aWZpY2F0aW9uLnNlcnZpY2VcIjtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJ0bXItc3RlcFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcInBhZ2VzL3N0ZXAvc3RlcC5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wicGFnZXMvc3RlcC9zdGVwLmNvbXBvbmVudC5jc3NcIl1cbn0pXG4vKiBSZXByZXNlbnRzIGEgc3RlcCBpbiB0aGUgcGFnZSB0aGF0IGRpc3BsYXlzIGEgdGFzayBhbmQgaXRzXG5hc3NvY2lhdGVkIHN0ZXBzLCB0aW1lcnMsIGV0Yy4gKi9cbmV4cG9ydCBjbGFzcyBTdGVwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgc3RlcDogU3RlcDsgLy9pbnB1dCBmcm9tIHBhcmVudCBjb21wb25lbnRcbiAgICBpbnRlcnZhbDogbnVtYmVyOyAvL2FuIElEIGZvciBhIEpTIGludGVydmFsXG4gICAgc2Vjb25kczogbnVtYmVyOyAvL2EgY29weSBvZiBzdGVwLnNlY29uZHMgdGhhdCdzIGxvd2VyZWQgYXMgdGltZSBwYXNzZXNcbiAgICBtaW51dGVzOiBudW1iZXI7IC8vYSBjb3B5IG9mIHN0ZXAubWludXRlcyB0aGF0J3MgbG93ZXJlZCBhcyB0aW1lIHBhc3Nlc1xuICAgIHRpbWVyT24gPSBmYWxzZTtcbiAgICBwYXVzZWQgPSBmYWxzZTsgLy93aGV0aGVyIHRoZSB0aW1lciBpcyBwYXVzZWQgbWlkLXRpbWluZyAoc28gdGhlIHJlc2V0IGJ1dHRvbiBrbm93c1xuICAgICAgICAgICAgICAgICAgICAvL3RvIGJlIHZpc2libGUgd2hlbiB0aW1lcidzIHBhdXNlZClcbiAgICBjdXJyZW50UmVwZXRpdGlvbjogbnVtYmVyID0gMDsgLy93aGljaCByZXBldGl0aW9uIGlzIGluIHByb2dyZXNzIGZvciBhIHRpbWVkIHN0ZXBcbiAgICBwYWRUd29EaWdpdHMgPSBwYWRUd29EaWdpdHM7XG4gICAgYWxhcm1PbjogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBhdWRpb1NlcnZpY2U6IEF1ZGlvU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlKSB7XG4gICAgICAgIFxuICAgIH1cblxuICAgIC8qIEluaXRpYWxpemUgdGltZXIgaW50ZXJ2YWwgKi9cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5taW51dGVzID0gdGhpcy5zdGVwLm1pbnV0ZXM7XG4gICAgICAgIHRoaXMuc2Vjb25kcyA9IHRoaXMuc3RlcC5zZWNvbmRzO1xuICAgIH1cblxuICAgIC8qIFR1cm4gb2ZmIHZpYnJhdGlvbi9hbGFybSB0b25lcyB3aGVuIHRoZSB1c2VyIG5hdmlnYXRlcyBhd2F5IGZyb20gdGhlIHBhZ2UgKi9cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5hdWRpb1NlcnZpY2Uuc3RvcEFsYXJtKCk7XG4gICAgfVxuXG4gICAgLyogQ2FsbGVkIHdoZW4gdGhlIHRpbWVyJ3MgdGltZSBpcyB1cCAqL1xuICAgIGhhbmRsZVRpbWVyRW5kKCkge1xuICAgICAgICAvL2tlZXAgdGhlIHRpbWVyIGZyb20gXCJ0aWNraW5nXCIgYW55IGxvbmdlclxuICAgICAgICB0aGlzLnN0b3BUaW1lcigpO1xuICAgICAgICAvL3BsYXkgdGhlIGFsYXJtIChpZiB0aGUgdXNlciB3YW50cyBhbiBhbGFybSlcbiAgICAgICAgdGhpcy5hdWRpb1NlcnZpY2UucGxheUFsYXJtKCk7XG4gICAgICAgIC8vc2VuZCBhIG5vdGlmaWNhdGlvbiBpZiB0aGUgdXNlciBoYXMgbGVmdCB0aGUgYXBwIG9yIHRoZWlyIGRpc3BsYXlcbiAgICAgICAgLy9pcyBvZmYsIGFuZCB0aGV5IHdhbnQgbm90aWZpY2F0aW9uc1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UubWFrZU5vdGlmaWNhdGlvbih0aGlzLnN0ZXAubmFtZSk7XG4gICAgICAgIC8vdXNlZCB0byBjb250cm9sIHRoZSBVSSBjb21wb25lbnRzXG4gICAgICAgIHRoaXMuYWxhcm1PbiA9IHRydWU7XG4gICAgfVxuXG4gICAgLyogRGVjcmVtZW50cyB0aGUgdGltZXIgYnkgYSBzZWNvbmQgKi9cbiAgICB1cGRhdGVDbG9jaygpIHtcbiAgICAgICAgdGhpcy5zZWNvbmRzIC09IDE7XG4gICAgICAgIC8vaWYgdGltZSBpcyB1cFxuICAgICAgICBpZiAodGhpcy5zZWNvbmRzID09PSAwICYmIHRoaXMubWludXRlcyA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVUaW1lckVuZCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vaWYgdGhlIGVuZCBvZiBhIG1pbnV0ZSAob3RoZXIgdGhhbiB0aGUgbGFzdCBtaW51dGUpIHdhcyByZWFjaGVkXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc2Vjb25kcyA8IDApIHtcbiAgICAgICAgICAgIHRoaXMubWludXRlcyAtPSAxO1xuICAgICAgICAgICAgdGhpcy5zZWNvbmRzID0gNTk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBDcmVhdGVzIGFuIGludGVydmFsIHRoYXQgZGVjcmVtZW50cyB0aGUgY2xvY2sgZWFjaCBzZWNvbmQgKi9cbiAgICBjcmVhdGVJbnRlcnZhbCgpIHtcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHsgdGhpcy51cGRhdGVDbG9jaygpIH0sIDEwMDApO1xuICAgIH1cblxuICAgIC8qIFJldHVybnMgdHJ1ZSBpZiB0aGUgdGltZXIgaGFzIHByZXZpb3VzbHkgZ29uZSBkb3duIHRvIDAgYW5kXG4gICAgbm90IHlldCBiZWVuIHJlc2V0LiAqL1xuICAgIGlzT3V0T2ZUaW1lKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMubWludXRlcyA9PT0gMCAmJiB0aGlzLnNlY29uZHMgPT09IDApO1xuICAgIH1cblxuICAgIC8qIEhhbHRzIHRoZSB0aW1lciAqL1xuICAgIHN0b3BUaW1lcigpIHtcbiAgICAgICAgLy9jbGVhciB0aGUgaW50ZXJ2YWwgdGhhdCBkZWNyZW1lbnRzIHRoZSB0aW1lclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLnRpbWVyT24gPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKiBIYWx0cyB0aGUgYWxhcm0gc28gaXQgZG9lc24ndCBwbGF5IGFueW1vcmUgKi9cbiAgICBzdG9wQWxhcm0oKSB7XG4gICAgICAgIHRoaXMuYXVkaW9TZXJ2aWNlLnN0b3BBbGFybSgpO1xuICAgICAgICB0aGlzLmFsYXJtT24gPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKiBCZWdpbnMgdGhlIHRpbWVyIGlmIGl0J3Mgbm90IGFscmVhZHkgZ29pbmcgKi9cbiAgICBzdGFydFRpbWVyKCkge1xuICAgICAgICBpZiAodGhpcy50aW1lck9uKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgLy90dXJuIGFueSBwcmV2aW91cyBhbGFybXMgb2ZmLS10aGUgdXNlciB3b3VsZCBoYXZlIG5vdGljZWQgdGhlbSBhbHJlYWR5XG4gICAgICAgIC8vYW5kIG1heSBiZSB1c2luZyB0aGlzIHRvIHJlc3RhcnQgYSB0aW1lciB0aGF0IHJhbiB0byBjb21wbGV0aW9uXG4gICAgICAgIHRoaXMuc3RvcEFsYXJtKCk7XG4gICAgICAgIC8vaWYgdGhlIHRpbWVyIHByZXZpb3VzbHkgcmFuIHRvIGNvbXBsZXRpb25cbiAgICAgICAgaWYgKHRoaXMuaXNPdXRPZlRpbWUoKSkge1xuICAgICAgICAgICAgLy9yZXNldCB0aGUgdGltZXIgc28gaXQgY2FuIHN0YXJ0IGZyb20gdGhlIGJlZ2lubmluZ1xuICAgICAgICAgICAgdGhpcy5taW51dGVzID0gdGhpcy5zdGVwLm1pbnV0ZXM7XG4gICAgICAgICAgICB0aGlzLnNlY29uZHMgPSB0aGlzLnN0ZXAuc2Vjb25kcztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRpbWVyT24gPSB0cnVlO1xuICAgICAgICAvL2NyZWF0ZSBhbiBpbnRlcnZhbCB0aGF0IGRlY3JlbWVudHMgdGhlIHRpbWVyXG4gICAgICAgIHRoaXMuY3JlYXRlSW50ZXJ2YWwoKTtcbiAgICB9XG5cbiAgICAvKiBQYXVzZXMgdGhlIHRpbWVyICovXG4gICAgcGF1c2VUaW1lcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRpbWVyT24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhdXNlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XG4gICAgfVxuXG4gICAgLyogUmVzdGFydHMgdGhlIHRpbWVyIGZvciB0aGlzIHN0ZXAgYXQgdGhlIHRvcCBvZiB0aGUgY2xvY2sgKi9cbiAgICByZXNldFRpbWVyKCkge1xuICAgICAgICAvL2lmIHRoZSB0aW1lcidzIGFscmVhZHkgZ29pbmcgYW5kIHRoZSB1c2VyIGlzIHJlc3RhcnRpbmcgaXQgYXMgaXQgZ29lc1xuICAgICAgICBpZiAodGhpcy50aW1lck9uKSB7XG4gICAgICAgICAgICAvL21ha2Ugc3VyZSBpdCBjb3VudHMgZG93biBmcm9tIHRoZSB0b3Agb2YgdGhlIGZpcnN0IHNlY29uZCBpbnN0ZWFkIG9mIHdoZXJlIHRoZVxuICAgICAgICAgICAgLy9jdXJyZW50IGludGVydmFsIHdvdWxkIGNvdW50IGZyb20uXG4gICAgICAgICAgICAvL090aGVyd2lzZSB0aGUgZmlyc3Qgc2Vjb25kIG1pZ2h0IGJlIHRoZXJlIGZvciwgc2F5LCAwLjIgc2Vjb25kcywgc28gdGhlIHRpbWUncyBvZmZcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUludGVydmFsKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXVzZWQgPSBmYWxzZTsgLy9zaW5jZSB0ZWNobmljYWxseSBpdCdzIG5vdCBzdXNwZW5kZWQgbWlkLXRpY2suIEhlbHBzIGNvbnRyb2wgdGhlIFVJXG4gICAgICAgIC8vaWYgdGhlIGFsYXJtIHRvbmUvdmlicmF0aW9uIHdhcyBnb2luZyBvZmYsIGdldCByaWQgb2YgaXRcbiAgICAgICAgdGhpcy5zdG9wQWxhcm0oKTtcbiAgICAgICAgdGhpcy5taW51dGVzID0gdGhpcy5zdGVwLm1pbnV0ZXM7XG4gICAgICAgIHRoaXMuc2Vjb25kcyA9IHRoaXMuc3RlcC5zZWNvbmRzO1xuICAgIH1cblxuICAgIC8qIEhhbmRsZXMgYm90aCB0aGUgcGxheSBhbmQgcGF1c2UgZmVhdHVyZXMuIEJhc2ljYWxseSwgaWYgdGhlIHBsYXkgYnV0dG9uIGlzIGJlaW5nIGRpc3BsYXllZCxcbiAgICBpdCBzdGFydHMgdGhlIHRpbWVyLCBhbmQgaWYgdGhlIHBhdXNlIGJ1dHRvbiBpcyBiZWluZyBkaXNwbGF5ZWQsIGl0IHBhdXNlcyBpdC4gKi9cbiAgICBwbGF5UGF1c2VCdG5BY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVyT24pIHtcbiAgICAgICAgICAgIHRoaXMucGF1c2VUaW1lcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdGFydFRpbWVyKCk7XG4gICAgICAgICAgICAvL2lmIHRoZSB0aW1lciBpcyBiZWluZyByZXN0YXJ0ZWQgZnJvbSB0aGUgYmVnaW5uaW5nXG4gICAgICAgICAgICAvL29yIGFmdGVyIHRoZSB0aW1lciByYW4gb3V0IG9mIHRpbWVcbiAgICAgICAgICAgIGlmICghdGhpcy5wYXVzZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRSZXBldGl0aW9uKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==