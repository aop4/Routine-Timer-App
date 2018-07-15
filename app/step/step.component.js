"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page");
var step_model_1 = require("../shared/step/step.model");
var util_1 = require("../util");
var audio_service_1 = require("../shared/audio.service");
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
    StepComponent.prototype.ngOnInit = function () {
        this.minutes = this.step.minutes;
        this.seconds = this.step.seconds;
    };
    StepComponent.prototype.ngOnDestroy = function () {
        this.audioService.stopAlarm();
    };
    StepComponent.prototype.handleTimerEnd = function () {
        this.stopTimer();
        this.audioService.playAlarm();
        this.notificationService.makeNotification(this.step.name);
        this.alarmOn = true;
    };
    StepComponent.prototype.updateClock = function () {
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
    };
    StepComponent.prototype.createInterval = function () {
        var _this = this;
        this.interval = setInterval(function () { _this.updateClock(); }, 1000);
    };
    StepComponent.prototype.isOutOfTime = function () {
        return (this.minutes == 0 && this.seconds == 0);
    };
    StepComponent.prototype.stopTimer = function () {
        clearInterval(this.interval);
        this.timerOn = false;
    };
    StepComponent.prototype.stopAlarm = function () {
        this.audioService.stopAlarm();
        this.alarmOn = false;
    };
    StepComponent.prototype.startTimer = function () {
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
    };
    StepComponent.prototype.pauseTimer = function () {
        if (!this.timerOn) {
            return;
        }
        this.paused = true;
        this.stopTimer();
    };
    StepComponent.prototype.resetTimer = function () {
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
    };
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
            templateUrl: "step/step.component.html",
            styleUrls: ["step/step.component.css"]
        }),
        __metadata("design:paramtypes", [page_1.Page, audio_service_1.AudioService,
            notification_service_1.NotificationService])
    ], StepComponent);
    return StepComponent;
}());
exports.StepComponent = StepComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGVwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRTtBQUVwRSxpREFBZ0Q7QUFDaEQsd0RBQWlEO0FBQ2pELGdDQUF1QztBQUN2Qyx5REFBdUQ7QUFHdkQsc0VBQW9FO0FBUXBFO0lBWUksdUJBQW9CLElBQVUsRUFBVSxZQUEwQixFQUN0RCxtQkFBd0M7UUFEaEMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQ3RELHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFQcEQsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsbUVBQW1FO1FBQ25FLG9DQUFvQztRQUNwRCxpQkFBWSxHQUFHLG1CQUFZLENBQUM7SUFNNUIsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDckMsQ0FBQztJQUVELG1DQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxzQ0FBYyxHQUFkO1FBQ0ksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQztJQUVELG1DQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FB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Q0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdEIsQ0FBQztJQUNMLENBQUM7SUEzR1E7UUFBUixZQUFLLEVBQUU7a0NBQU8saUJBQUk7K0NBQUM7SUFGWCxhQUFhO1FBTHpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsMEJBQTBCO1lBQ3ZDLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO1NBQ3pDLENBQUM7eUNBYTRCLFdBQUksRUFBd0IsNEJBQVk7WUFDakMsMENBQW1CO09BYjNDLGFBQWEsQ0ErR3pCO0lBQUQsb0JBQUM7Q0FBQSxBQS9HRCxJQStHQztBQS9HWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XG5pbXBvcnQgeyBTdGVwIH0gZnJvbSBcIi4uL3NoYXJlZC9zdGVwL3N0ZXAubW9kZWxcIjtcbmltcG9ydCB7IHBhZFR3b0RpZ2l0cyB9IGZyb20gXCIuLi91dGlsXCI7XG5pbXBvcnQgeyBBdWRpb1NlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2F1ZGlvLnNlcnZpY2VcIjtcbmltcG9ydCB7IHN0YXJ0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24vYXBwbGljYXRpb25cIjtcbmltcG9ydCAqIGFzIExvY2FsTm90aWZpY2F0aW9ucyBmcm9tIFwibmF0aXZlc2NyaXB0LWxvY2FsLW5vdGlmaWNhdGlvbnNcIjtcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvbm90aWZpY2F0aW9uLnNlcnZpY2VcIjtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJ0bXItc3RlcFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcInN0ZXAvc3RlcC5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wic3RlcC9zdGVwLmNvbXBvbmVudC5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgU3RlcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIHN0ZXA6IFN0ZXA7XG4gICAgaW50ZXJ2YWw6IG51bWJlcjsgLy9hbiBJRCBmb3IgYSBKUyBpbnRlcnZhbFxuICAgIHNlY29uZHM6IG51bWJlcjsgLy9hIGNvcHkgb2Ygc3RlcC5zZWNvbmRzIHRoYXQncyBsb3dlcmVkIGFzIHRpbWUgcGFzc2VzXG4gICAgbWludXRlczogbnVtYmVyOyAvL2EgY29weSBvZiBzdGVwLm1pbnV0ZXMgdGhhdCdzIGxvd2VyZWQgYXMgdGltZSBwYXNzZXNcbiAgICB0aW1lck9uID0gZmFsc2U7XG4gICAgcGF1c2VkID0gZmFsc2U7IC8vd2hldGhlciB0aGUgdGltZXIgaXMgcGF1c2VkIG1pZC10aW1pbmcgKHNvIHRoZSByZXNldCBidXR0b24ga25vd3NcbiAgICAgICAgICAgICAgICAgICAgLy90byBiZSB2aXNpYmxlIHdoZW4gdGltZXIncyBwYXVzZWQpXG4gICAgcGFkVHdvRGlnaXRzID0gcGFkVHdvRGlnaXRzO1xuICAgIGFsYXJtT246IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgYXVkaW9TZXJ2aWNlOiBBdWRpb1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSkge1xuICAgICAgICBcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5taW51dGVzID0gdGhpcy5zdGVwLm1pbnV0ZXM7XG4gICAgICAgIHRoaXMuc2Vjb25kcyA9IHRoaXMuc3RlcC5zZWNvbmRzO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmF1ZGlvU2VydmljZS5zdG9wQWxhcm0oKTtcbiAgICB9XG5cbiAgICBoYW5kbGVUaW1lckVuZCgpIHtcbiAgICAgICAgdGhpcy5zdG9wVGltZXIoKTtcbiAgICAgICAgdGhpcy5hdWRpb1NlcnZpY2UucGxheUFsYXJtKCk7XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5tYWtlTm90aWZpY2F0aW9uKHRoaXMuc3RlcC5uYW1lKTtcbiAgICAgICAgdGhpcy5hbGFybU9uID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB1cGRhdGVDbG9jaygpIHtcbiAgICAgICAgdGhpcy5zZWNvbmRzIC09IDE7XG4gICAgICAgIGlmICh0aGlzLnNlY29uZHMgPCAwKSB7XG4gICAgICAgICAgICAvL2VuZCBvZiBzdGVwIGhhcyBiZWVuIHJlYWNoZWRcbiAgICAgICAgICAgIGlmICh0aGlzLm1pbnV0ZXMgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlY29uZHMgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlVGltZXJFbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubWludXRlcyAtPSAxO1xuICAgICAgICAgICAgICAgIHRoaXMuc2Vjb25kcyA9IDU5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlSW50ZXJ2YWwoKSB7XG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7IHRoaXMudXBkYXRlQ2xvY2soKSB9LCAxMDAwKTtcbiAgICB9XG5cbiAgICBpc091dE9mVGltZSgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLm1pbnV0ZXMgPT0gMCAmJiB0aGlzLnNlY29uZHMgPT0gMCk7XG4gICAgfVxuXG4gICAgc3RvcFRpbWVyKCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLnRpbWVyT24gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBzdG9wQWxhcm0oKSB7XG4gICAgICAgIHRoaXMuYXVkaW9TZXJ2aWNlLnN0b3BBbGFybSgpO1xuICAgICAgICB0aGlzLmFsYXJtT24gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBzdGFydFRpbWVyKCkge1xuICAgICAgICBpZiAodGhpcy50aW1lck9uKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdG9wQWxhcm0oKTtcbiAgICAgICAgaWYgKHRoaXMuaXNPdXRPZlRpbWUoKSkge1xuICAgICAgICAgICAgLy9yZXNldCB0aGUgdGltZXIgc28gaXQgY2FuIHN0YXJ0IGZyb20gdGhlIGJlZ2lubmluZ1xuICAgICAgICAgICAgdGhpcy5taW51dGVzID0gdGhpcy5zdGVwLm1pbnV0ZXM7XG4gICAgICAgICAgICB0aGlzLnNlY29uZHMgPSB0aGlzLnN0ZXAuc2Vjb25kcztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRpbWVyT24gPSB0cnVlO1xuICAgICAgICB0aGlzLmNyZWF0ZUludGVydmFsKCk7XG4gICAgfVxuXG4gICAgcGF1c2VUaW1lcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRpbWVyT24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhdXNlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XG4gICAgfVxuXG4gICAgcmVzZXRUaW1lcigpIHtcbiAgICAgICAgaWYgKHRoaXMudGltZXJPbikge1xuICAgICAgICAgICAgLy9tYWtlIHN1cmUgaXQgY291bnRzIGRvd24gZnJvbSB0aGUgdG9wIG9mIHRoZSBmaXJzdCBzZWNvbmQuXG4gICAgICAgICAgICAvL090aGVyd2lzZSB0aGUgZmlyc3Qgc2Vjb25kIG1pZ2h0IGJlIHRoZXJlIGZvciBsaWtlIDAuMDIgc2Vjb25kcywgc28gdGhlIHRpbWUncyBvZmZcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUludGVydmFsKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXVzZWQgPSBmYWxzZTsgLy9zaW5jZSB0ZWNobmljYWxseSBpdCdzIG5vdCBzdXNwZW5kZWQgbWlkLXRpY2suIEhlbHBzIGNvbnRyb2wgdGhlIFVJXG4gICAgICAgIHRoaXMuc3RvcEFsYXJtKCk7XG4gICAgICAgIHRoaXMubWludXRlcyA9IHRoaXMuc3RlcC5taW51dGVzO1xuICAgICAgICB0aGlzLnNlY29uZHMgPSB0aGlzLnN0ZXAuc2Vjb25kcztcbiAgICB9XG5cbiAgICBwbGF5UGF1c2VCdG5BY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVyT24pIHtcbiAgICAgICAgICAgIHRoaXMucGF1c2VUaW1lcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdGFydFRpbWVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==