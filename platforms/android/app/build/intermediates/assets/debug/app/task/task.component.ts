import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Page, NavigatedData } from "tns-core-modules/ui/page";
import { Task } from "../shared/task/task.model";
import { Step } from "../shared/step/step.model";
import { DataRetriever } from "../shared/pass-data.service";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { SystemDataService } from "../shared/data.service";
import { AudioService } from "../shared/audio.service";
import { Location } from "@angular/common";
import { FirebaseService } from "~/shared/firebase.service";

@Component({
    selector: "tmr-task",
    templateUrl: "task/task.component.html",
    styleUrls: ["task/task.component.css"]
})
export class TaskComponent implements OnInit {

    task: Task;
    
    constructor(private page: Page, private router: Router, private dataManager: SystemDataService,
      private audioService: AudioService, private location: Location, private dataRetriever: DataRetriever,
      private firebaseService: FirebaseService) {
        //if we're coming back to this page from the edit page
        this.page.on(Page.navigatingToEvent, (event: NavigatedData) => {
            if (event.isBackNavigation) {
                this.task = this.dataManager.loadTaskById(this.dataRetriever.identifier);
            }
        });
    }

    ngOnInit() {
        this.task = this.dataRetriever.data;
        //make sure the audio service is updated with any changes in settings--
        //like the user deciding they don't want vibration anymore
        this.audioService.refreshSettings();
    }

    editTask() {
        this.dataRetriever.data = this.task;
        this.router.navigate(["task/edit"]);
        this.audioService.stopAlarm(); //in case an alarm is playing
    }

    backPress() {
        this.location.back();
    }
        
}

