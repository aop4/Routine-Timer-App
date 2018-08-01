import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Page, NavigatedData } from "tns-core-modules/ui/page";
import * as dialogs from "ui/dialogs";
import * as Toast from "nativescript-toast";

import { Task } from "../../shared/task/task.model";
import { SystemDataService } from "../../shared/data.service";
import { DataRetriever } from "../../shared/pass-data.service";
import { FirebaseService } from "~/shared/firebase.service";
import { ConnectivityCheckService } from "~/shared/connectivity-checker.service";

@Component({
    selector: "tmr-task-list",
    templateUrl: "pages/list_tasks/tasklist.component.html",
    styleUrls: ["pages/list_tasks/tasklist.component.css"]
})
export class TaskListComponent implements OnInit {

    taskList: Array<Task>;

    viewTask(task: Task) {
        this.dataRetriever.data = task;
        this.router.navigate(["task"]);
    }

    /* Re-retrieves the tasks in the page from memory */
    refreshTasks() {
        this.taskList = this.dataManager.loadAllTasks();
    }

    ngOnInit() {
        //load the tasks from the database
        this.refreshTasks();
        //initialize connection to database
        this.firebaseService.initializeFirebase();
    }
    
    constructor(private page: Page, private dataManager: SystemDataService, private router: Router,
            private dataRetriever: DataRetriever, private firebaseService: FirebaseService,
            private connectivityService: ConnectivityCheckService) {
        this.page.on(Page.navigatingToEvent, (event: NavigatedData) => {
            if (event.isBackNavigation) {
                this.refreshTasks();
            }
        });
        this.dataManager.setSettingsIfNone(); //for a fresh install, set user preferences to their defaults
    }

    newTask() {
        //create a blank activity and navigate to the edit activity
        //page so the user can fill in the details.
        this.dataRetriever.data = new Task("", "", []);
        this.router.navigate(["task/edit"]);
    }

    /* Navigates to the settings page */
    openSettings() {
        this.router.navigate(["settings"]);
    }

    /* If the user has an internet connection, begin the process of downloading a task */
    taskDownload() {
        this.connectivityService.checkConnection()
        .then(() => {
            //if there's an internet connection
            this.giveDownloadPrompt();
        }, () => {
            //if there's not
            dialogs.alert({
                title: "No Connection",
                message: "You must have an internet connection to download a task.",
                okButtonText: "OK"
            });
        });
    }

    /* Prompt the user to download a task, and attempt to download it if desired. */
    giveDownloadPrompt() {
        //prompt for an ID
        dialogs.prompt({
            title: "Download a task",
            message: "Did someone share a task with you? Enter the task's 8-character code (case insensitive).",
            inputType: dialogs.inputType.text,
            okButtonText: "OK",
            cancelButtonText: "Cancel"
        }).then((res) => {
            //if the user pressed OK
            if (res.result) {
                this.downloadTask(res.text);
            }
        });
    }

    /* Download a task, and if it exists, save it and refresh the task list */
    downloadTask(taskID: string) {
        this.firebaseService.getTask(taskID).then((result) => {
            if (result.value === null) {
                //display a message saying this task doesn't exist
                this.downloadFailed();
            }
            else {
                //save the task to the system
                this.dataManager.saveNewTask(result.value, true)
                //refresh the tasks list
                .then(() => this.refreshTasks());
            }
        });
    }

    /* display a message indicating a task id the user entered task doesn't exist */
    downloadFailed() {
        let toast = Toast.makeText("Unable to retrieve that task.");
        toast.show();
        this.taskDownload();
    }

}

