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
    /*  */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGVwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRTtBQUVwRSxpREFBZ0Q7QUFDaEQsMkRBQW9EO0FBQ3BELG1DQUEwQztBQUMxQyw0REFBMEQ7QUFDMUQsc0VBQW9FO0FBVXBFO0lBWUksdUJBQW9CLElBQVUsRUFBVSxZQUEwQixFQUN0RCxtQkFBd0M7UUFEaEMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQ3RELHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFQcEQsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsbUVBQW1FO1FBQ25FLG9DQUFvQztRQUNwRCxpQkFBWSxHQUFHLG1CQUFZLENBQUM7SUFNNUIsQ0FBQztJQUVELCtCQUErQjtJQUMvQixnQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3JDLENBQUM7SUFFRCwrRUFBK0U7SUFDL0UsbUNBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVELHdDQUF3QztJQUN4QyxzQ0FBYyxHQUFkO1FBQ0ksMENBQTBDO1FBQzFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQiw2Q0FBNkM7UUFDN0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM5QixtRUFBbUU7UUFDbkUscUNBQXFDO1FBQ3JDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFE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QUMsY0FBYyxFQUFFLENBQUM7UUFDMUIsQ0FBQztRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMscUVBQXFFO1FBQzFGLDBEQUEwRDtRQUMxRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3JDLENBQUM7SUFFRDtxRkFDaUY7SUFDakYsMENBQWtCLEdBQWxCO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdEIsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3RCLENBQUM7SUFDTCxDQUFDO0lBcElRO1FBQVIsWUFBSyxFQUFFO2tDQUFPLGlCQUFJOytDQUFDO0lBRlgsYUFBYTtRQVB6QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsV0FBVyxFQUFFLGdDQUFnQztZQUM3QyxTQUFTLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztTQUMvQyxDQUFDO1FBQ0Y7eUNBQ2lDOzt5Q0FhSCxXQUFJLEVBQXdCLDRCQUFZO1lBQ2pDLDBDQUFtQjtPQWIzQyxhQUFhLENBd0l6QjtJQUFELG9CQUFDO0NBQUEsQUF4SUQsSUF3SUM7QUF4SVksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XG5pbXBvcnQgeyBTdGVwIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9zdGVwL3N0ZXAubW9kZWxcIjtcbmltcG9ydCB7IHBhZFR3b0RpZ2l0cyB9IGZyb20gXCIuLi8uLi91dGlsXCI7XG5pbXBvcnQgeyBBdWRpb1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2F1ZGlvLnNlcnZpY2VcIjtcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvbm90aWZpY2F0aW9uLnNlcnZpY2VcIjtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJ0bXItc3RlcFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcInBhZ2VzL3N0ZXAvc3RlcC5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wicGFnZXMvc3RlcC9zdGVwLmNvbXBvbmVudC5jc3NcIl1cbn0pXG4vKiBSZXByZXNlbnRzIGEgc3RlcCBpbiB0aGUgcGFnZSB0aGF0IGRpc3BsYXlzIGEgdGFzayBhbmQgaXRzXG5hc3NvY2lhdGVkIHN0ZXBzLCB0aW1lcnMsIGV0Yy4gKi9cbmV4cG9ydCBjbGFzcyBTdGVwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgc3RlcDogU3RlcDsgLy9pbnB1dCBmcm9tIHBhcmVudCBjb21wb25lbnRcbiAgICBpbnRlcnZhbDogbnVtYmVyOyAvL2FuIElEIGZvciBhIEpTIGludGVydmFsXG4gICAgc2Vjb25kczogbnVtYmVyOyAvL2EgY29weSBvZiBzdGVwLnNlY29uZHMgdGhhdCdzIGxvd2VyZWQgYXMgdGltZSBwYXNzZXNcbiAgICBtaW51dGVzOiBudW1iZXI7IC8vYSBjb3B5IG9mIHN0ZXAubWludXRlcyB0aGF0J3MgbG93ZXJlZCBhcyB0aW1lIHBhc3Nlc1xuICAgIHRpbWVyT24gPSBmYWxzZTtcbiAgICBwYXVzZWQgPSBmYWxzZTsgLy93aGV0aGVyIHRoZSB0aW1lciBpcyBwYXVzZWQgbWlkLXRpbWluZyAoc28gdGhlIHJlc2V0IGJ1dHRvbiBrbm93c1xuICAgICAgICAgICAgICAgICAgICAvL3RvIGJlIHZpc2libGUgd2hlbiB0aW1lcidzIHBhdXNlZClcbiAgICBwYWRUd29EaWdpdHMgPSBwYWRUd29EaWdpdHM7XG4gICAgYWxhcm1PbjogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBhdWRpb1NlcnZpY2U6IEF1ZGlvU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlKSB7XG4gICAgICAgIFxuICAgIH1cblxuICAgIC8qIEluaXRpYWxpemUgdGltZXIgaW50ZXJ2YWwgKi9cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5taW51dGVzID0gdGhpcy5zdGVwLm1pbnV0ZXM7XG4gICAgICAgIHRoaXMuc2Vjb25kcyA9IHRoaXMuc3RlcC5zZWNvbmRzO1xuICAgIH1cblxuICAgIC8qIFR1cm4gb2ZmIHZpYnJhdGlvbi9hbGFybSB0b25lcyB3aGVuIHRoZSB1c2VyIG5hdmlnYXRlcyBhd2F5IGZyb20gdGhlIHBhZ2UgKi9cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5hdWRpb1NlcnZpY2Uuc3RvcEFsYXJtKCk7XG4gICAgfVxuXG4gICAgLyogQ2FsbGVkIHdoZW4gdGhlIHRpbWVyJ3MgdGltZSBpcyB1cCAqL1xuICAgIGhhbmRsZVRpbWVyRW5kKCkge1xuICAgICAgICAvL2tlZXAgdGhlIHRpbWVyIGZyb20gXCJ0aWNraW5nXCIgYW55IGxvbmdlclxuICAgICAgICB0aGlzLnN0b3BUaW1lcigpO1xuICAgICAgICAvL3BsYXkgdGhlIGFsYXJtIChpZiB0aGUgdXNlciB3YW50cyBhbiBhbGFybSlcbiAgICAgICAgdGhpcy5hdWRpb1NlcnZpY2UucGxheUFsYXJtKCk7XG4gICAgICAgIC8vc2VuZCBhIG5vdGlmaWNhdGlvbiBpZiB0aGUgdXNlciBoYXMgbGVmdCB0aGUgYXBwIG9yIHRoZWlyIGRpc3BsYXlcbiAgICAgICAgLy9pcyBvZmYsIGFuZCB0aGV5IHdhbnQgbm90aWZpY2F0aW9uc1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UubWFrZU5vdGlmaWNhdGlvbih0aGlzLnN0ZXAubmFtZSk7XG4gICAgICAgIC8vdXNlZCB0byBjb250cm9sIHRoZSBVSSBjb21wb25lbnRzXG4gICAgICAgIHRoaXMuYWxhcm1PbiA9IHRydWU7XG4gICAgfVxuXG4gICAgLyogRGVjcmVtZW50cyB0aGUgdGltZXIgYnkgYSBzZWNvbmQgKi9cbiAgICB1cGRhdGVDbG9jaygpIHtcbiAgICAgICAgdGhpcy5zZWNvbmRzIC09IDE7XG4gICAgICAgIC8vaWYgdGltZSBpcyB1cFxuICAgICAgICBpZiAodGhpcy5zZWNvbmRzID09PSAwICYmIHRoaXMubWludXRlcyA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVUaW1lckVuZCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vaWYgdGhlIGVuZCBvZiBhIG1pbnV0ZSAob3RoZXIgdGhhbiB0aGUgbGFzdCBtaW51dGUpIHdhcyByZWFjaGVkXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc2Vjb25kcyA8IDApIHtcbiAgICAgICAgICAgIHRoaXMubWludXRlcyAtPSAxO1xuICAgICAgICAgICAgdGhpcy5zZWNvbmRzID0gNTk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBDcmVhdGVzIGFuIGludGVydmFsIHRoYXQgZGVjcmVtZW50cyB0aGUgY2xvY2sgZWFjaCBzZWNvbmQgKi9cbiAgICBjcmVhdGVJbnRlcnZhbCgpIHtcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHsgdGhpcy51cGRhdGVDbG9jaygpIH0sIDEwMDApO1xuICAgIH1cblxuICAgIC8qIFJldHVybnMgdHJ1ZSBpZiB0aGUgdGltZXIgaGFzIHByZXZpb3VzbHkgZ29uZSBkb3duIHRvIDAgYW5kXG4gICAgbm90IHlldCBiZWVuIHJlc2V0LiAqL1xuICAgIGlzT3V0T2ZUaW1lKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMubWludXRlcyA9PT0gMCAmJiB0aGlzLnNlY29uZHMgPT09IDApO1xuICAgIH1cblxuICAgIC8qIEhhbHRzIHRoZSB0aW1lciAqL1xuICAgIHN0b3BUaW1lcigpIHtcbiAgICAgICAgLy9jbGVhciB0aGUgaW50ZXJ2YWwgdGhhdCBkZWNyZW1lbnRzIHRoZSB0aW1lclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLnRpbWVyT24gPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKiBIYWx0cyB0aGUgYWxhcm0gc28gaXQgZG9lc24ndCBwbGF5IGFueW1vcmUgKi9cbiAgICBzdG9wQWxhcm0oKSB7XG4gICAgICAgIHRoaXMuYXVkaW9TZXJ2aWNlLnN0b3BBbGFybSgpO1xuICAgICAgICB0aGlzLmFsYXJtT24gPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKiBCZWdpbnMgdGhlIHRpbWVyIGlmIGl0J3Mgbm90IGFscmVhZHkgZ29pbmcgKi9cbiAgICBzdGFydFRpbWVyKCkge1xuICAgICAgICBpZiAodGhpcy50aW1lck9uKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgLy90dXJuIGFueSBwcmV2aW91cyBhbGFybXMgb2ZmLS10aGUgdXNlciB3b3VsZCBoYXZlIG5vdGljZWQgdGhlbSBhbHJlYWR5XG4gICAgICAgIC8vYW5kIG1heSBiZSB1c2luZyB0aGlzIHRvIHJlc3RhcnQgYSB0aW1lciB0aGF0IHJhbiB0byBjb21wbGV0aW9uXG4gICAgICAgIHRoaXMuc3RvcEFsYXJtKCk7XG4gICAgICAgIC8vaWYgdGhlIHRpbWVyIHByZXZpb3VzbHkgcmFuIHRvIGNvbXBsZXRpb25cbiAgICAgICAgaWYgKHRoaXMuaXNPdXRPZlRpbWUoKSkge1xuICAgICAgICAgICAgLy9yZXNldCB0aGUgdGltZXIgc28gaXQgY2FuIHN0YXJ0IGZyb20gdGhlIGJlZ2lubmluZ1xuICAgICAgICAgICAgdGhpcy5taW51dGVzID0gdGhpcy5zdGVwLm1pbnV0ZXM7XG4gICAgICAgICAgICB0aGlzLnNlY29uZHMgPSB0aGlzLnN0ZXAuc2Vjb25kcztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRpbWVyT24gPSB0cnVlO1xuICAgICAgICAvL2NyZWF0ZSBhbiBpbnRlcnZhbCB0aGF0IGRlY3JlbWVudHMgdGhlIHRpbWVyXG4gICAgICAgIHRoaXMuY3JlYXRlSW50ZXJ2YWwoKTtcbiAgICB9XG5cbiAgICAvKiBQYXVzZXMgdGhlIHRpbWVyICovXG4gICAgcGF1c2VUaW1lcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRpbWVyT24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhdXNlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XG4gICAgfVxuXG4gICAgLyogICovXG4gICAgcmVzZXRUaW1lcigpIHtcbiAgICAgICAgLy9pZiB0aGUgdGltZXIncyBhbHJlYWR5IGdvaW5nIGFuZCB0aGUgdXNlciBpcyByZXN0YXJ0aW5nIGl0IGFzIGl0IGdvZXNcbiAgICAgICAgaWYgKHRoaXMudGltZXJPbikge1xuICAgICAgICAgICAgLy9tYWtlIHN1cmUgaXQgY291bnRzIGRvd24gZnJvbSB0aGUgdG9wIG9mIHRoZSBmaXJzdCBzZWNvbmQgaW5zdGVhZCBvZiB3aGVyZSB0aGVcbiAgICAgICAgICAgIC8vY3VycmVudCBpbnRlcnZhbCB3b3VsZCBjb3VudCBmcm9tLlxuICAgICAgICAgICAgLy9PdGhlcndpc2UgdGhlIGZpcnN0IHNlY29uZCBtaWdodCBiZSB0aGVyZSBmb3IsIHNheSwgMC4yIHNlY29uZHMsIHNvIHRoZSB0aW1lJ3Mgb2ZmXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVJbnRlcnZhbCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGF1c2VkID0gZmFsc2U7IC8vc2luY2UgdGVjaG5pY2FsbHkgaXQncyBub3Qgc3VzcGVuZGVkIG1pZC10aWNrLiBIZWxwcyBjb250cm9sIHRoZSBVSVxuICAgICAgICAvL2lmIHRoZSBhbGFybSB0b25lL3ZpYnJhdGlvbiB3YXMgZ29pbmcgb2ZmLCBnZXQgcmlkIG9mIGl0XG4gICAgICAgIHRoaXMuc3RvcEFsYXJtKCk7XG4gICAgICAgIHRoaXMubWludXRlcyA9IHRoaXMuc3RlcC5taW51dGVzO1xuICAgICAgICB0aGlzLnNlY29uZHMgPSB0aGlzLnN0ZXAuc2Vjb25kcztcbiAgICB9XG5cbiAgICAvKiBIYW5kbGVzIGJvdGggdGhlIHBsYXkgYW5kIHBhdXNlIGZlYXR1cmVzLiBCYXNpY2FsbHksIGlmIHRoZSBwbGF5IGJ1dHRvbiBpcyBiZWluZyBkaXNwbGF5ZWQsXG4gICAgaXQgc3RhcnRzIHRoZSB0aW1lciwgYW5kIGlmIHRoZSBwYXVzZSBidXR0b24gaXMgYmVpbmcgZGlzcGxheWVkLCBpdCBwYXVzZXMgaXQuICovXG4gICAgcGxheVBhdXNlQnRuQWN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy50aW1lck9uKSB7XG4gICAgICAgICAgICB0aGlzLnBhdXNlVGltZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUaW1lcigpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=