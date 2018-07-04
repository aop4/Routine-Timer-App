import { Component, OnDestroy } from "@angular/core";
import { SystemDataService } from "~/shared/data.service";
import { TimerSettings } from "~/shared/settings/timer-settings.model";

@Component({
    selector: "settings",
    templateUrl: "settings-page/settings.component.html",
    styleUrls: ["settings-page/settings.component.css"],
    providers: [SystemDataService]
})
export class SettingsComponent implements OnDestroy {

    settings: TimerSettings;

    constructor(private dataManager: SystemDataService) {
        this.settings = this.dataManager.getTimerSettings();
        console.log(this.settings);
    }

    setContinuousVibrate(val: boolean) {
        this.settings.continuousVibrate = val;
    }

    setContinuousTone(val: boolean) {
        this.settings.continuousTone = val;
    }

    ngOnDestroy() {
        this.dataManager.saveTimerSettings(this.settings);
    }

}




