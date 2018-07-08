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
    function TaskComponent(page, router, dataManager, audioService, location) {
        var _this = this;
        this.page = page;
        this.router = router;
        this.dataManager = dataManager;
        this.audioService = audioService;
        this.location = location;
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
            audio_service_1.AudioService, common_1.Location])
    ], TaskComponent);
    return TaskComponent;
}());
exports.TaskComponent = TaskComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YXNrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBeUM7QUFDekMsaURBQStEO0FBRy9ELGlFQUE0RDtBQUU1RCx1REFBMkQ7QUFDM0QseURBQXVEO0FBQ3ZELDBDQUEyQztBQU0zQztJQUlJLHVCQUFvQixJQUFVLEVBQVUsTUFBYyxFQUFVLFdBQThCLEVBQ3BGLFlBQTBCLEVBQVUsUUFBa0I7UUFEaEUsaUJBUUM7UUFSbUIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFDcEYsaUJBQVksR0FBWixZQUFZLENBQWM7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQzVELHNEQUFzRDtRQUN0RCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFJLENBQUMsaUJBQWlCLEVBQUUsVUFBQyxLQUFvQjtZQUN0RCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixLQUFJLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLGlDQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDeEUsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFDSSwrREFBK0Q7UUFDL0QsSUFBSSxDQUFDLElBQUksR0FBRyxpQ0FBYSxDQUFDLElBQUksQ0FBQztRQUMvQix1RUFBdUU7UUFDdkUsMERBQTBEO1FBQzFELElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFDSSxpQ0FBYSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsNkJBQTZCO0lBQ2hFLENBQUM7SUFFRCxpQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBOUJRLGFBQWE7UUFMekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7U0FDekMsQ0FBQzt5Q0FLNEIsV0FBSSxFQUFrQixlQUFNLEVBQXVCLGdDQUFpQjtZQUN0RSw0QkFBWSxFQUFvQixpQkFBUTtPQUx2RCxhQUFhLENBZ0N6QjtJQUFELG9CQUFDO0NBQUEsQUFoQ0QsSUFnQ0M7QUFoQ1ksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBQYWdlLCBOYXZpZ2F0ZWREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuLi9zaGFyZWQvdGFzay90YXNrLm1vZGVsXCI7XG5pbXBvcnQgeyBTdGVwIH0gZnJvbSBcIi4uL3NoYXJlZC9zdGVwL3N0ZXAubW9kZWxcIjtcbmltcG9ydCB7IERhdGFSZXRyaWV2ZXIgfSBmcm9tIFwiLi4vc2hhcmVkL3Bhc3MtZGF0YS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSwgUmFkTGlzdFZpZXcgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3XCI7XG5pbXBvcnQgeyBTeXN0ZW1EYXRhU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvZGF0YS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBBdWRpb1NlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL2F1ZGlvLnNlcnZpY2VcIjtcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwidG1yLXRhc2tcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJ0YXNrL3Rhc2suY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcInRhc2svdGFzay5jb21wb25lbnQuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIFRhc2tDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgdGFzazogVGFzaztcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgZGF0YU1hbmFnZXI6IFN5c3RlbURhdGFTZXJ2aWNlLFxuICAgICAgcHJpdmF0ZSBhdWRpb1NlcnZpY2U6IEF1ZGlvU2VydmljZSwgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24pIHtcbiAgICAgICAgLy9pZiB3ZSdyZSBjb21pbmcgYmFjayB0byB0aGlzIHBhZ2UgZnJvbSB0aGUgZWRpdCBwYWdlXG4gICAgICAgIHRoaXMucGFnZS5vbihQYWdlLm5hdmlnYXRpbmdUb0V2ZW50LCAoZXZlbnQ6IE5hdmlnYXRlZERhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5pc0JhY2tOYXZpZ2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXNrID0gdGhpcy5kYXRhTWFuYWdlci5sb2FkVGFza0J5SWQoRGF0YVJldHJpZXZlci5pZGVudGlmaWVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIC8vd2hlbiB3ZSdyZSBub3QgY29taW5nIGJhY2sgdG8gdGhpcyBwYWdlIGZyb20gdGhlIGVkaXRpbmcgcGFnZVxuICAgICAgICB0aGlzLnRhc2sgPSBEYXRhUmV0cmlldmVyLmRhdGE7XG4gICAgICAgIC8vbWFrZSBzdXJlIHRoZSBhdWRpbyBzZXJ2aWNlIGlzIHVwZGF0ZWQgd2l0aCBhbnkgY2hhbmdlcyBpbiBzZXR0aW5ncy0tXG4gICAgICAgIC8vbGlrZSB0aGUgdXNlciBkZWNpZGluZyB0aGV5IGRvbid0IHdhbnQgdmlicmF0aW9uIGFueW1vcmVcbiAgICAgICAgdGhpcy5hdWRpb1NlcnZpY2UucmVmcmVzaFNldHRpbmdzKCk7XG4gICAgfVxuXG4gICAgZWRpdFRhc2soKSB7XG4gICAgICAgIERhdGFSZXRyaWV2ZXIuZGF0YSA9IHRoaXMudGFzaztcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1widGFzay9lZGl0XCJdKTtcbiAgICAgICAgdGhpcy5hdWRpb1NlcnZpY2Uuc3RvcEFsYXJtKCk7IC8vaW4gY2FzZSBhbiBhbGFybSBpcyBwbGF5aW5nXG4gICAgfVxuXG4gICAgYmFja1ByZXNzKCkge1xuICAgICAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcbiAgICB9XG4gICAgICAgIFxufVxuXG4iXX0=