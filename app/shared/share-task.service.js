"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs = require("ui/dialogs");
var firebase_service_1 = require("~/shared/firebase.service");
var SocialShare = require("nativescript-social-share");
var ShareTaskService = /** @class */ (function () {
    function ShareTaskService(firebaseService) {
        this.firebaseService = firebaseService;
    }
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
    ShareTaskService.prototype.shareError = function () {
        alert("An error occurred while sharing this routine.");
    };
    ShareTaskService.prototype.confirmTaskShared = function (id) {
        var options = {
            title: "Shareable ID",
            message: "Your shareable ID is " + id,
            okButtonText: "Copy/Share",
            cancelButtonText: "Close"
        };
        dialogs.confirm(options).then(function (res) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtdGFzay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2hhcmUtdGFzay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLG9DQUFzQztBQUN0Qyw4REFBNEQ7QUFDNUQsdURBQXlEO0FBSXpEO0lBRUksMEJBQW9CLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUVwRCxDQUFDO0lBRUQsb0NBQVMsR0FBVCxVQUFVLElBQVU7UUFBcEIsaUJBZUM7UUFkRyxJQUFJLE9BQU8sR0FBRztZQUNWLEtBQUssRUFBRSxxQkFBcUI7WUFDNUIsT0FBTyxFQUFFLDRKQUE0SjtZQUNySyxZQUFZLEVBQUUsYUFBYTtZQUMzQixnQkFBZ0IsRUFBRSxRQUFRO1NBQzdCLENBQUE7UUFDRCxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQUc7WUFDOUIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDTixLQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7cUJBQ2pDLElBQUksQ0FBQyxVQUFDLEVBQUUsSUFBSyxPQUFBLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsRUFBMUIsQ0FBMEIsRUFDeEMsY0FBTSxPQUFBLEtBQUksQ0FBQyxVQUFVLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQztxQkFDdkIsS0FBSyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsVUFBVSxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQTtZQUNuQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQscUNBQVUsR0FBVjtRQUNJLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCw0Q0FBaUIsR0FBakIsVUFBa0IsRUFBVTtRQUN4QixJQUFJLE9BQU8sR0FBRztZQUNWLEtBQUssRUFBRSxjQUFjO1lBQ3JCLE9BQU8sRUFBRSx1QkFBdUIsR0FBRyxFQUFFO1lBQ3JDLFlBQVksRUFBRSxZQUFZO1lBQzFCLGdCQUFnQixFQUFFLE9BQU87U0FDNUIsQ0FBQTtRQUNELE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBRztZQUM5QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNOLFdBQVcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDOUIsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQXZDUSxnQkFBZ0I7UUFENUIsaUJBQVUsRUFBRTt5Q0FHNEIsa0NBQWU7T0FGM0MsZ0JBQWdCLENBeUM1QjtJQUFELHVCQUFDO0NBQUEsQUF6Q0QsSUF5Q0M7QUF6Q1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvZmlyZWJhc2Uuc2VydmljZVwiO1xuaW1wb3J0ICogYXMgU29jaWFsU2hhcmUgZnJvbSBcIm5hdGl2ZXNjcmlwdC1zb2NpYWwtc2hhcmVcIjtcbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwifi9zaGFyZWQvdGFzay90YXNrLm1vZGVsXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTaGFyZVRhc2tTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UpIHtcblxuICAgIH1cbiAgICBcbiAgICBzaGFyZVRhc2sodGFzazogVGFzaykge1xuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIlNoYXJlIHRoaXMgcm91dGluZT9cIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiVGhpcyB3aWxsIGNyZWF0ZSBhIHVuaXF1ZSwgcmFuZG9tbHkgZ2VuZXJhdGVkIElEIGZvciB0aGlzIHJvdXRpbmUuIEFueW9uZSB3aXRoIHRoYXQgSUQgd2lsbCBiZSBhYmxlIHRvIGRvd25sb2FkIHRoZSByb3V0aW5lIGZyb20gdGhlIG1haW4gcGFnZSBvZiB0aGUgYXBwLlwiLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIlRoYXQncyBmaW5lXCIsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbFwiXG4gICAgICAgIH1cbiAgICAgICAgZGlhbG9ncy5jb25maXJtKG9wdGlvbnMpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmFkZFRhc2sodGFzaylcbiAgICAgICAgICAgICAgICAudGhlbigoaWQpID0+IHRoaXMuY29uZmlybVRhc2tTaGFyZWQoaWQpLFxuICAgICAgICAgICAgICAgICgpID0+IHRoaXMuc2hhcmVFcnJvcigpKVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB0aGlzLnNoYXJlRXJyb3IoKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHNoYXJlRXJyb3IoKSB7XG4gICAgICAgIGFsZXJ0KFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgc2hhcmluZyB0aGlzIHJvdXRpbmUuXCIpO1xuICAgIH1cblxuICAgIGNvbmZpcm1UYXNrU2hhcmVkKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0aXRsZTogXCJTaGFyZWFibGUgSURcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiWW91ciBzaGFyZWFibGUgSUQgaXMgXCIgKyBpZCxcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJDb3B5L1NoYXJlXCIsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNsb3NlXCJcbiAgICAgICAgfVxuICAgICAgICBkaWFsb2dzLmNvbmZpcm0ob3B0aW9ucykudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICAgICAgU29jaWFsU2hhcmUuc2hhcmVUZXh0KGlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbn0iXX0=