import { Injectable } from "@angular/core";
import * as application from "tns-core-modules/application/application";

declare var com: any
@JavaProxy("com.andrewpuglionesi.com.routinetimer.WakelockService")
@Injectable()
export class WakeLockService extends com.pip3r4o.android.app.IntentService {
    wakelock: android.os.PowerManager.WakeLock; //the singular wake lock
                                                //this service uses

    protected onHandleIntent(intent: android.content.Intent): void {
        
        console.log("Starting wakelock service");
        this.acquireWakeLock();
    }

    acquireWakeLock() {
        const PowerManager = android.os.PowerManager;
        let powerManager = <android.os.PowerManager>application.android.context.getSystemService(android.content.Context.POWER_SERVICE);
        this.wakelock = <android.os.PowerManager.WakeLock>powerManager.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "RoutineTimer");
        this.wakelock.acquire();
        console.log("Acquired new wake lock");
    }

    releaseWakeLock() {
        this.wakelock.release();
        console.log("Released wake lock");
    }
}
