import * as LocalNotifications from "nativescript-local-notifications";
import { Injectable } from "@angular/core";
import { resumeEvent, suspendEvent, on as applicationOn } from "application";

import { SystemDataService } from "~/shared/data.service";

@Injectable()
export class NotificationService {

    appInView: boolean = true; //whether or not the app is currently open+displayed on the user's screen
    lastNotificationId: number = 0; //the most recent notification's id

    constructor(private dataService: SystemDataService) {
        applicationOn(resumeEvent, () => {
             this.setAppInView(true);
             this.clearAllNotifications(); //so the user doesn't have to cancel them manually
        });
        applicationOn(suspendEvent, () => this.setAppInView(false));
    }

    setAppInView(val: boolean) {
        this.appInView = val;
    }

    /* Cancel all notifications received from this app thus far */
    clearAllNotifications() {
        if (this.dataService.getTimerSettings().wantsNotifications) {
            for (let id = 0; id <= this.lastNotificationId; id++) {
                LocalNotifications.cancel(id);
            }
        }
    }

    /* if the app isn't being displayed on the user's screen right now,
    send a local notification saying that a step's timer has ended */
    makeNotification(stepName: string) {
        if (!this.appInView && this.dataService.getTimerSettings().wantsNotifications) {
            LocalNotifications.schedule([{
                id: this.lastNotificationId,
                title: "Time's up!",
                body: "Time's up for " + stepName
            }]);
            this.lastNotificationId++;
        }
    }

}
