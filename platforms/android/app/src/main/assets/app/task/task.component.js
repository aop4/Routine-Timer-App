"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var page_1 = require("tns-core-modules/ui/page");
var pass_data_service_1 = require("../shared/pass-data.service");
var data_service_1 = require("../shared/data.service");
var TaskComponent = /** @class */ (function () {
    function TaskComponent(page, router, dataManager) {
        var _this = this;
        this.page = page;
        this.router = router;
        this.dataManager = dataManager;
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
    };
    TaskComponent = __decorate([
        core_1.Component({
            selector: "tmr-task",
            templateUrl: "task/task.component.html",
            styleUrls: ["task/task.component.css"],
            providers: [data_service_1.SystemDataService]
        }),
        __metadata("design:paramtypes", [page_1.Page, router_1.Router, data_service_1.SystemDataService])
    ], TaskComponent);
    return TaskComponent;
}());
exports.TaskComponent = TaskComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YXNrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBeUM7QUFDekMsaURBQStEO0FBRy9ELGlFQUE0RDtBQUU1RCx1REFBMkQ7QUFPM0Q7SUFJSSx1QkFBb0IsSUFBVSxFQUFVLE1BQWMsRUFBVSxXQUE4QjtRQUE5RixpQkFPQztRQVBtQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQUMxRixzREFBc0Q7UUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBSSxDQUFDLGlCQUFpQixFQUFFLFVBQUMsS0FBb0I7WUFDdEQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDekIsS0FBSSxDQUFDLElBQUksR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxpQ0FBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3hFLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQ0ksK0RBQStEO1FBQy9ELElBQUksQ0FBQyxJQUFJLEdBQUcsaUNBQWEsQ0FBQyxJQUFJLENBQUM7SUFDbkMsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFDSSxpQ0FBYSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBckJRLGFBQWE7UUFOekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7WUFDdEMsU0FBUyxFQUFFLENBQUMsZ0NBQWlCLENBQUM7U0FDakMsQ0FBQzt5Q0FLNEIsV0FBSSxFQUFrQixlQUFNLEVBQXVCLGdDQUFpQjtPQUpyRixhQUFhLENBdUJ6QjtJQUFELG9CQUFDO0NBQUEsQUF2QkQsSUF1QkM7QUF2Qlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBQYWdlLCBOYXZpZ2F0ZWREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuLi9zaGFyZWQvdGFzay90YXNrLm1vZGVsXCI7XG5pbXBvcnQgeyBTdGVwIH0gZnJvbSBcIi4uL3NoYXJlZC9zdGVwL3N0ZXAubW9kZWxcIjtcbmltcG9ydCB7IERhdGFSZXRyaWV2ZXIgfSBmcm9tIFwiLi4vc2hhcmVkL3Bhc3MtZGF0YS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSwgUmFkTGlzdFZpZXcgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3XCI7XG5pbXBvcnQgeyBTeXN0ZW1EYXRhU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvZGF0YS5zZXJ2aWNlXCI7XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJ0bXItdGFza1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcInRhc2svdGFzay5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1widGFzay90YXNrLmNvbXBvbmVudC5jc3NcIl0sXG4gICAgcHJvdmlkZXJzOiBbU3lzdGVtRGF0YVNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIFRhc2tDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgdGFzazogVGFzaztcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBhZ2U6IFBhZ2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgZGF0YU1hbmFnZXI6IFN5c3RlbURhdGFTZXJ2aWNlKSB7XG4gICAgICAgIC8vaWYgd2UncmUgY29taW5nIGJhY2sgdG8gdGhpcyBwYWdlIGZyb20gdGhlIGVkaXQgcGFnZVxuICAgICAgICB0aGlzLnBhZ2Uub24oUGFnZS5uYXZpZ2F0aW5nVG9FdmVudCwgKGV2ZW50OiBOYXZpZ2F0ZWREYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuaXNCYWNrTmF2aWdhdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMudGFzayA9IHRoaXMuZGF0YU1hbmFnZXIubG9hZFRhc2tCeUlkKERhdGFSZXRyaWV2ZXIuaWRlbnRpZmllcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICAvL3doZW4gd2UncmUgbm90IGNvbWluZyBiYWNrIHRvIHRoaXMgcGFnZSBmcm9tIHRoZSBlZGl0aW5nIHBhZ2VcbiAgICAgICAgdGhpcy50YXNrID0gRGF0YVJldHJpZXZlci5kYXRhO1xuICAgIH1cblxuICAgIGVkaXRUYXNrKCkge1xuICAgICAgICBEYXRhUmV0cmlldmVyLmRhdGEgPSB0aGlzLnRhc2s7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcInRhc2svZWRpdFwiXSk7XG4gICAgfVxuICAgICAgICBcbn1cblxuIl19