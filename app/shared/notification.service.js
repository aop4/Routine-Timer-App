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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJub3RpZmljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFFQUF1RTtBQUN2RSxzQ0FBMkM7QUFDM0MsMkNBQTZFO0FBRTdFLHNEQUEwRDtBQUcxRDtJQUtJLDZCQUFvQixXQUE4QjtRQUFsRCxpQkFNQztRQU5tQixnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFIbEQsY0FBUyxHQUFZLElBQUksQ0FBQyxDQUFDLHlFQUF5RTtRQUNwRyx1QkFBa0IsR0FBVyxDQUFDLENBQUMsQ0FBQyxtQ0FBbUM7UUFHL0QsZ0JBQWEsQ0FBQyx5QkFBVyxFQUFFO1lBQ3RCLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEIsS0FBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxrREFBa0Q7UUFDckYsQ0FBQyxDQUFDLENBQUM7UUFDSCxnQkFBYSxDQUFDLDBCQUFZLEVBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQXhCLENBQXdCLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsMENBQVksR0FBWixVQUFhLEdBQVk7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7SUFDekIsQ0FBQztJQUVELDhEQUE4RDtJQUM5RCxtREFBcUIsR0FBckI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQ3pELEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7Z0JBQ25ELGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNsQyxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFRDtxRUFDaUU7SUFDakUsOENBQWdCLEdBQWhCLFVBQWlCLFFBQWdCO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQzVFLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUN6QixFQUFFLEVBQUUsSUFBSSxDQUFDLGtCQUFrQjtvQkFDM0IsS0FBSyxFQUFFLFlBQVk7b0JBQ25CLElBQUksRUFBRSxnQkFBZ0IsR0FBRyxRQUFRO2lCQUNwQyxDQUFDLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzlCLENBQUM7SUFDTCxDQUFDO0lBckNRLG1CQUFtQjtRQUQvQixpQkFBVSxFQUFFO3lDQU13QixnQ0FBaUI7T0FMekMsbUJBQW1CLENBdUMvQjtJQUFELDBCQUFDO0NBQUEsQUF2Q0QsSUF1Q0M7QUF2Q1ksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgTG9jYWxOb3RpZmljYXRpb25zIGZyb20gXCJuYXRpdmVzY3JpcHQtbG9jYWwtbm90aWZpY2F0aW9uc1wiO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyByZXN1bWVFdmVudCwgc3VzcGVuZEV2ZW50LCBvbiBhcyBhcHBsaWNhdGlvbk9uIH0gZnJvbSBcImFwcGxpY2F0aW9uXCI7XG5cbmltcG9ydCB7IFN5c3RlbURhdGFTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL2RhdGEuc2VydmljZVwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uU2VydmljZSB7XG5cbiAgICBhcHBJblZpZXc6IGJvb2xlYW4gPSB0cnVlOyAvL3doZXRoZXIgb3Igbm90IHRoZSBhcHAgaXMgY3VycmVudGx5IG9wZW4rZGlzcGxheWVkIG9uIHRoZSB1c2VyJ3Mgc2NyZWVuXG4gICAgbGFzdE5vdGlmaWNhdGlvbklkOiBudW1iZXIgPSAwOyAvL3RoZSBtb3N0IHJlY2VudCBub3RpZmljYXRpb24ncyBpZFxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU2VydmljZTogU3lzdGVtRGF0YVNlcnZpY2UpIHtcbiAgICAgICAgYXBwbGljYXRpb25PbihyZXN1bWVFdmVudCwgKCkgPT4ge1xuICAgICAgICAgICAgIHRoaXMuc2V0QXBwSW5WaWV3KHRydWUpO1xuICAgICAgICAgICAgIHRoaXMuY2xlYXJBbGxOb3RpZmljYXRpb25zKCk7IC8vc28gdGhlIHVzZXIgZG9lc24ndCBoYXZlIHRvIGNhbmNlbCB0aGVtIG1hbnVhbGx5XG4gICAgICAgIH0pO1xuICAgICAgICBhcHBsaWNhdGlvbk9uKHN1c3BlbmRFdmVudCwgKCkgPT4gdGhpcy5zZXRBcHBJblZpZXcoZmFsc2UpKTtcbiAgICB9XG5cbiAgICBzZXRBcHBJblZpZXcodmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuYXBwSW5WaWV3ID0gdmFsO1xuICAgIH1cblxuICAgIC8qIENhbmNlbCBhbGwgbm90aWZpY2F0aW9ucyByZWNlaXZlZCBmcm9tIHRoaXMgYXBwIHRodXMgZmFyICovXG4gICAgY2xlYXJBbGxOb3RpZmljYXRpb25zKCkge1xuICAgICAgICBpZiAodGhpcy5kYXRhU2VydmljZS5nZXRUaW1lclNldHRpbmdzKCkud2FudHNOb3RpZmljYXRpb25zKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpZCA9IDA7IGlkIDw9IHRoaXMubGFzdE5vdGlmaWNhdGlvbklkOyBpZCsrKSB7XG4gICAgICAgICAgICAgICAgTG9jYWxOb3RpZmljYXRpb25zLmNhbmNlbChpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBpZiB0aGUgYXBwIGlzbid0IGJlaW5nIGRpc3BsYXllZCBvbiB0aGUgdXNlcidzIHNjcmVlbiByaWdodCBub3csXG4gICAgc2VuZCBhIGxvY2FsIG5vdGlmaWNhdGlvbiBzYXlpbmcgdGhhdCBhIHN0ZXAncyB0aW1lciBoYXMgZW5kZWQgKi9cbiAgICBtYWtlTm90aWZpY2F0aW9uKHN0ZXBOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFwcEluVmlldyAmJiB0aGlzLmRhdGFTZXJ2aWNlLmdldFRpbWVyU2V0dGluZ3MoKS53YW50c05vdGlmaWNhdGlvbnMpIHtcbiAgICAgICAgICAgIExvY2FsTm90aWZpY2F0aW9ucy5zY2hlZHVsZShbe1xuICAgICAgICAgICAgICAgIGlkOiB0aGlzLmxhc3ROb3RpZmljYXRpb25JZCxcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJUaW1lJ3MgdXAhXCIsXG4gICAgICAgICAgICAgICAgYm9keTogXCJUaW1lJ3MgdXAgZm9yIFwiICsgc3RlcE5hbWVcbiAgICAgICAgICAgIH1dKTtcbiAgICAgICAgICAgIHRoaXMubGFzdE5vdGlmaWNhdGlvbklkKys7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==