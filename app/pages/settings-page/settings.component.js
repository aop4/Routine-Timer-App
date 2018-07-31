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
    /* Set whether vibration is continuous or a one-time occurrence */
    SettingsComponent.prototype.setContinuousVibrate = function (val) {
        this.settings.continuousVibrate = val;
    };
    /* Set whether the alarm tone rings continuously or just once */
    SettingsComponent.prototype.setContinuousTone = function (val) {
        this.settings.continuousTone = val;
    };
    SettingsComponent.prototype.ngOnDestroy = function () {
        //make sure app settings are saved when the user leaves page
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dGluZ3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXFEO0FBQ3JELDBDQUEyQztBQUUzQyxzREFBMEQ7QUFRMUQ7SUFJSSwyQkFBb0IsV0FBOEIsRUFBVSxRQUFrQjtRQUExRCxnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQzFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ3hELENBQUM7SUFFRCxrRUFBa0U7SUFDbEUsZ0RBQW9CLEdBQXBCLFVBQXFCLEdBQVk7UUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsR0FBRyxHQUFHLENBQUM7SUFDMUMsQ0FBQztJQUVELGdFQUFnRTtJQUNoRSw2Q0FBaUIsR0FBakIsVUFBa0IsR0FBWTtRQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUM7SUFDdkMsQ0FBQztJQUVELHVDQUFXLEdBQVg7UUFDSSw0REFBNEQ7UUFDNUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELHFDQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUF6QlEsaUJBQWlCO1FBTDdCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsNkNBQTZDO1lBQzFELFNBQVMsRUFBRSxDQUFDLDRDQUE0QyxDQUFDO1NBQzVELENBQUM7eUNBS21DLGdDQUFpQixFQUFvQixpQkFBUTtPQUpyRSxpQkFBaUIsQ0EyQjdCO0lBQUQsd0JBQUM7Q0FBQSxBQTNCRCxJQTJCQztBQTNCWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uRGVzdHJveSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcblxuaW1wb3J0IHsgU3lzdGVtRGF0YVNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvZGF0YS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBUaW1lclNldHRpbmdzIH0gZnJvbSBcIn4vc2hhcmVkL3NldHRpbmdzL3RpbWVyLXNldHRpbmdzLm1vZGVsXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNldHRpbmdzXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwicGFnZXMvc2V0dGluZ3MtcGFnZS9zZXR0aW5ncy5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wicGFnZXMvc2V0dGluZ3MtcGFnZS9zZXR0aW5ncy5jb21wb25lbnQuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIFNldHRpbmdzQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIHNldHRpbmdzOiBUaW1lclNldHRpbmdzOyAvL2FuIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHNldHRpbmdzIHRoZSB1c2VyIHdhbnRzIGZvciB0aGUgYXBwXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFNYW5hZ2VyOiBTeXN0ZW1EYXRhU2VydmljZSwgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24pIHtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHRoaXMuZGF0YU1hbmFnZXIuZ2V0VGltZXJTZXR0aW5ncygpO1xuICAgIH1cblxuICAgIC8qIFNldCB3aGV0aGVyIHZpYnJhdGlvbiBpcyBjb250aW51b3VzIG9yIGEgb25lLXRpbWUgb2NjdXJyZW5jZSAqL1xuICAgIHNldENvbnRpbnVvdXNWaWJyYXRlKHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLnNldHRpbmdzLmNvbnRpbnVvdXNWaWJyYXRlID0gdmFsO1xuICAgIH1cblxuICAgIC8qIFNldCB3aGV0aGVyIHRoZSBhbGFybSB0b25lIHJpbmdzIGNvbnRpbnVvdXNseSBvciBqdXN0IG9uY2UgKi9cbiAgICBzZXRDb250aW51b3VzVG9uZSh2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5jb250aW51b3VzVG9uZSA9IHZhbDtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgLy9tYWtlIHN1cmUgYXBwIHNldHRpbmdzIGFyZSBzYXZlZCB3aGVuIHRoZSB1c2VyIGxlYXZlcyBwYWdlXG4gICAgICAgIHRoaXMuZGF0YU1hbmFnZXIuc2F2ZVRpbWVyU2V0dGluZ3ModGhpcy5zZXR0aW5ncyk7XG4gICAgfVxuXG4gICAgYmFja1ByZXNzKCkge1xuICAgICAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcbiAgICB9XG5cbn1cblxuXG5cblxuIl19