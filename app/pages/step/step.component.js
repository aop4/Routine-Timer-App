"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page");
var step_model_1 = require("../../shared/step/step.model");
var util_1 = require("../../util");
var audio_service_1 = require("../../shared/audio.service");
var notification_service_1 = require("~/shared/notification.service");
var task_model_1 = require("~/shared/task/task.model");
var pass_data_service_1 = require("~/shared/pass-data.service");
var StepComponent = /** @class */ (function () {
    function StepComponent(page, audioService, notificationService, dataRetriever) {
        this.page = page;
        this.audioService = audioService;
        this.notificationService = notificationService;
        this.dataRetriever = dataRetriever;
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
        // update alarm settings in case user just changed them
        this.notificationService.refreshSettings();
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
        this.scheduleNotification();
    };
    /* Schedule a notification to go off when the timer is up. */
    StepComponent.prototype.scheduleNotification = function () {
        this.notificationService.scheduleNotification(this.parentTask, this.step, this.index, this.minutes, this.seconds);
    };
    /* Pauses the timer */
    StepComponent.prototype.pauseTimer = function () {
        if (!this.timerOn) {
            return;
        }
        this.paused = true;
        this.stopTimer();
        this.notificationService.cancelNotificationFor(this.parentTask, this.index);
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
        this.scheduleNotification(); //schedule (or reschedule) the notification
    };
    /* Handles both the play and pause features. Basically, if the play button is being displayed,
    it starts the timer, and if the pause button is being displayed, it pauses it. */
    StepComponent.prototype.playPauseBtnAction = function () {
        if (this.timerOn) {
            this.pauseTimer();
        }
        else {
            //if the timer is being restarted from the beginning
            //or after the timer ran out of time
            if (!this.paused) {
                this.currentRepetition++;
            }
            this.startTimer();
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", step_model_1.Step)
    ], StepComponent.prototype, "step", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", task_model_1.Task)
    ], StepComponent.prototype, "parentTask", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], StepComponent.prototype, "index", void 0);
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
            notification_service_1.NotificationService,
            pass_data_service_1.DataRetriever])
    ], StepComponent);
    return StepComponent;
}());
exports.StepComponent = StepComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGVwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRTtBQUVwRSxpREFBZ0Q7QUFDaEQsMkRBQW9EO0FBQ3BELG1DQUEwQztBQUMxQyw0REFBMEQ7QUFDMUQsc0VBQW9FO0FBQ3BFLHVEQUFnRDtBQUNoRCxnRUFBMkQ7QUFVM0Q7SUFlSSx1QkFBb0IsSUFBVSxFQUFVLFlBQTBCLEVBQ3RELG1CQUF3QyxFQUN4QyxhQUE0QjtRQUZwQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDdEQsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQVR4QyxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFdBQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxtRUFBbUU7UUFDbkUsb0NBQW9DO1FBQ3BELHNCQUFpQixHQUFXLENBQUMsQ0FBQyxDQUFDLGtEQUFrRDtRQUNqRixpQkFBWSxHQUFHLG1CQUFZLENBQUM7SUFPNUIsQ0FBQztJQUVELCtCQUErQjtJQUMvQixnQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ2pDLHVEQUF1RDtRQUN2RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVELCtFQUErRTtJQUMvRSxtQ0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsd0NBQXdDO0lBQ3hDLHNDQUFjLEdBQWQ7UUFDSSwwQ0FBMEM7UUFDMUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFD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QixFQUFFLENBQUM7WUFDN0IsQ0FBQztZQUNELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QixDQUFDO0lBQ0wsQ0FBQztJQXJKUTtRQUFSLFlBQUssRUFBRTtrQ0FBTyxpQkFBSTsrQ0FBQztJQUNYO1FBQVIsWUFBSyxFQUFFO2tDQUFhLGlCQUFJO3FEQUFDO0lBQ2pCO1FBQVIsWUFBSyxFQUFFOztnREFBZTtJQUpkLGFBQWE7UUFQekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSxnQ0FBZ0M7WUFDN0MsU0FBUyxFQUFFLENBQUMsK0JBQStCLENBQUM7U0FDL0MsQ0FBQztRQUNGO3lDQUNpQzs7eUNBZ0JILFdBQUksRUFBd0IsNEJBQVk7WUFDakMsMENBQW1CO1lBQ3pCLGlDQUFhO09BakIvQixhQUFhLENBeUp6QjtJQUFELG9CQUFDO0NBQUEsQUF6SkQsSUF5SkM7QUF6Slksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XG5pbXBvcnQgeyBTdGVwIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9zdGVwL3N0ZXAubW9kZWxcIjtcbmltcG9ydCB7IHBhZFR3b0RpZ2l0cyB9IGZyb20gXCIuLi8uLi91dGlsXCI7XG5pbXBvcnQgeyBBdWRpb1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2F1ZGlvLnNlcnZpY2VcIjtcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvbm90aWZpY2F0aW9uLnNlcnZpY2VcIjtcbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwifi9zaGFyZWQvdGFzay90YXNrLm1vZGVsXCI7XG5pbXBvcnQgeyBEYXRhUmV0cmlldmVyIH0gZnJvbSBcIn4vc2hhcmVkL3Bhc3MtZGF0YS5zZXJ2aWNlXCI7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwidG1yLXN0ZXBcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJwYWdlcy9zdGVwL3N0ZXAuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcInBhZ2VzL3N0ZXAvc3RlcC5jb21wb25lbnQuY3NzXCJdXG59KVxuLyogUmVwcmVzZW50cyBhIHN0ZXAgaW4gdGhlIHBhZ2UgdGhhdCBkaXNwbGF5cyBhIHRhc2sgYW5kIGl0c1xuYXNzb2NpYXRlZCBzdGVwcywgdGltZXJzLCBldGMuICovXG5leHBvcnQgY2xhc3MgU3RlcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIHN0ZXA6IFN0ZXA7IC8vaW5wdXQgZnJvbSBwYXJlbnQgY29tcG9uZW50XG4gICAgQElucHV0KCkgcGFyZW50VGFzazogVGFzazsgLy90aGUgc3RlcCdzIHBhcmVudCB0YXNrIG9iamVjdFxuICAgIEBJbnB1dCgpIGluZGV4OiBudW1iZXI7IC8vdGhlIHN0ZXAncyBpbmRleCBpbiBpdHMgcGFyZW50IHRhc2sncyBhcnJheVxuICAgIGludGVydmFsOiBudW1iZXI7IC8vYW4gSUQgZm9yIGEgSlMgaW50ZXJ2YWxcbiAgICBzZWNvbmRzOiBudW1iZXI7IC8vYSBjb3B5IG9mIHN0ZXAuc2Vjb25kcyB0aGF0J3MgbG93ZXJlZCBhcyB0aW1lIHBhc3Nlc1xuICAgIG1pbnV0ZXM6IG51bWJlcjsgLy9hIGNvcHkgb2Ygc3RlcC5taW51dGVzIHRoYXQncyBsb3dlcmVkIGFzIHRpbWUgcGFzc2VzXG4gICAgdGltZXJPbiA9IGZhbHNlO1xuICAgIHBhdXNlZCA9IGZhbHNlOyAvL3doZXRoZXIgdGhlIHRpbWVyIGlzIHBhdXNlZCBtaWQtdGltaW5nIChzbyB0aGUgcmVzZXQgYnV0dG9uIGtub3dzXG4gICAgICAgICAgICAgICAgICAgIC8vdG8gYmUgdmlzaWJsZSB3aGVuIHRpbWVyJ3MgcGF1c2VkKVxuICAgIGN1cnJlbnRSZXBldGl0aW9uOiBudW1iZXIgPSAwOyAvL3doaWNoIHJlcGV0aXRpb24gaXMgaW4gcHJvZ3Jlc3MgZm9yIGEgdGltZWQgc3RlcFxuICAgIHBhZFR3b0RpZ2l0cyA9IHBhZFR3b0RpZ2l0cztcbiAgICBhbGFybU9uOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIGF1ZGlvU2VydmljZTogQXVkaW9TZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZGF0YVJldHJpZXZlcjogRGF0YVJldHJpZXZlcikge1xuICAgICAgICBcbiAgICB9XG5cbiAgICAvKiBJbml0aWFsaXplIHRpbWVyIGludGVydmFsICovXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMubWludXRlcyA9IHRoaXMuc3RlcC5taW51dGVzO1xuICAgICAgICB0aGlzLnNlY29uZHMgPSB0aGlzLnN0ZXAuc2Vjb25kcztcbiAgICAgICAgLy8gdXBkYXRlIGFsYXJtIHNldHRpbmdzIGluIGNhc2UgdXNlciBqdXN0IGNoYW5nZWQgdGhlbVxuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UucmVmcmVzaFNldHRpbmdzKCk7XG4gICAgfVxuXG4gICAgLyogVHVybiBvZmYgdmlicmF0aW9uL2FsYXJtIHRvbmVzIHdoZW4gdGhlIHVzZXIgbmF2aWdhdGVzIGF3YXkgZnJvbSB0aGUgcGFnZSAqL1xuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmF1ZGlvU2VydmljZS5zdG9wQWxhcm0oKTtcbiAgICB9XG5cbiAgICAvKiBDYWxsZWQgd2hlbiB0aGUgdGltZXIncyB0aW1lIGlzIHVwICovXG4gICAgaGFuZGxlVGltZXJFbmQoKSB7XG4gICAgICAgIC8va2VlcCB0aGUgdGltZXIgZnJvbSBcInRpY2tpbmdcIiBhbnkgbG9uZ2VyXG4gICAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XG4gICAgICAgIC8vcGxheSB0aGUgYWxhcm0gKGlmIHRoZSB1c2VyIHdhbnRzIGFuIGFsYXJtKVxuICAgICAgICB0aGlzLmF1ZGlvU2VydmljZS5wbGF5QWxhcm0oKTtcbiAgICAgICAgLy91c2VkIHRvIGNvbnRyb2wgdGhlIFVJIGNvbXBvbmVudHNcbiAgICAgICAgdGhpcy5hbGFybU9uID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKiBEZWNyZW1lbnRzIHRoZSB0aW1lciBieSBhIHNlY29uZCAqL1xuICAgIHVwZGF0ZUNsb2NrKCkge1xuICAgICAgICB0aGlzLnNlY29uZHMgLT0gMTtcbiAgICAgICAgLy9pZiB0aW1lIGlzIHVwXG4gICAgICAgIGlmICh0aGlzLnNlY29uZHMgPT09IDAgJiYgdGhpcy5taW51dGVzID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVRpbWVyRW5kKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy9pZiB0aGUgZW5kIG9mIGEgbWludXRlIChvdGhlciB0aGFuIHRoZSBsYXN0IG1pbnV0ZSkgd2FzIHJlYWNoZWRcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zZWNvbmRzIDwgMCkge1xuICAgICAgICAgICAgdGhpcy5taW51dGVzIC09IDE7XG4gICAgICAgICAgICB0aGlzLnNlY29uZHMgPSA1OTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qIENyZWF0ZXMgYW4gaW50ZXJ2YWwgdGhhdCBkZWNyZW1lbnRzIHRoZSBjbG9jayBlYWNoIHNlY29uZCAqL1xuICAgIGNyZWF0ZUludGVydmFsKCkge1xuICAgICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4geyB0aGlzLnVwZGF0ZUNsb2NrKCkgfSwgMTAwMCk7XG4gICAgfVxuXG4gICAgLyogUmV0dXJucyB0cnVlIGlmIHRoZSB0aW1lciBoYXMgcHJldmlvdXNseSBnb25lIGRvd24gdG8gMCBhbmRcbiAgICBub3QgeWV0IGJlZW4gcmVzZXQuICovXG4gICAgaXNPdXRPZlRpbWUoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5taW51dGVzID09PSAwICYmIHRoaXMuc2Vjb25kcyA9PT0gMCk7XG4gICAgfVxuXG4gICAgLyogSGFsdHMgdGhlIHRpbWVyICovXG4gICAgc3RvcFRpbWVyKCkge1xuICAgICAgICAvL2NsZWFyIHRoZSBpbnRlcnZhbCB0aGF0IGRlY3JlbWVudHMgdGhlIHRpbWVyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgICAgIHRoaXMudGltZXJPbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qIEhhbHRzIHRoZSBhbGFybSBzbyBpdCBkb2Vzbid0IHBsYXkgYW55bW9yZSAqL1xuICAgIHN0b3BBbGFybSgpIHtcbiAgICAgICAgdGhpcy5hdWRpb1NlcnZpY2Uuc3RvcEFsYXJtKCk7XG4gICAgICAgIHRoaXMuYWxhcm1PbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qIEJlZ2lucyB0aGUgdGltZXIgaWYgaXQncyBub3QgYWxyZWFkeSBnb2luZyAqL1xuICAgIHN0YXJ0VGltZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVyT24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuICAgICAgICAvL3R1cm4gYW55IHByZXZpb3VzIGFsYXJtcyBvZmYtLXRoZSB1c2VyIHdvdWxkIGhhdmUgbm90aWNlZCB0aGVtIGFscmVhZHlcbiAgICAgICAgLy9hbmQgbWF5IGJlIHVzaW5nIHRoaXMgdG8gcmVzdGFydCBhIHRpbWVyIHRoYXQgcmFuIHRvIGNvbXBsZXRpb25cbiAgICAgICAgdGhpcy5zdG9wQWxhcm0oKTtcbiAgICAgICAgLy9pZiB0aGUgdGltZXIgcHJldmlvdXNseSByYW4gdG8gY29tcGxldGlvblxuICAgICAgICBpZiAodGhpcy5pc091dE9mVGltZSgpKSB7XG4gICAgICAgICAgICAvL3Jlc2V0IHRoZSB0aW1lciBzbyBpdCBjYW4gc3RhcnQgZnJvbSB0aGUgYmVnaW5uaW5nXG4gICAgICAgICAgICB0aGlzLm1pbnV0ZXMgPSB0aGlzLnN0ZXAubWludXRlcztcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kcyA9IHRoaXMuc3RlcC5zZWNvbmRzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGltZXJPbiA9IHRydWU7XG4gICAgICAgIC8vY3JlYXRlIGFuIGludGVydmFsIHRoYXQgZGVjcmVtZW50cyB0aGUgdGltZXJcbiAgICAgICAgdGhpcy5jcmVhdGVJbnRlcnZhbCgpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlTm90aWZpY2F0aW9uKCk7XG4gICAgfVxuXG4gICAgLyogU2NoZWR1bGUgYSBub3RpZmljYXRpb24gdG8gZ28gb2ZmIHdoZW4gdGhlIHRpbWVyIGlzIHVwLiAqL1xuICAgIHNjaGVkdWxlTm90aWZpY2F0aW9uKCkge1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc2NoZWR1bGVOb3RpZmljYXRpb24odGhpcy5wYXJlbnRUYXNrLCB0aGlzLnN0ZXAsXG4gICAgICAgICAgICB0aGlzLmluZGV4LCB0aGlzLm1pbnV0ZXMsIHRoaXMuc2Vjb25kcyk7XG4gICAgfVxuXG4gICAgLyogUGF1c2VzIHRoZSB0aW1lciAqL1xuICAgIHBhdXNlVGltZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy50aW1lck9uKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnN0b3BUaW1lcigpO1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuY2FuY2VsTm90aWZpY2F0aW9uRm9yKHRoaXMucGFyZW50VGFzaywgdGhpcy5pbmRleCk7XG4gICAgfVxuXG4gICAgLyogUmVzdGFydHMgdGhlIHRpbWVyIGZvciB0aGlzIHN0ZXAgYXQgdGhlIHRvcCBvZiB0aGUgY2xvY2sgKi9cbiAgICByZXNldFRpbWVyKCkge1xuICAgICAgICAvL2lmIHRoZSB0aW1lcidzIGFscmVhZHkgZ29pbmcgYW5kIHRoZSB1c2VyIGlzIHJlc3RhcnRpbmcgaXQgYXMgaXQgZ29lc1xuICAgICAgICBpZiAodGhpcy50aW1lck9uKSB7XG4gICAgICAgICAgICAvL21ha2Ugc3VyZSBpdCBjb3VudHMgZG93biBmcm9tIHRoZSB0b3Agb2YgdGhlIGZpcnN0IHNlY29uZCBpbnN0ZWFkIG9mIHdoZXJlIHRoZVxuICAgICAgICAgICAgLy9jdXJyZW50IGludGVydmFsIHdvdWxkIGNvdW50IGZyb20uXG4gICAgICAgICAgICAvL090aGVyd2lzZSB0aGUgZmlyc3Qgc2Vjb25kIG1pZ2h0IGJlIHRoZXJlIGZvciwgc2F5LCAwLjIgc2Vjb25kcywgc28gdGhlIHRpbWUncyBvZmZcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUludGVydmFsKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXVzZWQgPSBmYWxzZTsgLy9zaW5jZSB0ZWNobmljYWxseSBpdCdzIG5vdCBzdXNwZW5kZWQgbWlkLXRpY2suIEhlbHBzIGNvbnRyb2wgdGhlIFVJXG4gICAgICAgIC8vaWYgdGhlIGFsYXJtIHRvbmUvdmlicmF0aW9uIHdhcyBnb2luZyBvZmYsIGdldCByaWQgb2YgaXRcbiAgICAgICAgdGhpcy5zdG9wQWxhcm0oKTtcbiAgICAgICAgdGhpcy5taW51dGVzID0gdGhpcy5zdGVwLm1pbnV0ZXM7XG4gICAgICAgIHRoaXMuc2Vjb25kcyA9IHRoaXMuc3RlcC5zZWNvbmRzO1xuICAgICAgICB0aGlzLnNjaGVkdWxlTm90aWZpY2F0aW9uKCk7IC8vc2NoZWR1bGUgKG9yIHJlc2NoZWR1bGUpIHRoZSBub3RpZmljYXRpb25cbiAgICB9XG5cbiAgICAvKiBIYW5kbGVzIGJvdGggdGhlIHBsYXkgYW5kIHBhdXNlIGZlYXR1cmVzLiBCYXNpY2FsbHksIGlmIHRoZSBwbGF5IGJ1dHRvbiBpcyBiZWluZyBkaXNwbGF5ZWQsXG4gICAgaXQgc3RhcnRzIHRoZSB0aW1lciwgYW5kIGlmIHRoZSBwYXVzZSBidXR0b24gaXMgYmVpbmcgZGlzcGxheWVkLCBpdCBwYXVzZXMgaXQuICovXG4gICAgcGxheVBhdXNlQnRuQWN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy50aW1lck9uKSB7XG4gICAgICAgICAgICB0aGlzLnBhdXNlVGltZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vaWYgdGhlIHRpbWVyIGlzIGJlaW5nIHJlc3RhcnRlZCBmcm9tIHRoZSBiZWdpbm5pbmdcbiAgICAgICAgICAgIC8vb3IgYWZ0ZXIgdGhlIHRpbWVyIHJhbiBvdXQgb2YgdGltZVxuICAgICAgICAgICAgaWYgKCF0aGlzLnBhdXNlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFJlcGV0aXRpb24rKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3RhcnRUaW1lcigpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=