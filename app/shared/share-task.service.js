"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs = require("ui/dialogs");
var SocialShare = require("nativescript-social-share");
var firebase_service_1 = require("~/shared/firebase.service");
var ShareTaskService = /** @class */ (function () {
    function ShareTaskService(firebaseService) {
        this.firebaseService = firebaseService;
    }
    /* Prompt the user to share the task (upload it to the database) and do so if
    desired */
    ShareTaskService.prototype.shareTask = function (task) {
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
        __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
    ], ShareTaskService);
    return ShareTaskService;
}());
exports.ShareTaskService = ShareTaskService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtdGFzay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2hhcmUtdGFzay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLG9DQUFzQztBQUN0Qyx1REFBeUQ7QUFFekQsOERBQTREO0FBSTVEO0lBRUksMEJBQW9CLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUVwRCxDQUFDO0lBRUQ7Y0FDVTtJQUNWLG9DQUFTLEdBQVQsVUFBVSxJQUFVO1FBQXBCLGlCQWVDO1FBZEcsSUFBSSxPQUFPLEdBQUc7WUFDVixLQUFLLEVBQUUscUJBQXFCO1lBQzVCLE9BQU8sRUFBRSw0SkFBNEo7WUFDckssWUFBWSxFQUFFLGFBQWE7WUFDM0IsZ0JBQWdCLEVBQUUsUUFBUTtTQUM3QixDQUFBO1FBQ0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHO1lBQzlCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ04sS0FBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO3FCQUNqQyxJQUFJLENBQUMsVUFBQyxFQUFFLElBQUssT0FBQSxLQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLEVBQTFCLENBQTBCLEVBQ3hDLGNBQU0sT0FBQSxLQUFJLENBQUMsVUFBVSxFQUFFLEVBQWpCLENBQWlCLENBQUM7cUJBQ3ZCLEtBQUssQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFVBQVUsRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUE7WUFDbkMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHlEQUF5RDtJQUN6RCxxQ0FBVSxHQUFWO1FBQ0ksS0FBSyxDQUFDLCtDQUErQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVEO2tDQUM4QjtJQUM5Qiw0Q0FBaUIsR0FBakIsVUFBa0IsRUFBVTtRQUN4QixJQUFJLE9BQU8sR0FBRztZQUNWLEtBQUssRUFBRSxjQUFjO1lBQ3JCLE9BQU8sRUFBRSx1QkFBdUIsR0FBRyxFQUFFO1lBQ3JDLFlBQVksRUFBRSxZQUFZO1lBQzFCLGdCQUFnQixFQUFFLE9BQU87WUFDekIsVUFBVSxFQUFFLEtBQUssQ0FBQyxpREFBaUQ7WUFDL0MsNkNBQTZDO1NBQ3BFLENBQUE7UUFDRCxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQUc7WUFDOUIsbUVBQW1FO1lBQ25FLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ04sV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBL0NRLGdCQUFnQjtRQUQ1QixpQkFBVSxFQUFFO3lDQUc0QixrQ0FBZTtPQUYzQyxnQkFBZ0IsQ0FpRDVCO0lBQUQsdUJBQUM7Q0FBQSxBQWpERCxJQWlEQztBQWpEWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcbmltcG9ydCAqIGFzIFNvY2lhbFNoYXJlIGZyb20gXCJuYXRpdmVzY3JpcHQtc29jaWFsLXNoYXJlXCI7XG5cbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9maXJlYmFzZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIn4vc2hhcmVkL3Rhc2svdGFzay5tb2RlbFwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2hhcmVUYXNrU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZpcmViYXNlU2VydmljZTogRmlyZWJhc2VTZXJ2aWNlKSB7XG5cbiAgICB9XG4gICAgXG4gICAgLyogUHJvbXB0IHRoZSB1c2VyIHRvIHNoYXJlIHRoZSB0YXNrICh1cGxvYWQgaXQgdG8gdGhlIGRhdGFiYXNlKSBhbmQgZG8gc28gaWZcbiAgICBkZXNpcmVkICovXG4gICAgc2hhcmVUYXNrKHRhc2s6IFRhc2spIHtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0aXRsZTogXCJTaGFyZSB0aGlzIHJvdXRpbmU/XCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIlRoaXMgd2lsbCBjcmVhdGUgYSB1bmlxdWUsIHJhbmRvbWx5IGdlbmVyYXRlZCBJRCBmb3IgdGhpcyByb3V0aW5lLiBBbnlvbmUgd2l0aCB0aGF0IElEIHdpbGwgYmUgYWJsZSB0byBkb3dubG9hZCB0aGUgcm91dGluZSBmcm9tIHRoZSBtYWluIHBhZ2Ugb2YgdGhlIGFwcC5cIixcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJUaGF0J3MgZmluZVwiLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxcIlxuICAgICAgICB9XG4gICAgICAgIGRpYWxvZ3MuY29uZmlybShvcHRpb25zKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcmViYXNlU2VydmljZS5hZGRUYXNrKHRhc2spXG4gICAgICAgICAgICAgICAgLnRoZW4oKGlkKSA9PiB0aGlzLmNvbmZpcm1UYXNrU2hhcmVkKGlkKSxcbiAgICAgICAgICAgICAgICAoKSA9PiB0aGlzLnNoYXJlRXJyb3IoKSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4gdGhpcy5zaGFyZUVycm9yKCkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICAvKiBTaG93IHRoZSB1c2VyIGFuIGVycm9yIG1lc3NhZ2UtLXNoYXJpbmcgZGlkbid0IHdvcmsgKi9cbiAgICBzaGFyZUVycm9yKCkge1xuICAgICAgICBhbGVydChcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIHNoYXJpbmcgdGhpcyByb3V0aW5lLlwiKTtcbiAgICB9XG5cbiAgICAvKiBDb25maXJtIHRoYXQgdGhlIHRhc2sgd2FzIHVwbG9hZGVkIGFuZCBnaXZlIHRoZSB1c2VyIHRoZSBvcHRpb24gdG8gY29weSBpdHMgaWQgdG9cbiAgICB0aGVpciBjbGlwYm9hcmQgb3Igc2hhcmUgaXQgKi9cbiAgICBjb25maXJtVGFza1NoYXJlZChpZDogc3RyaW5nKSB7XG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdGl0bGU6IFwiU2hhcmVhYmxlIElEXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIllvdXIgc2hhcmVhYmxlIElEIGlzIFwiICsgaWQsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiQ29weS9TaGFyZVwiLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDbG9zZVwiLFxuICAgICAgICAgICAgY2FuY2VsYWJsZTogZmFsc2UgLy9wcmV2ZW50IHRoZSBkaWFsb2cgZnJvbSBjbG9zaW5nIGluIEFuZHJvaWQgd2hlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoZSB1c2VyIHRvdWNoZXMgYW5vdGhlciBwYXJ0IG9mIHRoZSBzY3JlZW5cbiAgICAgICAgfVxuICAgICAgICBkaWFsb2dzLmNvbmZpcm0ob3B0aW9ucykudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAvL3Nob3cgdGhlIHVzZXIgc2hhcmluZyBvcHRpb25zIChtZXNzYWdpbmcsIGVtYWlsLCBjbGlwYm9hcmQsIGV0Yy4pXG4gICAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICAgICAgU29jaWFsU2hhcmUuc2hhcmVUZXh0KGlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbn0iXX0=