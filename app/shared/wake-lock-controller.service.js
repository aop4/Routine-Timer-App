"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var wake_lock_service_1 = require("~/shared/wake-lock.service");
var WakeLockControlService = /** @class */ (function () {
    function WakeLockControlService(wakeLockService) {
        this.wakeLockService = wakeLockService;
        this.numLockRequests = 0; //The number of active requests for a wake lock
    }
    WakeLockControlService.prototype.acquireWakeLock = function () {
        //if there's not already a wake lock in place
        if (android && this.numLockRequests === 0) {
            this.wakeLockService.acquireWakeLock();
        }
        console.log(this.numLockRequests);
        this.numLockRequests++;
        console.log(this.numLockRequests);
        console.log("Wakelock requests increased: " + this.numLockRequests);
    };
    WakeLockControlService.prototype.releaseWakeLock = function () {
        //if this is the last reqeust for a wake lock
        if (android && this.numLockRequests === 1) {
            this.wakeLockService.releaseWakeLock();
        }
        this.numLockRequests--;
        console.log("Wake lock requests decreased:" + this.numLockRequests);
    };
    WakeLockControlService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [wake_lock_service_1.WakeLockService])
    ], WakeLockControlService);
    return WakeLockControlService;
}());
exports.WakeLockControlService = WakeLockControlService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FrZS1sb2NrLWNvbnRyb2xsZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndha2UtbG9jay1jb250cm9sbGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFFM0MsZ0VBQTZEO0FBRzdEO0lBSUksZ0NBQW9CLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUZwRCxvQkFBZSxHQUFXLENBQUMsQ0FBQyxDQUFDLCtDQUErQztJQUk1RSxDQUFDO0lBRUQsZ0RBQWUsR0FBZjtRQUNJLDZDQUE2QztRQUM3QyxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLGVBQWUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0MsQ0FBQztRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQsZ0RBQWUsR0FBZjtRQUNJLDZDQUE2QztRQUM3QyxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLGVBQWUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0MsQ0FBQztRQUNELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBMUJRLHNCQUFzQjtRQURsQyxpQkFBVSxFQUFFO3lDQUs0QixtQ0FBZTtPQUozQyxzQkFBc0IsQ0EyQmxDO0lBQUQsNkJBQUM7Q0FBQSxBQTNCRCxJQTJCQztBQTNCWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0IHsgV2FrZUxvY2tTZXJ2aWNlIH0gZnJvbSBcIn4vc2hhcmVkL3dha2UtbG9jay5zZXJ2aWNlXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBXYWtlTG9ja0NvbnRyb2xTZXJ2aWNlIHtcblxuICAgIG51bUxvY2tSZXF1ZXN0czogbnVtYmVyID0gMDsgLy9UaGUgbnVtYmVyIG9mIGFjdGl2ZSByZXF1ZXN0cyBmb3IgYSB3YWtlIGxvY2tcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgd2FrZUxvY2tTZXJ2aWNlOiBXYWtlTG9ja1NlcnZpY2UpIHtcblxuICAgIH1cblxuICAgIGFjcXVpcmVXYWtlTG9jaygpIHtcbiAgICAgICAgLy9pZiB0aGVyZSdzIG5vdCBhbHJlYWR5IGEgd2FrZSBsb2NrIGluIHBsYWNlXG4gICAgICAgIGlmIChhbmRyb2lkICYmIHRoaXMubnVtTG9ja1JlcXVlc3RzID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLndha2VMb2NrU2VydmljZS5hY3F1aXJlV2FrZUxvY2soKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm51bUxvY2tSZXF1ZXN0cyk7XG4gICAgICAgIHRoaXMubnVtTG9ja1JlcXVlc3RzKys7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubnVtTG9ja1JlcXVlc3RzKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJXYWtlbG9jayByZXF1ZXN0cyBpbmNyZWFzZWQ6IFwiICsgdGhpcy5udW1Mb2NrUmVxdWVzdHMpO1xuICAgIH1cblxuICAgIHJlbGVhc2VXYWtlTG9jaygpIHtcbiAgICAgICAgLy9pZiB0aGlzIGlzIHRoZSBsYXN0IHJlcWV1c3QgZm9yIGEgd2FrZSBsb2NrXG4gICAgICAgIGlmIChhbmRyb2lkICYmIHRoaXMubnVtTG9ja1JlcXVlc3RzID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLndha2VMb2NrU2VydmljZS5yZWxlYXNlV2FrZUxvY2soKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm51bUxvY2tSZXF1ZXN0cy0tO1xuICAgICAgICBjb25zb2xlLmxvZyhcIldha2UgbG9jayByZXF1ZXN0cyBkZWNyZWFzZWQ6XCIgKyB0aGlzLm51bUxvY2tSZXF1ZXN0cyk7XG4gICAgfVxufVxuIl19