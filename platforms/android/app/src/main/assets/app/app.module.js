"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("nativescript-angular/forms");
var http_1 = require("nativescript-angular/http");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var router_1 = require("nativescript-angular/router");
var angular_1 = require("nativescript-ui-listview/angular");
var edit_step_component_1 = require("./edit_step/edit-step.component");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var audio_service_1 = require("./shared/audio.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_module_1.NativeScriptModule,
                forms_1.NativeScriptFormsModule,
                http_1.NativeScriptHttpModule,
                router_1.NativeScriptRouterModule,
                router_1.NativeScriptRouterModule.forRoot(app_routing_1.routes),
                angular_1.NativeScriptUIListViewModule
            ],
            entryComponents: [edit_step_component_1.EditStepComponent],
            declarations: [
                app_component_1.AppComponent
            ].concat(app_routing_1.navigatableComponents),
            providers: [audio_service_1.AudioService, edit_step_component_1.EditStepComponent],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUM7QUFDekMsb0RBQXFFO0FBQ3JFLGtEQUFtRTtBQUNuRSxnRkFBOEU7QUFFOUUsc0RBQXVFO0FBQ3ZFLDREQUFnRjtBQUNoRix1RUFBb0U7QUFFcEUsaURBQStDO0FBQy9DLDZDQUE4RDtBQUc5RCx3REFBc0Q7QUFvQnREO0lBQUE7SUFDQSxDQUFDO0lBRFksU0FBUztRQWpCckIsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLHdDQUFrQjtnQkFDbEIsK0JBQXVCO2dCQUN2Qiw2QkFBc0I7Z0JBQ3RCLGlDQUF3QjtnQkFDeEIsaUNBQXdCLENBQUMsT0FBTyxDQUFDLG9CQUFNLENBQUM7Z0JBQ3hDLHNDQUE0QjthQUM3QjtZQUNELGVBQWUsRUFBRSxDQUFDLHVDQUFpQixDQUFDO1lBQ3BDLFlBQVk7Z0JBQ1YsNEJBQVk7cUJBQ1QsbUNBQXFCLENBQ3pCO1lBQ0QsU0FBUyxFQUFFLENBQUMsNEJBQVksRUFBRSx1Q0FBaUIsQ0FBQztZQUM1QyxTQUFTLEVBQUUsQ0FBQyw0QkFBWSxDQUFDO1NBQzFCLENBQUM7T0FDVyxTQUFTLENBQ3JCO0lBQUQsZ0JBQUM7Q0FBQSxBQURELElBQ0M7QUFEWSw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2dcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1saXN0dmlldy9hbmd1bGFyXCI7XHJcbmltcG9ydCB7IEVkaXRTdGVwQ29tcG9uZW50IH0gZnJvbSBcIi4vZWRpdF9zdGVwL2VkaXQtc3RlcC5jb21wb25lbnRcIjtcclxuXHJcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgcm91dGVzLCBuYXZpZ2F0YWJsZUNvbXBvbmVudHMgfSBmcm9tIFwiLi9hcHAucm91dGluZ1wiO1xyXG5pbXBvcnQgeyBBbmRyb2lkQXBwbGljYXRpb24sIEFuZHJvaWRBY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnREYXRhLCBhbmRyb2lkIH0gZnJvbSBcImFwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCB7IGlzQW5kcm9pZCB9IGZyb20gXCJwbGF0Zm9ybVwiO1xyXG5pbXBvcnQgeyBBdWRpb1NlcnZpY2UgfSBmcm9tIFwiLi9zaGFyZWQvYXVkaW8uc2VydmljZVwiO1xyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXHJcbiAgICBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlLFxyXG4gICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLFxyXG4gICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvclJvb3Qocm91dGVzKSxcclxuICAgIE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGVcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW0VkaXRTdGVwQ29tcG9uZW50XSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEFwcENvbXBvbmVudCxcclxuICAgIC4uLm5hdmlnYXRhYmxlQ29tcG9uZW50c1xyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbQXVkaW9TZXJ2aWNlLCBFZGl0U3RlcENvbXBvbmVudF0sXHJcbiAgYm9vdHN0cmFwOiBbQXBwQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHtcclxufSJdfQ==