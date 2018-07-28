"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var firebase = require("nativescript-plugin-firebase");
var FirebaseService = /** @class */ (function () {
    function FirebaseService() {
        this.UUID_LENGTH = 8;
        this.UUID_ALPHABET = "ABCDEFGHJKLMNPRSTUVWXYZ23456789";
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
    /* Welcome to the database. It's only possible to read one task/routine at a time. There are over
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcmViYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0MsdURBQXlEO0FBS3pEO0lBREE7UUFHSSxnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixrQkFBYSxHQUFXLGlDQUFpQyxDQUFDO1FBQzFELGdCQUFXLEdBQVksS0FBSyxDQUFDLENBQUMsb0RBQW9EO0lBbUR0RixDQUFDO0lBakRHOztnREFFNEM7SUFDNUMsc0NBQVksR0FBWjtRQUNJLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3hDLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDM0YsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs2RUFLeUU7SUFDekUsNENBQWtCLEdBQWxCO1FBQUEsaUJBU0M7UUFSRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNuQixNQUFNLENBQUM7UUFDWCxDQUFDO1FBQ0QsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7YUFDaEIsSUFBSSxDQUFDO1lBQ0YsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDeEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDO1FBQ2hFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDhEQUE4RDtJQUM5RCxpQ0FBTyxHQUFQLFVBQVEsSUFBVTtRQUNkLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMvQixNQUFNLENBQUMsSUFBSSxPQUFPLENBQVMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUN2QyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxJQUFJLEVBQUUsSUFBSSxDQUFDO2lCQUMxQyxJQUFJLENBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBYixDQUFhLEVBQUUsY0FBTSxPQUFBLE1BQU0sRUFBRSxFQUFSLENBQVEsQ0FBQyxDQUFBO1FBQy9DLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7d0JBR29CO0lBQ3BCLGlDQUFPLEdBQVAsVUFBUSxNQUFjO1FBQ2xCLDhDQUE4QztRQUM5QyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDVixNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLElBQUssT0FBQSxPQUFPLENBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDO1FBQzVELENBQUM7UUFDRCxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQXJEUSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7T0FDQSxlQUFlLENBdUQzQjtJQUFELHNCQUFDO0NBQUEsQUF2REQsSUF1REM7QUF2RFksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCAqIGFzIGZpcmViYXNlIGZyb20gXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCI7XG5cbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwifi9zaGFyZWQvdGFzay90YXNrLm1vZGVsXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGaXJlYmFzZVNlcnZpY2Uge1xuXG4gICAgVVVJRF9MRU5HVEg6IG51bWJlciA9IDg7XG4gICAgVVVJRF9BTFBIQUJFVDogc3RyaW5nID0gXCJBQkNERUZHSEpLTE1OUFJTVFVWV1hZWjIzNDU2Nzg5XCI7XG4gICAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTsgLy93aGV0aGVyIHRoZSBmaXJlYmFzZSBpbnN0YW5jZSBoYXMgYmVlbiBpbml0aWFsaXplZFxuICAgIFxuICAgIC8qIEdlbmVyYXRlcyBhIHNob3J0IHBzZXVkby11bmlxdWUgVVVJRCBnZW5lcmF0ZWQgZnJvbSBjaGFyYWN0ZXJzIHRoYXQgYSB1c2VyIGNhblxuICAgIGVhc2lseSB0eXBlIGFuZCBkaXN0aW5ndWlzaCBmcm9tIG9uZSBhbm90aGVyLiBJIGNvdWxkIG5vdCBmaW5kIGEgcHJlLWJ1aWx0IG1vZHVsZVxuICAgIHRoYXQgYWxsb3dzIGEgY3VzdG9tIGxlbmd0aCBhbmQgYWxwaGFiZXQuICovXG4gICAgZ2VuZXJhdGVVVUlEKCkge1xuICAgICAgICBsZXQgdXVpZCA9IFwiXCI7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5VVUlEX0xFTkdUSDsgaSsrKSB7XG4gICAgICAgICAgICB1dWlkICs9IHRoaXMuVVVJRF9BTFBIQUJFVC5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnRoaXMuVVVJRF9BTFBIQUJFVC5sZW5ndGgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXVpZDtcbiAgICB9XG5cbiAgICAvKiBXZWxjb21lIHRvIHRoZSBkYXRhYmFzZS4gSXQncyBvbmx5IHBvc3NpYmxlIHRvIHJlYWQgb25lIHRhc2svcm91dGluZSBhdCBhIHRpbWUuIFRoZXJlIGFyZSBvdmVyXG4gICAgYSB0cmlsbGlvbiBwb3NzaWJsZSB0YXNrIElEcy4gU28gYXV0aGVudGljYXRpb24gaXNuJ3QgcmVhbGx5IGltcG9ydGFudDogdGhlIGxpa2VsaWhvb2QgdGhhdCB5b3UnbGxcbiAgICBldmVyIG1ha2UgdGhhdCBtYW55IHJlcXVlc3RzIGlzLi4uIDAuIEl0IHdvdWxkIHByb2JhYmx5IHRha2Ugb3ZlciAzIG1pbGxpb24gZGF5cywgYWZ0ZXIgd2hpY2hcbiAgICBGaXJlYmFzZSB3aWxsIHByb2JhYmx5IG5vdCBleGlzdCwgYXMgaXQgd2lsbCBiZSBzb21ldGhpbmcgbGlrZSB0aGUgMTE0dGggY2VudHVyeS4gQnV0IHlvdSBjYW4gc3RpbGxcbiAgICBvbmx5IGFjY2VzcyBhbiBpbmRpdmlkdWFsIHRhc2sgZnJvbSB0aGUgYXBwLCBzbyBpdCdzIG5vdCByZWFsbHkgd29ydGggdHJ5aW5nIGluIHRoZSBmaXJzdCBwbGFjZS5cbiAgICBUaGlzIG1ldGhvZCBpbml0aWFsaXplcyBhY2Nlc3MgdG8gRmlyZWJhc2UgYW5kIGF1dGhlbnRpY2F0ZXMgdGhlIHVzZXIuICovXG4gICAgaW5pdGlhbGl6ZUZpcmViYXNlKCkge1xuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZpcmViYXNlLmluaXQoe30pXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIGZpcmViYXNlLmxvZ2luKHt0eXBlOiBmaXJlYmFzZS5Mb2dpblR5cGUuQU5PTllNT1VTfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICAvKiBBZGRzIGEgdGFzayB0byB0aGUgZGF0YWJhc2UgYXQgYSByYW5kb21seSBnZW5lcmF0ZWQgcGF0aCAqL1xuICAgIGFkZFRhc2sodGFzazogVGFzaykge1xuICAgICAgICBsZXQgdXVpZCA9IHRoaXMuZ2VuZXJhdGVVVUlEKCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGZpcmViYXNlLnNldFZhbHVlKFwiL3JvdXRpbmUvXCIgKyB1dWlkLCB0YXNrKVxuICAgICAgICAgICAgLnRoZW4oICgpID0+IHJlc29sdmUodXVpZCksICgpID0+IHJlamVjdCgpKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHRhc2sgaW4gdGhlIGZpcmViYXNlIGRhdGFiYXNlXG4gICAgd2l0aCBwYXRoIHRhc2tJRCAodXBwZXJjYXNlZCkuIElmIG5vbmUgaXMgZm91bmQgb3IgaWYgdGFza0lEIGlzIHRoZSBlbXB0eVxuICAgIHN0cmluZywgdGhlIHJldHVybmVkIHByb21pc2UgcmVzb2x2ZXMgd2l0aCBhbiBvYmplY3Qgd2hvc2UgdmFsdWUgYXR0cmlidXRlXG4gICAgaXMgZXF1YWwgdG8gbnVsbC4gKi9cbiAgICBnZXRUYXNrKHRhc2tJRDogc3RyaW5nKSB7XG4gICAgICAgIC8vaWYgdGFza0lEIGlzIHRoZSBlbXB0eSBzdHJpbmcvbnVsbC91bmRlZmluZWRcbiAgICAgICAgaWYgKCF0YXNrSUQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gcmVzb2x2ZSh7dmFsdWU6IG51bGx9KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpcmViYXNlLmdldFZhbHVlKFwiL3JvdXRpbmUvXCIrdGFza0lELnRvVXBwZXJDYXNlKCkpO1xuICAgIH1cblxufVxuXG4iXX0=