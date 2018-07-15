"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("tns-core-modules/ui/page");
var pass_data_service_1 = require("../shared/pass-data.service");
var data_service_1 = require("../shared/data.service");
var audio_service_1 = require("../shared/audio.service");
var common_1 = require("@angular/common");
var TaskComponent = /** @class */ (function () {
    function TaskComponent(page, router, dataManager, audioService, location, dataRetriever) {
        var _this = this;
        this.page = page;
        this.router = router;
        this.dataManager = dataManager;
        this.audioService = audioService;
        this.location = location;
        this.dataRetriever = dataRetriever;
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
    TaskComponent = __decorate([
        core_1.Component({
            selector: "tmr-task",
            templateUrl: "task/task.component.html",
            styleUrls: ["task/task.component.css"]
        }),
        __metadata("design:paramtypes", [page_1.Page, router_1.Router, data_service_1.SystemDataService,
            audio_service_1.AudioService, common_1.Location, pass_data_service_1.DataRetriever])
    ], TaskComponent);
    return TaskComponent;
}());
exports.TaskComponent = TaskComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YXNrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBeUM7QUFDekMsaURBQStEO0FBRy9ELGlFQUE0RDtBQUU1RCx1REFBMkQ7QUFDM0QseURBQXVEO0FBQ3ZELDBDQUEyQztBQU8zQztJQUlJLHVCQUFvQixJQUFVLEVBQVUsTUFBYyxFQUFVLFdBQThCLEVBQ3BGLFlBQTBCLEVBQVUsUUFBa0IsRUFBVSxhQUE0QjtRQUR0RyxpQkFRQztRQVJtQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQUNwRixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUNsRyxzREFBc0Q7UUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBSSxDQUFDLGlCQUFpQixFQUFFLFVBQUMsS0FBb0I7WUFDdEQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDekIsS0FBSSxDQUFDLElBQUksR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzdFLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztRQUNwQyx1RUFBdUU7UUFDdkUsMERBQTBEO1FBQzFELElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsNkJBQTZCO0lBQ2hFLENBQUM7SUFFRCxpQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBN0JRLGFBQWE7UUFMekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7U0FDekMsQ0FBQzt5Q0FLNEIsV0FBSSxFQUFrQixlQUFNLEVBQXVCLGdDQUFpQjtZQUN0RSw0QkFBWSxFQUFvQixpQkFBUSxFQUF5QixpQ0FBYTtPQUw3RixhQUFhLENBK0J6QjtJQUFELG9CQUFDO0NBQUEsQUEvQkQsSUErQkM7QUEvQlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBQYWdlLCBOYXZpZ2F0ZWREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuLi9zaGFyZWQvdGFzay90YXNrLm1vZGVsXCI7XG5pbXBvcnQgeyBTdGVwIH0gZnJvbSBcIi4uL3NoYXJlZC9zdGVwL3N0ZXAubW9kZWxcIjtcbmltcG9ydCB7IERhdGFSZXRyaWV2ZXIgfSBmcm9tIFwiLi4vc2hhcmVkL3Bhc3MtZGF0YS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSwgUmFkTGlzdFZpZXcgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3XCI7XG5pbXBvcnQgeyBTeXN0ZW1EYXRhU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvZGF0YS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBBdWRpb1NlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2F1ZGlvLnNlcnZpY2VcIjtcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJ0bXItdGFza1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcInRhc2svdGFzay5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1widGFzay90YXNrLmNvbXBvbmVudC5jc3NcIl1cbn0pXG5leHBvcnQgY2xhc3MgVGFza0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICB0YXNrOiBUYXNrO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBkYXRhTWFuYWdlcjogU3lzdGVtRGF0YVNlcnZpY2UsXG4gICAgICBwcml2YXRlIGF1ZGlvU2VydmljZTogQXVkaW9TZXJ2aWNlLCBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbiwgcHJpdmF0ZSBkYXRhUmV0cmlldmVyOiBEYXRhUmV0cmlldmVyKSB7XG4gICAgICAgIC8vaWYgd2UncmUgY29taW5nIGJhY2sgdG8gdGhpcyBwYWdlIGZyb20gdGhlIGVkaXQgcGFnZVxuICAgICAgICB0aGlzLnBhZ2Uub24oUGFnZS5uYXZpZ2F0aW5nVG9FdmVudCwgKGV2ZW50OiBOYXZpZ2F0ZWREYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuaXNCYWNrTmF2aWdhdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMudGFzayA9IHRoaXMuZGF0YU1hbmFnZXIubG9hZFRhc2tCeUlkKHRoaXMuZGF0YVJldHJpZXZlci5pZGVudGlmaWVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMudGFzayA9IHRoaXMuZGF0YVJldHJpZXZlci5kYXRhO1xuICAgICAgICAvL21ha2Ugc3VyZSB0aGUgYXVkaW8gc2VydmljZSBpcyB1cGRhdGVkIHdpdGggYW55IGNoYW5nZXMgaW4gc2V0dGluZ3MtLVxuICAgICAgICAvL2xpa2UgdGhlIHVzZXIgZGVjaWRpbmcgdGhleSBkb24ndCB3YW50IHZpYnJhdGlvbiBhbnltb3JlXG4gICAgICAgIHRoaXMuYXVkaW9TZXJ2aWNlLnJlZnJlc2hTZXR0aW5ncygpO1xuICAgIH1cblxuICAgIGVkaXRUYXNrKCkge1xuICAgICAgICB0aGlzLmRhdGFSZXRyaWV2ZXIuZGF0YSA9IHRoaXMudGFzaztcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1widGFzay9lZGl0XCJdKTtcbiAgICAgICAgdGhpcy5hdWRpb1NlcnZpY2Uuc3RvcEFsYXJtKCk7IC8vaW4gY2FzZSBhbiBhbGFybSBpcyBwbGF5aW5nXG4gICAgfVxuXG4gICAgYmFja1ByZXNzKCkge1xuICAgICAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcbiAgICB9XG4gICAgICAgIFxufVxuXG4iXX0=