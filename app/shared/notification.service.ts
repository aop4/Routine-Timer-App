import * as LocalNotifications from "nativescript-local-notifications";
import { Injectable } from "@angular/core";
import { resumeEvent, suspendEvent, on as applicationOn, displayedEvent } from "application";

import { SystemDataService } from "~/shared/data.service";
import { Router } from "@angular/router";
import { Step } from "~/shared/step/step.model";
import { Task } from "~/shared/task/task.model";
import { AudioService } from "~/shared/audio.service";

@Injectable()
export class NotificationService {

    notificationIDs: any = {}; //maps step identifiers to the notifications
                          //scheduled for corresponding steps
    lastNotificationId: number = 0; //the most recent notification's id
    appInView: boolean = true;

    constructor(private dataService: SystemDataService, private audioService: AudioService) {
        //when the user brings up the application after viewing
        //another app or the display being off
        applicationOn(resumeEvent, () => {
             this.setAppInView(true);
             this.audioService.stopAlarm();
        });
        //when the user views another application or the display turns off
        applicationOn(suspendEvent, () => this.setAppInView(false));
    }

    setAppInView(val: boolean) {
        this.appInView = val;
    }

    /* Cancel all notifications received from this app thus far */
    clearAllNotifications() {
        LocalNotifications.cancelAll();
    }

    /* Return a unique string identifier for a step based on its (unique) parent task name
    and its index in the parent task. Assumes the user does not include the string '__id__' 
    followed by a number in their task names. If they do, there's an infinitessimal chance
    that a notificiation will go off for the wrong step of the wrong routine. */
    generateStepId(task: Task, stepIndex: number) {
        return task.name + "__id__" + stepIndex;
    }

    notificationScheduledFor(taskId: string) {
        if (this.notificationIDs[taskId]) {
            return true;
        }
        return false;
    }

    /* Schedules a notification to occur after the specified number of minutes and 
    seconds go by. If the step given as input is already represented in
    notificationSet, its scheduled notification will be overwritten. */
    scheduleNotification(task: Task, step: Step, stepIndex: number, minutes: number,
    seconds: number) {
        //generate an identifier for the step
        let stepId = this.generateStepId(task, stepIndex);
        //get a notification ID for the notification to schedule
        //(may return an existing notification ID if one exists for
        //the step)
        let notificationId = this.getOrCreateNotificationId(stepId);
        let scheduledDate = this.getDateInFuture(minutes, seconds);
        LocalNotifications.schedule([{
            id: notificationId,
            at: scheduledDate,
            title: "Time's up!",
            body: "Time's up for " + step.name
        }]);
    }

    cancelNotificationFor(task: Task, stepIndex: number) {
        //generate an identifier for the step
        let stepId = this.generateStepId(task, stepIndex);
        if (!this.notificationScheduledFor(stepId)) {
            return;
        }
        LocalNotifications.cancel(this.notificationIDs[stepId]);
        delete this.notificationIDs[stepId];
    }

    getOrCreateNotificationId(stepId: string) {
        if (this.notificationScheduledFor(stepId)) {
            return this.notificationIDs[stepId];
        }
        else {
            //generate an ID for the notification to schedule
            let notificationId = ++this.lastNotificationId;
            //record the association between the step and the notification ID
            this.notificationIDs[stepId] = notificationId;
            return notificationId;
        }
    }

    /* Returns a date that's the specified number of seconds and minutes in the 
    future */
    getDateInFuture(minutes, seconds): Date {
        let currTime = (new Date()).getTime();
        let scheduledTimestamp = currTime + (1000 * seconds) + (60000 * minutes);
        return new Date(scheduledTimestamp);
    }

}
