import { Injectable } from "@angular/core";
import * as dialogs from "ui/dialogs";
import { FirebaseService } from "~/shared/firebase.service";
import * as SocialShare from "nativescript-social-share";
import { Task } from "~/shared/task/task.model";

@Injectable()
export class ShareTaskService {

    constructor(private firebaseService: FirebaseService) {

    }
    
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
    
    shareError() {
        alert("An error occurred while sharing this routine.");
    }

    confirmTaskShared(id: string) {
        let options = {
            title: "Shareable ID",
            message: "Your shareable ID is " + id,
            okButtonText: "Copy/Share",
            cancelButtonText: "Close"
        }
        dialogs.confirm(options).then((res) => {
            if (res) {
                SocialShare.shareText(id);
            }
        })
    }

}