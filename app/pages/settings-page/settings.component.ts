import { Component, OnDestroy } from "@angular/core";
import { Location } from "@angular/common";

import { SystemDataService } from "~/shared/data.service";
import { TimerSettings } from "~/shared/settings/timer-settings.model";

@Component({
    selector: "settings",
    templateUrl: "pages/settings-page/settings.component.html",
    styleUrls: ["pages/settings-page/settings.component.css"]
})
export class SettingsComponent implements OnDestroy {

    settings: TimerSettings;

    constructor(private dataManager: SystemDataService, private location: Location) {
        this.settings = this.dataManager.getTimerSettings();
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

    backPress() {
        this.location.back();
    }

}




