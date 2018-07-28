import { Injectable } from "@angular/core";
import * as dialogs from "ui/dialogs";
import * as Toast from "nativescript-toast";

import { Task } from "./task/task.model";
import { TimerSettings } from "~/shared/settings/timer-settings.model";

@Injectable()
export class SystemDataService {

    appSettings = require("application-settings");
    private timerSettings: TimerSettings = null; //a cached version of the timer settings
    private tasks = null; //a cached version of the tasks list in the app data

    private saveSuccessMessage(taskName: string) {
        Toast.makeText("Save successful!").show();
    }

    private writeTask(savedTasks, task: Task) {
        let d = new Date();
        task.modifiedTimestamp = d.getTime();
        savedTasks[task.name] = task;
        let newTasks = JSON.stringify(savedTasks);
        this.appSettings.setString("tasks", newTasks);
        this.tasks = savedTasks;
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
                    this.writeTask(savedTasks, task);
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
            var savedTasks = this.getOrCreateTaskList();
            //should show an overwrite modal iff the user didn't get here by intentionally
            //editing the activity they're overwriting, since otherwise it's obvious/annoying
            if (promptForOverwrite && savedTasks[task.name]) {
                this.overwritingData(task, savedTasks).then((overwrote) => {
                    if (overwrote) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                });
            }
            else {
                this.writeTask(savedTasks, task);
                resolve(true);
            }
        });
    }

    private getOrCreateTaskList() {
        if (!this.tasks) {
            this.refreshCache();
        }
        return this.tasks;
    }

    deleteTask(task: Task) {
        let savedTasks = this.getOrCreateTaskList();
        delete savedTasks[task.name];
        this.appSettings.setString("tasks", JSON.stringify(savedTasks));
        this.tasks = savedTasks; //update the cached version
    }

    /* Return a list of tasks sorted by most recent */
    loadAllTasks() {
        let savedTasks = this.getOrCreateTaskList();
        let taskList = Object.keys(savedTasks).map(key => savedTasks[key]);
        //sort the tasks in descending order of time modified
        return taskList.sort((a, b) => { return b.modifiedTimestamp - a.modifiedTimestamp });
    }
    
    /* Returns the stored version of the task with a name == id, as it's written in the machine. */
    loadTaskById(id: string) {
        this.refreshCache();
        return this.tasks[id];
    }

    private refreshCache() {
        this.tasks = JSON.parse(this.appSettings.getString("tasks", "{}"));
    }

    /* Reset the settings to their defaults if they've never been set or have been wiped from memory
    (and so are undefined) */
    setSettingsIfNone() {
        let needToSaveSettings = false;
        let settings = <TimerSettings>JSON.parse(this.appSettings.getString("timer_settings", "{}"));
        if (typeof settings.wantsTone === "undefined") {
            needToSaveSettings = true;
            settings.wantsTone = true;
            settings.continuousTone = false;
        }
        if (typeof settings.wantsVibrate === "undefined") {
            needToSaveSettings = true;
            settings.wantsVibrate = true;
            settings.continuousVibrate = true; //I find I prefer vibration for alarms, so this is
                                                //a default for now
        }
        if (typeof settings.wantsNotifications === "undefined") {
            needToSaveSettings = true;
            settings.wantsNotifications = false; //don't use notifications by default: can be annoying
        }
        if (needToSaveSettings) {
            this.appSettings.setString("timer_settings", JSON.stringify(settings));
        }
    }

    /* Returns the user settings (preferences) as a TimerSettings object. Assumes these settings
    exist since, if they didn't exist, they were re-created when the app started up by
    this.setSettingsIfNone(). */
    getTimerSettings() {
        //reload this.settings on a fresh restart
        if (! this.timerSettings) {
            this.timerSettings = <TimerSettings>JSON.parse(this.appSettings.getString("timer_settings"));
        }
        return this.timerSettings;
    }

    saveTimerSettings(timerSettings: TimerSettings) {
        this.appSettings.setString("timer_settings", JSON.stringify(timerSettings));
        this.timerSettings = timerSettings; //update the cached version of the timer settings
    }

}