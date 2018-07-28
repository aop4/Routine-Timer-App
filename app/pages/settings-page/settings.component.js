"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var data_service_1 = require("~/shared/data.service");
var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(dataManager, location) {
        this.dataManager = dataManager;
        this.location = location;
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
    SettingsComponent.prototype.backPress = function () {
        this.location.back();
    };
    SettingsComponent = __decorate([
        core_1.Component({
            selector: "settings",
            templateUrl: "pages/settings-page/settings.component.html",
            styleUrls: ["pages/settings-page/settings.component.css"]
        }),
        __metadata("design:paramtypes", [data_service_1.SystemDataService, common_1.Location])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dGluZ3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXFEO0FBQ3JELDBDQUEyQztBQUUzQyxzREFBMEQ7QUFRMUQ7SUFJSSwyQkFBb0IsV0FBOEIsRUFBVSxRQUFrQjtRQUExRCxnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQzFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ3hELENBQUM7SUFFRCxnREFBb0IsR0FBcEIsVUFBcUIsR0FBWTtRQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixHQUFHLEdBQUcsQ0FBQztJQUMxQyxDQUFDO0lBRUQsNkNBQWlCLEdBQWpCLFVBQWtCLEdBQVk7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCx1Q0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELHFDQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUF0QlEsaUJBQWlCO1FBTDdCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsNkNBQTZDO1lBQzFELFNBQVMsRUFBRSxDQUFDLDRDQUE0QyxDQUFDO1NBQzVELENBQUM7eUNBS21DLGdDQUFpQixFQUFvQixpQkFBUTtPQUpyRSxpQkFBaUIsQ0F3QjdCO0lBQUQsd0JBQUM7Q0FBQSxBQXhCRCxJQXdCQztBQXhCWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uRGVzdHJveSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcblxuaW1wb3J0IHsgU3lzdGVtRGF0YVNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvZGF0YS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBUaW1lclNldHRpbmdzIH0gZnJvbSBcIn4vc2hhcmVkL3NldHRpbmdzL3RpbWVyLXNldHRpbmdzLm1vZGVsXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNldHRpbmdzXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwicGFnZXMvc2V0dGluZ3MtcGFnZS9zZXR0aW5ncy5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wicGFnZXMvc2V0dGluZ3MtcGFnZS9zZXR0aW5ncy5jb21wb25lbnQuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIFNldHRpbmdzQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIHNldHRpbmdzOiBUaW1lclNldHRpbmdzO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhTWFuYWdlcjogU3lzdGVtRGF0YVNlcnZpY2UsIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uKSB7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSB0aGlzLmRhdGFNYW5hZ2VyLmdldFRpbWVyU2V0dGluZ3MoKTtcbiAgICB9XG5cbiAgICBzZXRDb250aW51b3VzVmlicmF0ZSh2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5jb250aW51b3VzVmlicmF0ZSA9IHZhbDtcbiAgICB9XG5cbiAgICBzZXRDb250aW51b3VzVG9uZSh2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5jb250aW51b3VzVG9uZSA9IHZhbDtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kYXRhTWFuYWdlci5zYXZlVGltZXJTZXR0aW5ncyh0aGlzLnNldHRpbmdzKTtcbiAgICB9XG5cbiAgICBiYWNrUHJlc3MoKSB7XG4gICAgICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xuICAgIH1cblxufVxuXG5cblxuXG4iXX0=