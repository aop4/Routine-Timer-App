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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGVwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRTtBQUVwRSxpREFBZ0Q7QUFDaEQsMkRBQW9EO0FBQ3BELG1DQUEwQztBQUMxQyw0REFBMEQ7QUFDMUQsc0VBQW9FO0FBQ3BFLHVEQUFnRDtBQUNoRCxnRUFBMkQ7QUFVM0Q7SUFlSSx1QkFBb0IsSUFBVSxFQUFVLFlBQTBCLEVBQ3RELG1CQUF3QyxFQUN4QyxhQUE0QjtRQUZwQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDdEQsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQVR4QyxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFdBQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxtRUFBbUU7UUFDbkUsb0NBQW9DO1FBQ3BELHNCQUFpQixHQUFXLENBQUMsQ0FBQyxDQUFDLGtEQUFrRDtRQUNqRixpQkFBWSxHQUFHLG1CQUFZLENBQUM7SUFPNUIsQ0FBQztJQUVELCtCQUErQjtJQUMvQixnQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3JDLENBQUM7SUFFRCwrRUFBK0U7SUFDL0UsbUNBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVELHdDQUF3QztJQUN4QyxzQ0FBYyxHQUFkO1FBQ0ksMENBQTBDO1FBQzFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQiw2Q0FBNkM7UUFDN0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztR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Q0wsQ0FBQztJQUNMLENBQUM7SUFuSlE7UUFBUixZQUFLLEVBQUU7a0NBQU8saUJBQUk7K0NBQUM7SUFDWDtRQUFSLFlBQUssRUFBRTtrQ0FBYSxpQkFBSTtxREFBQztJQUNqQjtRQUFSLFlBQUssRUFBRTs7Z0RBQWU7SUFKZCxhQUFhO1FBUHpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsZ0NBQWdDO1lBQzdDLFNBQVMsRUFBRSxDQUFDLCtCQUErQixDQUFDO1NBQy9DLENBQUM7UUFDRjt5Q0FDaUM7O3lDQWdCSCxXQUFJLEVBQXdCLDRCQUFZO1lBQ2pDLDBDQUFtQjtZQUN6QixpQ0FBYTtPQWpCL0IsYUFBYSxDQXVKekI7SUFBRCxvQkFBQztDQUFBLEFBdkpELElBdUpDO0FBdkpZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0IHsgU3RlcCB9IGZyb20gXCIuLi8uLi9zaGFyZWQvc3RlcC9zdGVwLm1vZGVsXCI7XG5pbXBvcnQgeyBwYWRUd29EaWdpdHMgfSBmcm9tIFwiLi4vLi4vdXRpbFwiO1xuaW1wb3J0IHsgQXVkaW9TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9hdWRpby5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL25vdGlmaWNhdGlvbi5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIn4vc2hhcmVkL3Rhc2svdGFzay5tb2RlbFwiO1xuaW1wb3J0IHsgRGF0YVJldHJpZXZlciB9IGZyb20gXCJ+L3NoYXJlZC9wYXNzLWRhdGEuc2VydmljZVwiO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInRtci1zdGVwXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwicGFnZXMvc3RlcC9zdGVwLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJwYWdlcy9zdGVwL3N0ZXAuY29tcG9uZW50LmNzc1wiXVxufSlcbi8qIFJlcHJlc2VudHMgYSBzdGVwIGluIHRoZSBwYWdlIHRoYXQgZGlzcGxheXMgYSB0YXNrIGFuZCBpdHNcbmFzc29jaWF0ZWQgc3RlcHMsIHRpbWVycywgZXRjLiAqL1xuZXhwb3J0IGNsYXNzIFN0ZXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBzdGVwOiBTdGVwOyAvL2lucHV0IGZyb20gcGFyZW50IGNvbXBvbmVudFxuICAgIEBJbnB1dCgpIHBhcmVudFRhc2s6IFRhc2s7IC8vdGhlIHN0ZXAncyBwYXJlbnQgdGFzayBvYmplY3RcbiAgICBASW5wdXQoKSBpbmRleDogbnVtYmVyOyAvL3RoZSBzdGVwJ3MgaW5kZXggaW4gaXRzIHBhcmVudCB0YXNrJ3MgYXJyYXlcbiAgICBpbnRlcnZhbDogbnVtYmVyOyAvL2FuIElEIGZvciBhIEpTIGludGVydmFsXG4gICAgc2Vjb25kczogbnVtYmVyOyAvL2EgY29weSBvZiBzdGVwLnNlY29uZHMgdGhhdCdzIGxvd2VyZWQgYXMgdGltZSBwYXNzZXNcbiAgICBtaW51dGVzOiBudW1iZXI7IC8vYSBjb3B5IG9mIHN0ZXAubWludXRlcyB0aGF0J3MgbG93ZXJlZCBhcyB0aW1lIHBhc3Nlc1xuICAgIHRpbWVyT24gPSBmYWxzZTtcbiAgICBwYXVzZWQgPSBmYWxzZTsgLy93aGV0aGVyIHRoZSB0aW1lciBpcyBwYXVzZWQgbWlkLXRpbWluZyAoc28gdGhlIHJlc2V0IGJ1dHRvbiBrbm93c1xuICAgICAgICAgICAgICAgICAgICAvL3RvIGJlIHZpc2libGUgd2hlbiB0aW1lcidzIHBhdXNlZClcbiAgICBjdXJyZW50UmVwZXRpdGlvbjogbnVtYmVyID0gMDsgLy93aGljaCByZXBldGl0aW9uIGlzIGluIHByb2dyZXNzIGZvciBhIHRpbWVkIHN0ZXBcbiAgICBwYWRUd29EaWdpdHMgPSBwYWRUd29EaWdpdHM7XG4gICAgYWxhcm1PbjogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBhdWRpb1NlcnZpY2U6IEF1ZGlvU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGRhdGFSZXRyaWV2ZXI6IERhdGFSZXRyaWV2ZXIpIHtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgLyogSW5pdGlhbGl6ZSB0aW1lciBpbnRlcnZhbCAqL1xuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLm1pbnV0ZXMgPSB0aGlzLnN0ZXAubWludXRlcztcbiAgICAgICAgdGhpcy5zZWNvbmRzID0gdGhpcy5zdGVwLnNlY29uZHM7XG4gICAgfVxuXG4gICAgLyogVHVybiBvZmYgdmlicmF0aW9uL2FsYXJtIHRvbmVzIHdoZW4gdGhlIHVzZXIgbmF2aWdhdGVzIGF3YXkgZnJvbSB0aGUgcGFnZSAqL1xuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmF1ZGlvU2VydmljZS5zdG9wQWxhcm0oKTtcbiAgICB9XG5cbiAgICAvKiBDYWxsZWQgd2hlbiB0aGUgdGltZXIncyB0aW1lIGlzIHVwICovXG4gICAgaGFuZGxlVGltZXJFbmQoKSB7XG4gICAgICAgIC8va2VlcCB0aGUgdGltZXIgZnJvbSBcInRpY2tpbmdcIiBhbnkgbG9uZ2VyXG4gICAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XG4gICAgICAgIC8vcGxheSB0aGUgYWxhcm0gKGlmIHRoZSB1c2VyIHdhbnRzIGFuIGFsYXJtKVxuICAgICAgICB0aGlzLmF1ZGlvU2VydmljZS5wbGF5QWxhcm0oKTtcbiAgICAgICAgLy91c2VkIHRvIGNvbnRyb2wgdGhlIFVJIGNvbXBvbmVudHNcbiAgICAgICAgdGhpcy5hbGFybU9uID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKiBEZWNyZW1lbnRzIHRoZSB0aW1lciBieSBhIHNlY29uZCAqL1xuICAgIHVwZGF0ZUNsb2NrKCkge1xuICAgICAgICB0aGlzLnNlY29uZHMgLT0gMTtcbiAgICAgICAgLy9pZiB0aW1lIGlzIHVwXG4gICAgICAgIGlmICh0aGlzLnNlY29uZHMgPT09IDAgJiYgdGhpcy5taW51dGVzID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVRpbWVyRW5kKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy9pZiB0aGUgZW5kIG9mIGEgbWludXRlIChvdGhlciB0aGFuIHRoZSBsYXN0IG1pbnV0ZSkgd2FzIHJlYWNoZWRcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zZWNvbmRzIDwgMCkge1xuICAgICAgICAgICAgdGhpcy5taW51dGVzIC09IDE7XG4gICAgICAgICAgICB0aGlzLnNlY29uZHMgPSA1OTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qIENyZWF0ZXMgYW4gaW50ZXJ2YWwgdGhhdCBkZWNyZW1lbnRzIHRoZSBjbG9jayBlYWNoIHNlY29uZCAqL1xuICAgIGNyZWF0ZUludGVydmFsKCkge1xuICAgICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4geyB0aGlzLnVwZGF0ZUNsb2NrKCkgfSwgMTAwMCk7XG4gICAgfVxuXG4gICAgLyogUmV0dXJucyB0cnVlIGlmIHRoZSB0aW1lciBoYXMgcHJldmlvdXNseSBnb25lIGRvd24gdG8gMCBhbmRcbiAgICBub3QgeWV0IGJlZW4gcmVzZXQuICovXG4gICAgaXNPdXRPZlRpbWUoKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5taW51dGVzID09PSAwICYmIHRoaXMuc2Vjb25kcyA9PT0gMCk7XG4gICAgfVxuXG4gICAgLyogSGFsdHMgdGhlIHRpbWVyICovXG4gICAgc3RvcFRpbWVyKCkge1xuICAgICAgICAvL2NsZWFyIHRoZSBpbnRlcnZhbCB0aGF0IGRlY3JlbWVudHMgdGhlIHRpbWVyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgICAgIHRoaXMudGltZXJPbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qIEhhbHRzIHRoZSBhbGFybSBzbyBpdCBkb2Vzbid0IHBsYXkgYW55bW9yZSAqL1xuICAgIHN0b3BBbGFybSgpIHtcbiAgICAgICAgdGhpcy5hdWRpb1NlcnZpY2Uuc3RvcEFsYXJtKCk7XG4gICAgICAgIHRoaXMuYWxhcm1PbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qIEJlZ2lucyB0aGUgdGltZXIgaWYgaXQncyBub3QgYWxyZWFkeSBnb2luZyAqL1xuICAgIHN0YXJ0VGltZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVyT24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuICAgICAgICAvL3R1cm4gYW55IHByZXZpb3VzIGFsYXJtcyBvZmYtLXRoZSB1c2VyIHdvdWxkIGhhdmUgbm90aWNlZCB0aGVtIGFscmVhZHlcbiAgICAgICAgLy9hbmQgbWF5IGJlIHVzaW5nIHRoaXMgdG8gcmVzdGFydCBhIHRpbWVyIHRoYXQgcmFuIHRvIGNvbXBsZXRpb25cbiAgICAgICAgdGhpcy5zdG9wQWxhcm0oKTtcbiAgICAgICAgLy9pZiB0aGUgdGltZXIgcHJldmlvdXNseSByYW4gdG8gY29tcGxldGlvblxuICAgICAgICBpZiAodGhpcy5pc091dE9mVGltZSgpKSB7XG4gICAgICAgICAgICAvL3Jlc2V0IHRoZSB0aW1lciBzbyBpdCBjYW4gc3RhcnQgZnJvbSB0aGUgYmVnaW5uaW5nXG4gICAgICAgICAgICB0aGlzLm1pbnV0ZXMgPSB0aGlzLnN0ZXAubWludXRlcztcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kcyA9IHRoaXMuc3RlcC5zZWNvbmRzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGltZXJPbiA9IHRydWU7XG4gICAgICAgIC8vY3JlYXRlIGFuIGludGVydmFsIHRoYXQgZGVjcmVtZW50cyB0aGUgdGltZXJcbiAgICAgICAgdGhpcy5jcmVhdGVJbnRlcnZhbCgpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlTm90aWZpY2F0aW9uKCk7XG4gICAgfVxuXG4gICAgLyogU2NoZWR1bGUgYSBub3RpZmljYXRpb24gdG8gZ28gb2ZmIHdoZW4gdGhlIHRpbWVyIGlzIHVwLiAqL1xuICAgIHNjaGVkdWxlTm90aWZpY2F0aW9uKCkge1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc2NoZWR1bGVOb3RpZmljYXRpb24odGhpcy5wYXJlbnRUYXNrLCB0aGlzLnN0ZXAsXG4gICAgICAgICAgICB0aGlzLmluZGV4LCB0aGlzLm1pbnV0ZXMsIHRoaXMuc2Vjb25kcyk7XG4gICAgfVxuXG4gICAgLyogUGF1c2VzIHRoZSB0aW1lciAqL1xuICAgIHBhdXNlVGltZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy50aW1lck9uKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnN0b3BUaW1lcigpO1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2UuY2FuY2VsTm90aWZpY2F0aW9uRm9yKHRoaXMucGFyZW50VGFzaywgdGhpcy5pbmRleCk7XG4gICAgfVxuXG4gICAgLyogUmVzdGFydHMgdGhlIHRpbWVyIGZvciB0aGlzIHN0ZXAgYXQgdGhlIHRvcCBvZiB0aGUgY2xvY2sgKi9cbiAgICByZXNldFRpbWVyKCkge1xuICAgICAgICAvL2lmIHRoZSB0aW1lcidzIGFscmVhZHkgZ29pbmcgYW5kIHRoZSB1c2VyIGlzIHJlc3RhcnRpbmcgaXQgYXMgaXQgZ29lc1xuICAgICAgICBpZiAodGhpcy50aW1lck9uKSB7XG4gICAgICAgICAgICAvL21ha2Ugc3VyZSBpdCBjb3VudHMgZG93biBmcm9tIHRoZSB0b3Agb2YgdGhlIGZpcnN0IHNlY29uZCBpbnN0ZWFkIG9mIHdoZXJlIHRoZVxuICAgICAgICAgICAgLy9jdXJyZW50IGludGVydmFsIHdvdWxkIGNvdW50IGZyb20uXG4gICAgICAgICAgICAvL090aGVyd2lzZSB0aGUgZmlyc3Qgc2Vjb25kIG1pZ2h0IGJlIHRoZXJlIGZvciwgc2F5LCAwLjIgc2Vjb25kcywgc28gdGhlIHRpbWUncyBvZmZcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUludGVydmFsKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXVzZWQgPSBmYWxzZTsgLy9zaW5jZSB0ZWNobmljYWxseSBpdCdzIG5vdCBzdXNwZW5kZWQgbWlkLXRpY2suIEhlbHBzIGNvbnRyb2wgdGhlIFVJXG4gICAgICAgIC8vaWYgdGhlIGFsYXJtIHRvbmUvdmlicmF0aW9uIHdhcyBnb2luZyBvZmYsIGdldCByaWQgb2YgaXRcbiAgICAgICAgdGhpcy5zdG9wQWxhcm0oKTtcbiAgICAgICAgdGhpcy5taW51dGVzID0gdGhpcy5zdGVwLm1pbnV0ZXM7XG4gICAgICAgIHRoaXMuc2Vjb25kcyA9IHRoaXMuc3RlcC5zZWNvbmRzO1xuICAgICAgICB0aGlzLnNjaGVkdWxlTm90aWZpY2F0aW9uKCk7IC8vc2NoZWR1bGUgKG9yIHJlc2NoZWR1bGUpIHRoZSBub3RpZmljYXRpb25cbiAgICB9XG5cbiAgICAvKiBIYW5kbGVzIGJvdGggdGhlIHBsYXkgYW5kIHBhdXNlIGZlYXR1cmVzLiBCYXNpY2FsbHksIGlmIHRoZSBwbGF5IGJ1dHRvbiBpcyBiZWluZyBkaXNwbGF5ZWQsXG4gICAgaXQgc3RhcnRzIHRoZSB0aW1lciwgYW5kIGlmIHRoZSBwYXVzZSBidXR0b24gaXMgYmVpbmcgZGlzcGxheWVkLCBpdCBwYXVzZXMgaXQuICovXG4gICAgcGxheVBhdXNlQnRuQWN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy50aW1lck9uKSB7XG4gICAgICAgICAgICB0aGlzLnBhdXNlVGltZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUaW1lcigpO1xuICAgICAgICAgICAgLy9pZiB0aGUgdGltZXIgaXMgYmVpbmcgcmVzdGFydGVkIGZyb20gdGhlIGJlZ2lubmluZ1xuICAgICAgICAgICAgLy9vciBhZnRlciB0aGUgdGltZXIgcmFuIG91dCBvZiB0aW1lXG4gICAgICAgICAgICBpZiAoIXRoaXMucGF1c2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UmVwZXRpdGlvbisrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=