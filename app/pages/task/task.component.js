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
var TaskComponent = /** @class */ (function () {
    function TaskComponent(page, router, dataManager, audioService, location, dataRetriever, shareTaskService) {
        var _this = this;
        this.page = page;
        this.router = router;
        this.dataManager = dataManager;
        this.audioService = audioService;
        this.location = location;
        this.dataRetriever = dataRetriever;
        this.shareTaskService = shareTaskService;
        //if we're coming back to this page from the edit page
        this.page.on(page_1.Page.navigatingToEvent, function (event) {
            //reload the task in case the user changed it
            if (event.isBackNavigation) {
                _this.task = _this.dataManager.loadTaskById(_this.dataRetriever.identifier);
            }
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
            share_task_service_1.ShareTaskService])
    ], TaskComponent);
    return TaskComponent;
}());
exports.TaskComponent = TaskComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YXNrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBeUM7QUFDekMsaURBQStEO0FBQy9ELDBDQUEyQztBQUczQyxvRUFBK0Q7QUFDL0QsMERBQThEO0FBQzlELDREQUEwRDtBQUMxRCxrRUFBK0Q7QUFPL0Q7SUFJSSx1QkFBb0IsSUFBVSxFQUFVLE1BQWMsRUFBVSxXQUE4QixFQUNwRixZQUEwQixFQUFVLFFBQWtCLEVBQVUsYUFBNEIsRUFDNUYsZ0JBQWtDO1FBRjVDLGlCQVVDO1FBVm1CLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQW1CO1FBQ3BGLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVGLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDeEMsc0RBQXNEO1FBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQUksQ0FBQyxpQkFBaUIsRUFBRSxVQUFDLEtBQW9CO1lBQ3RELDZDQUE2QztZQUM3QyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixLQUFJLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDN0UsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFDSSxlQUFlO1FBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztRQUNwQyx1RUFBdUU7UUFDdkUsMERBQTBEO1FBQzFELElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVEO2VBQ1c7SUFDWCxnQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLDZCQUE2QjtJQUNoRSxDQUFDO0lBRUQsaUNBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELCtFQUErRTtJQUMvRSxpQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQXZDUSxhQUFhO1FBTHpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsZ0NBQWdDO1lBQzdDLFNBQVMsRUFBRSxDQUFDLCtCQUErQixDQUFDO1NBQy9DLENBQUM7eUNBSzRCLFdBQUksRUFBa0IsZUFBTSxFQUF1QixnQ0FBaUI7WUFDdEUsNEJBQVksRUFBb0IsaUJBQVEsRUFBeUIsaUNBQWE7WUFDMUUscUNBQWdCO09BTm5DLGFBQWEsQ0F5Q3pCO0lBQUQsb0JBQUM7Q0FBQSxBQXpDRCxJQXlDQztBQXpDWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFBhZ2UsIE5hdmlnYXRlZERhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcblxuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuLi8uLi9zaGFyZWQvdGFzay90YXNrLm1vZGVsXCI7XG5pbXBvcnQgeyBEYXRhUmV0cmlldmVyIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9wYXNzLWRhdGEuc2VydmljZVwiO1xuaW1wb3J0IHsgU3lzdGVtRGF0YVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2RhdGEuc2VydmljZVwiO1xuaW1wb3J0IHsgQXVkaW9TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9hdWRpby5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBTaGFyZVRhc2tTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3NoYXJlLXRhc2suc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJ0bXItdGFza1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcInBhZ2VzL3Rhc2svdGFzay5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wicGFnZXMvdGFzay90YXNrLmNvbXBvbmVudC5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgVGFza0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICB0YXNrOiBUYXNrO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBkYXRhTWFuYWdlcjogU3lzdGVtRGF0YVNlcnZpY2UsXG4gICAgICBwcml2YXRlIGF1ZGlvU2VydmljZTogQXVkaW9TZXJ2aWNlLCBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbiwgcHJpdmF0ZSBkYXRhUmV0cmlldmVyOiBEYXRhUmV0cmlldmVyLFxuICAgICAgcHJpdmF0ZSBzaGFyZVRhc2tTZXJ2aWNlOiBTaGFyZVRhc2tTZXJ2aWNlKSB7XG4gICAgICAgIC8vaWYgd2UncmUgY29taW5nIGJhY2sgdG8gdGhpcyBwYWdlIGZyb20gdGhlIGVkaXQgcGFnZVxuICAgICAgICB0aGlzLnBhZ2Uub24oUGFnZS5uYXZpZ2F0aW5nVG9FdmVudCwgKGV2ZW50OiBOYXZpZ2F0ZWREYXRhKSA9PiB7XG4gICAgICAgICAgICAvL3JlbG9hZCB0aGUgdGFzayBpbiBjYXNlIHRoZSB1c2VyIGNoYW5nZWQgaXRcbiAgICAgICAgICAgIGlmIChldmVudC5pc0JhY2tOYXZpZ2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXNrID0gdGhpcy5kYXRhTWFuYWdlci5sb2FkVGFza0J5SWQodGhpcy5kYXRhUmV0cmlldmVyLmlkZW50aWZpZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgLy9sb2FkIHRoZSB0YXNrXG4gICAgICAgIHRoaXMudGFzayA9IHRoaXMuZGF0YVJldHJpZXZlci5kYXRhO1xuICAgICAgICAvL21ha2Ugc3VyZSB0aGUgYXVkaW8gc2VydmljZSBpcyB1cGRhdGVkIHdpdGggYW55IGNoYW5nZXMgaW4gc2V0dGluZ3MtLVxuICAgICAgICAvL2xpa2UgdGhlIHVzZXIgZGVjaWRpbmcgdGhleSBkb24ndCB3YW50IHZpYnJhdGlvbiBhbnltb3JlXG4gICAgICAgIHRoaXMuYXVkaW9TZXJ2aWNlLnJlZnJlc2hTZXR0aW5ncygpO1xuICAgIH1cblxuICAgIC8qIEJyaW5ncyB0aGUgdXNlciB0byBhIHBhZ2Ugd2hlcmUgdGhleSBjYW4gZWRpdCB0aGUgdGFzayB0aGV5J3JlIGN1cnJlbnRseVxuICAgIHZpZXdpbmcuICovXG4gICAgZWRpdFRhc2soKSB7XG4gICAgICAgIHRoaXMuZGF0YVJldHJpZXZlci5kYXRhID0gdGhpcy50YXNrO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJ0YXNrL2VkaXRcIl0pO1xuICAgICAgICB0aGlzLmF1ZGlvU2VydmljZS5zdG9wQWxhcm0oKTsgLy9pbiBjYXNlIGFuIGFsYXJtIGlzIHBsYXlpbmdcbiAgICB9XG5cbiAgICBiYWNrUHJlc3MoKSB7XG4gICAgICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xuICAgIH1cblxuICAgIC8qIFBvcCB1cCBhIG1lbnUgdGhlIHVzZXIgY2FuIHVzZSB0byBzaGFyZSB0aGUgY3VycmVudCB0YXNrIHdpdGggb3RoZXIgdXNlcnMgKi9cbiAgICBzaGFyZVRhc2soKSB7XG4gICAgICAgIHRoaXMuc2hhcmVUYXNrU2VydmljZS5zaGFyZVRhc2sodGhpcy50YXNrKTtcbiAgICB9XG4gICAgICAgIFxufVxuXG4iXX0=