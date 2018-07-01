import { Component, OnInit, ElementRef } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { Page, NavigatedData } from "tns-core-modules/ui/page";
import { Task } from "../shared/task/task.model";
import { Step } from "../shared/step/step.model";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { SystemDataService } from "../shared/data.service";
import { DataRetriever } from "../shared/pass-data.service";
import { EventData } from "data/observable";

import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout/stack-layout";

@Component({
    selector: "tmr-task-list",
    templateUrl: "list_tasks/tasklist.component.html",
    styleUrls: ["list_tasks/tasklist.component.css"],
    providers: [SystemDataService]
})
export class TaskListComponent implements OnInit {

    taskList: Array<Task>;

    viewTask(task: Task) {
        DataRetriever.data = task;
        this.router.navigate(["task"]);
    }

    refreshTasks() {
        this.taskList = this.dataManager.loadAllTasks();
    }

    ngOnInit() {
        this.refreshTasks();
    }
    
    constructor(private page: Page, private dataManager: SystemDataService, private router: Router) {
        this.page.on(Page.navigatingToEvent, (event: NavigatedData) => {
            if (event.isBackNavigation) {
                this.refreshTasks();
            }
        });
    }

    newTask() {
        //create a blank activity and navigate to the edit activity
        //page so the user can fill in the details.
        DataRetriever.data = new Task("", "", []);
        this.router.navigate(["task/edit"]);
    }

}

