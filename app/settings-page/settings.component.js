"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var data_service_1 = require("~/shared/data.service");
var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(dataManager) {
        this.dataManager = dataManager;
        this.settings = this.dataManager.getTimerSettings();
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
            styleUrls: ["settings-page/settings.component.css"]
        }),
        __metadata("design:paramtypes", [data_service_1.SystemDataService])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dGluZ3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXFEO0FBQ3JELHNEQUEwRDtBQVExRDtJQUlJLDJCQUFvQixXQUE4QjtRQUE5QixnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFDOUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDeEQsQ0FBQztJQUVELGdEQUFvQixHQUFwQixVQUFxQixHQUFZO1FBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEdBQUcsR0FBRyxDQUFDO0lBQzFDLENBQUM7SUFFRCw2Q0FBaUIsR0FBakIsVUFBa0IsR0FBWTtRQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUM7SUFDdkMsQ0FBQztJQUVELHVDQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBbEJRLGlCQUFpQjtRQUw3QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsV0FBVyxFQUFFLHVDQUF1QztZQUNwRCxTQUFTLEVBQUUsQ0FBQyxzQ0FBc0MsQ0FBQztTQUN0RCxDQUFDO3lDQUttQyxnQ0FBaUI7T0FKekMsaUJBQWlCLENBb0I3QjtJQUFELHdCQUFDO0NBQUEsQUFwQkQsSUFvQkM7QUFwQlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3kgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgU3lzdGVtRGF0YVNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvZGF0YS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBUaW1lclNldHRpbmdzIH0gZnJvbSBcIn4vc2hhcmVkL3NldHRpbmdzL3RpbWVyLXNldHRpbmdzLm1vZGVsXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNldHRpbmdzXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwic2V0dGluZ3MtcGFnZS9zZXR0aW5ncy5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wic2V0dGluZ3MtcGFnZS9zZXR0aW5ncy5jb21wb25lbnQuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIFNldHRpbmdzQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIHNldHRpbmdzOiBUaW1lclNldHRpbmdzO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhTWFuYWdlcjogU3lzdGVtRGF0YVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHRoaXMuZGF0YU1hbmFnZXIuZ2V0VGltZXJTZXR0aW5ncygpO1xuICAgIH1cblxuICAgIHNldENvbnRpbnVvdXNWaWJyYXRlKHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLnNldHRpbmdzLmNvbnRpbnVvdXNWaWJyYXRlID0gdmFsO1xuICAgIH1cblxuICAgIHNldENvbnRpbnVvdXNUb25lKHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLnNldHRpbmdzLmNvbnRpbnVvdXNUb25lID0gdmFsO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRhdGFNYW5hZ2VyLnNhdmVUaW1lclNldHRpbmdzKHRoaXMuc2V0dGluZ3MpO1xuICAgIH1cblxufVxuXG5cblxuXG4iXX0=