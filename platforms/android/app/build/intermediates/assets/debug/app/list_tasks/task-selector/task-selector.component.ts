import { Component, ElementRef, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Task } from "../../shared/task/task.model";
import { DataRetriever } from "../../shared/pass-data.service";
import { SystemDataService } from "../../shared/data.service";
import * as dialogs from "ui/dialogs";
import { FirebaseService } from "~/shared/firebase.service";

//import { EventData } from "data/observable";
//import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout/stack-layout";

@Component({
    selector: "task-selector",
    templateUrl: "list_tasks/task-selector/task-selector.component.html",
    styleUrls: ["list_tasks/task-selector/task-selector.component.css"]
})
export class TaskSelectorComponent {

    @Input() task: Task;
    @Input() taskList: Array<Task>;
    @Input() index: number;
    selected: boolean;

    constructor(private router: Router, private dataService: SystemDataService, 
        private dataRetriever: DataRetriever) {

    }

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
                this.taskList.splice(this.index, 1);
                this.dataService.deleteTask(this.task);
            }
            this.selected = false;
        });
    }

}

