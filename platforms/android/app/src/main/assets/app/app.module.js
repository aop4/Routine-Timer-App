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
var data_service_1 = require("~/shared/data.service");
var pass_data_service_1 = require("~/shared/pass-data.service");
var notification_service_1 = require("~/shared/notification.service");
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
            providers: [audio_service_1.AudioService, edit_step_component_1.EditStepComponent, data_service_1.SystemDataService, pass_data_service_1.DataRetriever, notification_service_1.NotificationService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUM7QUFDekMsb0RBQXFFO0FBQ3JFLGtEQUFtRTtBQUNuRSxnRkFBOEU7QUFFOUUsc0RBQXVFO0FBQ3ZFLDREQUFnRjtBQUNoRix1RUFBb0U7QUFFcEUsaURBQStDO0FBQy9DLDZDQUE4RDtBQUc5RCx3REFBc0Q7QUFDdEQsc0RBQTBEO0FBQzFELGdFQUEyRDtBQUMzRCxzRUFBb0U7QUFvQnBFO0lBQUE7SUFDQSxDQUFDO0lBRFksU0FBUztRQWpCckIsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLHdDQUFrQjtnQkFDbEIsK0JBQXVCO2dCQUN2Qiw2QkFBc0I7Z0JBQ3RCLGlDQUF3QjtnQkFDeEIsaUNBQXdCLENBQUMsT0FBTyxDQUFDLG9CQUFNLENBQUM7Z0JBQ3hDLHNDQUE0QjthQUM3QjtZQUNELGVBQWUsRUFBRSxDQUFDLHVDQUFpQixDQUFDO1lBQ3BDLFlBQVk7Z0JBQ1YsNEJBQVk7cUJBQ1QsbUNBQXFCLENBQ3pCO1lBQ0QsU0FBUyxFQUFFLENBQUMsNEJBQVksRUFBRSx1Q0FBaUIsRUFBRSxnQ0FBaUIsRUFBRSxpQ0FBYSxFQUFFLDBDQUFtQixDQUFDO1lBQ25HLFNBQVMsRUFBRSxDQUFDLDRCQUFZLENBQUM7U0FDMUIsQ0FBQztPQUNXLFNBQVMsQ0FDckI7SUFBRCxnQkFBQztDQUFBLEFBREQsSUFDQztBQURZLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2dcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3L2FuZ3VsYXJcIjtcbmltcG9ydCB7IEVkaXRTdGVwQ29tcG9uZW50IH0gZnJvbSBcIi4vZWRpdF9zdGVwL2VkaXQtc3RlcC5jb21wb25lbnRcIjtcblxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgcm91dGVzLCBuYXZpZ2F0YWJsZUNvbXBvbmVudHMgfSBmcm9tIFwiLi9hcHAucm91dGluZ1wiO1xuaW1wb3J0IHsgQW5kcm9pZEFwcGxpY2F0aW9uLCBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSwgYW5kcm9pZCB9IGZyb20gXCJhcHBsaWNhdGlvblwiO1xuaW1wb3J0IHsgaXNBbmRyb2lkIH0gZnJvbSBcInBsYXRmb3JtXCI7XG5pbXBvcnQgeyBBdWRpb1NlcnZpY2UgfSBmcm9tIFwiLi9zaGFyZWQvYXVkaW8uc2VydmljZVwiO1xuaW1wb3J0IHsgU3lzdGVtRGF0YVNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvZGF0YS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBEYXRhUmV0cmlldmVyIH0gZnJvbSBcIn4vc2hhcmVkL3Bhc3MtZGF0YS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL25vdGlmaWNhdGlvbi5zZXJ2aWNlXCI7XG5cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpLFxuICAgIE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGVcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbRWRpdFN0ZXBDb21wb25lbnRdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBcHBDb21wb25lbnQsXG4gICAgLi4ubmF2aWdhdGFibGVDb21wb25lbnRzXG4gIF0sXG4gIHByb3ZpZGVyczogW0F1ZGlvU2VydmljZSwgRWRpdFN0ZXBDb21wb25lbnQsIFN5c3RlbURhdGFTZXJ2aWNlLCBEYXRhUmV0cmlldmVyLCBOb3RpZmljYXRpb25TZXJ2aWNlXSxcbiAgYm9vdHN0cmFwOiBbQXBwQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUge1xufVxuIl19