"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var application_1 = require("tns-core-modules/application/application");
var nativescript_vibrate_1 = require("nativescript-vibrate");
var AudioService = /** @class */ (function () {
    function AudioService() {
        this.isPlaying = false;
        this.audioPlayer = require("nativescript-sound");
        this.sounds = {
            "tone1": this.audioPlayer.create("~/sounds/tone-1.mp3"),
            "tone1-short": this.audioPlayer.create("~/sounds/tone-1-short.mp3") //1 second clip
        };
        this.vibrator = new nativescript_vibrate_1.Vibrate(); //I'm sorry... the docs use it too.
    }
    AudioService.prototype.playAlarm = function () {
        var _this = this;
        this.currSound = this.sounds["tone1-short"];
        if (this.isPlaying) {
            return;
        }
        if (application_1.android) {
            this.interval = setInterval(function () { _this.currSound.play(); }, 1030); //loop the clip
        }
        else {
            //for iPhones
            //I don't understand why this could help, but it's recommended in the docs,
            //and I don't have an iPhone to test this on at the moment...
            this.currSound = this.audioPlayer.create("~/sounds/tone-1-short.mp3");
            this.interval = setInterval(function () { return _this.currSound.play(); }, 1030);
        }
        this.currSound.play(); //play an initial clip before looping begins
        this.isPlaying = true;
    };
    AudioService.prototype.stopAlarm = function () {
        if (!this.isPlaying) {
            return;
        }
        this.currSound.stop(); //I think this is actually broken in the API
        clearInterval(this.interval); //stop looping the sound
        this.isPlaying = false;
    };
    AudioService = __decorate([
        core_1.Injectable()
    ], AudioService);
    return AudioService;
}());
exports.AudioService = AudioService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaW8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1ZGlvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0Msd0VBQW1FO0FBQ25FLDZEQUErQztBQUcvQztJQURBO1FBR0ksY0FBUyxHQUFZLEtBQUssQ0FBQztRQUUzQixnQkFBVyxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBRTVDLFdBQU0sR0FBRztZQUNMLE9BQU8sRUFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQztZQUN0RCxhQUFhLEVBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxlQUFlO1NBQ3JGLENBQUE7UUFDRCxhQUFRLEdBQUcsSUFBSSw4QkFBTyxFQUFFLENBQUMsQ0FBQyxtQ0FBbUM7SUE4QmpFLENBQUM7SUE1QkcsZ0NBQVMsR0FBVDtRQUFBLGlCQWlCQztRQWhCRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDNUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLHFCQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsY0FBUSxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFBLENBQUEsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsZUFBZTtRQUN0RixDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixhQUFhO1lBQ2IsMkVBQTJFO1lBQzNFLDZEQUE2RDtZQUM3RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFDdEUsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEVBQXJCLENBQXFCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkUsQ0FBQztRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyw0Q0FBNEM7UUFDbkUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUVELGdDQUFTLEdBQVQ7UUFDSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLE1BQU0sQ0FBQztRQUNYLENBQUM7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsNENBQTRDO1FBQ25FLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyx3QkFBd0I7UUFDdEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQXRDUSxZQUFZO1FBRHhCLGlCQUFVLEVBQUU7T0FDQSxZQUFZLENBd0N4QjtJQUFELG1CQUFDO0NBQUEsQUF4Q0QsSUF3Q0M7QUF4Q1ksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IGFuZHJvaWQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi9hcHBsaWNhdGlvblwiO1xuaW1wb3J0IHsgVmlicmF0ZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC12aWJyYXRlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1ZGlvU2VydmljZSB7XG5cbiAgICBpc1BsYXlpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBjdXJyU291bmQ6IGFueTtcbiAgICBhdWRpb1BsYXllciA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtc291bmRcIik7XG4gICAgaW50ZXJ2YWw6IG51bWJlcjsgLy9hbiBpbnRlcnZhbCBJRCBmb3Igc2V0SW50ZXJ2YWw7IHVzZWQgdG8gbG9vcCBhbGFybSB0b25lXG4gICAgc291bmRzID0ge1xuICAgICAgICBcInRvbmUxXCI6dGhpcy5hdWRpb1BsYXllci5jcmVhdGUoXCJ+L3NvdW5kcy90b25lLTEubXAzXCIpLCAvLzggc2Vjb25kIGNsaXBcbiAgICAgICAgXCJ0b25lMS1zaG9ydFwiOnRoaXMuYXVkaW9QbGF5ZXIuY3JlYXRlKFwifi9zb3VuZHMvdG9uZS0xLXNob3J0Lm1wM1wiKSAvLzEgc2Vjb25kIGNsaXBcbiAgICB9XG4gICAgdmlicmF0b3IgPSBuZXcgVmlicmF0ZSgpOyAvL0knbSBzb3JyeS4uLiB0aGUgZG9jcyB1c2UgaXQgdG9vLlxuXG4gICAgcGxheUFsYXJtKCkge1xuICAgICAgICB0aGlzLmN1cnJTb3VuZCA9IHRoaXMuc291bmRzW1widG9uZTEtc2hvcnRcIl07XG4gICAgICAgIGlmICh0aGlzLmlzUGxheWluZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhbmRyb2lkKSB7XG4gICAgICAgICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4gIHt0aGlzLmN1cnJTb3VuZC5wbGF5KCl9LCAxMDMwKTsgLy9sb29wIHRoZSBjbGlwXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvL2ZvciBpUGhvbmVzXG4gICAgICAgICAgICAvL0kgZG9uJ3QgdW5kZXJzdGFuZCB3aHkgdGhpcyBjb3VsZCBoZWxwLCBidXQgaXQncyByZWNvbW1lbmRlZCBpbiB0aGUgZG9jcyxcbiAgICAgICAgICAgIC8vYW5kIEkgZG9uJ3QgaGF2ZSBhbiBpUGhvbmUgdG8gdGVzdCB0aGlzIG9uIGF0IHRoZSBtb21lbnQuLi5cbiAgICAgICAgICAgIHRoaXMuY3VyclNvdW5kID0gdGhpcy5hdWRpb1BsYXllci5jcmVhdGUoXCJ+L3NvdW5kcy90b25lLTEtc2hvcnQubXAzXCIpO1xuICAgICAgICAgICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHRoaXMuY3VyclNvdW5kLnBsYXkoKSwgMTAzMCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyU291bmQucGxheSgpOyAvL3BsYXkgYW4gaW5pdGlhbCBjbGlwIGJlZm9yZSBsb29waW5nIGJlZ2luc1xuICAgICAgICB0aGlzLmlzUGxheWluZyA9IHRydWU7XG4gICAgfVxuXG4gICAgc3RvcEFsYXJtKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNQbGF5aW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyU291bmQuc3RvcCgpOyAvL0kgdGhpbmsgdGhpcyBpcyBhY3R1YWxseSBicm9rZW4gaW4gdGhlIEFQSVxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpOyAvL3N0b3AgbG9vcGluZyB0aGUgc291bmRcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcbiAgICB9XG5cbn1cbiJdfQ==