"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LocalNotifications = require("nativescript-local-notifications");
var core_1 = require("@angular/core");
var application_1 = require("application");
var data_service_1 = require("~/shared/data.service");
var NotificationService = /** @class */ (function () {
    function NotificationService(dataService) {
        var _this = this;
        this.dataService = dataService;
        this.appInView = true; //whether or not the app is currently open+displayed on the user's screen
        this.lastNotificationId = 0; //the most recent notification's id
        //when the user brings up the application after viewing
        //another app or the display being off
        application_1.on(application_1.resumeEvent, function () {
            _this.setAppInView(true);
            _this.clearAllNotifications(); //so the user doesn't have to cancel them manually
        });
        //when the user views another application or the display turns off
        application_1.on(application_1.suspendEvent, function () { return _this.setAppInView(false); });
    }
    NotificationService.prototype.setAppInView = function (val) {
        this.appInView = val;
    };
    /* Cancel all notifications received from this app thus far */
    NotificationService.prototype.clearAllNotifications = function () {
        if (this.dataService.getTimerSettings().wantsNotifications) {
            for (var id = 0; id <= this.lastNotificationId; id++) {
                LocalNotifications.cancel(id);
            }
        }
    };
    /* if the app isn't being displayed on the user's screen right now
    and the user wants notifications, send a local notification saying
    that a step's timer has ended */
    NotificationService.prototype.makeNotification = function (stepName) {
        if (!this.appInView && this.dataService.getTimerSettings().wantsNotifications) {
            LocalNotifications.schedule([{
                    id: this.lastNotificationId,
                    title: "Time's up!",
                    body: "Time's up for " + stepName
                }]);
            this.lastNotificationId++;
        }
    };
    NotificationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [data_service_1.SystemDataService])
    ], NotificationService);
    return NotificationService;
}());
exports.NotificationService = NotificationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJub3RpZmljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFFQUF1RTtBQUN2RSxzQ0FBMkM7QUFDM0MsMkNBQTZFO0FBRTdFLHNEQUEwRDtBQUcxRDtJQUtJLDZCQUFvQixXQUE4QjtRQUFsRCxpQkFTQztRQVRtQixnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFIbEQsY0FBUyxHQUFZLElBQUksQ0FBQyxDQUFDLHlFQUF5RTtRQUNwRyx1QkFBa0IsR0FBVyxDQUFDLENBQUMsQ0FBQyxtQ0FBbUM7UUFHL0QsdURBQXVEO1FBQ3ZELHNDQUFzQztRQUN0QyxnQkFBYSxDQUFDLHlCQUFXLEVBQUU7WUFDdEIsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QixLQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDLGtEQUFrRDtRQUNyRixDQUFDLENBQUMsQ0FBQztRQUNILGtFQUFrRTtRQUNsRSxnQkFBYSxDQUFDLDBCQUFZLEVBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQXhCLENBQXdCLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsMENBQVksR0FBWixVQUFhLEdBQVk7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7SUFDekIsQ0FBQztJQUVELDhEQUE4RDtJQUM5RCxtREFBcUIsR0FBckI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQ3pELEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7Z0JBQ25ELGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNsQyxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFRDs7b0NBRWdDO0lBQ2hDLDhDQUFnQixHQUFoQixVQUFpQixRQUFnQjtRQUM3QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUM1RSxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDekIsRUFBRSxFQUFFLElBQUksQ0FBQyxrQkFBa0I7b0JBQzNCLEtBQUssRUFBRSxZQUFZO29CQUNuQixJQUFJLEVBQUUsZ0JBQWdCLEdBQUcsUUFBUTtpQkFDcEMsQ0FBQyxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM5QixDQUFDO0lBQ0wsQ0FBQztJQXpDUSxtQkFBbUI7UUFEL0IsaUJBQVUsRUFBRTt5Q0FNd0IsZ0NBQWlCO09BTHpDLG1CQUFtQixDQTJDL0I7SUFBRCwwQkFBQztDQUFBLEFBM0NELElBMkNDO0FBM0NZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIExvY2FsTm90aWZpY2F0aW9ucyBmcm9tIFwibmF0aXZlc2NyaXB0LWxvY2FsLW5vdGlmaWNhdGlvbnNcIjtcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgcmVzdW1lRXZlbnQsIHN1c3BlbmRFdmVudCwgb24gYXMgYXBwbGljYXRpb25PbiB9IGZyb20gXCJhcHBsaWNhdGlvblwiO1xuXG5pbXBvcnQgeyBTeXN0ZW1EYXRhU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9kYXRhLnNlcnZpY2VcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvblNlcnZpY2Uge1xuXG4gICAgYXBwSW5WaWV3OiBib29sZWFuID0gdHJ1ZTsgLy93aGV0aGVyIG9yIG5vdCB0aGUgYXBwIGlzIGN1cnJlbnRseSBvcGVuK2Rpc3BsYXllZCBvbiB0aGUgdXNlcidzIHNjcmVlblxuICAgIGxhc3ROb3RpZmljYXRpb25JZDogbnVtYmVyID0gMDsgLy90aGUgbW9zdCByZWNlbnQgbm90aWZpY2F0aW9uJ3MgaWRcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVNlcnZpY2U6IFN5c3RlbURhdGFTZXJ2aWNlKSB7XG4gICAgICAgIC8vd2hlbiB0aGUgdXNlciBicmluZ3MgdXAgdGhlIGFwcGxpY2F0aW9uIGFmdGVyIHZpZXdpbmdcbiAgICAgICAgLy9hbm90aGVyIGFwcCBvciB0aGUgZGlzcGxheSBiZWluZyBvZmZcbiAgICAgICAgYXBwbGljYXRpb25PbihyZXN1bWVFdmVudCwgKCkgPT4ge1xuICAgICAgICAgICAgIHRoaXMuc2V0QXBwSW5WaWV3KHRydWUpO1xuICAgICAgICAgICAgIHRoaXMuY2xlYXJBbGxOb3RpZmljYXRpb25zKCk7IC8vc28gdGhlIHVzZXIgZG9lc24ndCBoYXZlIHRvIGNhbmNlbCB0aGVtIG1hbnVhbGx5XG4gICAgICAgIH0pO1xuICAgICAgICAvL3doZW4gdGhlIHVzZXIgdmlld3MgYW5vdGhlciBhcHBsaWNhdGlvbiBvciB0aGUgZGlzcGxheSB0dXJucyBvZmZcbiAgICAgICAgYXBwbGljYXRpb25PbihzdXNwZW5kRXZlbnQsICgpID0+IHRoaXMuc2V0QXBwSW5WaWV3KGZhbHNlKSk7XG4gICAgfVxuXG4gICAgc2V0QXBwSW5WaWV3KHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmFwcEluVmlldyA9IHZhbDtcbiAgICB9XG5cbiAgICAvKiBDYW5jZWwgYWxsIG5vdGlmaWNhdGlvbnMgcmVjZWl2ZWQgZnJvbSB0aGlzIGFwcCB0aHVzIGZhciAqL1xuICAgIGNsZWFyQWxsTm90aWZpY2F0aW9ucygpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YVNlcnZpY2UuZ2V0VGltZXJTZXR0aW5ncygpLndhbnRzTm90aWZpY2F0aW9ucykge1xuICAgICAgICAgICAgZm9yIChsZXQgaWQgPSAwOyBpZCA8PSB0aGlzLmxhc3ROb3RpZmljYXRpb25JZDsgaWQrKykge1xuICAgICAgICAgICAgICAgIExvY2FsTm90aWZpY2F0aW9ucy5jYW5jZWwoaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyogaWYgdGhlIGFwcCBpc24ndCBiZWluZyBkaXNwbGF5ZWQgb24gdGhlIHVzZXIncyBzY3JlZW4gcmlnaHQgbm93XG4gICAgYW5kIHRoZSB1c2VyIHdhbnRzIG5vdGlmaWNhdGlvbnMsIHNlbmQgYSBsb2NhbCBub3RpZmljYXRpb24gc2F5aW5nXG4gICAgdGhhdCBhIHN0ZXAncyB0aW1lciBoYXMgZW5kZWQgKi9cbiAgICBtYWtlTm90aWZpY2F0aW9uKHN0ZXBOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFwcEluVmlldyAmJiB0aGlzLmRhdGFTZXJ2aWNlLmdldFRpbWVyU2V0dGluZ3MoKS53YW50c05vdGlmaWNhdGlvbnMpIHtcbiAgICAgICAgICAgIExvY2FsTm90aWZpY2F0aW9ucy5zY2hlZHVsZShbe1xuICAgICAgICAgICAgICAgIGlkOiB0aGlzLmxhc3ROb3RpZmljYXRpb25JZCxcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJUaW1lJ3MgdXAhXCIsXG4gICAgICAgICAgICAgICAgYm9keTogXCJUaW1lJ3MgdXAgZm9yIFwiICsgc3RlcE5hbWVcbiAgICAgICAgICAgIH1dKTtcbiAgICAgICAgICAgIHRoaXMubGFzdE5vdGlmaWNhdGlvbklkKys7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==