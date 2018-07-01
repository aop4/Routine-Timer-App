import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { isAndroid } from "platform";
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import { Task } from "../shared/task/task.model";
import { Step } from "../shared/step/step.model";
import { EditStepComponent } from "../edit_step/edit-step.component";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { SystemDataService } from "../shared/data.service";
import { DataRetriever } from "../shared/pass-data.service";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { deepEquals, isNonnegativeInteger, clone } from "../util";
import { topmost } from "ui/frame";
import { AndroidApplication, AndroidActivityBackPressedEventData, android } from "application";
import * as Toast from "nativescript-toast";
import * as dialogs from "ui/dialogs";
import {Location} from '@angular/common';


@Component({
    selector: "tmr-edit-task",
    templateUrl: "edit_task/edit-task.component.html",
    styleUrls: ["edit_task/edit-task.component.css"],
    providers: [SystemDataService]
})
export class EditTaskComponent {

    task: Task;
    savedTask: Task; //an unmodified copy of the last saved version of this.task

    showFailureMsg(msg) {
        let options = {
            title: 'Save failed',
            message: msg
        }
        dialogs.alert(options);
    }

    //handle a non-native back button press
    backPress() {
        //if the user has unsaved changes
        if (this.changesNotSaved()) {
            let options = {
                title: "Unsaved changes",
                message: "You've made unsaved changes.",
                okButtonText: "Save changes",
                cancelButtonText: "Discard changes",
                neutralButtonText: "Cancel"
            };
            dialogs.confirm(options).then((wantsToSave: boolean) => {
                //if the user hits discard changes, let them go back
                if (wantsToSave === false) {
                    //navigate back
                    this.location.back();
                }
                //if they want to save and save is successful
                else if (wantsToSave && this.saveTask()) {
                    //navigate back
                    this.location.back();
                }
                //the case where the user hits cancel (wantsToSave is undefined) needs
                //no action
            });
        }
        else {
            this.location.back();
        }
    }

    constructor(private page: Page, private dataManager: SystemDataService, private modal: ModalDialogService,
        private vcRef: ViewContainerRef, private router: Router, private location: Location) {
        let taskData = DataRetriever.data;
        this.task = new Task(taskData.name, taskData.description, taskData.steps);
        this.savedTask = clone(this.task);
        //store the original name of the task so we can retrieve an unadulterated copy in the 
        //TaskComponent (previous page) if the user doesn't save here
        DataRetriever.identifier = this.task.name.toString(); //the reference to the name is destroyed on back press; copy it
    }

    changesNotSaved() {
        return (!deepEquals(this.task, this.savedTask));
    }

    validData() {
        if (!this.task.name) {
            this.showFailureMsg("Please give this routine a name.");
            return false;
        }
        if (this.task.steps.length === 0) {
            this.showFailureMsg("Please add at least one step.");
            return false;
        }
        for (let i = 0; i < this.task.steps.length; i++) {
            let step = this.task.steps[i];
            if (!step.name) {
                this.showFailureMsg("Please name every step in the routine.");
                return false;
            }
            if (!isNonnegativeInteger(step.minutes) || !isNonnegativeInteger(step.seconds)) {
                this.showFailureMsg('The step "'+step.name+'" has an invalid time.');
                return false;
            }
        }
        return true;
    }

    /* Saves this.task to disk. Returns true if it saves and false if it doesn't. */
    saveTask(): boolean {
        if (!this.validData()) {
            return false;
        }
        //attempt to save. On successful save, refresh the savedTask object to be the same as this.task
        this.dataManager.saveNewTask(this.task, (this.savedTask.name != this.task.name))
        .then((saved) => {
            if (saved) {
                this.savedTask = clone(this.task);
                DataRetriever.identifier = this.task.name;
                return true;
            }
            return false;
        });
    }

    newStep() {
        //create a new step at the end of task.steps
        let newStep = new Step("", "", 0, 0, 1);
        this.task.steps.push(newStep);
        //launch an editing window for the new step
        this.editStepModal(newStep);
    }

    editStepModal(step: Step) {
        DataRetriever.data = step;
        let options = {
            context: { step: step },
            viewContainerRef: this.vcRef
        }
        this.modal.showModal(EditStepComponent, options).then(res => {
            
        });
    }

    deleteStep(index: number) {
        let options = {
            title: "Delete this step?",
            message: "",
            okButtonText: "Delete",
            cancelButtonText: "Cancel"
        };
        dialogs.confirm(options).then((wantsToDelete: boolean) => {
            //if the user hits discard changes, let them go back
            if (wantsToDelete) {
                this.task.removeStep(index);
            }
        });
    }

}
