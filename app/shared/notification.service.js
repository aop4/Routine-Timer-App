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
    NotificationService.prototype.refreshSettings = function () {
        this.settings = this.dataService.getTimerSettings();
    };
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
    notificationSet, its scheduled notification will be overwritten. If
    notifications are turned off in the settings, nothing is scheduled. */
    NotificationService.prototype.scheduleNotification = function (task, step, stepIndex, minutes, seconds) {
        if (!this.settings.wantsNotifications) {
            return;
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJub3RpZmljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFFQUF1RTtBQUN2RSxzQ0FBMkM7QUFDM0MsMkNBQTZGO0FBRTdGLHNEQUEwRDtBQUkxRCx3REFBc0Q7QUFJdEQ7SUFRSSw2QkFBb0IsV0FBOEIsRUFBVSxZQUEwQjtRQUF0RixpQkFTQztRQVRtQixnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQU50RixvQkFBZSxHQUFRLEVBQUUsQ0FBQyxDQUFDLDRDQUE0QztRQUNqRCxtQ0FBbUM7UUFDekQsdUJBQWtCLEdBQVcsQ0FBQyxDQUFDLENBQUMsbUNBQW1DO1FBQ25FLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFJdEIsdURBQXVEO1FBQ3ZELHNDQUFzQztRQUN0QyxnQkFBYSxDQUFDLHlCQUFXLEVBQUU7WUFDdEIsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QixLQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBQ0gsa0VBQWtFO1FBQ2xFLGdCQUFhLENBQUMsMEJBQVksRUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCw2Q0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDeEQsQ0FBQztJQUVELDBDQUFZLEdBQVosVUFBYSxHQUFZO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO0lBQ3pCLENBQUM7SUFFRCw4REFBOEQ7SUFDOUQsbURBQXFCLEdBQXJCO1FBQ0ksa0JBQWtCLENBQUMsU0FBUyxFQUFFLENB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LENBQUMsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBcEdRLG1CQUFtQjtRQUQvQixpQkFBVSxFQUFFO3lDQVN3QixnQ0FBaUIsRUFBd0IsNEJBQVk7T0FSN0UsbUJBQW1CLENBc0cvQjtJQUFELDBCQUFDO0NBQUEsQUF0R0QsSUFzR0M7QUF0R1ksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgTG9jYWxOb3RpZmljYXRpb25zIGZyb20gXCJuYXRpdmVzY3JpcHQtbG9jYWwtbm90aWZpY2F0aW9uc1wiO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyByZXN1bWVFdmVudCwgc3VzcGVuZEV2ZW50LCBvbiBhcyBhcHBsaWNhdGlvbk9uLCBkaXNwbGF5ZWRFdmVudCB9IGZyb20gXCJhcHBsaWNhdGlvblwiO1xuXG5pbXBvcnQgeyBTeXN0ZW1EYXRhU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9kYXRhLnNlcnZpY2VcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFN0ZXAgfSBmcm9tIFwifi9zaGFyZWQvc3RlcC9zdGVwLm1vZGVsXCI7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIn4vc2hhcmVkL3Rhc2svdGFzay5tb2RlbFwiO1xuaW1wb3J0IHsgQXVkaW9TZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL2F1ZGlvLnNlcnZpY2VcIjtcbmltcG9ydCB7IFRpbWVyU2V0dGluZ3MgfSBmcm9tIFwiLi9zZXR0aW5ncy90aW1lci1zZXR0aW5ncy5tb2RlbFwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uU2VydmljZSB7XG5cbiAgICBub3RpZmljYXRpb25JRHM6IGFueSA9IHt9OyAvL21hcHMgc3RlcCBpZGVudGlmaWVycyB0byB0aGUgbm90aWZpY2F0aW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NjaGVkdWxlZCBmb3IgY29ycmVzcG9uZGluZyBzdGVwc1xuICAgIGxhc3ROb3RpZmljYXRpb25JZDogbnVtYmVyID0gMDsgLy90aGUgbW9zdCByZWNlbnQgbm90aWZpY2F0aW9uJ3MgaWRcbiAgICBhcHBJblZpZXc6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHNldHRpbmdzOiBUaW1lclNldHRpbmdzO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU2VydmljZTogU3lzdGVtRGF0YVNlcnZpY2UsIHByaXZhdGUgYXVkaW9TZXJ2aWNlOiBBdWRpb1NlcnZpY2UpIHtcbiAgICAgICAgLy93aGVuIHRoZSB1c2VyIGJyaW5ncyB1cCB0aGUgYXBwbGljYXRpb24gYWZ0ZXIgdmlld2luZ1xuICAgICAgICAvL2Fub3RoZXIgYXBwIG9yIHRoZSBkaXNwbGF5IGJlaW5nIG9mZlxuICAgICAgICBhcHBsaWNhdGlvbk9uKHJlc3VtZUV2ZW50LCAoKSA9PiB7XG4gICAgICAgICAgICAgdGhpcy5zZXRBcHBJblZpZXcodHJ1ZSk7XG4gICAgICAgICAgICAgdGhpcy5hdWRpb1NlcnZpY2Uuc3RvcEFsYXJtKCk7XG4gICAgICAgIH0pO1xuICAgICAgICAvL3doZW4gdGhlIHVzZXIgdmlld3MgYW5vdGhlciBhcHBsaWNhdGlvbiBvciB0aGUgZGlzcGxheSB0dXJucyBvZmZcbiAgICAgICAgYXBwbGljYXRpb25PbihzdXNwZW5kRXZlbnQsICgpID0+IHRoaXMuc2V0QXBwSW5WaWV3KGZhbHNlKSk7XG4gICAgfVxuXG4gICAgcmVmcmVzaFNldHRpbmdzKCkge1xuICAgICAgICB0aGlzLnNldHRpbmdzID0gdGhpcy5kYXRhU2VydmljZS5nZXRUaW1lclNldHRpbmdzKCk7XG4gICAgfVxuXG4gICAgc2V0QXBwSW5WaWV3KHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmFwcEluVmlldyA9IHZhbDtcbiAgICB9XG5cbiAgICAvKiBDYW5jZWwgYWxsIG5vdGlmaWNhdGlvbnMgcmVjZWl2ZWQgZnJvbSB0aGlzIGFwcCB0aHVzIGZhciAqL1xuICAgIGNsZWFyQWxsTm90aWZpY2F0aW9ucygpIHtcbiAgICAgICAgTG9jYWxOb3RpZmljYXRpb25zLmNhbmNlbEFsbCgpO1xuICAgIH1cblxuICAgIC8qIFJldHVybiBhIHVuaXF1ZSBzdHJpbmcgaWRlbnRpZmllciBmb3IgYSBzdGVwIGJhc2VkIG9uIGl0cyAodW5pcXVlKSBwYXJlbnQgdGFzayBuYW1lXG4gICAgYW5kIGl0cyBpbmRleCBpbiB0aGUgcGFyZW50IHRhc2suIEFzc3VtZXMgdGhlIHVzZXIgZG9lcyBub3QgaW5jbHVkZSB0aGUgc3RyaW5nICdfX2lkX18nIFxuICAgIGZvbGxvd2VkIGJ5IGEgbnVtYmVyIGluIHRoZWlyIHRhc2sgbmFtZXMuIElmIHRoZXkgZG8sIHRoZXJlJ3MgYW4gaW5maW5pdGVzc2ltYWwgY2hhbmNlXG4gICAgdGhhdCBhIG5vdGlmaWNpYXRpb24gd2lsbCBnbyBvZmYgZm9yIHRoZSB3cm9uZyBzdGVwIG9mIHRoZSB3cm9uZyByb3V0aW5lLiAqL1xuICAgIGdlbmVyYXRlU3RlcElkKHRhc2s6IFRhc2ssIHN0ZXBJbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0YXNrLm5hbWUgKyBcIl9faWRfX1wiICsgc3RlcEluZGV4O1xuICAgIH1cblxuICAgIG5vdGlmaWNhdGlvblNjaGVkdWxlZEZvcih0YXNrSWQ6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5ub3RpZmljYXRpb25JRHNbdGFza0lkXSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qIFNjaGVkdWxlcyBhIG5vdGlmaWNhdGlvbiB0byBvY2N1ciBhZnRlciB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBtaW51dGVzIGFuZCBcbiAgICBzZWNvbmRzIGdvIGJ5LiBJZiB0aGUgc3RlcCBnaXZlbiBhcyBpbnB1dCBpcyBhbHJlYWR5IHJlcHJlc2VudGVkIGluXG4gICAgbm90aWZpY2F0aW9uU2V0LCBpdHMgc2NoZWR1bGVkIG5vdGlmaWNhdGlvbiB3aWxsIGJlIG92ZXJ3cml0dGVuLiBJZlxuICAgIG5vdGlmaWNhdGlvbnMgYXJlIHR1cm5lZCBvZmYgaW4gdGhlIHNldHRpbmdzLCBub3RoaW5nIGlzIHNjaGVkdWxlZC4gKi9cbiAgICBzY2hlZHVsZU5vdGlmaWNhdGlvbih0YXNrOiBUYXNrLCBzdGVwOiBTdGVwLCBzdGVwSW5kZXg6IG51bWJlciwgbWludXRlczogbnVtYmVyLFxuICAgICAgICBzZWNvbmRzOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLndhbnRzTm90aWZpY2F0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vZ2VuZXJhdGUgYW4gaWRlbnRpZmllciBmb3IgdGhlIHN0ZXBcbiAgICAgICAgbGV0IHN0ZXBJZCA9IHRoaXMuZ2VuZXJhdGVTdGVwSWQodGFzaywgc3RlcEluZGV4KTtcbiAgICAgICAgLy9nZXQgYSBub3RpZmljYXRpb24gSUQgZm9yIHRoZSBub3RpZmljYXRpb24gdG8gc2NoZWR1bGVcbiAgICAgICAgLy8obWF5IHJldHVybiBhbiBleGlzdGluZyBub3RpZmljYXRpb24gSUQgaWYgb25lIGV4aXN0cyBmb3JcbiAgICAgICAgLy90aGUgc3RlcClcbiAgICAgICAgbGV0IG5vdGlmaWNhdGlvbklkID0gdGhpcy5nZXRPckNyZWF0ZU5vdGlmaWNhdGlvbklkKHN0ZXBJZCk7XG4gICAgICAgIGxldCBzY2hlZHVsZWREYXRlID0gdGhpcy5nZXREYXRlSW5GdXR1cmUobWludXRlcywgc2Vjb25kcyk7XG4gICAgICAgIExvY2FsTm90aWZpY2F0aW9ucy5zY2hlZHVsZShbe1xuICAgICAgICAgICAgaWQ6IG5vdGlmaWNhdGlvbklkLFxuICAgICAgICAgICAgYXQ6IHNjaGVkdWxlZERhdGUsXG4gICAgICAgICAgICB0aXRsZTogXCJUaW1lJ3MgdXAhXCIsXG4gICAgICAgICAgICBib2R5OiBcIlRpbWUncyB1cCBmb3IgXCIgKyBzdGVwLm5hbWVcbiAgICAgICAgfV0pO1xuICAgIH1cblxuICAgIGNhbmNlbE5vdGlmaWNhdGlvbkZvcih0YXNrOiBUYXNrLCBzdGVwSW5kZXg6IG51bWJlcikge1xuICAgICAgICAvL2dlbmVyYXRlIGFuIGlkZW50aWZpZXIgZm9yIHRoZSBzdGVwXG4gICAgICAgIGxldCBzdGVwSWQgPSB0aGlzLmdlbmVyYXRlU3RlcElkKHRhc2ssIHN0ZXBJbmRleCk7XG4gICAgICAgIGlmICghdGhpcy5ub3RpZmljYXRpb25TY2hlZHVsZWRGb3Ioc3RlcElkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIExvY2FsTm90aWZpY2F0aW9ucy5jYW5jZWwodGhpcy5ub3RpZmljYXRpb25JRHNbc3RlcElkXSk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLm5vdGlmaWNhdGlvbklEc1tzdGVwSWRdO1xuICAgIH1cblxuICAgIGdldE9yQ3JlYXRlTm90aWZpY2F0aW9uSWQoc3RlcElkOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMubm90aWZpY2F0aW9uU2NoZWR1bGVkRm9yKHN0ZXBJZCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5vdGlmaWNhdGlvbklEc1tzdGVwSWRdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy9nZW5lcmF0ZSBhbiBJRCBmb3IgdGhlIG5vdGlmaWNhdGlvbiB0byBzY2hlZHVsZVxuICAgICAgICAgICAgbGV0IG5vdGlmaWNhdGlvbklkID0gKyt0aGlzLmxhc3ROb3RpZmljYXRpb25JZDtcbiAgICAgICAgICAgIC8vcmVjb3JkIHRoZSBhc3NvY2lhdGlvbiBiZXR3ZWVuIHRoZSBzdGVwIGFuZCB0aGUgbm90aWZpY2F0aW9uIElEXG4gICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbklEc1tzdGVwSWRdID0gbm90aWZpY2F0aW9uSWQ7XG4gICAgICAgICAgICByZXR1cm4gbm90aWZpY2F0aW9uSWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBSZXR1cm5zIGEgZGF0ZSB0aGF0J3MgdGhlIHNwZWNpZmllZCBudW1iZXIgb2Ygc2Vjb25kcyBhbmQgbWludXRlcyBpbiB0aGUgXG4gICAgZnV0dXJlICovXG4gICAgZ2V0RGF0ZUluRnV0dXJlKG1pbnV0ZXMsIHNlY29uZHMpOiBEYXRlIHtcbiAgICAgICAgbGV0IGN1cnJUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcbiAgICAgICAgbGV0IHNjaGVkdWxlZFRpbWVzdGFtcCA9IGN1cnJUaW1lICsgKDEwMDAgKiBzZWNvbmRzKSArICg2MDAwMCAqIG1pbnV0ZXMpO1xuICAgICAgICByZXR1cm4gbmV3IERhdGUoc2NoZWR1bGVkVGltZXN0YW1wKTtcbiAgICB9XG5cbn1cbiJdfQ==