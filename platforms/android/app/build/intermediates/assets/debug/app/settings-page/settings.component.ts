import { Component } from "@angular/core";
import { SystemDataService } from "~/shared/data.service";

@Component({
    selector: "settings",
    templateUrl: "settings-page/settings.component.html",
    styleUrls: ["settings-page/settings.component.css"],
    providers: [SystemDataService]
})
export class SettingsComponent {

    wantsVibrate: boolean;
    wantsTone: boolean;
    wantsContinuousVibrate: boolean;
    wantsContinuousTone: boolean;

    constructor(systemDataService: SystemDataService) {

    }
}




