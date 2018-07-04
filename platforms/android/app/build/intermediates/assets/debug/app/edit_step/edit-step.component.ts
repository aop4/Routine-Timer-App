import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { DataRetriever } from "../shared/pass-data.service";
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import { Task } from "../shared/task/task.model";
import { Step } from "../shared/step/step.model";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { TextField } from "ui/text-field";
import {Location} from "@angular/common";
import * as Util from "../util";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";


@Component({
    selector: "tmr-edit-step",
    templateUrl: "edit_step/edit-step.component.html",
    styleUrls: ["edit_step/edit-step.component.css"]
})
export class EditStepComponent implements OnInit {

    step: Step; //the step represented by this component
    minutes: number;
    seconds: number;
    repetitions: number;
    @ViewChild('container') container: ElementRef;

    ngOnInit() {
        this.step = DataRetriever.data;
        this.minutes = this.step.minutes;
        this.seconds = this.step.seconds;
        this.repetitions = this.step.repetitions;
    }

    stopWarningUser(textField: TextField) {
        textField.borderWidth = "0";
    }

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

    updateTimeInterval(args, modifySeconds) {
        let textField = <TextField>args.object;
        let text = textField.text;
        let val = parseInt(text);
        if (this.validNumericText(text, true)) {
            if (modifySeconds) {
                this.step.seconds = val;
            }
            else {
                this.step.minutes = val;
            }
            this.stopWarningUser(textField);
        }
        else if (text != "") {
            this.warnUser(textField);
        }
    }

    updateSeconds(args) {
        this.updateTimeInterval(args, true);
    }

    updateMinutes(args) {
        this.updateTimeInterval(args, false);
    }

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

    closeModal() {
        //close this modal component (literally "this" component; it's modal suicide)
        this.params.closeCallback();
    }

    padTwoDigits(val: number) {
        if (this.seconds === 0 && this.minutes === 0) {
            return "";
        }
        else {
            return Util.padTwoDigits(val);
        }
    }

    constructor(private page: Page, private location: Location, private params: ModalDialogParams) {
        
    }

}