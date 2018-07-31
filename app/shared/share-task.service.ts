import { Injectable } from "@angular/core";
import * as dialogs from "ui/dialogs";
import * as SocialShare from "nativescript-social-share";

import { FirebaseService } from "~/shared/firebase.service";
import { Task } from "~/shared/task/task.model";

@Injectable()
export class ShareTaskService {

    constructor(private firebaseService: FirebaseService) {

    }
    
    /* Prompt the user to share the task (upload it to the database) and do so if
    desired */
    shareTask(task: Task) {
        let options = {
            title: "Share this routine?",
            message: "This will create a unique, randomly generated ID for this routine. Anyone with that ID will be able to download the routine from the main page of the app.",
            okButtonText: "That's fine",
            cancelButtonText: "Cancel"
        }
        dialogs.confirm(options).then((res) => {
            if (res) {
                this.firebaseService.addTask(task)
                .then((id) => this.confirmTaskShared(id),
                () => this.shareError())
                .catch(() => this.shareError())
            }
        });
    }
    
    /* Show the user an error message--sharing didn't work */
    shareError() {
        alert("An error occurred while sharing this routine.");
    }

    /* Confirm that the task was uploaded and give the user the option to copy its id to
    their clipboard or share it */
    confirmTaskShared(id: string) {
        let options = {
            title: "Shareable ID",
            message: "Your shareable ID is " + id,
            okButtonText: "Copy/Share",
            cancelButtonText: "Close",
            cancelable: false //prevent the dialog from closing in Android when
                                //the user touches another part of the screen
        }
        dialogs.confirm(options).then((res) => {
            //show the user sharing options (messaging, email, clipboard, etc.)
            if (res) {
                SocialShare.shareText(id);
            }
        })
    }

}