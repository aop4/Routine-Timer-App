import { Injectable } from "@angular/core";
import * as dialogs from "ui/dialogs";
import * as SocialShare from "nativescript-social-share";

import { FirebaseService } from "~/shared/firebase.service";
import { Task } from "~/shared/task/task.model";
import { ConnectivityCheckService } from "~/shared/connectivity-checker.service";

@Injectable()
export class ShareTaskService {

    constructor(private firebaseService: FirebaseService, private connectivityChecker: ConnectivityCheckService) {

    }
    
    /* If the user has an internet connection, prompts them to share task. Something
    strange happens if we don't do this: Firebase will actually wait until a connection
    is established to upload data, without any indication of failure. I think that's 
    interesting behavior, but it's not really expected behavior in my book */
    shareTask(task: Task) {
        this.connectivityChecker.checkConnection()
        .then(() => {
            //if the user has an internet connection, prompt them
            this.promptToShareTask(task);
        }, () => {
            //if they don't, tell them they need one
            dialogs.alert({
                title: "No Connection",
                message: "You must have an internet connection to share a task.",
                okButtonText: "OK"
            });
        });
    }

    /* Prompt the user to share the task (upload it to the database) and do so if
    desired */
    promptToShareTask(task: Task) {
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