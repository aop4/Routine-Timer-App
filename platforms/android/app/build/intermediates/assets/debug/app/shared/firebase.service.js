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
    FirebaseService.prototype.initializeFirebase = function () {
        firebase.init({})
            .then(function () {
            firebase.login({ type: firebase.LoginType.ANONYMOUS })
                .then(function (user) { return console.log("User uid: " + user.uid); });
        })
            .then(function () {
            firebase.getValue('/test123').then(function (res) { return console.log('a' + JSON.stringify(res)); });
        }, function (err) { return console.log(err); })
            .catch(function (error) { return console.log("Firebase error: " + error); });
    };
    FirebaseService = __decorate([
        core_1.Injectable()
    ], FirebaseService);
    return FirebaseService;
}());
exports.FirebaseService = FirebaseService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcmViYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0MsdURBQXlEO0FBR3pEO0lBREE7UUFHSSxnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixrQkFBYSxHQUFXLGlDQUFpQyxDQUFDO0lBeUI5RCxDQUFDO0lBdkJHOztnREFFNEM7SUFDNUMsc0NBQVksR0FBWjtRQUNJLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3hDLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDM0YsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELDRDQUFrQixHQUFsQjtRQUNJLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2FBQ2hCLElBQUksQ0FBQztZQUNGLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUMsQ0FBQztpQkFDbkQsSUFBSSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFwQyxDQUFvQyxDQUFDLENBQUE7UUFDdkQsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDO1lBQ0YsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHLElBQUssT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQXBDLENBQW9DLENBQUMsQ0FBQztRQUN0RixDQUFDLEVBQUUsVUFBQyxHQUFHLElBQUssT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFoQixDQUFnQixDQUFDO2FBQzVCLEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDLEVBQXZDLENBQXVDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBMUJRLGVBQWU7UUFEM0IsaUJBQVUsRUFBRTtPQUNBLGVBQWUsQ0E0QjNCO0lBQUQsc0JBQUM7Q0FBQSxBQTVCRCxJQTRCQztBQTVCWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0ICogYXMgZmlyZWJhc2UgZnJvbSBcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZpcmViYXNlU2VydmljZSB7XG5cbiAgICBVVUlEX0xFTkdUSDogbnVtYmVyID0gODtcbiAgICBVVUlEX0FMUEhBQkVUOiBzdHJpbmcgPSBcIkFCQ0RFRkdISktMTU5QUlNUVVZXWFlaMjM0NTY3ODlcIjtcbiAgICBcbiAgICAvKiBHZW5lcmF0ZXMgYSBzaG9ydCBwc2V1ZG8tdW5pcXVlIFVVSUQgZ2VuZXJhdGVkIGZyb20gY2hhcmFjdGVycyB0aGF0IGEgdXNlciBjYW5cbiAgICBlYXNpbHkgdHlwZSBhbmQgZGlzdGluZ3Vpc2ggZnJvbSBvbmUgYW5vdGhlci4gSSBjb3VsZCBub3QgZmluZCBhIHByZS1idWlsdCBtb2R1bGVcbiAgICB0aGF0IGFsbG93cyBhIGN1c3RvbSBsZW5ndGggYW5kIGFscGhhYmV0LiAqL1xuICAgIGdlbmVyYXRlVVVJRCgpIHtcbiAgICAgICAgbGV0IHV1aWQgPSBcIlwiO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuVVVJRF9MRU5HVEg7IGkrKykge1xuICAgICAgICAgICAgdXVpZCArPSB0aGlzLlVVSURfQUxQSEFCRVQuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp0aGlzLlVVSURfQUxQSEFCRVQubGVuZ3RoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHV1aWQ7XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZUZpcmViYXNlKCkge1xuICAgICAgICBmaXJlYmFzZS5pbml0KHt9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBmaXJlYmFzZS5sb2dpbih7dHlwZTogZmlyZWJhc2UuTG9naW5UeXBlLkFOT05ZTU9VU30pXG4gICAgICAgICAgICAudGhlbih1c2VyID0+IGNvbnNvbGUubG9nKFwiVXNlciB1aWQ6IFwiICsgdXNlci51aWQpKVxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZSgnL3Rlc3QxMjMnKS50aGVuKChyZXMpID0+IGNvbnNvbGUubG9nKCdhJytKU09OLnN0cmluZ2lmeShyZXMpKSk7XG4gICAgICAgIH0sIChlcnIpID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIkZpcmViYXNlIGVycm9yOiBcIiArIGVycm9yKSk7XG4gICAgfVxuXG59XG5cbiJdfQ==