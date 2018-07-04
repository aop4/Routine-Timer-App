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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaW8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1ZGlvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0Msd0VBQW1FO0FBQ25FLDZEQUErQztBQUUvQyxzREFBMEQ7QUFHMUQ7SUFjSSxzQkFBb0IsV0FBOEI7UUFBOUIsZ0JBQVcsR0FBWCxXQUFXLENBQW1CO1FBWmxELGNBQVMsR0FBWSxLQUFLLENBQUM7UUFFM0IsZ0JBQVcsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUc1QyxXQUFNLEdBQUc7WUFDTCxPQUFPLEVBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUM7WUFDdEQsYUFBYSxFQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLDJCQUEyQixDQUFDLENBQUMsZUFBZTtTQUNyRixDQUFBO1FBQ0QsYUFBUSxHQUFHLElBQUksOEJBQU8sRUFBRSxDQUFDLENBQUMsa0NBQWtDO0lBSzVELENBQUM7SUFFRCxzQ0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDeEQsQ0FBQztJQUVELGtDQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsb0NBQWEsR0FBYjtRQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELGdDQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxnQ0FBUyxHQUFUO1FBQUEsaUJBd0JDO1FBdkJHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQztRQUNYLENBQUM7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDNUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxxQkFBTyxDQUFDLENBQUMsQ0FBQztZQUNYLGFBQWE7WUFDYiwyRUFBMkU7WUFDM0UsNkRBQTZEO1lBQzdELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUMxRSxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLHNCQUFzQjtZQUM1QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsYUFBYSxFQUFFLEVBQXBCLENBQW9CLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxlQUFlO1lBQ3RGLENBQUM7UUFDTCxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLHlCQUF5QjtZQUM3QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxXQUFXLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxXQUFXLEVBQUUsRUFBbEIsQ0FBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLGdCQUFnQjtZQUN4RixDQUFDO1FBQ0wsQ0FBQztRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFFRCxnQ0FBUyxHQUFUO1FBQ0ksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUM7UUFDWCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyx3QkFBd0I7UUFDMUQsYUFBYSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBcEVRLFlBQVk7UUFEeEIsaUJBQVUsRUFBRTt5Q0Fld0IsZ0NBQWlCO09BZHpDLFlBQVksQ0FzRXhCO0lBQUQsbUJBQUM7Q0FBQSxBQXRFRCxJQXNFQztBQXRFWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgYW5kcm9pZCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uL2FwcGxpY2F0aW9uXCI7XG5pbXBvcnQgeyBWaWJyYXRlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXZpYnJhdGUnO1xuaW1wb3J0IHsgVGltZXJTZXR0aW5ncyB9IGZyb20gXCJ+L3NoYXJlZC9zZXR0aW5ncy90aW1lci1zZXR0aW5ncy5tb2RlbFwiO1xuaW1wb3J0IHsgU3lzdGVtRGF0YVNlcnZpY2UgfSBmcm9tIFwifi9zaGFyZWQvZGF0YS5zZXJ2aWNlXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdWRpb1NlcnZpY2Uge1xuXG4gICAgaXNQbGF5aW5nOiBib29sZWFuID0gZmFsc2U7XG4gICAgY3VyclNvdW5kOiBhbnk7XG4gICAgYXVkaW9QbGF5ZXIgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXNvdW5kXCIpO1xuICAgIHRvbmVJbnRlcnZhbDogbnVtYmVyOyAvL2FuIGludGVydmFsIElEIGZvciBzZXRJbnRlcnZhbDsgdXNlZCB0byBsb29wIGFsYXJtIHRvbmVcbiAgICB2aWJyYXRlSW50ZXJ2YWw6IG51bWJlcjsgLy9hbiBpbnRlcnZhbCBJRCBmb3Igc2V0SW50ZXJ2YWw7IHVzZWQgdG8gbG9vcCBhbGFybSB2aWJyYXRpb24gcGF0dGVyblxuICAgIHNvdW5kcyA9IHtcbiAgICAgICAgXCJ0b25lMVwiOnRoaXMuYXVkaW9QbGF5ZXIuY3JlYXRlKFwifi9zb3VuZHMvdG9uZS0xLm1wM1wiKSwgLy84IHNlY29uZCBjbGlwXG4gICAgICAgIFwidG9uZTEtc2hvcnRcIjp0aGlzLmF1ZGlvUGxheWVyLmNyZWF0ZShcIn4vc291bmRzL3RvbmUtMS1zaG9ydC5tcDNcIikgLy8xIHNlY29uZCBjbGlwXG4gICAgfVxuICAgIHZpYnJhdG9yID0gbmV3IFZpYnJhdGUoKTsgLy9JJ20gc29ycnkuLi4gdGhlIGRvY3MgdXNlIGl0IHRvb1xuICAgIHNldHRpbmdzOiBUaW1lclNldHRpbmdzO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRhU2VydmljZTogU3lzdGVtRGF0YVNlcnZpY2UpIHtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgcmVmcmVzaFNldHRpbmdzKCkge1xuICAgICAgICB0aGlzLnNldHRpbmdzID0gdGhpcy5kYXRhU2VydmljZS5nZXRUaW1lclNldHRpbmdzKCk7XG4gICAgfVxuXG4gICAgdmlicmF0ZU9uY2UoKSB7XG4gICAgICAgIHRoaXMudmlicmF0b3IudmlicmF0ZShbMCwgNTAwLCAyMDAsIDUwMCwgMjAwLCA1MDBdKTtcbiAgICB9XG5cbiAgICBwbGF5U291bmRPbmNlKCkge1xuICAgICAgICB0aGlzLmN1cnJTb3VuZC5wbGF5KCk7XG4gICAgfVxuXG4gICAgc3RvcFNvdW5kKCkge1xuICAgICAgICB0aGlzLmN1cnJTb3VuZC5zdG9wKCk7XG4gICAgfVxuXG4gICAgcGxheUFsYXJtKCkge1xuICAgICAgICBpZiAodGhpcy5pc1BsYXlpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnJTb3VuZCA9IHRoaXMuc291bmRzW1widG9uZTEtc2hvcnRcIl07XG4gICAgICAgIGlmICghYW5kcm9pZCkge1xuICAgICAgICAgICAgLy9mb3IgaVBob25lc1xuICAgICAgICAgICAgLy9JIGRvbid0IHVuZGVyc3RhbmQgd2h5IHRoaXMgY291bGQgaGVscCwgYnV0IGl0J3MgcmVjb21tZW5kZWQgaW4gdGhlIGRvY3MsXG4gICAgICAgICAgICAvL2FuZCBJIGRvbid0IGhhdmUgYW4gaVBob25lIHRvIHRlc3QgdGhpcyBvbiBhdCB0aGUgbW9tZW50Li4uXG4gICAgICAgICAgICB0aGlzLmN1cnJTb3VuZCA9IHRoaXMuYXVkaW9QbGF5ZXIuY3JlYXRlKFwifi9zb3VuZHMvdG9uZS0xLXNob3J0Lm1wM1wiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy53YW50c1RvbmUpIHtcbiAgICAgICAgICAgIHRoaXMucGxheVNvdW5kT25jZSgpOyAvL3BsYXkgYW4gaW5pdGlhbCB0b25lXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5jb250aW51b3VzVG9uZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudG9uZUludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy5wbGF5U291bmRPbmNlKCksIDEwMzApOyAvL2xvb3AgcGxheWJhY2tcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy53YW50c1ZpYnJhdGUpIHtcbiAgICAgICAgICAgIHRoaXMudmlicmF0ZU9uY2UoKTsgLy9kbyBhbiBpbml0aWFsIHZpYnJhdGlvblxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuY29udGludW91c1ZpYnJhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpYnJhdGVJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHRoaXMudmlicmF0ZU9uY2UoKSwgMjgwMCk7IC8vbG9vcCB2aWJyYXRpb25cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IHRydWU7XG4gICAgfVxuXG4gICAgc3RvcEFsYXJtKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNQbGF5aW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdG9wU291bmQoKTtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRvbmVJbnRlcnZhbCk7IC8vc3RvcCBsb29waW5nIHRoZSBzb3VuZFxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMudmlicmF0ZUludGVydmFsKTtcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcbiAgICB9XG5cbn1cbiJdfQ==