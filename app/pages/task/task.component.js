"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("tns-core-modules/ui/page");
var common_1 = require("@angular/common");
var pass_data_service_1 = require("../../shared/pass-data.service");
var data_service_1 = require("../../shared/data.service");
var audio_service_1 = require("../../shared/audio.service");
var share_task_service_1 = require("~/shared/share-task.service");
var keepawake_service_1 = require("~/shared/keepawake.service");
var TaskComponent = /** @class */ (function () {
    function TaskComponent(page, router, dataManager, audioService, location, dataRetriever, shareTaskService, keepAwakeService) {
        var _this = this;
        this.page = page;
        this.router = router;
        this.dataManager = dataManager;
        this.audioService = audioService;
        this.location = location;
        this.dataRetriever = dataRetriever;
        this.shareTaskService = shareTaskService;
        this.keepAwakeService = keepAwakeService;
        //if we're coming back to this page from the edit page
        this.page.on(page_1.Page.navigatingToEvent, function (event) {
            //reload the task in case the user changed it
            if (event.isBackNavigation) {
                _this.task = _this.dataManager.loadTaskById(_this.dataRetriever.identifier);
            }
            _this.keepAwakeService.keepScreenOn();
        });
        this.page.on(page_1.Page.navigatingFromEvent, function () {
            _this.keepAwakeService.letScreenTurnOff();
        });
    }
    TaskComponent.prototype.ngOnInit = function () {
        //load the task
        this.task = this.dataRetriever.data;
        //make sure the audio service is updated with any changes in settings--
        //like the user deciding they don't want vibration anymore
        this.audioService.refreshSettings();
    };
    /* Brings the user to a page where they can edit the task they're currently
    viewing. */
    TaskComponent.prototype.editTask = function () {
        this.dataRetriever.data = this.task;
        this.router.navigate(["task/edit"]);
        this.audioService.stopAlarm(); //in case an alarm is playing
    };
    TaskComponent.prototype.backPress = function () {
        this.location.back();
    };
    /* Pop up a menu the user can use to share the current task with other users */
    TaskComponent.prototype.shareTask = function () {
        this.shareTaskService.shareTask(this.task);
    };
    TaskComponent = __decorate([
        core_1.Component({
            selector: "tmr-task",
            templateUrl: "pages/task/task.component.html",
            styleUrls: ["pages/task/task.component.css"]
        }),
        __metadata("design:paramtypes", [page_1.Page, router_1.Router, data_service_1.SystemDataService,
            audio_service_1.AudioService, common_1.Location, pass_data_service_1.DataRetriever,
            share_task_service_1.ShareTaskService, keepawake_service_1.KeepAwakeService])
    ], TaskComponent);
    return TaskComponent;
}());
exports.TaskComponent = TaskComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YXNrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBeUM7QUFDekMsaURBQStEO0FBQy9ELDBDQUEyQztBQUczQyxvRUFBK0Q7QUFDL0QsMERBQThEO0FBQzlELDREQUEwRDtBQUMxRCxrRUFBK0Q7QUFDL0QsZ0VBQThEO0FBTzlEO0lBSUksdUJBQW9CLElBQVUsRUFBVSxNQUFjLEVBQVUsV0FBOEIsRUFDcEYsWUFBMEIsRUFBVSxRQUFrQixFQUFVLGFBQTRCLEVBQzVGLGdCQUFrQyxFQUFVLGdCQUFrQztRQUZ4RixpQkFjQztRQWRtQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQUNwRixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1RixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNwRixzREFBc0Q7UUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBSSxDQUFDLGlCQUFpQixFQUFFLFVBQUMsS0FBb0I7WUFDdEQsNkNBQTZDO1lBQzdDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM3RSxDQUFDO1lBQ0QsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBSSxDQUFDLG1CQUFtQixFQUFFO1lBQ25DLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFDSSxlQUFlO1FBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztRQUNwQyx1RUFBdUU7UUFDdkUsMERBQTBEO1FBQzFELElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVEO2VBQ1c7SUFDWCxnQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLDZCQUE2QjtJQUNoRSxDQUFDO0lBRUQsaUNBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELCtFQUErRTtJQUMvRSxpQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQTNDUSxhQUFhO1FBTHpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsZ0NBQWdDO1lBQzdDLFNBQVMsRUFBRSxDQUFDLCtCQUErQixDQUFDO1NBQy9DLENBQUM7eUNBSzRCLFdBQUksRUFBa0IsZUFBTSxFQUF1QixnQ0FBaUI7WUFDdEUsNEJBQVksRUFBb0IsaUJBQVEsRUFBeUIsaUNBQWE7WUFDMUUscUNBQWdCLEVBQTRCLG9DQUFnQjtPQU4vRSxhQUFhLENBNkN6QjtJQUFELG9CQUFDO0NBQUEsQUE3Q0QsSUE2Q0M7QUE3Q1ksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBQYWdlLCBOYXZpZ2F0ZWREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5cbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3Rhc2svdGFzay5tb2RlbFwiO1xuaW1wb3J0IHsgRGF0YVJldHJpZXZlciB9IGZyb20gXCIuLi8uLi9zaGFyZWQvcGFzcy1kYXRhLnNlcnZpY2VcIjtcbmltcG9ydCB7IFN5c3RlbURhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9kYXRhLnNlcnZpY2VcIjtcbmltcG9ydCB7IEF1ZGlvU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvYXVkaW8uc2VydmljZVwiO1xuaW1wb3J0IHsgU2hhcmVUYXNrU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zaGFyZS10YXNrLnNlcnZpY2VcIjtcbmltcG9ydCB7IEtlZXBBd2FrZVNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQva2VlcGF3YWtlLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwidG1yLXRhc2tcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJwYWdlcy90YXNrL3Rhc2suY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcInBhZ2VzL3Rhc2svdGFzay5jb21wb25lbnQuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIFRhc2tDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgdGFzazogVGFzaztcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgZGF0YU1hbmFnZXI6IFN5c3RlbURhdGFTZXJ2aWNlLFxuICAgICAgcHJpdmF0ZSBhdWRpb1NlcnZpY2U6IEF1ZGlvU2VydmljZSwgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sIHByaXZhdGUgZGF0YVJldHJpZXZlcjogRGF0YVJldHJpZXZlcixcbiAgICAgIHByaXZhdGUgc2hhcmVUYXNrU2VydmljZTogU2hhcmVUYXNrU2VydmljZSwgcHJpdmF0ZSBrZWVwQXdha2VTZXJ2aWNlOiBLZWVwQXdha2VTZXJ2aWNlKSB7XG4gICAgICAgIC8vaWYgd2UncmUgY29taW5nIGJhY2sgdG8gdGhpcyBwYWdlIGZyb20gdGhlIGVkaXQgcGFnZVxuICAgICAgICB0aGlzLnBhZ2Uub24oUGFnZS5uYXZpZ2F0aW5nVG9FdmVudCwgKGV2ZW50OiBOYXZpZ2F0ZWREYXRhKSA9PiB7XG4gICAgICAgICAgICAvL3JlbG9hZCB0aGUgdGFzayBpbiBjYXNlIHRoZSB1c2VyIGNoYW5nZWQgaXRcbiAgICAgICAgICAgIGlmIChldmVudC5pc0JhY2tOYXZpZ2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXNrID0gdGhpcy5kYXRhTWFuYWdlci5sb2FkVGFza0J5SWQodGhpcy5kYXRhUmV0cmlldmVyLmlkZW50aWZpZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5rZWVwQXdha2VTZXJ2aWNlLmtlZXBTY3JlZW5PbigpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wYWdlLm9uKFBhZ2UubmF2aWdhdGluZ0Zyb21FdmVudCwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5rZWVwQXdha2VTZXJ2aWNlLmxldFNjcmVlblR1cm5PZmYoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIC8vbG9hZCB0aGUgdGFza1xuICAgICAgICB0aGlzLnRhc2sgPSB0aGlzLmRhdGFSZXRyaWV2ZXIuZGF0YTtcbiAgICAgICAgLy9tYWtlIHN1cmUgdGhlIGF1ZGlvIHNlcnZpY2UgaXMgdXBkYXRlZCB3aXRoIGFueSBjaGFuZ2VzIGluIHNldHRpbmdzLS1cbiAgICAgICAgLy9saWtlIHRoZSB1c2VyIGRlY2lkaW5nIHRoZXkgZG9uJ3Qgd2FudCB2aWJyYXRpb24gYW55bW9yZVxuICAgICAgICB0aGlzLmF1ZGlvU2VydmljZS5yZWZyZXNoU2V0dGluZ3MoKTtcbiAgICB9XG5cbiAgICAvKiBCcmluZ3MgdGhlIHVzZXIgdG8gYSBwYWdlIHdoZXJlIHRoZXkgY2FuIGVkaXQgdGhlIHRhc2sgdGhleSdyZSBjdXJyZW50bHlcbiAgICB2aWV3aW5nLiAqL1xuICAgIGVkaXRUYXNrKCkge1xuICAgICAgICB0aGlzLmRhdGFSZXRyaWV2ZXIuZGF0YSA9IHRoaXMudGFzaztcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1widGFzay9lZGl0XCJdKTtcbiAgICAgICAgdGhpcy5hdWRpb1NlcnZpY2Uuc3RvcEFsYXJtKCk7IC8vaW4gY2FzZSBhbiBhbGFybSBpcyBwbGF5aW5nXG4gICAgfVxuXG4gICAgYmFja1ByZXNzKCkge1xuICAgICAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcbiAgICB9XG5cbiAgICAvKiBQb3AgdXAgYSBtZW51IHRoZSB1c2VyIGNhbiB1c2UgdG8gc2hhcmUgdGhlIGN1cnJlbnQgdGFzayB3aXRoIG90aGVyIHVzZXJzICovXG4gICAgc2hhcmVUYXNrKCkge1xuICAgICAgICB0aGlzLnNoYXJlVGFza1NlcnZpY2Uuc2hhcmVUYXNrKHRoaXMudGFzayk7XG4gICAgfVxuICAgICAgICBcbn1cblxuIl19