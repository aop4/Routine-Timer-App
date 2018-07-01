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
        this.vibrator = new nativescript_vibrate_1.Vibrate(); //I'm sorry... the docs use it too
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
        this.vibrator.vibrate([0, 500, 200, 500, 200, 500]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaW8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1ZGlvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0Msd0VBQW1FO0FBQ25FLDZEQUErQztBQUcvQztJQURBO1FBR0ksY0FBUyxHQUFZLEtBQUssQ0FBQztRQUUzQixnQkFBVyxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBRTVDLFdBQU0sR0FBRztZQUNMLE9BQU8sRUFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQztZQUN0RCxhQUFhLEVBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxlQUFlO1NBQ3JGLENBQUE7UUFDRCxhQUFRLEdBQUcsSUFBSSw4QkFBTyxFQUFFLENBQUMsQ0FBQyxrQ0FBa0M7SUErQmhFLENBQUM7SUE3QkcsZ0NBQVMsR0FBVDtRQUFBLGlCQWtCQztRQWpCRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDNUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLHFCQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsY0FBUSxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFBLENBQUEsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsZUFBZTtRQUN0RixDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixhQUFhO1lBQ2IsMkVBQTJFO1lBQzNFLDZEQUE2RDtZQUM3RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFDdEUsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEVBQXJCLENBQXFCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkUsQ0FBQztRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyw0Q0FBNEM7UUFDbkUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELGdDQUFTLEdBQVQ7UUFDSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLE1BQU0sQ0FBQztRQUNYLENBQUM7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsNENBQTRDO1FBQ25FLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyx3QkFBd0I7UUFDdEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQXZDUSxZQUFZO1FBRHhCLGlCQUFVLEVBQUU7T0FDQSxZQUFZLENBeUN4QjtJQUFELG1CQUFDO0NBQUEsQUF6Q0QsSUF5Q0M7QUF6Q1ksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IGFuZHJvaWQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi9hcHBsaWNhdGlvblwiO1xuaW1wb3J0IHsgVmlicmF0ZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC12aWJyYXRlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1ZGlvU2VydmljZSB7XG5cbiAgICBpc1BsYXlpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBjdXJyU291bmQ6IGFueTtcbiAgICBhdWRpb1BsYXllciA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtc291bmRcIik7XG4gICAgaW50ZXJ2YWw6IG51bWJlcjsgLy9hbiBpbnRlcnZhbCBJRCBmb3Igc2V0SW50ZXJ2YWw7IHVzZWQgdG8gbG9vcCBhbGFybSB0b25lXG4gICAgc291bmRzID0ge1xuICAgICAgICBcInRvbmUxXCI6dGhpcy5hdWRpb1BsYXllci5jcmVhdGUoXCJ+L3NvdW5kcy90b25lLTEubXAzXCIpLCAvLzggc2Vjb25kIGNsaXBcbiAgICAgICAgXCJ0b25lMS1zaG9ydFwiOnRoaXMuYXVkaW9QbGF5ZXIuY3JlYXRlKFwifi9zb3VuZHMvdG9uZS0xLXNob3J0Lm1wM1wiKSAvLzEgc2Vjb25kIGNsaXBcbiAgICB9XG4gICAgdmlicmF0b3IgPSBuZXcgVmlicmF0ZSgpOyAvL0knbSBzb3JyeS4uLiB0aGUgZG9jcyB1c2UgaXQgdG9vXG5cbiAgICBwbGF5QWxhcm0oKSB7XG4gICAgICAgIHRoaXMuY3VyclNvdW5kID0gdGhpcy5zb3VuZHNbXCJ0b25lMS1zaG9ydFwiXTtcbiAgICAgICAgaWYgKHRoaXMuaXNQbGF5aW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFuZHJvaWQpIHtcbiAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiAge3RoaXMuY3VyclNvdW5kLnBsYXkoKX0sIDEwMzApOyAvL2xvb3AgdGhlIGNsaXBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vZm9yIGlQaG9uZXNcbiAgICAgICAgICAgIC8vSSBkb24ndCB1bmRlcnN0YW5kIHdoeSB0aGlzIGNvdWxkIGhlbHAsIGJ1dCBpdCdzIHJlY29tbWVuZGVkIGluIHRoZSBkb2NzLFxuICAgICAgICAgICAgLy9hbmQgSSBkb24ndCBoYXZlIGFuIGlQaG9uZSB0byB0ZXN0IHRoaXMgb24gYXQgdGhlIG1vbWVudC4uLlxuICAgICAgICAgICAgdGhpcy5jdXJyU291bmQgPSB0aGlzLmF1ZGlvUGxheWVyLmNyZWF0ZShcIn4vc291bmRzL3RvbmUtMS1zaG9ydC5tcDNcIik7XG4gICAgICAgICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy5jdXJyU291bmQucGxheSgpLCAxMDMwKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnJTb3VuZC5wbGF5KCk7IC8vcGxheSBhbiBpbml0aWFsIGNsaXAgYmVmb3JlIGxvb3BpbmcgYmVnaW5zXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy52aWJyYXRvci52aWJyYXRlKFswLCA1MDAsIDIwMCwgNTAwLCAyMDAsIDUwMF0pO1xuICAgIH1cblxuICAgIHN0b3BBbGFybSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzUGxheWluZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VyclNvdW5kLnN0b3AoKTsgLy9JIHRoaW5rIHRoaXMgaXMgYWN0dWFsbHkgYnJva2VuIGluIHRoZSBBUElcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTsgLy9zdG9wIGxvb3BpbmcgdGhlIHNvdW5kXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgfVxuXG59XG4iXX0=