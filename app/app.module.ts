import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { EditStepComponent } from "./pages/edit_step/edit-step.component";
import { AppComponent } from "./app.component";
import { routes, navigatableComponents } from "./app.routing";
import { AudioService } from "./shared/audio.service";
import { SystemDataService } from "~/shared/data.service";
import { DataRetriever } from "~/shared/pass-data.service";
import { NotificationService } from "~/shared/notification.service";
import { FirebaseService } from "~/shared/firebase.service";
import { ShareTaskService } from "~/shared/share-task.service";
import { ConnectivityCheckService } from "~/shared/connectivity-checker.service";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes),
    NativeScriptUIListViewModule
  ],
  entryComponents: [EditStepComponent],
  declarations: [
    AppComponent,
    ...navigatableComponents
  ],
  providers: [
    AudioService, 
    EditStepComponent, 
    SystemDataService, 
    DataRetriever, 
    NotificationService,
    FirebaseService,
    ShareTaskService,
    ConnectivityCheckService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
