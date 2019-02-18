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
        this.saveSettings();
    };
    /* Set whether the alarm tone rings continuously or just once */
    SettingsComponent.prototype.setContinuousTone = function (val) {
        this.settings.continuousTone = val;
        this.saveSettings();
    };
    SettingsComponent.prototype.ngOnDestroy = function () {
        //make sure app settings are saved when the user leaves page
        this.saveSettings();
    };
    /* Saves the user's application settings */
    SettingsComponent.prototype.saveSettings = function () {
        this.dataManager.saveTimerSettings(this.settings);
    };
    /* Save the user's application settings after some time passes. */
    SettingsComponent.prototype.saveSettingsWithDelay = function () {
        var _this = this;
        // A timeout is used to accommodate two-way binding in the Switch elements.
        // If we don't use a timeout, then the value of settings.<attribute>
        // changes after the checkedChange listener is fired, and the original
        // value is saved here. The alternative is to implement two-way binding 
        // manually, which I find inelegant.
        setTimeout(function () { return _this.saveSettings(); }, 500);
    };
    SettingsComponent.prototype.backPress = function () {
        this.location.back();
    };
    SettingsComponent.prototype.onNotificationToggle = function (event) {
        this.saveSettingsWithDelay();
        var switchRef = event.object;
        if (!switchRef.checked) {
            alert('Turning notifications off will prevent the app from notifying you that a timed event is over if the application is closed or inactive for long periods.');
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dGluZ3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXFEO0FBQ3JELDBDQUEyQztBQUczQyxzREFBMEQ7QUFRMUQ7SUFJSSwyQkFBb0IsV0FBOEIsRUFBVSxRQUFrQjtRQUExRCxnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQzFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ3hELENBQUM7SUFFRCxrRUFBa0U7SUFDbEUsZ0RBQW9CLEdBQXBCLFVBQXFCLEdBQVk7UUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsR0FBRyxHQUFHLENBQUM7UUFDdEMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxnRUFBZ0U7SUFDaEUsNkNBQWlCLEdBQWpCLFVBQWtCLEdBQVk7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDO1FBQ25DLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsdUNBQVcsR0FBWDtRQUNJLDREQUE0RDtRQUM1RCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELDJDQUEyQztJQUMzQyx3Q0FBWSxHQUFaO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELGtFQUFrRTtJQUNsRSxpREFBcUIsR0FBckI7UUFBQSxpQkFPQztRQU5HLDJFQUEyRTtRQUMzRSxvRUFBb0U7UUFDcEUsc0VBQXNFO1FBQ3RFLHdFQUF3RTtRQUN4RSxvQ0FBb0M7UUFDcEMsVUFBVSxDQUFFLGNBQU0sT0FBQSxLQUFJLENBQUMsWUFBWSxFQUFFLEVBQW5CLENBQW1CLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELHFDQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxnREFBb0IsR0FBcEIsVUFBcUIsS0FBSztRQUN0QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3QixJQUFJLFNBQVMsR0FBVyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ3JDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDckIsS0FBSyxDQUFDLHlKQUF5SixDQUFDLENBQUM7UUFDckssQ0FBQztJQUNMLENBQUM7SUFsRFEsaUJBQWlCO1FBTDdCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsNkNBQTZDO1lBQzFELFNBQVMsRUFBRSxDQUFDLDRDQUE0QyxDQUFDO1NBQzVELENBQUM7eUNBS21DLGdDQUFpQixFQUFvQixpQkFBUTtPQUpyRSxpQkFBaUIsQ0FvRDdCO0lBQUQsd0JBQUM7Q0FBQSxBQXBERCxJQW9EQztBQXBEWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uRGVzdHJveSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IFN3aXRjaCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3N3aXRjaC9zd2l0Y2hcIjtcblxuaW1wb3J0IHsgU3lzdGVtRGF0YVNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvZGF0YS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBUaW1lclNldHRpbmdzIH0gZnJvbSBcIn4vc2hhcmVkL3NldHRpbmdzL3RpbWVyLXNldHRpbmdzLm1vZGVsXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInNldHRpbmdzXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwicGFnZXMvc2V0dGluZ3MtcGFnZS9zZXR0aW5ncy5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wicGFnZXMvc2V0dGluZ3MtcGFnZS9zZXR0aW5ncy5jb21wb25lbnQuY3NzXCJdXG59KVxuZXhwb3J0IGNsYXNzIFNldHRpbmdzQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIHNldHRpbmdzOiBUaW1lclNldHRpbmdzOyAvL2FuIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHNldHRpbmdzIHRoZSB1c2VyIHdhbnRzIGZvciB0aGUgYXBwXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFNYW5hZ2VyOiBTeXN0ZW1EYXRhU2VydmljZSwgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24pIHtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHRoaXMuZGF0YU1hbmFnZXIuZ2V0VGltZXJTZXR0aW5ncygpO1xuICAgIH1cblxuICAgIC8qIFNldCB3aGV0aGVyIHZpYnJhdGlvbiBpcyBjb250aW51b3VzIG9yIGEgb25lLXRpbWUgb2NjdXJyZW5jZSAqL1xuICAgIHNldENvbnRpbnVvdXNWaWJyYXRlKHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLnNldHRpbmdzLmNvbnRpbnVvdXNWaWJyYXRlID0gdmFsO1xuICAgICAgICB0aGlzLnNhdmVTZXR0aW5ncygpO1xuICAgIH1cblxuICAgIC8qIFNldCB3aGV0aGVyIHRoZSBhbGFybSB0b25lIHJpbmdzIGNvbnRpbnVvdXNseSBvciBqdXN0IG9uY2UgKi9cbiAgICBzZXRDb250aW51b3VzVG9uZSh2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5jb250aW51b3VzVG9uZSA9IHZhbDtcbiAgICAgICAgdGhpcy5zYXZlU2V0dGluZ3MoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgLy9tYWtlIHN1cmUgYXBwIHNldHRpbmdzIGFyZSBzYXZlZCB3aGVuIHRoZSB1c2VyIGxlYXZlcyBwYWdlXG4gICAgICAgIHRoaXMuc2F2ZVNldHRpbmdzKCk7XG4gICAgfVxuXG4gICAgLyogU2F2ZXMgdGhlIHVzZXIncyBhcHBsaWNhdGlvbiBzZXR0aW5ncyAqL1xuICAgIHNhdmVTZXR0aW5ncygpIHtcbiAgICAgICAgdGhpcy5kYXRhTWFuYWdlci5zYXZlVGltZXJTZXR0aW5ncyh0aGlzLnNldHRpbmdzKTtcbiAgICB9XG5cbiAgICAvKiBTYXZlIHRoZSB1c2VyJ3MgYXBwbGljYXRpb24gc2V0dGluZ3MgYWZ0ZXIgc29tZSB0aW1lIHBhc3Nlcy4gKi9cbiAgICBzYXZlU2V0dGluZ3NXaXRoRGVsYXkoKSB7XG4gICAgICAgIC8vIEEgdGltZW91dCBpcyB1c2VkIHRvIGFjY29tbW9kYXRlIHR3by13YXkgYmluZGluZyBpbiB0aGUgU3dpdGNoIGVsZW1lbnRzLlxuICAgICAgICAvLyBJZiB3ZSBkb24ndCB1c2UgYSB0aW1lb3V0LCB0aGVuIHRoZSB2YWx1ZSBvZiBzZXR0aW5ncy48YXR0cmlidXRlPlxuICAgICAgICAvLyBjaGFuZ2VzIGFmdGVyIHRoZSBjaGVja2VkQ2hhbmdlIGxpc3RlbmVyIGlzIGZpcmVkLCBhbmQgdGhlIG9yaWdpbmFsXG4gICAgICAgIC8vIHZhbHVlIGlzIHNhdmVkIGhlcmUuIFRoZSBhbHRlcm5hdGl2ZSBpcyB0byBpbXBsZW1lbnQgdHdvLXdheSBiaW5kaW5nIFxuICAgICAgICAvLyBtYW51YWxseSwgd2hpY2ggSSBmaW5kIGluZWxlZ2FudC5cbiAgICAgICAgc2V0VGltZW91dCggKCkgPT4gdGhpcy5zYXZlU2V0dGluZ3MoKSwgNTAwKTtcbiAgICB9XG5cbiAgICBiYWNrUHJlc3MoKSB7XG4gICAgICAgIHRoaXMubG9jYXRpb24uYmFjaygpO1xuICAgIH1cblxuICAgIG9uTm90aWZpY2F0aW9uVG9nZ2xlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2F2ZVNldHRpbmdzV2l0aERlbGF5KCk7XG4gICAgICAgIGxldCBzd2l0Y2hSZWYgPSA8U3dpdGNoPmV2ZW50Lm9iamVjdDtcbiAgICAgICAgaWYgKCFzd2l0Y2hSZWYuY2hlY2tlZCkge1xuICAgICAgICAgICAgYWxlcnQoJ1R1cm5pbmcgbm90aWZpY2F0aW9ucyBvZmYgd2lsbCBwcmV2ZW50IHRoZSBhcHAgZnJvbSBub3RpZnlpbmcgeW91IHRoYXQgYSB0aW1lZCBldmVudCBpcyBvdmVyIGlmIHRoZSBhcHBsaWNhdGlvbiBpcyBjbG9zZWQgb3IgaW5hY3RpdmUgZm9yIGxvbmcgcGVyaW9kcy4nKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19