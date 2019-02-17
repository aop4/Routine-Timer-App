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
        this.saveSettings();
    }

    /* Set whether the alarm tone rings continuously or just once */
    setContinuousTone(val: boolean) {
        this.settings.continuousTone = val;
        this.saveSettings();
    }

    ngOnDestroy() {
        //make sure app settings are saved when the user leaves page
        this.saveSettings();
    }

    /* Saves the user's application settings */
    saveSettings() {
        this.dataManager.saveTimerSettings(this.settings);
    }

    /* Save the user's application settings after some time passes. */
    saveSettingsWithDelay() {
        // A timeout is used to accommodate two-way binding in the Switch elements.
        // If we don't use a timeout, then the value of settings.<attribute>
        // changes after the checkedChange listener is fired, and the original
        // value is saved here. The alternative is to implement two-way binding 
        // manually, which I find inelegant.
        setTimeout( () => this.saveSettings(), 500);
    }

    backPress() {
        this.location.back();
    }

    onNotificationToggle(event) {
        this.saveSettingsWithDelay();
        let switchRef = <Switch>event.object;
        if (!switchRef.checked) {
            alert('Turning notifications off will prevent the app from notifying you that a timed event is over if the application is closed or inactive.');
        }
    }

}
