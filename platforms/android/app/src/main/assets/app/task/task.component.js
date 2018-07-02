"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("tns-core-modules/ui/page");
var pass_data_service_1 = require("../shared/pass-data.service");
var data_service_1 = require("../shared/data.service");
var audio_service_1 = require("../shared/audio.service");
var TaskComponent = /** @class */ (function () {
    function TaskComponent(page, router, dataManager, audioService) {
        var _this = this;
        this.page = page;
        this.router = router;
        this.dataManager = dataManager;
        this.audioService = audioService;
        //if we're coming back to this page from the edit page
        this.page.on(page_1.Page.navigatingToEvent, function (event) {
            if (event.isBackNavigation) {
                _this.task = _this.dataManager.loadTaskById(pass_data_service_1.DataRetriever.identifier);
            }
        });
    }
    TaskComponent.prototype.ngOnInit = function () {
        //when we're not coming back to this page from the editing page
        this.task = pass_data_service_1.DataRetriever.data;
    };
    TaskComponent.prototype.editTask = function () {
        pass_data_service_1.DataRetriever.data = this.task;
        this.router.navigate(["task/edit"]);
        this.audioService.stopAlarm(); //in case an alarm is playing
    };
    TaskComponent = __decorate([
        core_1.Component({
            selector: "tmr-task",
            templateUrl: "task/task.component.html",
            styleUrls: ["task/task.component.css"],
            providers: [data_service_1.SystemDataService]
        }),
        __metadata("design:paramtypes", [page_1.Page, router_1.Router, data_service_1.SystemDataService,
            audio_service_1.AudioService])
    ], TaskComponent);
    return TaskComponent;
}());
exports.TaskComponent = TaskComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YXNrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBeUM7QUFDekMsaURBQStEO0FBRy9ELGlFQUE0RDtBQUU1RCx1REFBMkQ7QUFDM0QseURBQXVEO0FBT3ZEO0lBSUksdUJBQW9CLElBQVUsRUFBVSxNQUFjLEVBQVUsV0FBOEIsRUFDcEYsWUFBMEI7UUFEcEMsaUJBUUM7UUFSbUIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFDcEYsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDaEMsc0RBQXNEO1FBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQUksQ0FBQyxpQkFBaUIsRUFBRSxVQUFDLEtBQW9CO1lBQ3RELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsaUNBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4RSxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsZ0NBQVEsR0FBUjtRQUNJLCtEQUErRDtRQUMvRCxJQUFJLENBQUMsSUFBSSxHQUFHLGlDQUFhLENBQUMsSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQ0ksaUNBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLDZCQUE2QjtJQUNoRSxDQUFDO0lBdkJRLGFBQWE7UUFOekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7WUFDdEMsU0FBUyxFQUFFLENBQUMsZ0NBQWlCLENBQUM7U0FDakMsQ0FBQzt5Q0FLNEIsV0FBSSxFQUFrQixlQUFNLEVBQXVCLGdDQUFpQjtZQUN0RSw0QkFBWTtPQUwzQixhQUFhLENBeUJ6QjtJQUFELG9CQUFDO0NBQUEsQUF6QkQsSUF5QkM7QUF6Qlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgUGFnZSwgTmF2aWdhdGVkRGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcclxuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuLi9zaGFyZWQvdGFzay90YXNrLm1vZGVsXCI7XHJcbmltcG9ydCB7IFN0ZXAgfSBmcm9tIFwiLi4vc2hhcmVkL3N0ZXAvc3RlcC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBEYXRhUmV0cmlldmVyIH0gZnJvbSBcIi4uL3NoYXJlZC9wYXNzLWRhdGEuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSwgUmFkTGlzdFZpZXcgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3XCI7XHJcbmltcG9ydCB7IFN5c3RlbURhdGFTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9kYXRhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQXVkaW9TZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9hdWRpby5zZXJ2aWNlXCI7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwidG1yLXRhc2tcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcInRhc2svdGFzay5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCJ0YXNrL3Rhc2suY29tcG9uZW50LmNzc1wiXSxcclxuICAgIHByb3ZpZGVyczogW1N5c3RlbURhdGFTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFza0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgdGFzazogVGFzaztcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlLCBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIGRhdGFNYW5hZ2VyOiBTeXN0ZW1EYXRhU2VydmljZSxcclxuICAgICAgcHJpdmF0ZSBhdWRpb1NlcnZpY2U6IEF1ZGlvU2VydmljZSkge1xyXG4gICAgICAgIC8vaWYgd2UncmUgY29taW5nIGJhY2sgdG8gdGhpcyBwYWdlIGZyb20gdGhlIGVkaXQgcGFnZVxyXG4gICAgICAgIHRoaXMucGFnZS5vbihQYWdlLm5hdmlnYXRpbmdUb0V2ZW50LCAoZXZlbnQ6IE5hdmlnYXRlZERhdGEpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmlzQmFja05hdmlnYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFzayA9IHRoaXMuZGF0YU1hbmFnZXIubG9hZFRhc2tCeUlkKERhdGFSZXRyaWV2ZXIuaWRlbnRpZmllcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICAvL3doZW4gd2UncmUgbm90IGNvbWluZyBiYWNrIHRvIHRoaXMgcGFnZSBmcm9tIHRoZSBlZGl0aW5nIHBhZ2VcclxuICAgICAgICB0aGlzLnRhc2sgPSBEYXRhUmV0cmlldmVyLmRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgZWRpdFRhc2soKSB7XHJcbiAgICAgICAgRGF0YVJldHJpZXZlci5kYXRhID0gdGhpcy50YXNrO1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcInRhc2svZWRpdFwiXSk7XHJcbiAgICAgICAgdGhpcy5hdWRpb1NlcnZpY2Uuc3RvcEFsYXJtKCk7IC8vaW4gY2FzZSBhbiBhbGFybSBpcyBwbGF5aW5nXHJcbiAgICB9XHJcbiAgICAgICAgXHJcbn1cclxuXHJcbiJdfQ==