"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var data_service_1 = require("~/shared/data.service");
var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(dataManager) {
        this.dataManager = dataManager;
        this.settings = this.dataManager.getTimerSettings();
        console.log(this.settings);
    }
    SettingsComponent.prototype.setContinuousVibrate = function (val) {
        this.settings.continuousVibrate = val;
    };
    SettingsComponent.prototype.setContinuousTone = function (val) {
        this.settings.continuousTone = val;
    };
    SettingsComponent.prototype.ngOnDestroy = function () {
        this.dataManager.saveTimerSettings(this.settings);
    };
    SettingsComponent = __decorate([
        core_1.Component({
            selector: "settings",
            templateUrl: "settings-page/settings.component.html",
            styleUrls: ["settings-page/settings.component.css"],
            providers: [data_service_1.SystemDataService]
        }),
        __metadata("design:paramtypes", [data_service_1.SystemDataService])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dGluZ3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXFEO0FBQ3JELHNEQUEwRDtBQVMxRDtJQUlJLDJCQUFvQixXQUE4QjtRQUE5QixnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFDOUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELGdEQUFvQixHQUFwQixVQUFxQixHQUFZO1FBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEdBQUcsR0FBRyxDQUFDO0lBQzFDLENBQUM7SUFFRCw2Q0FBaUIsR0FBakIsVUFBa0IsR0FBWTtRQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUM7SUFDdkMsQ0FBQztJQUVELHVDQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBbkJRLGlCQUFpQjtRQU43QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsV0FBVyxFQUFFLHVDQUF1QztZQUNwRCxTQUFTLEVBQUUsQ0FBQyxzQ0FBc0MsQ0FBQztZQUNuRCxTQUFTLEVBQUUsQ0FBQyxnQ0FBaUIsQ0FBQztTQUNqQyxDQUFDO3lDQUttQyxnQ0FBaUI7T0FKekMsaUJBQWlCLENBcUI3QjtJQUFELHdCQUFDO0NBQUEsQUFyQkQsSUFxQkM7QUFyQlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3kgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgU3lzdGVtRGF0YVNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvZGF0YS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBUaW1lclNldHRpbmdzIH0gZnJvbSBcIn4vc2hhcmVkL3NldHRpbmdzL3RpbWVyLXNldHRpbmdzLm1vZGVsXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNldHRpbmdzXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwic2V0dGluZ3MtcGFnZS9zZXR0aW5ncy5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wic2V0dGluZ3MtcGFnZS9zZXR0aW5ncy5jb21wb25lbnQuY3NzXCJdLFxuICAgIHByb3ZpZGVyczogW1N5c3RlbURhdGFTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBTZXR0aW5nc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBzZXR0aW5nczogVGltZXJTZXR0aW5ncztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YU1hbmFnZXI6IFN5c3RlbURhdGFTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSB0aGlzLmRhdGFNYW5hZ2VyLmdldFRpbWVyU2V0dGluZ3MoKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zZXR0aW5ncyk7XG4gICAgfVxuXG4gICAgc2V0Q29udGludW91c1ZpYnJhdGUodmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MuY29udGludW91c1ZpYnJhdGUgPSB2YWw7XG4gICAgfVxuXG4gICAgc2V0Q29udGludW91c1RvbmUodmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MuY29udGludW91c1RvbmUgPSB2YWw7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGF0YU1hbmFnZXIuc2F2ZVRpbWVyU2V0dGluZ3ModGhpcy5zZXR0aW5ncyk7XG4gICAgfVxuXG59XG5cblxuXG5cbiJdfQ==