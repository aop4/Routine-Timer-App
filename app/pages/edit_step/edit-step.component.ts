import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { TextField } from "ui/text-field";

import { DataRetriever } from "../../shared/pass-data.service";
import { Step } from "../../shared/step/step.model";
import * as Util from "../../util";


@Component({
    selector: "tmr-edit-step",
    templateUrl: "pages/edit_step/edit-step.component.html",
    styleUrls: ["pages/edit_step/edit-step.component.css"]
})
/* A modal shown over the edit task page for adding/editing a step within a routine */
export class EditStepComponent implements OnInit {

    step: Step; //the step represented by this component
    //properties of that step
    minutes: number;
    seconds: number;
    repetitions: number;

    constructor(private params: ModalDialogParams, private dataRetriever: DataRetriever) {
        
    }

    ngOnInit() {
        //retrieve the step's data
        this.step = this.params.context.step;
        this.minutes = this.step.minutes;
        this.seconds = this.step.seconds;
        this.repetitions = this.step.repetitions;
    }

    /* Remove the red warning border from textField */
    stopWarningUser(textField: TextField) {
        textField.borderWidth = "0";
    }

    /* Add a red warning border to textField */
    warnUser(textField: TextField) {
        textField.borderBottomWidth = 2;
    }

    /* Returns false if textField contains anything besides a nonnegative integer, or if
    zeroAllowed is false and the textfield contains 0. */
    validNumericText(text: string, zeroAllowed: boolean) {
        var numericVal = parseInt(text);
        if (numericVal === NaN || numericVal < 0 || !Number.isInteger(numericVal) ||
            (numericVal === 0 && !zeroAllowed)) {
            return false;
        }
        return true;
    }

    /* Called when the minutes or second field is modified. If the text within it
    can be converted to an integer, the corresponding attribute of this component
    is updated. Otherwise, the user is warned of invalid input. */
    updateTimeInterval(args, modifySeconds) {
        //retrieve the entered text
        let textField = <TextField>args.object;
        let text = textField.text;
        //convert the entered text to a number
        let val = parseInt(text);
        //if conversion to integer successful
        if (this.validNumericText(text, true)) {
            //update component's data
            if (modifySeconds) {
                this.step.seconds = val;
            }
            else {
                this.step.minutes = val;
            }
            this.stopWarningUser(textField);
        }
        //if conversion to integer unsuccessful
        else if (text != "") {
            this.warnUser(textField);
        }
    }

    /* Attempts to store the data in the seconds text field as an integer
    value, and warns the user if this can't be done. */
    updateSeconds(args) {
        this.updateTimeInterval(args, true);
    }

    /* Attempts to store the data in the minutes text field as an integer
    value, and warns the user if this can't be done. */
    updateMinutes(args) {
        this.updateTimeInterval(args, false);
    }

    /* Attempts to store the data in the repetitions text field as an integer
    value, and warns the user if this can't be done. */
    updateRepetitions(args) {
        var textField = <TextField>args.object;
        var text = textField.text;
        var val = parseInt(text);
        if (this.validNumericText(textField.text, false)) {
            this.step.repetitions = parseInt(textField.text);
            this.stopWarningUser(textField);
        }
        else {
            this.warnUser(textField);
        }
    }

    /* Close this modal component (literally "this" component; it's modal suicide) */
    closeModal() {
        this.params.closeCallback();
    }

    /* Returns the default text in the minutes and the seconds text fields. If there
    is no time associated with the step, there is no default text in them. If
    there is a time associated with the step, the default text is that time,
    where the minutes and seconds are zero-extended if they're less than 9. */
    padTwoDigits(val: number) {
        if (this.seconds === 0 && this.minutes === 0) {
            return "";
        }
        else {
            return Util.padTwoDigits(val);
        }
    }

}