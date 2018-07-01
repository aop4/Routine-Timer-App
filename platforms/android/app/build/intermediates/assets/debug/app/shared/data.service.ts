import { Injectable } from "@angular/core";
import { Task } from "./task/task.model";
import { EventData } from "data/observable";
import * as dialogs from "ui/dialogs";
import * as Toast from "nativescript-toast";

@Injectable()
export class SystemDataService {

    private saveSuccessMessage(taskName: string) {
        Toast.makeText("Save successful!").show();
    }

    private writeTask(savedTasks, task: Task) {
        let d = new Date();
        task.modifiedTimestamp = d.getTime();
        savedTasks[task.name] = task;
        let newTasks = JSON.stringify(savedTasks);
        const appSettings = require("application-settings");
        appSettings.setString("tasks", newTasks);
        this.saveSuccessMessage(task.name);
    }

    overwritingData(task: Task, savedTasks: Object) {
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
                return true;
            }
            return false;
        });
    }

    /* Attempts to save task. Returns true on success and false if the user decides not to save. */
    saveNewTask(task: Task, promptForOverwrite: boolean) {
        return new Promise<Boolean>( (resolve) => {
            const appSettings = require("application-settings");
            var savedTasks = JSON.parse(appSettings.getString("tasks", "{}"));
            //should show an overwrite modal iff the user didn't get here by intentionally
            //editing the activity they're overwriting, since otherwise it's obvious/annoying
            if (promptForOverwrite && savedTasks[task.name]) {
                let overwrote = this.overwritingData(task, savedTasks);
                if (overwrote) {
                    resolve(true);
                }
                else {
                    resolve(false)
                }
            }
            else {
                this.writeTask(savedTasks, task);
                resolve(true);
            }
        });
    }

    deleteTask(task: Task) {
        const appSettings = require("application-settings");
        let savedTasks = JSON.parse(appSettings.getString("tasks", "{}"));
        delete savedTasks[task.name];
        appSettings.setString("tasks", JSON.stringify(savedTasks));
    }

    loadAllTasks() {
        const appSettings = require("application-settings");
        var savedTasks = JSON.parse(appSettings.getString("tasks", "{}"));
        //probs want to sort by date...
        return Object.keys(savedTasks).map(key => savedTasks[key]);
    }

    loadTaskById(id: string) {
        const appSettings = require("application-settings");
        var savedTasks = JSON.parse(appSettings.getString("tasks", "{}"));
        return <Task>(savedTasks[id]);
    }

}