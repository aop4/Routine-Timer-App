"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var firebase = require("nativescript-plugin-firebase");
var FirebaseService = /** @class */ (function () {
    function FirebaseService() {
        this.UUID_LENGTH = 8; //the length of task UUIDs in the database
        this.UUID_ALPHABET = "ABCDEFGHJKLMNPRSTUVWXYZ23456789"; //letter used in UUIDs
        //Together there are 8^31 ~= 1 trillion possible UUIDs
        this.initialized = false; //whether the firebase instance has been initialized
    }
    /* Generates a short pseudo-unique UUID generated from characters that a user can
    easily type and distinguish from one another. I could not find a pre-built module
    that allows a custom length and alphabet. */
    FirebaseService.prototype.generateUUID = function () {
        var uuid = "";
        for (var i = 0; i < this.UUID_LENGTH; i++) {
            uuid += this.UUID_ALPHABET.charAt(Math.floor(Math.random() * this.UUID_ALPHABET.length));
        }
        return uuid;
    };
    /* Welcome to the database. It's only possible to read one task/routine at a time. There about
    a trillion possible task IDs. So authentication isn't really important: the likelihood that you'll
    ever make that many requests is... 0. It would probably take over 3 million days, after which
    Firebase will probably not exist, as it will be something like the 114th century. But you can still
    only access an individual task from the app, so it's not really worth trying in the first place.
    This method initializes access to Firebase and authenticates the user. */
    FirebaseService.prototype.initializeFirebase = function () {
        var _this = this;
        if (this.initialized) {
            return;
        }
        firebase.init({})
            .then(function () {
            _this.initialized = true;
            return firebase.login({ type: firebase.LoginType.ANONYMOUS });
        });
    };
    /* Adds a task to the database at a randomly generated path. Returns
    a promise that resolves with the generated path UUID on success.  */
    FirebaseService.prototype.addTask = function (task) {
        //generate a UUID for the task
        var uuid = this.generateUUID();
        return new Promise(function (resolve, reject) {
            //store the task in the database at the path
            // /routine/<generated uuid>
            firebase.setValue("/routine/" + uuid, task)
                .then(function () { return resolve(uuid); }, function () { return reject(); });
        });
    };
    /* Returns a promise that resolves with the task in the firebase database
    with path taskID (uppercased). If none is found or if taskID is the empty
    string, the returned promise resolves with an object whose value attribute
    is equal to null. */
    FirebaseService.prototype.getTask = function (taskID) {
        //if taskID is the empty string/null/undefined
        if (!taskID) {
            return new Promise(function (resolve) { return resolve({ value: null }); });
        }
        return firebase.getValue("/routine/" + taskID.toUpperCase());
    };
    FirebaseService = __decorate([
        core_1.Injectable()
    ], FirebaseService);
    return FirebaseService;
}());
exports.FirebaseService = FirebaseService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcmViYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0MsdURBQXlEO0FBS3pEO0lBREE7UUFHSSxnQkFBVyxHQUFXLENBQUMsQ0FBQyxDQUFDLDBDQUEwQztRQUNuRSxrQkFBYSxHQUFXLGlDQUFpQyxDQUFDLENBQUMsc0JBQXNCO1FBQ2pGLHNEQUFzRDtRQUN0RCxnQkFBVyxHQUFZLEtBQUssQ0FBQyxDQUFDLG9EQUFvRDtJQXVEdEYsQ0FBQztJQXJERzs7Z0RBRTRDO0lBQzVDLHNDQUFZLEdBQVo7UUFDSSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN4QyxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzNGLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7NkVBS3lFO0lBQ3pFLDRDQUFrQixHQUFsQjtRQUFBLGlCQVNDO1FBUkcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDbkIsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUNELFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2FBQ2hCLElBQUksQ0FBQztZQUNGLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQztRQUNoRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDt3RUFDb0U7SUFDcEUsaUNBQU8sR0FBUCxVQUFRLElBQVU7UUFDZCw4QkFBOEI7UUFDOUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBUyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3ZDLDRDQUE0QztZQUM1Qyw0QkFBNEI7WUFDNUIsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsSUFBSSxFQUFFLElBQUksQ0FBQztpQkFDMUMsSUFBSSxDQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQWIsQ0FBYSxFQUFFLGNBQU0sT0FBQSxNQUFNLEVBQUUsRUFBUixDQUFRLENBQUMsQ0FBQTtRQUMvQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7O3dCQUdvQjtJQUNwQixpQ0FBTyxHQUFQLFVBQVEsTUFBYztRQUNsQiw4Q0FBOEM7UUFDOUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1YsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxJQUFLLE9BQUEsT0FBTyxDQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLEVBQXRCLENBQXNCLENBQUMsQ0FBQztRQUM1RCxDQUFDO1FBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUExRFEsZUFBZTtRQUQzQixpQkFBVSxFQUFFO09BQ0EsZUFBZSxDQTREM0I7SUFBRCxzQkFBQztDQUFBLEFBNURELElBNERDO0FBNURZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyBmaXJlYmFzZSBmcm9tIFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiO1xuXG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIn4vc2hhcmVkL3Rhc2svdGFzay5tb2RlbFwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRmlyZWJhc2VTZXJ2aWNlIHtcblxuICAgIFVVSURfTEVOR1RIOiBudW1iZXIgPSA4OyAvL3RoZSBsZW5ndGggb2YgdGFzayBVVUlEcyBpbiB0aGUgZGF0YWJhc2VcbiAgICBVVUlEX0FMUEhBQkVUOiBzdHJpbmcgPSBcIkFCQ0RFRkdISktMTU5QUlNUVVZXWFlaMjM0NTY3ODlcIjsgLy9sZXR0ZXIgdXNlZCBpbiBVVUlEc1xuICAgIC8vVG9nZXRoZXIgdGhlcmUgYXJlIDheMzEgfj0gMSB0cmlsbGlvbiBwb3NzaWJsZSBVVUlEc1xuICAgIGluaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7IC8vd2hldGhlciB0aGUgZmlyZWJhc2UgaW5zdGFuY2UgaGFzIGJlZW4gaW5pdGlhbGl6ZWRcbiAgICBcbiAgICAvKiBHZW5lcmF0ZXMgYSBzaG9ydCBwc2V1ZG8tdW5pcXVlIFVVSUQgZ2VuZXJhdGVkIGZyb20gY2hhcmFjdGVycyB0aGF0IGEgdXNlciBjYW5cbiAgICBlYXNpbHkgdHlwZSBhbmQgZGlzdGluZ3Vpc2ggZnJvbSBvbmUgYW5vdGhlci4gSSBjb3VsZCBub3QgZmluZCBhIHByZS1idWlsdCBtb2R1bGVcbiAgICB0aGF0IGFsbG93cyBhIGN1c3RvbSBsZW5ndGggYW5kIGFscGhhYmV0LiAqL1xuICAgIGdlbmVyYXRlVVVJRCgpIHtcbiAgICAgICAgbGV0IHV1aWQgPSBcIlwiO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuVVVJRF9MRU5HVEg7IGkrKykge1xuICAgICAgICAgICAgdXVpZCArPSB0aGlzLlVVSURfQUxQSEFCRVQuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp0aGlzLlVVSURfQUxQSEFCRVQubGVuZ3RoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHV1aWQ7XG4gICAgfVxuXG4gICAgLyogV2VsY29tZSB0byB0aGUgZGF0YWJhc2UuIEl0J3Mgb25seSBwb3NzaWJsZSB0byByZWFkIG9uZSB0YXNrL3JvdXRpbmUgYXQgYSB0aW1lLiBUaGVyZSBhYm91dFxuICAgIGEgdHJpbGxpb24gcG9zc2libGUgdGFzayBJRHMuIFNvIGF1dGhlbnRpY2F0aW9uIGlzbid0IHJlYWxseSBpbXBvcnRhbnQ6IHRoZSBsaWtlbGlob29kIHRoYXQgeW91J2xsXG4gICAgZXZlciBtYWtlIHRoYXQgbWFueSByZXF1ZXN0cyBpcy4uLiAwLiBJdCB3b3VsZCBwcm9iYWJseSB0YWtlIG92ZXIgMyBtaWxsaW9uIGRheXMsIGFmdGVyIHdoaWNoXG4gICAgRmlyZWJhc2Ugd2lsbCBwcm9iYWJseSBub3QgZXhpc3QsIGFzIGl0IHdpbGwgYmUgc29tZXRoaW5nIGxpa2UgdGhlIDExNHRoIGNlbnR1cnkuIEJ1dCB5b3UgY2FuIHN0aWxsXG4gICAgb25seSBhY2Nlc3MgYW4gaW5kaXZpZHVhbCB0YXNrIGZyb20gdGhlIGFwcCwgc28gaXQncyBub3QgcmVhbGx5IHdvcnRoIHRyeWluZyBpbiB0aGUgZmlyc3QgcGxhY2UuXG4gICAgVGhpcyBtZXRob2QgaW5pdGlhbGl6ZXMgYWNjZXNzIHRvIEZpcmViYXNlIGFuZCBhdXRoZW50aWNhdGVzIHRoZSB1c2VyLiAqL1xuICAgIGluaXRpYWxpemVGaXJlYmFzZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmaXJlYmFzZS5pbml0KHt9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBmaXJlYmFzZS5sb2dpbih7dHlwZTogZmlyZWJhc2UuTG9naW5UeXBlLkFOT05ZTU9VU30pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgLyogQWRkcyBhIHRhc2sgdG8gdGhlIGRhdGFiYXNlIGF0IGEgcmFuZG9tbHkgZ2VuZXJhdGVkIHBhdGguIFJldHVybnNcbiAgICBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBnZW5lcmF0ZWQgcGF0aCBVVUlEIG9uIHN1Y2Nlc3MuICAqL1xuICAgIGFkZFRhc2sodGFzazogVGFzaykge1xuICAgICAgICAvL2dlbmVyYXRlIGEgVVVJRCBmb3IgdGhlIHRhc2tcbiAgICAgICAgbGV0IHV1aWQgPSB0aGlzLmdlbmVyYXRlVVVJRCgpO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAvL3N0b3JlIHRoZSB0YXNrIGluIHRoZSBkYXRhYmFzZSBhdCB0aGUgcGF0aFxuICAgICAgICAgICAgLy8gL3JvdXRpbmUvPGdlbmVyYXRlZCB1dWlkPlxuICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoXCIvcm91dGluZS9cIiArIHV1aWQsIHRhc2spXG4gICAgICAgICAgICAudGhlbiggKCkgPT4gcmVzb2x2ZSh1dWlkKSwgKCkgPT4gcmVqZWN0KCkpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qIFJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgdGFzayBpbiB0aGUgZmlyZWJhc2UgZGF0YWJhc2VcbiAgICB3aXRoIHBhdGggdGFza0lEICh1cHBlcmNhc2VkKS4gSWYgbm9uZSBpcyBmb3VuZCBvciBpZiB0YXNrSUQgaXMgdGhlIGVtcHR5XG4gICAgc3RyaW5nLCB0aGUgcmV0dXJuZWQgcHJvbWlzZSByZXNvbHZlcyB3aXRoIGFuIG9iamVjdCB3aG9zZSB2YWx1ZSBhdHRyaWJ1dGVcbiAgICBpcyBlcXVhbCB0byBudWxsLiAqL1xuICAgIGdldFRhc2sodGFza0lEOiBzdHJpbmcpIHtcbiAgICAgICAgLy9pZiB0YXNrSUQgaXMgdGhlIGVtcHR5IHN0cmluZy9udWxsL3VuZGVmaW5lZFxuICAgICAgICBpZiAoIXRhc2tJRCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiByZXNvbHZlKHt2YWx1ZTogbnVsbH0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmlyZWJhc2UuZ2V0VmFsdWUoXCIvcm91dGluZS9cIit0YXNrSUQudG9VcHBlckNhc2UoKSk7XG4gICAgfVxuXG59XG5cbiJdfQ==