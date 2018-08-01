import { Injectable } from "@angular/core";
import * as dialogs from "ui/dialogs";
import * as Toast from "nativescript-toast";

import { Task } from "./task/task.model";
import { TimerSettings } from "~/shared/settings/timer-settings.model";

@Injectable()
export class SystemDataService {

    appSettings = require("application-settings");
    private timerSettings: TimerSettings = null; //a cached version of the timer settings
    private tasks = null; //a cached version of the tasks list saved in the app data

    /* Display a "save successful" toast */
    private saveSuccessMessage(taskName: string) {
        Toast.makeText("Save successful!").show();
    }

    /* Saves a task to the system. savedTasks is the list of tasks
    alread in the system (at path "tasks").  */
    private writeTask(savedTasks, task: Task) {
        //set the current time as a timestamp for the task's last save
        let d = new Date();
        task.modifiedTimestamp = d.getTime();
        //add the task to the system's saved tasks
        savedTasks[task.name] = task;
        let newTasks = JSON.stringify(savedTasks);
        this.appSettings.setString("tasks", newTasks);
        //refresh the cached version of the tasks
        this.tasks = savedTasks;
        this.saveSuccessMessage(task.name);
    }

    /* Warn the user that they're overwriting data if they save task task.
    If they want to overwrite, saves the task and returns a promise that
    resolves with the boolean value true. If they don't, does not save the
    task and returns a promise that resolves with false. */
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

    /* Attempts to save task. If promptForOverwrite is true, checks to see whether
    a task with the same name is already saved. If it is, the user is asked if they
    want to overwrite it. Returns a promise that resolves with true if a save is
    completed and false if the user decides not to save (because they don't want
    to overwrite data). */
    saveNewTask(task: Task, promptForOverwrite: boolean) {
        return new Promise<Boolean>( (resolve) => {
            var savedTasks = this.getOrCreateTaskList();
            //if there's a danger of overwriting and promptForOverwrite is true
            if (promptForOverwrite && savedTasks[task.name]) {
                this.overwritingData(task, savedTasks).then((overwrote) => {
                    //if the user chose to overwrite
                    if (overwrote) {
                        resolve(true);
                    }
                    //if they didn't
                    else {
                        resolve(false);
                    }
                });
            }
            else {
                //overwriting is not a concern; just save the task
                this.writeTask(savedTasks, task);
                resolve(true);
            }
        });
    }

    /* Simply return the cached task list if possible. If there is
    no cached list, then reload it from memory and return it. */
    private getOrCreateTaskList() {
        if (!this.tasks) {
            this.refreshCache();
        }
        return this.tasks;
    }

    /* Delete the task with task's name from memory, if it exists. */
    deleteTask(task: Task) {
        let savedTasks = this.getOrCreateTaskList();
        delete savedTasks[task.name];
        this.appSettings.setString("tasks", JSON.stringify(savedTasks));
        this.tasks = savedTasks; //update the cached version
    }

    /* Return a list of tasks sorted by most recent */
    loadAllTasks() {
        //retrieve the system's *object* full of task objects, which is 
        //formatted as {'taskName1': task1, 'taskName2':task2, ...}
        let savedTasks = this.getOrCreateTaskList();
        //get rid of the names and simply obtain an *array* of the tasks
        let taskList = Object.keys(savedTasks).map(key => savedTasks[key]);
        //sort the task array in descending order of time modified
        return taskList.sort((a, b) => { return b.modifiedTimestamp - a.modifiedTimestamp });
    }
    
    /* Returns the stored version of the task with a name == id. */
    loadTaskById(id: string) {
        this.refreshCache();
        return this.tasks[id];
    }

    /* Sets the cache to the system's saved task list */
    private refreshCache() {
        this.tasks = JSON.parse(this.appSettings.getString("tasks", "{}"));
    }

    /* Scan the user's app settings and set them to their defaults if they've
    never been set or have been somehow wiped from memory (and so are undefined) */
    setSettingsIfNone() {
        let needToSaveSettings = false; //whether the settings need to be saved to the system
        let settings = <TimerSettings>JSON.parse(this.appSettings.getString("timer_settings", "{}"));
        //if some setting is undefined, set it to its default and ensure the settings are saved
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
            settings.wantsNotifications = true;
        }
        if (needToSaveSettings) {
            //save the settings to system storage
            this.appSettings.setString("timer_settings", JSON.stringify(settings));
        }
    }

    /* Returns the user settings (preferences) as a TimerSettings object.
    Retrieves the cached settings if possible, and otherwise returns the
    settings stored in the system and refreshes the cache. Assumes the settings have been
    set since, if they didn't exist, they were re-created when the app started up by
    this.setSettingsIfNone(). */
    getTimerSettings() {
        //reload this.settings on a fresh restart
        if (! this.timerSettings) {
            this.timerSettings = <TimerSettings>JSON.parse(this.appSettings.getString("timer_settings"));
        }
        return this.timerSettings;
    }

    /* Save timerSettings in storage, and update the cached version */
    saveTimerSettings(timerSettings: TimerSettings) {
        this.appSettings.setString("timer_settings", JSON.stringify(timerSettings));
        this.timerSettings = timerSettings; //update the cached version of the timer settings
    }

}
