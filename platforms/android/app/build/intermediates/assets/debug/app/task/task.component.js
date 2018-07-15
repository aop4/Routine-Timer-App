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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YXNrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBeUM7QUFDekMsaURBQStEO0FBRy9ELGlFQUE0RDtBQUU1RCx1REFBMkQ7QUFDM0QseURBQXVEO0FBQ3ZELDBDQUEyQztBQU0zQztJQUlJLHVCQUFvQixJQUFVLEVBQVUsTUFBYyxFQUFVLFdBQThCLEVBQ3BGLFlBQTBCLEVBQVUsUUFBa0IsRUFBVSxhQUE0QjtRQUR0RyxpQkFRQztRQVJtQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQUNwRixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUNsRyxzREFBc0Q7UUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBSSxDQUFDLGlCQUFpQixFQUFFLFVBQUMsS0FBb0I7WUFDdEQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDekIsS0FBSSxDQUFDLElBQUksR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzdFLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztRQUNwQyx1RUFBdUU7UUFDdkUsMERBQTBEO1FBQzFELElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsNkJBQTZCO0lBQ2hFLENBQUM7SUFFRCxpQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBN0JRLGFBQWE7UUFMekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7U0FDekMsQ0FBQzt5Q0FLNEIsV0FBSSxFQUFrQixlQUFNLEVBQXVCLGdDQUFpQjtZQUN0RSw0QkFBWSxFQUFvQixpQkFBUSxFQUF5QixpQ0FBYTtPQUw3RixhQUFhLENBK0J6QjtJQUFELG9CQUFDO0NBQUEsQUEvQkQsSUErQkM7QUEvQlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBQYWdlLCBOYXZpZ2F0ZWREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuLi9zaGFyZWQvdGFzay90YXNrLm1vZGVsXCI7XG5pbXBvcnQgeyBTdGVwIH0gZnJvbSBcIi4uL3NoYXJlZC9zdGVwL3N0ZXAubW9kZWxcIjtcbmltcG9ydCB7IERhdGFSZXRyaWV2ZXIgfSBmcm9tIFwiLi4vc2hhcmVkL3Bhc3MtZGF0YS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSwgUmFkTGlzdFZpZXcgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3XCI7XG5pbXBvcnQgeyBTeXN0ZW1EYXRhU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvZGF0YS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBBdWRpb1NlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2F1ZGlvLnNlcnZpY2VcIjtcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwidG1yLXRhc2tcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJ0YXNrL3Rhc2suY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcInRhc2svdGFzay5jb21wb25lbnQuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIFRhc2tDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgdGFzazogVGFzaztcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgZGF0YU1hbmFnZXI6IFN5c3RlbURhdGFTZXJ2aWNlLFxuICAgICAgcHJpdmF0ZSBhdWRpb1NlcnZpY2U6IEF1ZGlvU2VydmljZSwgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sIHByaXZhdGUgZGF0YVJldHJpZXZlcjogRGF0YVJldHJpZXZlcikge1xuICAgICAgICAvL2lmIHdlJ3JlIGNvbWluZyBiYWNrIHRvIHRoaXMgcGFnZSBmcm9tIHRoZSBlZGl0IHBhZ2VcbiAgICAgICAgdGhpcy5wYWdlLm9uKFBhZ2UubmF2aWdhdGluZ1RvRXZlbnQsIChldmVudDogTmF2aWdhdGVkRGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmlzQmFja05hdmlnYXRpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2sgPSB0aGlzLmRhdGFNYW5hZ2VyLmxvYWRUYXNrQnlJZCh0aGlzLmRhdGFSZXRyaWV2ZXIuaWRlbnRpZmllcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnRhc2sgPSB0aGlzLmRhdGFSZXRyaWV2ZXIuZGF0YTtcbiAgICAgICAgLy9tYWtlIHN1cmUgdGhlIGF1ZGlvIHNlcnZpY2UgaXMgdXBkYXRlZCB3aXRoIGFueSBjaGFuZ2VzIGluIHNldHRpbmdzLS1cbiAgICAgICAgLy9saWtlIHRoZSB1c2VyIGRlY2lkaW5nIHRoZXkgZG9uJ3Qgd2FudCB2aWJyYXRpb24gYW55bW9yZVxuICAgICAgICB0aGlzLmF1ZGlvU2VydmljZS5yZWZyZXNoU2V0dGluZ3MoKTtcbiAgICB9XG5cbiAgICBlZGl0VGFzaygpIHtcbiAgICAgICAgdGhpcy5kYXRhUmV0cmlldmVyLmRhdGEgPSB0aGlzLnRhc2s7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcInRhc2svZWRpdFwiXSk7XG4gICAgICAgIHRoaXMuYXVkaW9TZXJ2aWNlLnN0b3BBbGFybSgpOyAvL2luIGNhc2UgYW4gYWxhcm0gaXMgcGxheWluZ1xuICAgIH1cblxuICAgIGJhY2tQcmVzcygpIHtcbiAgICAgICAgdGhpcy5sb2NhdGlvbi5iYWNrKCk7XG4gICAgfVxuICAgICAgICBcbn1cblxuIl19