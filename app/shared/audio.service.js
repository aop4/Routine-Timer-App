"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var application_1 = require("tns-core-modules/application/application");
var nativescript_vibrate_1 = require("nativescript-vibrate");
var data_service_1 = require("~/shared/data.service");
var AudioService = /** @class */ (function () {
    function AudioService(dataService) {
        this.dataService = dataService;
        this.isPlaying = false;
        this.audioPlayer = require("nativescript-sound");
        this.sounds = {
            "tone1": this.audioPlayer.create("~/sounds/tone-1.mp3"),
            "tone1-short": this.audioPlayer.create("~/sounds/tone-1-short.mp3") //1 second clip
        };
        this.vibrator = new nativescript_vibrate_1.Vibrate(); //I'm sorry... the docs use it too
    }
    AudioService.prototype.refreshSettings = function () {
        this.settings = this.dataService.getTimerSettings();
    };
    AudioService.prototype.vibrateOnce = function () {
        this.vibrator.vibrate([0, 500, 200, 500, 200, 500]);
    };
    AudioService.prototype.playSoundOnce = function () {
        this.currSound.play();
    };
    AudioService.prototype.stopSound = function () {
        this.currSound.stop();
    };
    AudioService.prototype.playAlarm = function () {
        var _this = this;
        if (this.isPlaying) {
            return;
        }
        this.currSound = this.sounds["tone1-short"];
        if (!application_1.android) {
            //for iPhones
            //I don't understand why this could help, but it's recommended in the docs,
            //and I don't have an iPhone to test this on at the moment...
            this.currSound = this.audioPlayer.create("~/sounds/tone-1-short.mp3");
        }
        if (this.settings.wantsTone) {
            this.playSoundOnce(); //play an initial tone
            if (this.settings.continuousTone) {
                this.toneInterval = setInterval(function () { return _this.playSoundOnce(); }, 1030); //loop playback
            }
        }
        if (this.settings.wantsVibrate) {
            this.vibrateOnce(); //do an initial vibration
            if (this.settings.continuousVibrate) {
                this.vibrateInterval = setInterval(function () { return _this.vibrateOnce(); }, 2800); //loop vibration
            }
        }
        this.isPlaying = true;
    };
    AudioService.prototype.stopAlarm = function () {
        if (!this.isPlaying) {
            return;
        }
        this.stopSound();
        clearInterval(this.toneInterval); //stop looping the sound
        clearInterval(this.vibrateInterval);
        this.isPlaying = false;
    };
    AudioService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [data_service_1.SystemDataService])
    ], AudioService);
    return AudioService;
}());
exports.AudioService = AudioService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaW8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1ZGlvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0Msd0VBQW1FO0FBQ25FLDZEQUErQztBQUcvQyxzREFBMEQ7QUFHMUQ7SUFjSSxzQkFBb0IsV0FBOEI7UUFBOUIsZ0JBQVcsR0FBWCxXQUFXLENBQW1CO1FBWmxELGNBQVMsR0FBWSxLQUFLLENBQUM7UUFFM0IsZ0JBQVcsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUc1QyxXQUFNLEdBQUc7WUFDTCxPQUFPLEVBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUM7WUFDdEQsYUFBYSxFQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLDJCQUEyQixDQUFDLENBQUMsZUFBZTtTQUNyRixDQUFBO1FBQ0QsYUFBUSxHQUFHLElBQUksOEJBQU8sRUFBRSxDQUFDLENBQUMsa0NBQWtDO0lBSzVELENBQUM7SUFFRCxzQ0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDeEQsQ0FBQztJQUVELGtDQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsb0NBQWEsR0FBYjtRQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELGdDQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxnQ0FBUyxHQUFUO1FBQUEsaUJBd0JDO1FBdkJHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQztRQUNYLENBQUM7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDNUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxxQkFBTyxDQUFDLENBQUMsQ0FBQztZQUNYLGFBQWE7WUFDYiwyRUFBMkU7WUFDM0UsNkRBQTZEO1lBQzdELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUMxRSxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLHNCQUFzQjtZQUM1QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsYUFBYSxFQUFFLEVBQXBCLENBQW9CLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxlQUFlO1lBQ3RGLENBQUM7UUFDTCxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLHlCQUF5QjtZQUM3QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxXQUFXLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxXQUFXLEVBQUUsRUFBbEIsQ0FBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLGdCQUFnQjtZQUN4RixDQUFDO1FBQ0wsQ0FBQztRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFFRCxnQ0FBUyxHQUFUO1FBQ0ksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUM7UUFDWCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyx3QkFBd0I7UUFDMUQsYUFBYSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBcEVRLFlBQVk7UUFEeEIsaUJBQVUsRUFBRTt5Q0Fld0IsZ0NBQWlCO09BZHpDLFlBQVksQ0FzRXhCO0lBQUQsbUJBQUM7Q0FBQSxBQXRFRCxJQXNFQztBQXRFWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgYW5kcm9pZCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uL2FwcGxpY2F0aW9uXCI7XG5pbXBvcnQgeyBWaWJyYXRlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXZpYnJhdGUnO1xuXG5pbXBvcnQgeyBUaW1lclNldHRpbmdzIH0gZnJvbSBcIn4vc2hhcmVkL3NldHRpbmdzL3RpbWVyLXNldHRpbmdzLm1vZGVsXCI7XG5pbXBvcnQgeyBTeXN0ZW1EYXRhU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9kYXRhLnNlcnZpY2VcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1ZGlvU2VydmljZSB7XG5cbiAgICBpc1BsYXlpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBjdXJyU291bmQ6IGFueTtcbiAgICBhdWRpb1BsYXllciA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtc291bmRcIik7XG4gICAgdG9uZUludGVydmFsOiBudW1iZXI7IC8vYW4gaW50ZXJ2YWwgSUQgZm9yIHNldEludGVydmFsOyB1c2VkIHRvIGxvb3AgYWxhcm0gdG9uZVxuICAgIHZpYnJhdGVJbnRlcnZhbDogbnVtYmVyOyAvL2FuIGludGVydmFsIElEIGZvciBzZXRJbnRlcnZhbDsgdXNlZCB0byBsb29wIGFsYXJtIHZpYnJhdGlvbiBwYXR0ZXJuXG4gICAgc291bmRzID0ge1xuICAgICAgICBcInRvbmUxXCI6dGhpcy5hdWRpb1BsYXllci5jcmVhdGUoXCJ+L3NvdW5kcy90b25lLTEubXAzXCIpLCAvLzggc2Vjb25kIGNsaXBcbiAgICAgICAgXCJ0b25lMS1zaG9ydFwiOnRoaXMuYXVkaW9QbGF5ZXIuY3JlYXRlKFwifi9zb3VuZHMvdG9uZS0xLXNob3J0Lm1wM1wiKSAvLzEgc2Vjb25kIGNsaXBcbiAgICB9XG4gICAgdmlicmF0b3IgPSBuZXcgVmlicmF0ZSgpOyAvL0knbSBzb3JyeS4uLiB0aGUgZG9jcyB1c2UgaXQgdG9vXG4gICAgc2V0dGluZ3M6IFRpbWVyU2V0dGluZ3M7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTZXJ2aWNlOiBTeXN0ZW1EYXRhU2VydmljZSkge1xuICAgICAgICBcbiAgICB9XG5cbiAgICByZWZyZXNoU2V0dGluZ3MoKSB7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSB0aGlzLmRhdGFTZXJ2aWNlLmdldFRpbWVyU2V0dGluZ3MoKTtcbiAgICB9XG5cbiAgICB2aWJyYXRlT25jZSgpIHtcbiAgICAgICAgdGhpcy52aWJyYXRvci52aWJyYXRlKFswLCA1MDAsIDIwMCwgNTAwLCAyMDAsIDUwMF0pO1xuICAgIH1cblxuICAgIHBsYXlTb3VuZE9uY2UoKSB7XG4gICAgICAgIHRoaXMuY3VyclNvdW5kLnBsYXkoKTtcbiAgICB9XG5cbiAgICBzdG9wU291bmQoKSB7XG4gICAgICAgIHRoaXMuY3VyclNvdW5kLnN0b3AoKTtcbiAgICB9XG5cbiAgICBwbGF5QWxhcm0oKSB7XG4gICAgICAgIGlmICh0aGlzLmlzUGxheWluZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VyclNvdW5kID0gdGhpcy5zb3VuZHNbXCJ0b25lMS1zaG9ydFwiXTtcbiAgICAgICAgaWYgKCFhbmRyb2lkKSB7XG4gICAgICAgICAgICAvL2ZvciBpUGhvbmVzXG4gICAgICAgICAgICAvL0kgZG9uJ3QgdW5kZXJzdGFuZCB3aHkgdGhpcyBjb3VsZCBoZWxwLCBidXQgaXQncyByZWNvbW1lbmRlZCBpbiB0aGUgZG9jcyxcbiAgICAgICAgICAgIC8vYW5kIEkgZG9uJ3QgaGF2ZSBhbiBpUGhvbmUgdG8gdGVzdCB0aGlzIG9uIGF0IHRoZSBtb21lbnQuLi5cbiAgICAgICAgICAgIHRoaXMuY3VyclNvdW5kID0gdGhpcy5hdWRpb1BsYXllci5jcmVhdGUoXCJ+L3NvdW5kcy90b25lLTEtc2hvcnQubXAzXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLndhbnRzVG9uZSkge1xuICAgICAgICAgICAgdGhpcy5wbGF5U291bmRPbmNlKCk7IC8vcGxheSBhbiBpbml0aWFsIHRvbmVcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmNvbnRpbnVvdXNUb25lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50b25lSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLnBsYXlTb3VuZE9uY2UoKSwgMTAzMCk7IC8vbG9vcCBwbGF5YmFja1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLndhbnRzVmlicmF0ZSkge1xuICAgICAgICAgICAgdGhpcy52aWJyYXRlT25jZSgpOyAvL2RvIGFuIGluaXRpYWwgdmlicmF0aW9uXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5jb250aW51b3VzVmlicmF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmlicmF0ZUludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy52aWJyYXRlT25jZSgpLCAyODAwKTsgLy9sb29wIHZpYnJhdGlvblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzdG9wQWxhcm0oKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1BsYXlpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0b3BTb3VuZCgpO1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMudG9uZUludGVydmFsKTsgLy9zdG9wIGxvb3BpbmcgdGhlIHNvdW5kXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy52aWJyYXRlSW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xuICAgIH1cblxufVxuIl19