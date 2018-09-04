"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LocalNotifications = require("nativescript-local-notifications");
var core_1 = require("@angular/core");
var application_1 = require("application");
var data_service_1 = require("~/shared/data.service");
var audio_service_1 = require("~/shared/audio.service");
var NotificationService = /** @class */ (function () {
    function NotificationService(dataService, audioService) {
        var _this = this;
        this.dataService = dataService;
        this.audioService = audioService;
        this.notificationIDs = {}; //maps step identifiers to the notifications
        //scheduled for corresponding steps
        this.lastNotificationId = 0; //the most recent notification's id
        this.appInView = true;
        //when the user brings up the application after viewing
        //another app or the display being off
        application_1.on(application_1.resumeEvent, function () {
            _this.setAppInView(true);
            _this.audioService.stopAlarm();
        });
        //when the user views another application or the display turns off
        application_1.on(application_1.suspendEvent, function () { return _this.setAppInView(false); });
    }
    NotificationService.prototype.setAppInView = function (val) {
        this.appInView = val;
    };
    /* Cancel all notifications received from this app thus far */
    NotificationService.prototype.clearAllNotifications = function () {
        LocalNotifications.cancelAll();
    };
    /* Return a unique string identifier for a step based on its (unique) parent task name
    and its index in the parent task. Assumes the user does not include the string '__id__'
    followed by a number in their task names. If they do, there's an infinitessimal chance
    that a notificiation will go off for the wrong step of the wrong routine. */
    NotificationService.prototype.generateStepId = function (task, stepIndex) {
        return task.name + "__id__" + stepIndex;
    };
    NotificationService.prototype.notificationScheduledFor = function (taskId) {
        if (this.notificationIDs[taskId]) {
            return true;
        }
        return false;
    };
    /* Schedules a notification to occur after the specified number of minutes and
    seconds go by. If the step given as input is already represented in
    notificationSet, its scheduled notification will be overwritten. */
    NotificationService.prototype.scheduleNotification = function (task, step, stepIndex, minutes, seconds) {
        //generate an identifier for the step
        var stepId = this.generateStepId(task, stepIndex);
        //get a notification ID for the notification to schedule
        //(may return an existing notification ID if one exists for
        //the step)
        var notificationId = this.getOrCreateNotificationId(stepId);
        var scheduledDate = this.getDateInFuture(minutes, seconds);
        LocalNotifications.schedule([{
                id: notificationId,
                at: scheduledDate,
                title: "Time's up!",
                body: "Time's up for " + step.name
            }]);
    };
    NotificationService.prototype.cancelNotificationFor = function (task, stepIndex) {
        //generate an identifier for the step
        var stepId = this.generateStepId(task, stepIndex);
        if (!this.notificationScheduledFor(stepId)) {
            return;
        }
        LocalNotifications.cancel(this.notificationIDs[stepId]);
        delete this.notificationIDs[stepId];
    };
    NotificationService.prototype.getOrCreateNotificationId = function (stepId) {
        if (this.notificationScheduledFor(stepId)) {
            return this.notificationIDs[stepId];
        }
        else {
            //generate an ID for the notification to schedule
            var notificationId = ++this.lastNotificationId;
            //record the association between the step and the notification ID
            this.notificationIDs[stepId] = notificationId;
            return notificationId;
        }
    };
    /* Returns a date that's the specified number of seconds and minutes in the
    future */
    NotificationService.prototype.getDateInFuture = function (minutes, seconds) {
        var currTime = (new Date()).getTime();
        var scheduledTimestamp = currTime + (1000 * seconds) + (60000 * minutes);
        return new Date(scheduledTimestamp);
    };
    NotificationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [data_service_1.SystemDataService, audio_service_1.AudioService])
    ], NotificationService);
    return NotificationService;
}());
exports.NotificationService = NotificationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJub3RpZmljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFFQUF1RTtBQUN2RSxzQ0FBMkM7QUFDM0MsMkNBQTZGO0FBRTdGLHNEQUEwRDtBQUkxRCx3REFBc0Q7QUFHdEQ7SUFPSSw2QkFBb0IsV0FBOEIsRUFBVSxZQUEwQjtRQUF0RixpQkFTQztRQVRtQixnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUx0RixvQkFBZSxHQUFRLEVBQUUsQ0FBQyxDQUFDLDRDQUE0QztRQUNqRCxtQ0FBbUM7UUFDekQsdUJBQWtCLEdBQVcsQ0FBQyxDQUFDLENBQUMsbUNBQW1DO1FBQ25FLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFHdEIsdURBQXVEO1FBQ3ZELHNDQUFzQztRQUN0QyxnQkFBYSxDQUFDLHlCQUFXLEVBQUU7WUFDdEIsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QixLQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBQ0gsa0VBQWtFO1FBQ2xFLGdCQUFhLENBQUMsMEJBQVksRUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCwwQ0FBWSxHQUFaLFVBQWEsR0FBWTtRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztJQUN6QixDQUFDO0lBRUQsOERBQThEO0lBQzlELG1EQUFxQixHQUFyQjtRQUNJLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRDs7O2dGQUc0RTtJQUM1RSw0Q0FBYyxHQUFkLFVBQWUsSUFBVSxFQUFFLFNBQWlCO1FBQ3hDLE1BQU0sQ0FBQyxJQUFJLENB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OlsiaW1wb3J0ICogYXMgTG9jYWxOb3RpZmljYXRpb25zIGZyb20gXCJuYXRpdmVzY3JpcHQtbG9jYWwtbm90aWZpY2F0aW9uc1wiO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyByZXN1bWVFdmVudCwgc3VzcGVuZEV2ZW50LCBvbiBhcyBhcHBsaWNhdGlvbk9uLCBkaXNwbGF5ZWRFdmVudCB9IGZyb20gXCJhcHBsaWNhdGlvblwiO1xuXG5pbXBvcnQgeyBTeXN0ZW1EYXRhU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9kYXRhLnNlcnZpY2VcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFN0ZXAgfSBmcm9tIFwifi9zaGFyZWQvc3RlcC9zdGVwLm1vZGVsXCI7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIn4vc2hhcmVkL3Rhc2svdGFzay5tb2RlbFwiO1xuaW1wb3J0IHsgQXVkaW9TZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL2F1ZGlvLnNlcnZpY2VcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvblNlcnZpY2Uge1xuXG4gICAgbm90aWZpY2F0aW9uSURzOiBhbnkgPSB7fTsgLy9tYXBzIHN0ZXAgaWRlbnRpZmllcnMgdG8gdGhlIG5vdGlmaWNhdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zY2hlZHVsZWQgZm9yIGNvcnJlc3BvbmRpbmcgc3RlcHNcbiAgICBsYXN0Tm90aWZpY2F0aW9uSWQ6IG51bWJlciA9IDA7IC8vdGhlIG1vc3QgcmVjZW50IG5vdGlmaWNhdGlvbidzIGlkXG4gICAgYXBwSW5WaWV3OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVNlcnZpY2U6IFN5c3RlbURhdGFTZXJ2aWNlLCBwcml2YXRlIGF1ZGlvU2VydmljZTogQXVkaW9TZXJ2aWNlKSB7XG4gICAgICAgIC8vd2hlbiB0aGUgdXNlciBicmluZ3MgdXAgdGhlIGFwcGxpY2F0aW9uIGFmdGVyIHZpZXdpbmdcbiAgICAgICAgLy9hbm90aGVyIGFwcCBvciB0aGUgZGlzcGxheSBiZWluZyBvZmZcbiAgICAgICAgYXBwbGljYXRpb25PbihyZXN1bWVFdmVudCwgKCkgPT4ge1xuICAgICAgICAgICAgIHRoaXMuc2V0QXBwSW5WaWV3KHRydWUpO1xuICAgICAgICAgICAgIHRoaXMuYXVkaW9TZXJ2aWNlLnN0b3BBbGFybSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy93aGVuIHRoZSB1c2VyIHZpZXdzIGFub3RoZXIgYXBwbGljYXRpb24gb3IgdGhlIGRpc3BsYXkgdHVybnMgb2ZmXG4gICAgICAgIGFwcGxpY2F0aW9uT24oc3VzcGVuZEV2ZW50LCAoKSA9PiB0aGlzLnNldEFwcEluVmlldyhmYWxzZSkpO1xuICAgIH1cblxuICAgIHNldEFwcEluVmlldyh2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5hcHBJblZpZXcgPSB2YWw7XG4gICAgfVxuXG4gICAgLyogQ2FuY2VsIGFsbCBub3RpZmljYXRpb25zIHJlY2VpdmVkIGZyb20gdGhpcyBhcHAgdGh1cyBmYXIgKi9cbiAgICBjbGVhckFsbE5vdGlmaWNhdGlvbnMoKSB7XG4gICAgICAgIExvY2FsTm90aWZpY2F0aW9ucy5jYW5jZWxBbGwoKTtcbiAgICB9XG5cbiAgICAvKiBSZXR1cm4gYSB1bmlxdWUgc3RyaW5nIGlkZW50aWZpZXIgZm9yIGEgc3RlcCBiYXNlZCBvbiBpdHMgKHVuaXF1ZSkgcGFyZW50IHRhc2sgbmFtZVxuICAgIGFuZCBpdHMgaW5kZXggaW4gdGhlIHBhcmVudCB0YXNrLiBBc3N1bWVzIHRoZSB1c2VyIGRvZXMgbm90IGluY2x1ZGUgdGhlIHN0cmluZyAnX19pZF9fJyBcbiAgICBmb2xsb3dlZCBieSBhIG51bWJlciBpbiB0aGVpciB0YXNrIG5hbWVzLiBJZiB0aGV5IGRvLCB0aGVyZSdzIGFuIGluZmluaXRlc3NpbWFsIGNoYW5jZVxuICAgIHRoYXQgYSBub3RpZmljaWF0aW9uIHdpbGwgZ28gb2ZmIGZvciB0aGUgd3Jvbmcgc3RlcCBvZiB0aGUgd3Jvbmcgcm91dGluZS4gKi9cbiAgICBnZW5lcmF0ZVN0ZXBJZCh0YXNrOiBUYXNrLCBzdGVwSW5kZXg6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGFzay5uYW1lICsgXCJfX2lkX19cIiArIHN0ZXBJbmRleDtcbiAgICB9XG5cbiAgICBub3RpZmljYXRpb25TY2hlZHVsZWRGb3IodGFza0lkOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMubm90aWZpY2F0aW9uSURzW3Rhc2tJZF0pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKiBTY2hlZHVsZXMgYSBub3RpZmljYXRpb24gdG8gb2NjdXIgYWZ0ZXIgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgbWludXRlcyBhbmQgXG4gICAgc2Vjb25kcyBnbyBieS4gSWYgdGhlIHN0ZXAgZ2l2ZW4gYXMgaW5wdXQgaXMgYWxyZWFkeSByZXByZXNlbnRlZCBpblxuICAgIG5vdGlmaWNhdGlvblNldCwgaXRzIHNjaGVkdWxlZCBub3RpZmljYXRpb24gd2lsbCBiZSBvdmVyd3JpdHRlbi4gKi9cbiAgICBzY2hlZHVsZU5vdGlmaWNhdGlvbih0YXNrOiBUYXNrLCBzdGVwOiBTdGVwLCBzdGVwSW5kZXg6IG51bWJlciwgbWludXRlczogbnVtYmVyLFxuICAgIHNlY29uZHM6IG51bWJlcikge1xuICAgICAgICAvL2dlbmVyYXRlIGFuIGlkZW50aWZpZXIgZm9yIHRoZSBzdGVwXG4gICAgICAgIGxldCBzdGVwSWQgPSB0aGlzLmdlbmVyYXRlU3RlcElkKHRhc2ssIHN0ZXBJbmRleCk7XG4gICAgICAgIC8vZ2V0IGEgbm90aWZpY2F0aW9uIElEIGZvciB0aGUgbm90aWZpY2F0aW9uIHRvIHNjaGVkdWxlXG4gICAgICAgIC8vKG1heSByZXR1cm4gYW4gZXhpc3Rpbmcgbm90aWZpY2F0aW9uIElEIGlmIG9uZSBleGlzdHMgZm9yXG4gICAgICAgIC8vdGhlIHN0ZXApXG4gICAgICAgIGxldCBub3RpZmljYXRpb25JZCA9IHRoaXMuZ2V0T3JDcmVhdGVOb3RpZmljYXRpb25JZChzdGVwSWQpO1xuICAgICAgICBsZXQgc2NoZWR1bGVkRGF0ZSA9IHRoaXMuZ2V0RGF0ZUluRnV0dXJlKG1pbnV0ZXMsIHNlY29uZHMpO1xuICAgICAgICBMb2NhbE5vdGlmaWNhdGlvbnMuc2NoZWR1bGUoW3tcbiAgICAgICAgICAgIGlkOiBub3RpZmljYXRpb25JZCxcbiAgICAgICAgICAgIGF0OiBzY2hlZHVsZWREYXRlLFxuICAgICAgICAgICAgdGl0bGU6IFwiVGltZSdzIHVwIVwiLFxuICAgICAgICAgICAgYm9keTogXCJUaW1lJ3MgdXAgZm9yIFwiICsgc3RlcC5uYW1lXG4gICAgICAgIH1dKTtcbiAgICB9XG5cbiAgICBjYW5jZWxOb3RpZmljYXRpb25Gb3IodGFzazogVGFzaywgc3RlcEluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgLy9nZW5lcmF0ZSBhbiBpZGVudGlmaWVyIGZvciB0aGUgc3RlcFxuICAgICAgICBsZXQgc3RlcElkID0gdGhpcy5nZW5lcmF0ZVN0ZXBJZCh0YXNrLCBzdGVwSW5kZXgpO1xuICAgICAgICBpZiAoIXRoaXMubm90aWZpY2F0aW9uU2NoZWR1bGVkRm9yKHN0ZXBJZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBMb2NhbE5vdGlmaWNhdGlvbnMuY2FuY2VsKHRoaXMubm90aWZpY2F0aW9uSURzW3N0ZXBJZF0pO1xuICAgICAgICBkZWxldGUgdGhpcy5ub3RpZmljYXRpb25JRHNbc3RlcElkXTtcbiAgICB9XG5cbiAgICBnZXRPckNyZWF0ZU5vdGlmaWNhdGlvbklkKHN0ZXBJZDogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLm5vdGlmaWNhdGlvblNjaGVkdWxlZEZvcihzdGVwSWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ub3RpZmljYXRpb25JRHNbc3RlcElkXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vZ2VuZXJhdGUgYW4gSUQgZm9yIHRoZSBub3RpZmljYXRpb24gdG8gc2NoZWR1bGVcbiAgICAgICAgICAgIGxldCBub3RpZmljYXRpb25JZCA9ICsrdGhpcy5sYXN0Tm90aWZpY2F0aW9uSWQ7XG4gICAgICAgICAgICAvL3JlY29yZCB0aGUgYXNzb2NpYXRpb24gYmV0d2VlbiB0aGUgc3RlcCBhbmQgdGhlIG5vdGlmaWNhdGlvbiBJRFxuICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25JRHNbc3RlcElkXSA9IG5vdGlmaWNhdGlvbklkO1xuICAgICAgICAgICAgcmV0dXJuIG5vdGlmaWNhdGlvbklkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyogUmV0dXJucyBhIGRhdGUgdGhhdCdzIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIHNlY29uZHMgYW5kIG1pbnV0ZXMgaW4gdGhlIFxuICAgIGZ1dHVyZSAqL1xuICAgIGdldERhdGVJbkZ1dHVyZShtaW51dGVzLCBzZWNvbmRzKTogRGF0ZSB7XG4gICAgICAgIGxldCBjdXJyVGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG4gICAgICAgIGxldCBzY2hlZHVsZWRUaW1lc3RhbXAgPSBjdXJyVGltZSArICgxMDAwICogc2Vjb25kcykgKyAoNjAwMDAgKiBtaW51dGVzKTtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHNjaGVkdWxlZFRpbWVzdGFtcCk7XG4gICAgfVxuXG59XG4iXX0=