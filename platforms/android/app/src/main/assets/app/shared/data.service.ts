import { Injectable } from "@angular/core";
import { Task } from "./task/task.model";
import { EventData } from "data/observable";
import * as dialogs from "ui/dialogs";
import * as Toast from "nativescript-toast";
import { TimerSettings } from "~/shared/settings/timer-settings.model";

@Injectable()
export class SystemDataService {

    appSettings = require("application-settings");

    private saveSuccessMessage(taskName: string) {
        Toast.makeText("Save successful!").show();
    }

    private writeTask(savedTasks, task: Task) {
        let d = new Date();
        task.modifiedTimestamp = d.getTime();
        savedTasks[task.name] = task;
        let newTasks = JSON.stringify(savedTasks);
        this.appSettings.setString("tasks", newTasks);
        this.saveSuccessMessage(task.name);
    }

    overwritingData(task: Task, savedTasks: Object): Promise<Boolean> {
        return new Promise<Boolean>((resolve) => {
            let options = {
                title: "Overwriting data",
                message: "The routine " + task.name + " already exists. Do you want to overwrite it?",
                okButtonText: "Yes",
                cancelButtonText: "No",
                neutralButtonText: "Cancel"
            };
            dialogs.confirm(options).then((wantsToOverwrite: boolean) => {
                if (wantsToOverwrite) {
                    this.writeTask(savedTasks, task)
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            });
        });
    }

    /* Attempts to save task. Returns true on success and false if the user decides not to save. */
    saveNewTask(task: Task, promptForOverwrite: boolean) {
        return new Promise<Boolean>( (resolve) => {
            var savedTasks = JSON.parse(this.appSettings.getString("tasks", "{}"));
            //should show an overwrite modal iff the user didn't get here by intentionally
            //editing the activity they're overwriting, since otherwise it's obvious/annoying
            if (promptForOverwrite && savedTasks[task.name]) {
                this.overwritingData(task, savedTasks).then((overwrote) => {
                    console.log("overwrote: "+overwrote);
                    if (overwrote) {
                        resolve(true);
                    }
                    else {
                        resolve(false)
                    }
                });
            }
            else {
                this.writeTask(savedTasks, task);
                resolve(true);
            }
        });
    }

    deleteTask(task: Task) {
        let savedTasks = JSON.parse(this.appSettings.getString("tasks", "{}"));
        delete savedTasks[task.name];
        this.appSettings.setString("tasks", JSON.stringify(savedTasks));
    }

    loadAllTasks() {
        let savedTasks = JSON.parse(this.appSettings.getString("tasks", "{}"));
        //probs want to sort by date...
        return Object.keys(savedTasks).map(key => savedTasks[key]);
    }

    loadTaskById(id: string) {
        let savedTasks = JSON.parse(this.appSettings.getString("tasks", "{}"));
        return <Task>(savedTasks[id]);
    }

    /* Reset the settings to their defaults if they've never been set or have been wiped from memory
    (and so are undefined) */
    setSettingsIfNone() {
        let needToSaveSettings = false;
        let settings = <TimerSettings>JSON.parse(this.appSettings.getString("timer_settings", "{}"));
        if (typeof settings.wantsTone === "undefined") {
            needToSaveSettings = true;
            settings.wantsTone = true;
            settings.continuousTone = true;
        }
        if (typeof settings.wantsVibrate === "undefined") {
            needToSaveSettings = true;
            settings.wantsVibrate = true; //in case device volume's muted to begin with
            settings.continuousVibrate = false;
        }
        if (needToSaveSettings) {
            this.appSettings.setString("timer_settings", JSON.stringify(settings));
        }
    }

    /* Returns the user settings (preferences) as a TimerSettings object. Assumes these settings
    exist since, if they didn't exist, they were re-created when the app started up by
    this.setSettingsIfNone(). */
    getTimerSettings() {
        return <TimerSettings>JSON.parse(this.appSettings.getString("timer_settings"));
    }

    saveTimerSettings(timerSettings: TimerSettings) {
        this.appSettings.setString("timer_settings", JSON.stringify(timerSettings));
    }

}