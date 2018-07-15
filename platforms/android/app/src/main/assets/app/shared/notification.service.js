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
        application_1.on(application_1.resumeEvent, function () {
            _this.setAppInView(true);
            _this.clearAllNotifications(); //so the user doesn't have to cancel them manually
        });
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
    /* if the app isn't being displayed on the user's screen right now,
    send a local notification saying that a step's timer has ended */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJub3RpZmljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFFQUF1RTtBQUN2RSxzQ0FBMkM7QUFDM0MsMkNBQTZFO0FBQzdFLHNEQUEwRDtBQUcxRDtJQUtJLDZCQUFvQixXQUE4QjtRQUFsRCxpQkFNQztRQU5tQixnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFIbEQsY0FBUyxHQUFZLElBQUksQ0FBQyxDQUFDLHlFQUF5RTtRQUNwRyx1QkFBa0IsR0FBVyxDQUFDLENBQUMsQ0FBQyxtQ0FBbUM7UUFHL0QsZ0JBQWEsQ0FBQyx5QkFBVyxFQUFFO1lBQ3RCLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEIsS0FBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxrREFBa0Q7UUFDckYsQ0FBQyxDQUFDLENBQUM7UUFDSCxnQkFBYSxDQUFDLDBCQUFZLEVBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQXhCLENBQXdCLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsMENBQVksR0FBWixVQUFhLEdBQVk7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7SUFDekIsQ0FBQztJQUVELDhEQUE4RDtJQUM5RCxtREFBcUIsR0FBckI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQ3pELEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7Z0JBQ25ELGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNsQyxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFRDtxRUFDaUU7SUFDakUsOENBQWdCLEdBQWhCLFVBQWlCLFFBQWdCO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQzVFLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUN6QixFQUFFLEVBQUUsSUFBSSxDQUFDLGtCQUFrQjtvQkFDM0IsS0FBSyxFQUFFLFlBQVk7b0JBQ25CLElBQUksRUFBRSxnQkFBZ0IsR0FBRyxRQUFRO2lCQUNwQyxDQUFDLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzlCLENBQUM7SUFDTCxDQUFDO0lBckNRLG1CQUFtQjtRQUQvQixpQkFBVSxFQUFFO3lDQU13QixnQ0FBaUI7T0FMekMsbUJBQW1CLENBdUMvQjtJQUFELDBCQUFDO0NBQUEsQUF2Q0QsSUF1Q0M7QUF2Q1ksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgTG9jYWxOb3RpZmljYXRpb25zIGZyb20gXCJuYXRpdmVzY3JpcHQtbG9jYWwtbm90aWZpY2F0aW9uc1wiO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyByZXN1bWVFdmVudCwgc3VzcGVuZEV2ZW50LCBvbiBhcyBhcHBsaWNhdGlvbk9uIH0gZnJvbSBcImFwcGxpY2F0aW9uXCI7XG5pbXBvcnQgeyBTeXN0ZW1EYXRhU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9kYXRhLnNlcnZpY2VcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvblNlcnZpY2Uge1xuXG4gICAgYXBwSW5WaWV3OiBib29sZWFuID0gdHJ1ZTsgLy93aGV0aGVyIG9yIG5vdCB0aGUgYXBwIGlzIGN1cnJlbnRseSBvcGVuK2Rpc3BsYXllZCBvbiB0aGUgdXNlcidzIHNjcmVlblxuICAgIGxhc3ROb3RpZmljYXRpb25JZDogbnVtYmVyID0gMDsgLy90aGUgbW9zdCByZWNlbnQgbm90aWZpY2F0aW9uJ3MgaWRcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YVNlcnZpY2U6IFN5c3RlbURhdGFTZXJ2aWNlKSB7XG4gICAgICAgIGFwcGxpY2F0aW9uT24ocmVzdW1lRXZlbnQsICgpID0+IHtcbiAgICAgICAgICAgICB0aGlzLnNldEFwcEluVmlldyh0cnVlKTtcbiAgICAgICAgICAgICB0aGlzLmNsZWFyQWxsTm90aWZpY2F0aW9ucygpOyAvL3NvIHRoZSB1c2VyIGRvZXNuJ3QgaGF2ZSB0byBjYW5jZWwgdGhlbSBtYW51YWxseVxuICAgICAgICB9KTtcbiAgICAgICAgYXBwbGljYXRpb25PbihzdXNwZW5kRXZlbnQsICgpID0+IHRoaXMuc2V0QXBwSW5WaWV3KGZhbHNlKSk7XG4gICAgfVxuXG4gICAgc2V0QXBwSW5WaWV3KHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmFwcEluVmlldyA9IHZhbDtcbiAgICB9XG5cbiAgICAvKiBDYW5jZWwgYWxsIG5vdGlmaWNhdGlvbnMgcmVjZWl2ZWQgZnJvbSB0aGlzIGFwcCB0aHVzIGZhciAqL1xuICAgIGNsZWFyQWxsTm90aWZpY2F0aW9ucygpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YVNlcnZpY2UuZ2V0VGltZXJTZXR0aW5ncygpLndhbnRzTm90aWZpY2F0aW9ucykge1xuICAgICAgICAgICAgZm9yIChsZXQgaWQgPSAwOyBpZCA8PSB0aGlzLmxhc3ROb3RpZmljYXRpb25JZDsgaWQrKykge1xuICAgICAgICAgICAgICAgIExvY2FsTm90aWZpY2F0aW9ucy5jYW5jZWwoaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyogaWYgdGhlIGFwcCBpc24ndCBiZWluZyBkaXNwbGF5ZWQgb24gdGhlIHVzZXIncyBzY3JlZW4gcmlnaHQgbm93LFxuICAgIHNlbmQgYSBsb2NhbCBub3RpZmljYXRpb24gc2F5aW5nIHRoYXQgYSBzdGVwJ3MgdGltZXIgaGFzIGVuZGVkICovXG4gICAgbWFrZU5vdGlmaWNhdGlvbihzdGVwTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5hcHBJblZpZXcgJiYgdGhpcy5kYXRhU2VydmljZS5nZXRUaW1lclNldHRpbmdzKCkud2FudHNOb3RpZmljYXRpb25zKSB7XG4gICAgICAgICAgICBMb2NhbE5vdGlmaWNhdGlvbnMuc2NoZWR1bGUoW3tcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5sYXN0Tm90aWZpY2F0aW9uSWQsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiVGltZSdzIHVwIVwiLFxuICAgICAgICAgICAgICAgIGJvZHk6IFwiVGltZSdzIHVwIGZvciBcIiArIHN0ZXBOYW1lXG4gICAgICAgICAgICB9XSk7XG4gICAgICAgICAgICB0aGlzLmxhc3ROb3RpZmljYXRpb25JZCsrO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=