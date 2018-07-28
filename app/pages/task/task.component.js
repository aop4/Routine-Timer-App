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
            if (event.isBackNavigation) {
                _this.task = _this.dataManager.loadTaskById(_this.dataRetriever.identifier);
            }
        });
    }
    TaskComponent.prototype.ngOnInit = function () {
        this.task = this.dataRetriever.data;
        //make sure the audio service is updated with any changes in settings--
        //like the user deciding they don't want vibration anymore
        this.audioService.refreshSettings();
    };
    TaskComponent.prototype.editTask = function () {
        this.dataRetriever.data = this.task;
        this.router.navigate(["task/edit"]);
        this.audioService.stopAlarm(); //in case an alarm is playing
    };
    TaskComponent.prototype.backPress = function () {
        this.location.back();
    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YXNrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBeUM7QUFDekMsaURBQStEO0FBQy9ELDBDQUEyQztBQUczQyxvRUFBK0Q7QUFDL0QsMERBQThEO0FBQzlELDREQUEwRDtBQUMxRCxrRUFBK0Q7QUFPL0Q7SUFJSSx1QkFBb0IsSUFBVSxFQUFVLE1BQWMsRUFBVSxXQUE4QixFQUNwRixZQUEwQixFQUFVLFFBQWtCLEVBQVUsYUFBNEIsRUFDNUYsZ0JBQWtDO1FBRjVDLGlCQVNDO1FBVG1CLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQW1CO1FBQ3BGLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVGLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDeEMsc0RBQXNEO1FBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQUksQ0FBQyxpQkFBaUIsRUFBRSxVQUFDLEtBQW9CO1lBQ3RELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM3RSxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsZ0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFDcEMsdUVBQXVFO1FBQ3ZFLDBEQUEwRDtRQUMxRCxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLDZCQUE2QjtJQUNoRSxDQUFDO0lBRUQsaUNBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELGlDQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBbENRLGFBQWE7UUFMekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSxnQ0FBZ0M7WUFDN0MsU0FBUyxFQUFFLENBQUMsK0JBQStCLENBQUM7U0FDL0MsQ0FBQzt5Q0FLNEIsV0FBSSxFQUFrQixlQUFNLEVBQXVCLGdDQUFpQjtZQUN0RSw0QkFBWSxFQUFvQixpQkFBUSxFQUF5QixpQ0FBYTtZQUMxRSxxQ0FBZ0I7T0FObkMsYUFBYSxDQW9DekI7SUFBRCxvQkFBQztDQUFBLEFBcENELElBb0NDO0FBcENZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUGFnZSwgTmF2aWdhdGVkRGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuXG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC90YXNrL3Rhc2subW9kZWxcIjtcbmltcG9ydCB7IERhdGFSZXRyaWV2ZXIgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3Bhc3MtZGF0YS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBTeXN0ZW1EYXRhU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvZGF0YS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBBdWRpb1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2F1ZGlvLnNlcnZpY2VcIjtcbmltcG9ydCB7IFNoYXJlVGFza1NlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvc2hhcmUtdGFzay5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInRtci10YXNrXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwicGFnZXMvdGFzay90YXNrLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJwYWdlcy90YXNrL3Rhc2suY29tcG9uZW50LmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBUYXNrQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHRhc2s6IFRhc2s7XG4gICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGRhdGFNYW5hZ2VyOiBTeXN0ZW1EYXRhU2VydmljZSxcbiAgICAgIHByaXZhdGUgYXVkaW9TZXJ2aWNlOiBBdWRpb1NlcnZpY2UsIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uLCBwcml2YXRlIGRhdGFSZXRyaWV2ZXI6IERhdGFSZXRyaWV2ZXIsXG4gICAgICBwcml2YXRlIHNoYXJlVGFza1NlcnZpY2U6IFNoYXJlVGFza1NlcnZpY2UpIHtcbiAgICAgICAgLy9pZiB3ZSdyZSBjb21pbmcgYmFjayB0byB0aGlzIHBhZ2UgZnJvbSB0aGUgZWRpdCBwYWdlXG4gICAgICAgIHRoaXMucGFnZS5vbihQYWdlLm5hdmlnYXRpbmdUb0V2ZW50LCAoZXZlbnQ6IE5hdmlnYXRlZERhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5pc0JhY2tOYXZpZ2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXNrID0gdGhpcy5kYXRhTWFuYWdlci5sb2FkVGFza0J5SWQodGhpcy5kYXRhUmV0cmlldmVyLmlkZW50aWZpZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy50YXNrID0gdGhpcy5kYXRhUmV0cmlldmVyLmRhdGE7XG4gICAgICAgIC8vbWFrZSBzdXJlIHRoZSBhdWRpbyBzZXJ2aWNlIGlzIHVwZGF0ZWQgd2l0aCBhbnkgY2hhbmdlcyBpbiBzZXR0aW5ncy0tXG4gICAgICAgIC8vbGlrZSB0aGUgdXNlciBkZWNpZGluZyB0aGV5IGRvbid0IHdhbnQgdmlicmF0aW9uIGFueW1vcmVcbiAgICAgICAgdGhpcy5hdWRpb1NlcnZpY2UucmVmcmVzaFNldHRpbmdzKCk7XG4gICAgfVxuXG4gICAgZWRpdFRhc2soKSB7XG4gICAgICAgIHRoaXMuZGF0YVJldHJpZXZlci5kYXRhID0gdGhpcy50YXNrO1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCJ0YXNrL2VkaXRcIl0pO1xuICAgICAgICB0aGlzLmF1ZGlvU2VydmljZS5zdG9wQWxhcm0oKTsgLy9pbiBjYXNlIGFuIGFsYXJtIGlzIHBsYXlpbmdcbiAgICB9XG5cbiAgICBiYWNrUHJlc3MoKSB7XG4gICAgICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xuICAgIH1cblxuICAgIHNoYXJlVGFzaygpIHtcbiAgICAgICAgdGhpcy5zaGFyZVRhc2tTZXJ2aWNlLnNoYXJlVGFzayh0aGlzLnRhc2spO1xuICAgIH1cbiAgICAgICAgXG59XG5cbiJdfQ==