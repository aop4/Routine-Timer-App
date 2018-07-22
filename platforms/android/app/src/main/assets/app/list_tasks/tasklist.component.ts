import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Page, NavigatedData } from "tns-core-modules/ui/page";
import { Task } from "../shared/task/task.model";
import { SystemDataService } from "../shared/data.service";
import { DataRetriever } from "../shared/pass-data.service";
import * as dialogs from "ui/dialogs";
import { FirebaseService } from "~/shared/firebase.service";
import * as Toast from "nativescript-toast";
import * as SocialShare from "nativescript-social-share";
import { ShareTaskService } from "~/shared/share-task.service";

@Component({
    selector: "tmr-task-list",
    templateUrl: "list_tasks/tasklist.component.html",
    styleUrls: ["list_tasks/tasklist.component.css"]
})
export class TaskListComponent implements OnInit {

    taskList: Array<Task>;

    viewTask(task: Task) {
        this.dataRetriever.data = task;
        this.router.navigate(["task"]);
    }

    refreshTasks() {
        this.taskList = this.dataManager.loadAllTasks();
    }

    ngOnInit() {
        this.refreshTasks();
        this.firebaseService.initializeFirebase();
    }
    
    constructor(private page: Page, private dataManager: SystemDataService, private router: Router,
            private dataRetriever: DataRetriever, private firebaseService: FirebaseService) {
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

    openSettings() {
        this.router.navigate(["settings"]);
    }

    promptToDownloadTask() {
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

    downloadTask(taskID: string) {
        this.firebaseService.getTask(taskID).then((result) => {
            if (result.value === null) {
                this.downloadFailed();
            }
            else {
                this.dataManager.saveNewTask(result.value, true)
                .then(() => this.refreshTasks());
            }
        });
    }

    downloadFailed() {
        let toast = Toast.makeText("Unable to retrieve that task.");
        toast.show();
        this.promptToDownloadTask();
    }

}

