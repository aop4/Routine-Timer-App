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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtdGFzay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2hhcmUtdGFzay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLG9DQUFzQztBQUN0Qyx1REFBeUQ7QUFFekQsOERBQTREO0FBSTVEO0lBRUksMEJBQW9CLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUVwRCxDQUFDO0lBRUQsb0NBQVMsR0FBVCxVQUFVLElBQVU7UUFBcEIsaUJBZUM7UUFkRyxJQUFJLE9BQU8sR0FBRztZQUNWLEtBQUssRUFBRSxxQkFBcUI7WUFDNUIsT0FBTyxFQUFFLDRKQUE0SjtZQUNySyxZQUFZLEVBQUUsYUFBYTtZQUMzQixnQkFBZ0IsRUFBRSxRQUFRO1NBQzdCLENBQUE7UUFDRCxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQUc7WUFDOUIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDTixLQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7cUJBQ2pDLElBQUksQ0FBQyxVQUFDLEVBQUUsSUFBSyxPQUFBLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsRUFBMUIsQ0FBMEIsRUFDeEMsY0FBTSxPQUFBLEtBQUksQ0FBQyxVQUFVLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQztxQkFDdkIsS0FBSyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsVUFBVSxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQTtZQUNuQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQscUNBQVUsR0FBVjtRQUNJLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCw0Q0FBaUIsR0FBakIsVUFBa0IsRUFBVTtRQUN4QixJQUFJLE9BQU8sR0FBRztZQUNWLEtBQUssRUFBRSxjQUFjO1lBQ3JCLE9BQU8sRUFBRSx1QkFBdUIsR0FBRyxFQUFFO1lBQ3JDLFlBQVksRUFBRSxZQUFZO1lBQzFCLGdCQUFnQixFQUFFLE9BQU87U0FDNUIsQ0FBQTtRQUNELE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBRztZQUM5QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNOLFdBQVcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDOUIsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQXZDUSxnQkFBZ0I7UUFENUIsaUJBQVUsRUFBRTt5Q0FHNEIsa0NBQWU7T0FGM0MsZ0JBQWdCLENBeUM1QjtJQUFELHVCQUFDO0NBQUEsQUF6Q0QsSUF5Q0M7QUF6Q1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgKiBhcyBTb2NpYWxTaGFyZSBmcm9tIFwibmF0aXZlc2NyaXB0LXNvY2lhbC1zaGFyZVwiO1xuXG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvZmlyZWJhc2Uuc2VydmljZVwiO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gXCJ+L3NoYXJlZC90YXNrL3Rhc2subW9kZWxcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNoYXJlVGFza1NlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZSkge1xuXG4gICAgfVxuICAgIFxuICAgIHNoYXJlVGFzayh0YXNrOiBUYXNrKSB7XG4gICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdGl0bGU6IFwiU2hhcmUgdGhpcyByb3V0aW5lP1wiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJUaGlzIHdpbGwgY3JlYXRlIGEgdW5pcXVlLCByYW5kb21seSBnZW5lcmF0ZWQgSUQgZm9yIHRoaXMgcm91dGluZS4gQW55b25lIHdpdGggdGhhdCBJRCB3aWxsIGJlIGFibGUgdG8gZG93bmxvYWQgdGhlIHJvdXRpbmUgZnJvbSB0aGUgbWFpbiBwYWdlIG9mIHRoZSBhcHAuXCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiVGhhdCdzIGZpbmVcIixcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCJcbiAgICAgICAgfVxuICAgICAgICBkaWFsb2dzLmNvbmZpcm0ob3B0aW9ucykudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJlYmFzZVNlcnZpY2UuYWRkVGFzayh0YXNrKVxuICAgICAgICAgICAgICAgIC50aGVuKChpZCkgPT4gdGhpcy5jb25maXJtVGFza1NoYXJlZChpZCksXG4gICAgICAgICAgICAgICAgKCkgPT4gdGhpcy5zaGFyZUVycm9yKCkpXG4gICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHRoaXMuc2hhcmVFcnJvcigpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgc2hhcmVFcnJvcigpIHtcbiAgICAgICAgYWxlcnQoXCJBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBzaGFyaW5nIHRoaXMgcm91dGluZS5cIik7XG4gICAgfVxuXG4gICAgY29uZmlybVRhc2tTaGFyZWQoaWQ6IHN0cmluZykge1xuICAgICAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIlNoYXJlYWJsZSBJRFwiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJZb3VyIHNoYXJlYWJsZSBJRCBpcyBcIiArIGlkLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIkNvcHkvU2hhcmVcIixcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2xvc2VcIlxuICAgICAgICB9XG4gICAgICAgIGRpYWxvZ3MuY29uZmlybShvcHRpb25zKS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgICAgICBTb2NpYWxTaGFyZS5zaGFyZVRleHQoaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxufSJdfQ==