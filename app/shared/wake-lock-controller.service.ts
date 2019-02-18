import { Injectable } from "@angular/core";

import { WakeLockService } from "~/shared/wake-lock.service";

@Injectable()
export class WakeLockControlService {

    numLockRequests: number = 0; //The number of active requests for a wake lock

    constructor(private wakeLockService: WakeLockService) {

    }

    acquireWakeLock() {
        //if there's not already a wake lock in place
        if (android && this.numLockRequests === 0) {
            this.wakeLockService.acquireWakeLock();
        }
        console.log(this.numLockRequests);
        this.numLockRequests++;
        console.log(this.numLockRequests);
        console.log("Wakelock requests increased: " + this.numLockRequests);
    }

    releaseWakeLock() {
        //if this is the last reqeust for a wake lock
        if (android && this.numLockRequests === 1) {
            this.wakeLockService.releaseWakeLock();
        }
        this.numLockRequests--;
        console.log("Wake lock requests decreased:" + this.numLockRequests);
    }
}
