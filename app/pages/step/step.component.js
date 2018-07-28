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
            templateUrl: "pages/step/step.component.html",
            styleUrls: ["pages/step/step.component.css"]
        }),
        __metadata("design:paramtypes", [page_1.Page, audio_service_1.AudioService,
            notification_service_1.NotificationService])
    ], StepComponent);
    return StepComponent;
}());
exports.StepComponent = StepComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGVwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRTtBQUVwRSxpREFBZ0Q7QUFDaEQsMkRBQW9EO0FBQ3BELG1DQUEwQztBQUMxQyw0REFBMEQ7QUFDMUQsc0VBQW9FO0FBUXBFO0lBWUksdUJBQW9CLElBQVUsRUFBVSxZQUEwQixFQUN0RCxtQkFBd0M7UUFEaEMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQ3RELHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFQcEQsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixXQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsbUVBQW1FO1FBQ25FLG9DQUFvQztRQUNwRCxpQkFBWSxHQUFHLG1CQUFZLENBQUM7SUFNNUIsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDckMsQ0FBQztJQUVELG1DQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxzQ0FBYyxHQUFkO1FBQ0ksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQztJQUVELG1DQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQztRQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsOEJBQThCO1lBQzlCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUMxQixDQUFDO1lBQ0QsSUFBSSxDQUFDLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVELHNDQUFjLEdBQWQ7UUFBQSxpQkFFQztRQURHLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLGNBQVEsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFBLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxtQ0FBVyxHQUFYO1FBQ0ksTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsaUNBQVMsR0FBVDtRQUNJLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVELGlDQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxrQ0FBVSxHQUFWO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDZixNQUFNLENBQUM7UUFDWCxDQUFDO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckIsb0RBQW9EO1lBQ3BELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNyQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxrQ0FBVSxHQUFWO1FBQ0ksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNoQixNQUFNLENBQUM7UUFDWCxDQUFDO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxrQ0FBVSxHQUFWO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDZiw0REFBNEQ7WUFDNUQsb0ZBQW9GO1lBQ3BGLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzFCLENBQUM7UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLHFFQUFxRTtRQUMxRixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3JDLENBQUM7SUFFRCwwQ0FBa0IsR0FBbEI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdEIsQ0FBQztJQUNMLENBQUM7SUEzR1E7UUFBUixZQUFLLEVBQUU7a0NBQU8saUJBQUk7K0NBQUM7SUFGWCxhQUFhO1FBTHpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsZ0NBQWdDO1lBQzdDLFNBQVMsRUFBRSxDQUFDLCtCQUErQixDQUFDO1NBQy9DLENBQUM7eUNBYTRCLFdBQUksRUFBd0IsNEJBQVk7WUFDakMsMENBQW1CO09BYjNDLGFBQWEsQ0ErR3pCO0lBQUQsb0JBQUM7Q0FBQSxBQS9HRCxJQStHQztBQS9HWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcbmltcG9ydCB7IFN0ZXAgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3N0ZXAvc3RlcC5tb2RlbFwiO1xuaW1wb3J0IHsgcGFkVHdvRGlnaXRzIH0gZnJvbSBcIi4uLy4uL3V0aWxcIjtcbmltcG9ydCB7IEF1ZGlvU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvYXVkaW8uc2VydmljZVwiO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9ub3RpZmljYXRpb24uc2VydmljZVwiO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInRtci1zdGVwXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwicGFnZXMvc3RlcC9zdGVwLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJwYWdlcy9zdGVwL3N0ZXAuY29tcG9uZW50LmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBTdGVwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgc3RlcDogU3RlcDtcbiAgICBpbnRlcnZhbDogbnVtYmVyOyAvL2FuIElEIGZvciBhIEpTIGludGVydmFsXG4gICAgc2Vjb25kczogbnVtYmVyOyAvL2EgY29weSBvZiBzdGVwLnNlY29uZHMgdGhhdCdzIGxvd2VyZWQgYXMgdGltZSBwYXNzZXNcbiAgICBtaW51dGVzOiBudW1iZXI7IC8vYSBjb3B5IG9mIHN0ZXAubWludXRlcyB0aGF0J3MgbG93ZXJlZCBhcyB0aW1lIHBhc3Nlc1xuICAgIHRpbWVyT24gPSBmYWxzZTtcbiAgICBwYXVzZWQgPSBmYWxzZTsgLy93aGV0aGVyIHRoZSB0aW1lciBpcyBwYXVzZWQgbWlkLXRpbWluZyAoc28gdGhlIHJlc2V0IGJ1dHRvbiBrbm93c1xuICAgICAgICAgICAgICAgICAgICAvL3RvIGJlIHZpc2libGUgd2hlbiB0aW1lcidzIHBhdXNlZClcbiAgICBwYWRUd29EaWdpdHMgPSBwYWRUd29EaWdpdHM7XG4gICAgYWxhcm1PbjogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSBhdWRpb1NlcnZpY2U6IEF1ZGlvU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlKSB7XG4gICAgICAgIFxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLm1pbnV0ZXMgPSB0aGlzLnN0ZXAubWludXRlcztcbiAgICAgICAgdGhpcy5zZWNvbmRzID0gdGhpcy5zdGVwLnNlY29uZHM7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuYXVkaW9TZXJ2aWNlLnN0b3BBbGFybSgpO1xuICAgIH1cblxuICAgIGhhbmRsZVRpbWVyRW5kKCkge1xuICAgICAgICB0aGlzLnN0b3BUaW1lcigpO1xuICAgICAgICB0aGlzLmF1ZGlvU2VydmljZS5wbGF5QWxhcm0oKTtcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLm1ha2VOb3RpZmljYXRpb24odGhpcy5zdGVwLm5hbWUpO1xuICAgICAgICB0aGlzLmFsYXJtT24gPSB0cnVlO1xuICAgIH1cblxuICAgIHVwZGF0ZUNsb2NrKCkge1xuICAgICAgICB0aGlzLnNlY29uZHMgLT0gMTtcbiAgICAgICAgaWYgKHRoaXMuc2Vjb25kcyA8IDApIHtcbiAgICAgICAgICAgIC8vZW5kIG9mIHN0ZXAgaGFzIGJlZW4gcmVhY2hlZFxuICAgICAgICAgICAgaWYgKHRoaXMubWludXRlcyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2Vjb25kcyA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVUaW1lckVuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5taW51dGVzIC09IDE7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWNvbmRzID0gNTk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVJbnRlcnZhbCgpIHtcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHsgdGhpcy51cGRhdGVDbG9jaygpIH0sIDEwMDApO1xuICAgIH1cblxuICAgIGlzT3V0T2ZUaW1lKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMubWludXRlcyA9PSAwICYmIHRoaXMuc2Vjb25kcyA9PSAwKTtcbiAgICB9XG5cbiAgICBzdG9wVGltZXIoKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgICAgIHRoaXMudGltZXJPbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIHN0b3BBbGFybSgpIHtcbiAgICAgICAgdGhpcy5hdWRpb1NlcnZpY2Uuc3RvcEFsYXJtKCk7XG4gICAgICAgIHRoaXMuYWxhcm1PbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIHN0YXJ0VGltZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVyT24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0b3BBbGFybSgpO1xuICAgICAgICBpZiAodGhpcy5pc091dE9mVGltZSgpKSB7XG4gICAgICAgICAgICAvL3Jlc2V0IHRoZSB0aW1lciBzbyBpdCBjYW4gc3RhcnQgZnJvbSB0aGUgYmVnaW5uaW5nXG4gICAgICAgICAgICB0aGlzLm1pbnV0ZXMgPSB0aGlzLnN0ZXAubWludXRlcztcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kcyA9IHRoaXMuc3RlcC5zZWNvbmRzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGltZXJPbiA9IHRydWU7XG4gICAgICAgIHRoaXMuY3JlYXRlSW50ZXJ2YWwoKTtcbiAgICB9XG5cbiAgICBwYXVzZVRpbWVyKCkge1xuICAgICAgICBpZiAoIXRoaXMudGltZXJPbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zdG9wVGltZXIoKTtcbiAgICB9XG5cbiAgICByZXNldFRpbWVyKCkge1xuICAgICAgICBpZiAodGhpcy50aW1lck9uKSB7XG4gICAgICAgICAgICAvL21ha2Ugc3VyZSBpdCBjb3VudHMgZG93biBmcm9tIHRoZSB0b3Agb2YgdGhlIGZpcnN0IHNlY29uZC5cbiAgICAgICAgICAgIC8vT3RoZXJ3aXNlIHRoZSBmaXJzdCBzZWNvbmQgbWlnaHQgYmUgdGhlcmUgZm9yIGxpa2UgMC4wMiBzZWNvbmRzLCBzbyB0aGUgdGltZSdzIG9mZlxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlSW50ZXJ2YWwoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlOyAvL3NpbmNlIHRlY2huaWNhbGx5IGl0J3Mgbm90IHN1c3BlbmRlZCBtaWQtdGljay4gSGVscHMgY29udHJvbCB0aGUgVUlcbiAgICAgICAgdGhpcy5zdG9wQWxhcm0oKTtcbiAgICAgICAgdGhpcy5taW51dGVzID0gdGhpcy5zdGVwLm1pbnV0ZXM7XG4gICAgICAgIHRoaXMuc2Vjb25kcyA9IHRoaXMuc3RlcC5zZWNvbmRzO1xuICAgIH1cblxuICAgIHBsYXlQYXVzZUJ0bkFjdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMudGltZXJPbikge1xuICAgICAgICAgICAgdGhpcy5wYXVzZVRpbWVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0VGltZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19