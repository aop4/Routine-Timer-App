import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import * as dialogs from "ui/dialogs";

import { Task } from "../../../shared/task/task.model";
import { DataRetriever } from "../../../shared/pass-data.service";
import { SystemDataService } from "../../../shared/data.service";
import { ShareTaskService } from "~/shared/share-task.service";

@Component({
    selector: "task-selector",
    templateUrl: "pages/list_tasks/task-selector/task-selector.component.html",
    styleUrls: ["pages/list_tasks/task-selector/task-selector.component.css"]
})
/* Represents an item in the tasks list. */
export class TaskSelectorComponent {

    @Input() task: Task;
    @Input() index: number; //the index of the task
    @Input() taskList: Array<Task>;
    selected: boolean; //whether the task is currently selected (by a long press)

    constructor(private router: Router, private dataService: SystemDataService, 
        private dataRetriever: DataRetriever, private shareTaskService: ShareTaskService) {

    }

    /* Open up the page for interacting with the individual task
    represented by this component. Has the timers and stuff. */
    viewTask() {
        this.dataRetriever.data = this.task;
        this.router.navigate(["task"]);
    }

    toggleSelected() {
        this.selected = !this.selected;
    }

    /* Delete the task corresponding to this component from the parent component's taskList
    and from the device */
    deleteTask() {
        let options = {
            title: "Delete",
            message: ("Are you sure you want to delete " + this.task.name + "?"),
            okButtonText: "Yes",
            cancelButtonText: "No"
        };
        dialogs.confirm(options)
        .then( (wantsToDelete) => {
            if (wantsToDelete) {
                //get the task out of the list of tasks
                this.taskList.splice(this.index, 1);
                //clear the memory of this task from the device
                this.dataService.deleteTask(this.task);
            }
            //unselect the item regardless of the user's choice to delete
            this.selected = false;
        });
    }

    /* Pop up a window to share the task with  other users. */
    shareTask() {
        this.shareTaskService.shareTask(this.task);
    }

}

