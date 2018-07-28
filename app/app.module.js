"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("nativescript-angular/forms");
var http_1 = require("nativescript-angular/http");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var router_1 = require("nativescript-angular/router");
var angular_1 = require("nativescript-ui-listview/angular");
var edit_step_component_1 = require("./pages/edit_step/edit-step.component");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var audio_service_1 = require("./shared/audio.service");
var data_service_1 = require("~/shared/data.service");
var pass_data_service_1 = require("~/shared/pass-data.service");
var notification_service_1 = require("~/shared/notification.service");
var firebase_service_1 = require("~/shared/firebase.service");
var share_task_service_1 = require("~/shared/share-task.service");
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
            providers: [
                audio_service_1.AudioService,
                edit_step_component_1.EditStepComponent,
                data_service_1.SystemDataService,
                pass_data_service_1.DataRetriever,
                notification_service_1.NotificationService,
                firebase_service_1.FirebaseService,
                share_task_service_1.ShareTaskService
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUM7QUFDekMsb0RBQXFFO0FBQ3JFLGtEQUFtRTtBQUNuRSxnRkFBOEU7QUFDOUUsc0RBQXVFO0FBQ3ZFLDREQUFnRjtBQUVoRiw2RUFBMEU7QUFDMUUsaURBQStDO0FBQy9DLDZDQUE4RDtBQUM5RCx3REFBc0Q7QUFDdEQsc0RBQTBEO0FBQzFELGdFQUEyRDtBQUMzRCxzRUFBb0U7QUFDcEUsOERBQTREO0FBQzVELGtFQUE4RDtBQTJCOUQ7SUFBQTtJQUNBLENBQUM7SUFEWSxTQUFTO1FBekJyQixlQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1Asd0NBQWtCO2dCQUNsQiwrQkFBdUI7Z0JBQ3ZCLDZCQUFzQjtnQkFDdEIsaUNBQXdCO2dCQUN4QixpQ0FBd0IsQ0FBQyxPQUFPLENBQUMsb0JBQU0sQ0FBQztnQkFDeEMsc0NBQTRCO2FBQzdCO1lBQ0QsZUFBZSxFQUFFLENBQUMsdUNBQWlCLENBQUM7WUFDcEMsWUFBWTtnQkFDViw0QkFBWTtxQkFDVCxtQ0FBcUIsQ0FDekI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsNEJBQVk7Z0JBQ1osdUNBQWlCO2dCQUNqQixnQ0FBaUI7Z0JBQ2pCLGlDQUFhO2dCQUNiLDBDQUFtQjtnQkFDbkIsa0NBQWU7Z0JBQ2YscUNBQWdCO2FBQ2pCO1lBQ0QsU0FBUyxFQUFFLENBQUMsNEJBQVksQ0FBQztTQUMxQixDQUFDO09BQ1csU0FBUyxDQUNyQjtJQUFELGdCQUFDO0NBQUEsQUFERCxJQUNDO0FBRFksOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktbGlzdHZpZXcvYW5ndWxhclwiO1xuXG5pbXBvcnQgeyBFZGl0U3RlcENvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL2VkaXRfc3RlcC9lZGl0LXN0ZXAuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5pbXBvcnQgeyByb3V0ZXMsIG5hdmlnYXRhYmxlQ29tcG9uZW50cyB9IGZyb20gXCIuL2FwcC5yb3V0aW5nXCI7XG5pbXBvcnQgeyBBdWRpb1NlcnZpY2UgfSBmcm9tIFwiLi9zaGFyZWQvYXVkaW8uc2VydmljZVwiO1xuaW1wb3J0IHsgU3lzdGVtRGF0YVNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvZGF0YS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBEYXRhUmV0cmlldmVyIH0gZnJvbSBcIn4vc2hhcmVkL3Bhc3MtZGF0YS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL25vdGlmaWNhdGlvbi5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvZmlyZWJhc2Uuc2VydmljZVwiO1xuaW1wb3J0IHsgU2hhcmVUYXNrU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9zaGFyZS10YXNrLnNlcnZpY2VcIlxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JSb290KHJvdXRlcyksXG4gICAgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZVxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtFZGl0U3RlcENvbXBvbmVudF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFwcENvbXBvbmVudCxcbiAgICAuLi5uYXZpZ2F0YWJsZUNvbXBvbmVudHNcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQXVkaW9TZXJ2aWNlLCBcbiAgICBFZGl0U3RlcENvbXBvbmVudCwgXG4gICAgU3lzdGVtRGF0YVNlcnZpY2UsIFxuICAgIERhdGFSZXRyaWV2ZXIsIFxuICAgIE5vdGlmaWNhdGlvblNlcnZpY2UsXG4gICAgRmlyZWJhc2VTZXJ2aWNlLFxuICAgIFNoYXJlVGFza1NlcnZpY2VcbiAgXSxcbiAgYm9vdHN0cmFwOiBbQXBwQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUge1xufVxuIl19