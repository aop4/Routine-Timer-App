"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs = require("ui/dialogs");
var SocialShare = require("nativescript-social-share");
var firebase_service_1 = require("~/shared/firebase.service");
var connectivity_checker_service_1 = require("~/shared/connectivity-checker.service");
var ShareTaskService = /** @class */ (function () {
    function ShareTaskService(firebaseService, connectivityChecker) {
        this.firebaseService = firebaseService;
        this.connectivityChecker = connectivityChecker;
    }
    /* If the user has an internet connection, prompts them to share task. Something
    strange happens if we don't do this: Firebase will actually wait until a connection
    is established to upload data, without any indication of failure. I think that's
    interesting behavior, but it's not really expected behavior in my book */
    ShareTaskService.prototype.shareTask = function (task) {
        var _this = this;
        this.connectivityChecker.checkConnection()
            .then(function () {
            //if the user has an internet connection, prompt them
            _this.promptToShareTask(task);
        }, function () {
            //if they don't, tell them they need one
            dialogs.alert({
                title: "No Connection",
                message: "You must have an internet connection to share a task.",
                okButtonText: "OK"
            });
        });
    };
    /* Prompt the user to share the task (upload it to the database) and do so if
    desired */
    ShareTaskService.prototype.promptToShareTask = function (task) {
        var _this = this;
        var options = {
            title: "Share this routine?",
            message: "This will create a unique, randomly generated ID for this routine. Anyone with that ID will be able to download the routine from the main page of the app.",
            okButtonText: "That's fine",
            cancelButtonText: "Cancel"
        };
        dialogs.confirm(options).then(function (res) {
            if (res) {
                _this.firebaseService.addTask(task)
                    .then(function (id) { return _this.confirmTaskShared(id); }, function () { return _this.shareError(); })
                    .catch(function () { return _this.shareError(); });
            }
        });
    };
    /* Show the user an error message--sharing didn't work */
    ShareTaskService.prototype.shareError = function () {
        alert("An error occurred while sharing this routine.");
    };
    /* Confirm that the task was uploaded and give the user the option to copy its id to
    their clipboard or share it */
    ShareTaskService.prototype.confirmTaskShared = function (id) {
        var options = {
            title: "Shareable ID",
            message: "Your shareable ID is " + id,
            okButtonText: "Copy/Share",
            cancelButtonText: "Close",
            cancelable: false //prevent the dialog from closing in Android when
            //the user touches another part of the screen
        };
        dialogs.confirm(options).then(function (res) {
            //show the user sharing options (messaging, email, clipboard, etc.)
            if (res) {
                SocialShare.shareText(id);
            }
        });
    };
    ShareTaskService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [firebase_service_1.FirebaseService, connectivity_checker_service_1.ConnectivityCheckService])
    ], ShareTaskService);
    return ShareTaskService;
}());
exports.ShareTaskService = ShareTaskService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtdGFzay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2hhcmUtdGFzay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLG9DQUFzQztBQUN0Qyx1REFBeUQ7QUFFekQsOERBQTREO0FBRTVELHNGQUFpRjtBQUdqRjtJQUVJLDBCQUFvQixlQUFnQyxFQUFVLG1CQUE2QztRQUF2RixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFBVSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQTBCO0lBRTNHLENBQUM7SUFFRDs7OzZFQUd5RTtJQUN6RSxvQ0FBUyxHQUFULFVBQVUsSUFBVTtRQUFwQixpQkFhQztRQVpHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLEVBQUU7YUFDekMsSUFBSSxDQUFDO1lBQ0YscURBQXFEO1lBQ3JELEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxDQUFDLEVBQUU7WUFDQyx3Q0FBd0M7WUFDeEMsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDVixLQUFLLEVBQUUsZUFBZTtnQkFDdEIsT0FBTyxFQUFFLHVEQUF1RDtnQkFDaEUsWUFBWSxFQUFFLElBQUk7YUFDckIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Y0FDVTtJQUNWLDRDQUFpQixHQUFqQixVQUFrQixJQUFVO1FBQTVCLGlCQWVDO1FBZEcsSUFBSSxPQUFPLEdBQUc7WUFDVixLQUFLLEVBQUUscUJBQXFCO1lBQzVCLE9BQU8sRUFBRSw0SkFBNEo7WUFDckssWUFBWSxFQUFFLGFBQWE7WUFDM0IsZ0JBQWdCLEVBQUUsUUFBUTtTQUM3QixDQUFBO1FBQ0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHO1lBQzlCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ04sS0FBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO3FCQUNqQyxJQUFJLENBQUMsVUFBQyxFQUFFLElBQUssT0FBQSxLQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLEVBQTFCLENBQTBCLEVBQ3hDLGNBQU0sT0FBQSxLQUFJLENBQUMsVUFBVSxFQUFFLEVBQWpCLENBQWlCLENBQUM7cUJBQ3ZCLEtBQUssQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFVBQVUsRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUE7WUFDbkMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHlEQUF5RDtJQUN6RCxxQ0FBVSxHQUFWO1FBQ0ksS0FBSyxDQUFDLCtDQUErQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVEO2tDQUM4QjtJQUM5Qiw0Q0FBaUIsR0FBakIsVUFBa0IsRUFBVTtRQUN4QixJQUFJLE9BQU8sR0FBRztZQUNWLEtBQUssRUFBRSxjQUFjO1lBQ3JCLE9BQU8sRUFBRSx1QkFBdUIsR0FBRyxFQUFFO1lBQ3JDLFlBQVksRUFBRSxZQUFZO1lBQzFCLGdCQUFnQixFQUFFLE9BQU87WUFDekIsVUFBVSxFQUFFLEtBQUssQ0FBQyxpREFBaUQ7WUFDL0MsNkNBQTZDO1NBQ3BFLENBQUE7UUFDRCxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQUc7WUFDOUIsbUVBQW1FO1lBQ25FLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ04sV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBbEVRLGdCQUFnQjtRQUQ1QixpQkFBVSxFQUFFO3lDQUc0QixrQ0FBZSxFQUErQix1REFBd0I7T0FGbEcsZ0JBQWdCLENBb0U1QjtJQUFELHVCQUFDO0NBQUEsQUFwRUQsSUFvRUM7QUFwRVksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgKiBhcyBTb2NpYWxTaGFyZSBmcm9tIFwibmF0aXZlc2NyaXB0LXNvY2lhbC1zaGFyZVwiO1xuXG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvZmlyZWJhc2Uuc2VydmljZVwiO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gXCJ+L3NoYXJlZC90YXNrL3Rhc2subW9kZWxcIjtcbmltcG9ydCB7IENvbm5lY3Rpdml0eUNoZWNrU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9jb25uZWN0aXZpdHktY2hlY2tlci5zZXJ2aWNlXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTaGFyZVRhc2tTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UsIHByaXZhdGUgY29ubmVjdGl2aXR5Q2hlY2tlcjogQ29ubmVjdGl2aXR5Q2hlY2tTZXJ2aWNlKSB7XG5cbiAgICB9XG4gICAgXG4gICAgLyogSWYgdGhlIHVzZXIgaGFzIGFuIGludGVybmV0IGNvbm5lY3Rpb24sIHByb21wdHMgdGhlbSB0byBzaGFyZSB0YXNrLiBTb21ldGhpbmdcbiAgICBzdHJhbmdlIGhhcHBlbnMgaWYgd2UgZG9uJ3QgZG8gdGhpczogRmlyZWJhc2Ugd2lsbCBhY3R1YWxseSB3YWl0IHVudGlsIGEgY29ubmVjdGlvblxuICAgIGlzIGVzdGFibGlzaGVkIHRvIHVwbG9hZCBkYXRhLCB3aXRob3V0IGFueSBpbmRpY2F0aW9uIG9mIGZhaWx1cmUuIEkgdGhpbmsgdGhhdCdzIFxuICAgIGludGVyZXN0aW5nIGJlaGF2aW9yLCBidXQgaXQncyBub3QgcmVhbGx5IGV4cGVjdGVkIGJlaGF2aW9yIGluIG15IGJvb2sgKi9cbiAgICBzaGFyZVRhc2sodGFzazogVGFzaykge1xuICAgICAgICB0aGlzLmNvbm5lY3Rpdml0eUNoZWNrZXIuY2hlY2tDb25uZWN0aW9uKClcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgLy9pZiB0aGUgdXNlciBoYXMgYW4gaW50ZXJuZXQgY29ubmVjdGlvbiwgcHJvbXB0IHRoZW1cbiAgICAgICAgICAgIHRoaXMucHJvbXB0VG9TaGFyZVRhc2sodGFzayk7XG4gICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgIC8vaWYgdGhleSBkb24ndCwgdGVsbCB0aGVtIHRoZXkgbmVlZCBvbmVcbiAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIk5vIENvbm5lY3Rpb25cIixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIllvdSBtdXN0IGhhdmUgYW4gaW50ZXJuZXQgY29ubmVjdGlvbiB0byBzaGFyZSBhIHRhc2suXCIsXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiBQcm9tcHQgdGhlIHVzZXIgdG8gc2hhcmUgdGhlIHRhc2sgKHVwbG9hZCBpdCB0byB0aGUgZGF0YWJhc2UpIGFuZCBkbyBzbyBpZlxuICAgIGRlc2lyZWQgKi9cbiAgICBwcm9tcHRUb1NoYXJlVGFzayh0YXNrOiBUYXNrKSB7XG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdGl0bGU6IFwiU2hhcmUgdGhpcyByb3V0aW5lP1wiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJUaGlzIHdpbGwgY3JlYXRlIGEgdW5pcXVlLCByYW5kb21seSBnZW5lcmF0ZWQgSUQgZm9yIHRoaXMgcm91dGluZS4gQW55b25lIHdpdGggdGhhdCBJRCB3aWxsIGJlIGFibGUgdG8gZG93bmxvYWQgdGhlIHJvdXRpbmUgZnJvbSB0aGUgbWFpbiBwYWdlIG9mIHRoZSBhcHAuXCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiVGhhdCdzIGZpbmVcIixcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCJcbiAgICAgICAgfVxuICAgICAgICBkaWFsb2dzLmNvbmZpcm0ob3B0aW9ucykudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlYmFzZVNlcnZpY2UuYWRkVGFzayh0YXNrKVxuICAgICAgICAgICAgICAgIC50aGVuKChpZCkgPT4gdGhpcy5jb25maXJtVGFza1NoYXJlZChpZCksXG4gICAgICAgICAgICAgICAgKCkgPT4gdGhpcy5zaGFyZUVycm9yKCkpXG4gICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHRoaXMuc2hhcmVFcnJvcigpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgLyogU2hvdyB0aGUgdXNlciBhbiBlcnJvciBtZXNzYWdlLS1zaGFyaW5nIGRpZG4ndCB3b3JrICovXG4gICAgc2hhcmVFcnJvcigpIHtcbiAgICAgICAgYWxlcnQoXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBzaGFyaW5nIHRoaXMgcm91dGluZS5cIik7XG4gICAgfVxuXG4gICAgLyogQ29uZmlybSB0aGF0IHRoZSB0YXNrIHdhcyB1cGxvYWRlZCBhbmQgZ2l2ZSB0aGUgdXNlciB0aGUgb3B0aW9uIHRvIGNvcHkgaXRzIGlkIHRvXG4gICAgdGhlaXIgY2xpcGJvYXJkIG9yIHNoYXJlIGl0ICovXG4gICAgY29uZmlybVRhc2tTaGFyZWQoaWQ6IHN0cmluZykge1xuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIlNoYXJlYWJsZSBJRFwiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJZb3VyIHNoYXJlYWJsZSBJRCBpcyBcIiArIGlkLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIkNvcHkvU2hhcmVcIixcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2xvc2VcIixcbiAgICAgICAgICAgIGNhbmNlbGFibGU6IGZhbHNlIC8vcHJldmVudCB0aGUgZGlhbG9nIGZyb20gY2xvc2luZyBpbiBBbmRyb2lkIHdoZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGUgdXNlciB0b3VjaGVzIGFub3RoZXIgcGFydCBvZiB0aGUgc2NyZWVuXG4gICAgICAgIH1cbiAgICAgICAgZGlhbG9ncy5jb25maXJtKG9wdGlvbnMpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgLy9zaG93IHRoZSB1c2VyIHNoYXJpbmcgb3B0aW9ucyAobWVzc2FnaW5nLCBlbWFpbCwgY2xpcGJvYXJkLCBldGMuKVxuICAgICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgICAgIFNvY2lhbFNoYXJlLnNoYXJlVGV4dChpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG59Il19