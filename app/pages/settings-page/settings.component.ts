import { Component, OnDestroy } from "@angular/core";
import { Location } from "@angular/common";
import { Switch } from "tns-core-modules/ui/switch/switch";

import { SystemDataService } from "~/shared/data.service";
import { TimerSettings } from "~/shared/settings/timer-settings.model";

@Component({
    selector: "settings",
    templateUrl: "pages/settings-page/settings.component.html",
    styleUrls: ["pages/settings-page/settings.component.css"]
})
export class SettingsComponent implements OnDestroy {

    settings: TimerSettings; //an object representing the settings the user wants for the app

    constructor(private dataManager: SystemDataService, private location: Location) {
        this.settings = this.dataManager.getTimerSettings();
    }

    /* Set whether vibration is continuous or a one-time occurrence */
    setContinuousVibrate(val: boolean) {
        this.settings.continuousVibrate = val;
    }

    /* Set whether the alarm tone rings continuously or just once */
    setContinuousTone(val: boolean) {
        this.settings.continuousTone = val;
    }

    ngOnDestroy() {
        //make sure app settings are saved when the user leaves page
        this.dataManager.saveTimerSettings(this.settings);
    }

    backPress() {
        this.location.back();
    }

    onNotificationToggle(event) {
        let switchRef = <Switch>event.object;
        if (!switchRef.checked) {
            alert('Turning notifications off will prevent the app from notifying you that a timed event is over if the application is closed or inactive.');
        }
    }

}




