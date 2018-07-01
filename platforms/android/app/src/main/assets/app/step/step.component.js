"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page");
var step_model_1 = require("../shared/step/step.model");
var util_1 = require("../util");
var StepComponent = /** @class */ (function () {
    function StepComponent(page) {
        this.page = page;
        this.timerOn = false;
        this.padTwoDigits = util_1.padTwoDigits;
    }
    StepComponent.prototype.ngOnInit = function () {
        this.minutes = this.step.minutes;
        this.seconds = this.step.seconds;
    };
    StepComponent.prototype.updateClock = function (stepComponent) {
        stepComponent.seconds -= 1;
        if (stepComponent.seconds < 0) {
            //end of step has been reached
            if (stepComponent.minutes === 0) {
                stepComponent.seconds = 0;
                stepComponent.stopTimer();
            }
            else {
                stepComponent.minutes -= 1;
                stepComponent.seconds = 59;
            }
        }
    };
    StepComponent.prototype.createInterval = function () {
        this.interval = setInterval(this.updateClock, 1000, this);
    };
    StepComponent.prototype.isOutOfTime = function () {
        return (this.minutes == 0 && this.seconds == 0);
    };
    StepComponent.prototype.stopTimer = function () {
        clearInterval(this.interval);
        this.timerOn = false;
    };
    StepComponent.prototype.startTimer = function () {
        if (this.timerOn) {
            return;
        }
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
        this.stopTimer();
    };
    StepComponent.prototype.resetTimer = function () {
        if (this.timerOn) {
            //make sure it counts down from the top of the first second.
            //Otherwise the first second might be there for like 0.02 seconds, so the time's off
            clearInterval(this.interval);
            this.createInterval();
        }
        this.minutes = this.step.minutes;
        this.seconds = this.step.seconds;
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
        __metadata("design:paramtypes", [page_1.Page])
    ], StepComponent);
    return StepComponent;
}());
exports.StepComponent = StepComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGVwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RDtBQUV6RCxpREFBZ0Q7QUFDaEQsd0RBQWlEO0FBQ2pELGdDQUF1QztBQU92QztJQVNJLHVCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUg5QixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGlCQUFZLEdBQUcsbUJBQVksQ0FBQztJQUk1QixDQUFDO0lBRUQsZ0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUNyQyxDQUFDO0lBRUQsbUNBQVcsR0FBWCxVQUFZLGFBQTRCO1FBQ3BDLGFBQWEsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1Qiw4QkFBOEI7WUFDOUIsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixhQUFhLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztnQkFDMUIsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzlCLENBQUM7WUFDRCxJQUFJLENBQUMsQ0FBQztnQkFDRixhQUFhLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQztnQkFDM0IsYUFBYSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDL0IsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRUQsc0NBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCxtQ0FBVyxHQUFYO1FBQ0ksTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsaUNBQVMsR0FBVDtRQUNJLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVELGtDQUFVLEdBQVY7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNmLE1BQU0sQ0FBQztRQUNYLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLG9EQUFvRDtZQUNwRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDckMsQ0FBQztRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsa0NBQVUsR0FBVjtRQUNJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUNELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsa0NBQVUsR0FBVjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2YsNERBQTREO1lBQzVELG9GQUFvRjtZQUNwRixhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMxQixDQUFDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3JDLENBQUM7SUF6RVE7UUFBUixZQUFLLEVBQUU7a0NBQU8saUJBQUk7K0NBQUM7SUFGWCxhQUFhO1FBTHpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsMEJBQTBCO1lBQ3ZDLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO1NBQ3pDLENBQUM7eUNBVTRCLFdBQUk7T0FUckIsYUFBYSxDQTRFekI7SUFBRCxvQkFBQztDQUFBLEFBNUVELElBNEVDO0FBNUVZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XG5pbXBvcnQgeyBTdGVwIH0gZnJvbSBcIi4uL3NoYXJlZC9zdGVwL3N0ZXAubW9kZWxcIjtcbmltcG9ydCB7IHBhZFR3b0RpZ2l0cyB9IGZyb20gXCIuLi91dGlsXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInRtci1zdGVwXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwic3RlcC9zdGVwLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJzdGVwL3N0ZXAuY29tcG9uZW50LmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBTdGVwQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIHN0ZXA6IFN0ZXA7XG4gICAgaW50ZXJ2YWw6IG51bWJlcjsgLy9hbiBJRCBmb3IgYSBKUyBpbnRlcnZhbFxuICAgIHNlY29uZHM6IG51bWJlcjsgLy9hIGNvcHkgb2Ygc3RlcC5zZWNvbmRzIHRoYXQncyBsb3dlcmVkIGFzIHRpbWUgcGFzc2VzXG4gICAgbWludXRlczogbnVtYmVyOyAvL2EgY29weSBvZiBzdGVwLm1pbnV0ZXMgdGhhdCdzIGxvd2VyZWQgYXMgdGltZSBwYXNzZXNcbiAgICB0aW1lck9uID0gZmFsc2U7XG4gICAgcGFkVHdvRGlnaXRzID0gcGFkVHdvRGlnaXRzO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlKSB7XG4gICAgICAgIFxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLm1pbnV0ZXMgPSB0aGlzLnN0ZXAubWludXRlcztcbiAgICAgICAgdGhpcy5zZWNvbmRzID0gdGhpcy5zdGVwLnNlY29uZHM7XG4gICAgfVxuXG4gICAgdXBkYXRlQ2xvY2soc3RlcENvbXBvbmVudDogU3RlcENvbXBvbmVudCkge1xuICAgICAgICBzdGVwQ29tcG9uZW50LnNlY29uZHMgLT0gMTtcbiAgICAgICAgaWYgKHN0ZXBDb21wb25lbnQuc2Vjb25kcyA8IDApIHtcbiAgICAgICAgICAgIC8vZW5kIG9mIHN0ZXAgaGFzIGJlZW4gcmVhY2hlZFxuICAgICAgICAgICAgaWYgKHN0ZXBDb21wb25lbnQubWludXRlcyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHN0ZXBDb21wb25lbnQuc2Vjb25kcyA9IDA7XG4gICAgICAgICAgICAgICAgc3RlcENvbXBvbmVudC5zdG9wVGltZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0ZXBDb21wb25lbnQubWludXRlcyAtPSAxO1xuICAgICAgICAgICAgICAgIHN0ZXBDb21wb25lbnQuc2Vjb25kcyA9IDU5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlSW50ZXJ2YWwoKSB7XG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh0aGlzLnVwZGF0ZUNsb2NrLCAxMDAwLCB0aGlzKTtcbiAgICB9XG5cbiAgICBpc091dE9mVGltZSgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLm1pbnV0ZXMgPT0gMCAmJiB0aGlzLnNlY29uZHMgPT0gMCk7XG4gICAgfVxuXG4gICAgc3RvcFRpbWVyKCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLnRpbWVyT24gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBzdGFydFRpbWVyKCkge1xuICAgICAgICBpZiAodGhpcy50aW1lck9uKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNPdXRPZlRpbWUoKSkge1xuICAgICAgICAgICAgLy9yZXNldCB0aGUgdGltZXIgc28gaXQgY2FuIHN0YXJ0IGZyb20gdGhlIGJlZ2lubmluZ1xuICAgICAgICAgICAgdGhpcy5taW51dGVzID0gdGhpcy5zdGVwLm1pbnV0ZXM7XG4gICAgICAgICAgICB0aGlzLnNlY29uZHMgPSB0aGlzLnN0ZXAuc2Vjb25kcztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRpbWVyT24gPSB0cnVlO1xuICAgICAgICB0aGlzLmNyZWF0ZUludGVydmFsKCk7XG4gICAgfVxuXG4gICAgcGF1c2VUaW1lcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRpbWVyT24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0b3BUaW1lcigpO1xuICAgIH1cblxuICAgIHJlc2V0VGltZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnRpbWVyT24pIHtcbiAgICAgICAgICAgIC8vbWFrZSBzdXJlIGl0IGNvdW50cyBkb3duIGZyb20gdGhlIHRvcCBvZiB0aGUgZmlyc3Qgc2Vjb25kLlxuICAgICAgICAgICAgLy9PdGhlcndpc2UgdGhlIGZpcnN0IHNlY29uZCBtaWdodCBiZSB0aGVyZSBmb3IgbGlrZSAwLjAyIHNlY29uZHMsIHNvIHRoZSB0aW1lJ3Mgb2ZmXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVJbnRlcnZhbCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubWludXRlcyA9IHRoaXMuc3RlcC5taW51dGVzO1xuICAgICAgICB0aGlzLnNlY29uZHMgPSB0aGlzLnN0ZXAuc2Vjb25kcztcbiAgICB9XG59Il19