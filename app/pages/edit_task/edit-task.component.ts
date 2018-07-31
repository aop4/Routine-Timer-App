import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from "@angular/core";
import { RadListView } from "nativescript-ui-listview";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { android } from "application";
import * as dialogs from "ui/dialogs";
import {Location} from '@angular/common';

import { Task } from "../../shared/task/task.model";
import { Step } from "../../shared/step/step.model";
import { EditStepComponent } from "../edit_step/edit-step.component";
import { SystemDataService } from "../../shared/data.service";
import { DataRetriever } from "../../shared/pass-data.service";
import { deepEquals, isNonnegativeInteger, clone, padTwoDigits } from "../../util";


@Component({
    selector: "tmr-edit-task",
    templateUrl: "pages/edit_task/edit-task.component.html",
    styleUrls: ["pages/edit_task/edit-task.component.css"]
})
/* A page used to edit tasks by defining and re-arranging their steps */
export class EditTaskComponent {

    task: Task;
    savedTask: Task; //an unmodified copy of the last saved version of this.task
    padTwoDigits = padTwoDigits; //to use this function from util in the template
    @ViewChild('nameField') nameField: ElementRef; //the text field for the task's name
    @ViewChild('descriptionField') descriptionField: ElementRef; //text field for task description
    @ViewChild('stepList') stepList: ElementRef;

    constructor(private dataManager: SystemDataService, private modal: ModalDialogService,
    private vcRef: ViewContainerRef, private location: Location,
    private dataRetriever: DataRetriever) {
        let taskData = this.dataRetriever.data;
        this.task = new Task(taskData.name, taskData.description, taskData.steps);
        //store the currently saved version of this.task to check for modifications
        this.savedTask = <Task>clone(this.task);
        //store the original name of the task so we can retrieve an unadulterated copy in the 
        //TaskComponent (previous page) if the user doesn't save here
        this.dataRetriever.identifier = this.task.name.toString(); //the reference to the name is destroyed on back press; copy it
    }

    /* Displays an alert for when saving fails */
    showFailureMsg(msg) {
        let options = {
            title: 'Save failed',
            message: msg
        }
        dialogs.alert(options);
    }

    /* Handles a non-native back button press. The user is warned if they have
    made unsaved changes and prompted to save. */
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
                if (wantsToSave === false) { //looks dumb. is necessary. can be undefined.
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

    /* Check whether the original (or previous) saved version of this
    task matches the current version the user is making. If not,
    returns true (there are unsaved changes). */
    changesNotSaved() {
        return (!deepEquals(this.task, this.savedTask));
    }

    /* Checks whether the data the user has entered so far represents
    a valid task. This is mostly here because a task that doesn't meet
    these criteria would be difficult for the user to identify/work with and
    pretty useless. Tasks must have a name to identify them, must have
    at least one step, the steps must have names, and the steps must have
    non-negative integer values as their times. */
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

    /* Saves this.task to disk. Returns true if it saves and false if it doesn't.
    On successful save, refreshes the savedTask object to be the same as this.task */
    saveTask(): boolean {
        //if the task is invalid
        if (!this.validData()) {
            return false;
        }
        //attempt to save.
        this.dataManager.saveNewTask(this.task, (this.savedTask.name != this.task.name))
        .then((saved) => {
            if (saved) {
                //refresh the savedTask object
                this.updateSavedTask(<Task>clone(this.task));
                //in case the user changed the name, keep track of the new name so that, if the user 
                //navigates back to the view the task, they see the task they just saved instead of that with
                //the old name
                this.dataRetriever.identifier = this.task.name;
                return true;
            }
            return false;
        });
    }

    updateSavedTask(task) {
        this.savedTask = task;
    }

    /* Creates a generic step in the task and pops up an editing window
    to view it. */
    newStep(index) {
        //create a new step (no title, no description, 0 minutes
        //and seconds, one rep)
        let newStep = new Step("", "", 0, 0, 1);
        //add newStep to the indexth index of this.task.steps
        this.task.steps.splice(index, 0, newStep);
        //scroll the ListView to the new step
        this.scrollStepListToIndex(index);
        //launch an editing window for the new step
        this.editStepModal(newStep);
    }
    
    /* Causes the steps list view to scroll to its indexth item. */
    scrollStepListToIndex(index) {
        let listView = <RadListView>this.stepList.nativeElement;
        listView.refresh(); //ensures an item just added to the steps array is loaded
        listView.scrollToIndex(index); //don't animate--async behavior causes glitches here
    }

    /* Pop up the edit step modal so the user can change the contents of step. */
    editStepModal(step: Step) {
        //prevent the annoying behavior of scrolling to the page's
        //last focused text view when the keyboard is used in the modal
        if (android) {
            this.descriptionField.nativeElement.android.clearFocus();
            this.nameField.nativeElement.android.clearFocus();
        }
        //launch the modal with step in its context
        let options = {
            context: { step: step },
            viewContainerRef: this.vcRef
        }
        this.modal.showModal(EditStepComponent, options);
    }

    /* Prompts the user to delete the task at this.task.steps[index], i.e., the
    indexth step of the task. Deletes the task if they confirm. */
    deleteStep(index: number) {
        let options = {
            title: "Delete this step?",
            message: "",
            okButtonText: "Delete",
            cancelButtonText: "Cancel"
        };
        dialogs.confirm(options).then((wantsToDelete: boolean) => {
            //if the user congirms, delete the task
            if (wantsToDelete) {
                this.task.removeStep(index);
            }
        });
    }
    
}
