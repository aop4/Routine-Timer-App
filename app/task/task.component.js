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
        //make sure the audio service is updated with any changes in settings--
        //like the user deciding they don't want vibration anymore
        this.audioService.refreshSettings();
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
            styleUrls: ["task/task.component.css"]
        }),
        __metadata("design:paramtypes", [page_1.Page, router_1.Router, data_service_1.SystemDataService,
            audio_service_1.AudioService])
    ], TaskComponent);
    return TaskComponent;
}());
exports.TaskComponent = TaskComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YXNrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBeUM7QUFDekMsaURBQStEO0FBRy9ELGlFQUE0RDtBQUU1RCx1REFBMkQ7QUFDM0QseURBQXVEO0FBTXZEO0lBSUksdUJBQW9CLElBQVUsRUFBVSxNQUFjLEVBQVUsV0FBOEIsRUFDcEYsWUFBMEI7UUFEcEMsaUJBUUM7UUFSbUIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFDcEYsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDaEMsc0RBQXNEO1FBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQUksQ0FBQyxpQkFBaUIsRUFBRSxVQUFDLEtBQW9CO1lBQ3RELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLEtBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsaUNBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4RSxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsZ0NBQVEsR0FBUjtRQUNJLCtEQUErRDtRQUMvRCxJQUFJLENBQUMsSUFBSSxHQUFHLGlDQUFhLENBQUMsSUFBSSxDQUFDO1FBQy9CLHVFQUF1RTtRQUN2RSwwREFBMEQ7UUFDMUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQsZ0NBQVEsR0FBUjtRQUNJLGlDQUFhLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyw2QkFBNkI7SUFDaEUsQ0FBQztJQTFCUSxhQUFhO1FBTHpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsMEJBQTBCO1lBQ3ZDLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO1NBQ3pDLENBQUM7eUNBSzRCLFdBQUksRUFBa0IsZUFBTSxFQUF1QixnQ0FBaUI7WUFDdEUsNEJBQVk7T0FMM0IsYUFBYSxDQTRCekI7SUFBRCxvQkFBQztDQUFBLEFBNUJELElBNEJDO0FBNUJZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUGFnZSwgTmF2aWdhdGVkRGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi4vc2hhcmVkL3Rhc2svdGFzay5tb2RlbFwiO1xuaW1wb3J0IHsgU3RlcCB9IGZyb20gXCIuLi9zaGFyZWQvc3RlcC9zdGVwLm1vZGVsXCI7XG5pbXBvcnQgeyBEYXRhUmV0cmlldmVyIH0gZnJvbSBcIi4uL3NoYXJlZC9wYXNzLWRhdGEuc2VydmljZVwiO1xuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEsIFJhZExpc3RWaWV3IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1saXN0dmlld1wiO1xuaW1wb3J0IHsgU3lzdGVtRGF0YVNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2RhdGEuc2VydmljZVwiO1xuaW1wb3J0IHsgQXVkaW9TZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9hdWRpby5zZXJ2aWNlXCI7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJ0bXItdGFza1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcInRhc2svdGFzay5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1widGFzay90YXNrLmNvbXBvbmVudC5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgVGFza0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICB0YXNrOiBUYXNrO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBkYXRhTWFuYWdlcjogU3lzdGVtRGF0YVNlcnZpY2UsXG4gICAgICBwcml2YXRlIGF1ZGlvU2VydmljZTogQXVkaW9TZXJ2aWNlKSB7XG4gICAgICAgIC8vaWYgd2UncmUgY29taW5nIGJhY2sgdG8gdGhpcyBwYWdlIGZyb20gdGhlIGVkaXQgcGFnZVxuICAgICAgICB0aGlzLnBhZ2Uub24oUGFnZS5uYXZpZ2F0aW5nVG9FdmVudCwgKGV2ZW50OiBOYXZpZ2F0ZWREYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuaXNCYWNrTmF2aWdhdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMudGFzayA9IHRoaXMuZGF0YU1hbmFnZXIubG9hZFRhc2tCeUlkKERhdGFSZXRyaWV2ZXIuaWRlbnRpZmllcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICAvL3doZW4gd2UncmUgbm90IGNvbWluZyBiYWNrIHRvIHRoaXMgcGFnZSBmcm9tIHRoZSBlZGl0aW5nIHBhZ2VcbiAgICAgICAgdGhpcy50YXNrID0gRGF0YVJldHJpZXZlci5kYXRhO1xuICAgICAgICAvL21ha2Ugc3VyZSB0aGUgYXVkaW8gc2VydmljZSBpcyB1cGRhdGVkIHdpdGggYW55IGNoYW5nZXMgaW4gc2V0dGluZ3MtLVxuICAgICAgICAvL2xpa2UgdGhlIHVzZXIgZGVjaWRpbmcgdGhleSBkb24ndCB3YW50IHZpYnJhdGlvbiBhbnltb3JlXG4gICAgICAgIHRoaXMuYXVkaW9TZXJ2aWNlLnJlZnJlc2hTZXR0aW5ncygpO1xuICAgIH1cblxuICAgIGVkaXRUYXNrKCkge1xuICAgICAgICBEYXRhUmV0cmlldmVyLmRhdGEgPSB0aGlzLnRhc2s7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcInRhc2svZWRpdFwiXSk7XG4gICAgICAgIHRoaXMuYXVkaW9TZXJ2aWNlLnN0b3BBbGFybSgpOyAvL2luIGNhc2UgYW4gYWxhcm0gaXMgcGxheWluZ1xuICAgIH1cbiAgICAgICAgXG59XG5cbiJdfQ==