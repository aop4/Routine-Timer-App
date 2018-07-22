"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var firebase = require("nativescript-plugin-firebase");
var FirebaseService = /** @class */ (function () {
    function FirebaseService() {
        this.UUID_LENGTH = 8;
        this.UUID_ALPHABET = "ABCDEFGHJKLMNPRSTUVWXYZ23456789";
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
    /* Welcome to the database. It's only possible to read one task/routine at a time. There are over
    a trillion possible task IDs. So authentication isn't really important: the likelihood that you'll
    ever make that many requests is... 0. It would probably take over 3 million days, after which
    Firebase will probably not exist, as it will be something like the 114th century. But you can still
    only access an individual task from the app, so it's not really worth trying in the first place.
    This method initializes access to Firebase and authenticates the user. */
    FirebaseService.prototype.initializeFirebase = function () {
        firebase.init({})
            .then(function () {
            return firebase.login({ type: firebase.LoginType.ANONYMOUS });
        });
    };
    /* Adds a task to the database at a randomly generated path */
    FirebaseService.prototype.addTask = function (task) {
        var uuid = this.generateUUID();
        return new Promise(function (resolve, reject) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcmViYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0MsdURBQXlEO0FBSXpEO0lBREE7UUFHSSxnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixrQkFBYSxHQUFXLGlDQUFpQyxDQUFDO0lBK0M5RCxDQUFDO0lBN0NHOztnREFFNEM7SUFDNUMsc0NBQVksR0FBWjtRQUNJLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3hDLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDM0YsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs2RUFLeUU7SUFDekUsNENBQWtCLEdBQWxCO1FBQ0ksUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7YUFDaEIsSUFBSSxDQUFDO1lBQ0YsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDO1FBQ2hFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDhEQUE4RDtJQUM5RCxpQ0FBTyxHQUFQLFVBQVEsSUFBVTtRQUNkLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMvQixNQUFNLENBQUMsSUFBSSxPQUFPLENBQVMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUN2QyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxJQUFJLEVBQUUsSUFBSSxDQUFDO2lCQUMxQyxJQUFJLENBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBYixDQUFhLEVBQUUsY0FBTSxPQUFBLE1BQU0sRUFBRSxFQUFSLENBQVEsQ0FBQyxDQUFBO1FBQy9DLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7d0JBR29CO0lBQ3BCLGlDQUFPLEdBQVAsVUFBUSxNQUFjO1FBQ2xCLDhDQUE4QztRQUM5QyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDVixNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLElBQUssT0FBQSxPQUFPLENBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDO1FBQzVELENBQUM7UUFDRCxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQWhEUSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7T0FDQSxlQUFlLENBa0QzQjtJQUFELHNCQUFDO0NBQUEsQUFsREQsSUFrREM7QUFsRFksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCAqIGFzIGZpcmViYXNlIGZyb20gXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCI7XG5pbXBvcnQgeyBUYXNrIH0gZnJvbSBcIn4vc2hhcmVkL3Rhc2svdGFzay5tb2RlbFwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRmlyZWJhc2VTZXJ2aWNlIHtcblxuICAgIFVVSURfTEVOR1RIOiBudW1iZXIgPSA4O1xuICAgIFVVSURfQUxQSEFCRVQ6IHN0cmluZyA9IFwiQUJDREVGR0hKS0xNTlBSU1RVVldYWVoyMzQ1Njc4OVwiO1xuICAgIFxuICAgIC8qIEdlbmVyYXRlcyBhIHNob3J0IHBzZXVkby11bmlxdWUgVVVJRCBnZW5lcmF0ZWQgZnJvbSBjaGFyYWN0ZXJzIHRoYXQgYSB1c2VyIGNhblxuICAgIGVhc2lseSB0eXBlIGFuZCBkaXN0aW5ndWlzaCBmcm9tIG9uZSBhbm90aGVyLiBJIGNvdWxkIG5vdCBmaW5kIGEgcHJlLWJ1aWx0IG1vZHVsZVxuICAgIHRoYXQgYWxsb3dzIGEgY3VzdG9tIGxlbmd0aCBhbmQgYWxwaGFiZXQuICovXG4gICAgZ2VuZXJhdGVVVUlEKCkge1xuICAgICAgICBsZXQgdXVpZCA9IFwiXCI7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5VVUlEX0xFTkdUSDsgaSsrKSB7XG4gICAgICAgICAgICB1dWlkICs9IHRoaXMuVVVJRF9BTFBIQUJFVC5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnRoaXMuVVVJRF9BTFBIQUJFVC5sZW5ndGgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXVpZDtcbiAgICB9XG5cbiAgICAvKiBXZWxjb21lIHRvIHRoZSBkYXRhYmFzZS4gSXQncyBvbmx5IHBvc3NpYmxlIHRvIHJlYWQgb25lIHRhc2svcm91dGluZSBhdCBhIHRpbWUuIFRoZXJlIGFyZSBvdmVyXG4gICAgYSB0cmlsbGlvbiBwb3NzaWJsZSB0YXNrIElEcy4gU28gYXV0aGVudGljYXRpb24gaXNuJ3QgcmVhbGx5IGltcG9ydGFudDogdGhlIGxpa2VsaWhvb2QgdGhhdCB5b3UnbGxcbiAgICBldmVyIG1ha2UgdGhhdCBtYW55IHJlcXVlc3RzIGlzLi4uIDAuIEl0IHdvdWxkIHByb2JhYmx5IHRha2Ugb3ZlciAzIG1pbGxpb24gZGF5cywgYWZ0ZXIgd2hpY2hcbiAgICBGaXJlYmFzZSB3aWxsIHByb2JhYmx5IG5vdCBleGlzdCwgYXMgaXQgd2lsbCBiZSBzb21ldGhpbmcgbGlrZSB0aGUgMTE0dGggY2VudHVyeS4gQnV0IHlvdSBjYW4gc3RpbGxcbiAgICBvbmx5IGFjY2VzcyBhbiBpbmRpdmlkdWFsIHRhc2sgZnJvbSB0aGUgYXBwLCBzbyBpdCdzIG5vdCByZWFsbHkgd29ydGggdHJ5aW5nIGluIHRoZSBmaXJzdCBwbGFjZS5cbiAgICBUaGlzIG1ldGhvZCBpbml0aWFsaXplcyBhY2Nlc3MgdG8gRmlyZWJhc2UgYW5kIGF1dGhlbnRpY2F0ZXMgdGhlIHVzZXIuICovXG4gICAgaW5pdGlhbGl6ZUZpcmViYXNlKCkge1xuICAgICAgICBmaXJlYmFzZS5pbml0KHt9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZmlyZWJhc2UubG9naW4oe3R5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5BTk9OWU1PVVN9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIC8qIEFkZHMgYSB0YXNrIHRvIHRoZSBkYXRhYmFzZSBhdCBhIHJhbmRvbWx5IGdlbmVyYXRlZCBwYXRoICovXG4gICAgYWRkVGFzayh0YXNrOiBUYXNrKSB7XG4gICAgICAgIGxldCB1dWlkID0gdGhpcy5nZW5lcmF0ZVVVSUQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgZmlyZWJhc2Uuc2V0VmFsdWUoXCIvcm91dGluZS9cIiArIHV1aWQsIHRhc2spXG4gICAgICAgICAgICAudGhlbiggKCkgPT4gcmVzb2x2ZSh1dWlkKSwgKCkgPT4gcmVqZWN0KCkpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qIFJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgdGFzayBpbiB0aGUgZmlyZWJhc2UgZGF0YWJhc2VcbiAgICB3aXRoIHBhdGggdGFza0lEICh1cHBlcmNhc2VkKS4gSWYgbm9uZSBpcyBmb3VuZCBvciBpZiB0YXNrSUQgaXMgdGhlIGVtcHR5XG4gICAgc3RyaW5nLCB0aGUgcmV0dXJuZWQgcHJvbWlzZSByZXNvbHZlcyB3aXRoIGFuIG9iamVjdCB3aG9zZSB2YWx1ZSBhdHRyaWJ1dGVcbiAgICBpcyBlcXVhbCB0byBudWxsLiAqL1xuICAgIGdldFRhc2sodGFza0lEOiBzdHJpbmcpIHtcbiAgICAgICAgLy9pZiB0YXNrSUQgaXMgdGhlIGVtcHR5IHN0cmluZy9udWxsL3VuZGVmaW5lZFxuICAgICAgICBpZiAoIXRhc2tJRCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiByZXNvbHZlKHt2YWx1ZTogbnVsbH0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmlyZWJhc2UuZ2V0VmFsdWUoXCIvcm91dGluZS9cIit0YXNrSUQudG9VcHBlckNhc2UoKSk7XG4gICAgfVxuXG59XG5cbiJdfQ==