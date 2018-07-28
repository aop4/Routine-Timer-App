import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Page, NavigatedData } from "tns-core-modules/ui/page";
import { Location } from "@angular/common";

import { Task } from "../../shared/task/task.model";
import { DataRetriever } from "../../shared/pass-data.service";
import { SystemDataService } from "../../shared/data.service";
import { AudioService } from "../../shared/audio.service";
import { ShareTaskService } from "~/shared/share-task.service";

@Component({
    selector: "tmr-task",
    templateUrl: "pages/task/task.component.html",
    styleUrls: ["pages/task/task.component.css"]
})
export class TaskComponent implements OnInit {

    task: Task;
    
    constructor(private page: Page, private router: Router, private dataManager: SystemDataService,
      private audioService: AudioService, private location: Location, private dataRetriever: DataRetriever,
      private shareTaskService: ShareTaskService) {
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

    shareTask() {
        this.shareTaskService.shareTask(this.task);
    }
        
}

