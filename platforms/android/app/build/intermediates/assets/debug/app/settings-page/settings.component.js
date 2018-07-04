"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var data_service_1 = require("~/shared/data.service");
var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(systemDataService) {
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dGluZ3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBQzFDLHNEQUEwRDtBQVExRDtJQU9JLDJCQUFZLGlCQUFvQztJQUVoRCxDQUFDO0lBVFEsaUJBQWlCO1FBTjdCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsdUNBQXVDO1lBQ3BELFNBQVMsRUFBRSxDQUFDLHNDQUFzQyxDQUFDO1lBQ25ELFNBQVMsRUFBRSxDQUFDLGdDQUFpQixDQUFDO1NBQ2pDLENBQUM7eUNBUWlDLGdDQUFpQjtPQVB2QyxpQkFBaUIsQ0FVN0I7SUFBRCx3QkFBQztDQUFBLEFBVkQsSUFVQztBQVZZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBTeXN0ZW1EYXRhU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9kYXRhLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwic2V0dGluZ3NcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJzZXR0aW5ncy1wYWdlL3NldHRpbmdzLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJzZXR0aW5ncy1wYWdlL3NldHRpbmdzLmNvbXBvbmVudC5jc3NcIl0sXG4gICAgcHJvdmlkZXJzOiBbU3lzdGVtRGF0YVNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIFNldHRpbmdzQ29tcG9uZW50IHtcblxuICAgIHdhbnRzVmlicmF0ZTogYm9vbGVhbjtcbiAgICB3YW50c1RvbmU6IGJvb2xlYW47XG4gICAgd2FudHNDb250aW51b3VzVmlicmF0ZTogYm9vbGVhbjtcbiAgICB3YW50c0NvbnRpbnVvdXNUb25lOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3Ioc3lzdGVtRGF0YVNlcnZpY2U6IFN5c3RlbURhdGFTZXJ2aWNlKSB7XG5cbiAgICB9XG59XG5cblxuXG5cbiJdfQ==