"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var data_service_1 = require("~/shared/data.service");
var common_1 = require("@angular/common");
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
            templateUrl: "settings-page/settings.component.html",
            styleUrls: ["settings-page/settings.component.css"]
        }),
        __metadata("design:paramtypes", [data_service_1.SystemDataService, common_1.Location])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dGluZ3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXFEO0FBQ3JELHNEQUEwRDtBQUUxRCwwQ0FBMkM7QUFPM0M7SUFJSSwyQkFBb0IsV0FBOEIsRUFBVSxRQUFrQjtRQUExRCxnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQzFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ3hELENBQUM7SUFFRCxnREFBb0IsR0FBcEIsVUFBcUIsR0FBWTtRQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixHQUFHLEdBQUcsQ0FBQztJQUMxQyxDQUFDO0lBRUQsNkNBQWlCLEdBQWpCLFVBQWtCLEdBQVk7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCx1Q0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELHFDQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUF0QlEsaUJBQWlCO1FBTDdCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsdUNBQXVDO1lBQ3BELFNBQVMsRUFBRSxDQUFDLHNDQUFzQyxDQUFDO1NBQ3RELENBQUM7eUNBS21DLGdDQUFpQixFQUFvQixpQkFBUTtPQUpyRSxpQkFBaUIsQ0F3QjdCO0lBQUQsd0JBQUM7Q0FBQSxBQXhCRCxJQXdCQztBQXhCWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uRGVzdHJveSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBTeXN0ZW1EYXRhU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9kYXRhLnNlcnZpY2VcIjtcbmltcG9ydCB7IFRpbWVyU2V0dGluZ3MgfSBmcm9tIFwifi9zaGFyZWQvc2V0dGluZ3MvdGltZXItc2V0dGluZ3MubW9kZWxcIjtcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzZXR0aW5nc1wiLFxuICAgIHRlbXBsYXRlVXJsOiBcInNldHRpbmdzLXBhZ2Uvc2V0dGluZ3MuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcInNldHRpbmdzLXBhZ2Uvc2V0dGluZ3MuY29tcG9uZW50LmNzc1wiXVxufSlcbmV4cG9ydCBjbGFzcyBTZXR0aW5nc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBzZXR0aW5nczogVGltZXJTZXR0aW5ncztcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0YU1hbmFnZXI6IFN5c3RlbURhdGFTZXJ2aWNlLCBwcml2YXRlIGxvY2F0aW9uOiBMb2NhdGlvbikge1xuICAgICAgICB0aGlzLnNldHRpbmdzID0gdGhpcy5kYXRhTWFuYWdlci5nZXRUaW1lclNldHRpbmdzKCk7XG4gICAgfVxuXG4gICAgc2V0Q29udGludW91c1ZpYnJhdGUodmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MuY29udGludW91c1ZpYnJhdGUgPSB2YWw7XG4gICAgfVxuXG4gICAgc2V0Q29udGludW91c1RvbmUodmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MuY29udGludW91c1RvbmUgPSB2YWw7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGF0YU1hbmFnZXIuc2F2ZVRpbWVyU2V0dGluZ3ModGhpcy5zZXR0aW5ncyk7XG4gICAgfVxuXG4gICAgYmFja1ByZXNzKCkge1xuICAgICAgICB0aGlzLmxvY2F0aW9uLmJhY2soKTtcbiAgICB9XG5cbn1cblxuXG5cblxuIl19