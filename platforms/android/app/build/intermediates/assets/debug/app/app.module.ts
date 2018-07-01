import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { EditStepComponent } from "./edit_step/edit-step.component";

import { AppComponent } from "./app.component";
import { routes, navigatableComponents } from "./app.routing";
import { AndroidApplication, AndroidActivityBackPressedEventData, android } from "application";
import { isAndroid } from "platform";


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
  providers: [EditStepComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}