"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var application_1 = require("tns-core-modules/application/application");
var nativescript_vibrate_1 = require("nativescript-vibrate");
var data_service_1 = require("~/shared/data.service");
var AudioService = /** @class */ (function () {
    function AudioService(dataService) {
        this.dataService = dataService;
        this.isPlaying = false; //whether an alarm is currently being played
        this.audioPlayer = require("nativescript-sound");
        this.sounds = {
            "tone1": this.audioPlayer.create("~/sounds/tone-1.mp3"),
            "tone1-short": this.audioPlayer.create("~/sounds/tone-1-short.mp3") //1 second clip
        };
        this.vibrator = new nativescript_vibrate_1.Vibrate(); //I'm sorry... the docs use it too
    }
    /* Refresh the alarm settings used to decide how to alert the user, e.g.,
    if those settings were just modified by the user. */
    AudioService.prototype.refreshSettings = function () {
        this.settings = this.dataService.getTimerSettings();
    };
    /* Vibrates the device with a distinct pattern */
    AudioService.prototype.vibrateOnce = function () {
        this.vibrator.vibrate([0, 500, 200, 500, 200, 500]);
    };
    /* Plays the alarm tone */
    AudioService.prototype.playSoundOnce = function () {
        this.currSound.play();
    };
    /* Stops the alarm tone */
    AudioService.prototype.stopSound = function () {
        this.currSound.stop();
    };
    /* Starts the timer alarm iff an alarm is not already going off. This may cause
    the phone to vibrate, play audio, both, or neither, and at different durations,
    depending on the user's preferences as specified on the settings page. */
    AudioService.prototype.playAlarm = function () {
        var _this = this;
        //if an alarm's going off, don't start a new one
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
        //if the user wants a tone to play with the alarm
        if (this.settings.wantsTone) {
            //play an initial tone
            this.playSoundOnce();
            if (this.settings.continuousTone) {
                //loop playback
                this.toneInterval = setInterval(function () { return _this.playSoundOnce(); }, 1030);
            }
        }
        //if the user wants the device to vibrate with the alarm
        if (this.settings.wantsVibrate) {
            //do an initial vibration
            this.vibrateOnce();
            if (this.settings.continuousVibrate) {
                //loop vibration
                this.vibrateInterval = setInterval(function () { return _this.vibrateOnce(); }, 2800);
            }
        }
        this.isPlaying = true;
    };
    /* If an alarm is going off, stops any associated vibration and audio. */
    AudioService.prototype.stopAlarm = function () {
        if (!this.isPlaying) {
            return;
        }
        this.stopSound(); //stop playing the current sound
        clearInterval(this.toneInterval); //stop looping the sound
        clearInterval(this.vibrateInterval); //stop looping vibration
        this.isPlaying = false;
    };
    AudioService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [data_service_1.SystemDataService])
    ], AudioService);
    return AudioService;
}());
exports.AudioService = AudioService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaW8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1ZGlvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0Msd0VBQW1FO0FBQ25FLDZEQUErQztBQUcvQyxzREFBMEQ7QUFHMUQ7SUFjSSxzQkFBb0IsV0FBOEI7UUFBOUIsZ0JBQVcsR0FBWCxXQUFXLENBQW1CO1FBWmxELGNBQVMsR0FBWSxLQUFLLENBQUMsQ0FBQyw0Q0FBNEM7UUFJeEUsZ0JBQVcsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUM1QyxXQUFNLEdBQUc7WUFDTCxPQUFPLEVBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUM7WUFDdEQsYUFBYSxFQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLDJCQUEyQixDQUFDLENBQUMsZUFBZTtTQUNyRixDQUFBO1FBQ0QsYUFBUSxHQUFHLElBQUksOEJBQU8sRUFBRSxDQUFDLENBQUMsa0NBQWtDO0lBSzVELENBQUM7SUFFRDt3REFDb0Q7SUFDcEQsc0NBQWUsR0FBZjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ3hELENBQUM7SUFFRCxpREFBaUQ7SUFDakQsa0NBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCwwQkFBMEI7SUFDMUIsb0NBQWEsR0FBYjtRQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELDBCQUEwQjtJQUMxQixnQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQ7OzZFQUV5RTtJQUN6RSxnQ0FBUyxHQUFUO1FBQUEsaUJBK0JDO1FBOUJHLGdEQUFnRDtRQUNoRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUM7UUFDWCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzVDLEVBQUUsQ0FBQyxDQUFDLENBQUMscUJBQU8sQ0FBQyxDQUFDLENBQUM7WUFDWCxhQUFhO1lBQ2IsMkVBQTJFO1lBQzNFLDZEQUE2RDtZQUM3RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDMUUsQ0FBQztRQUNELGlEQUFpRDtRQUNqRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsc0JBQXNCO1lBQ3RCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLGVBQWU7Z0JBQ2YsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxhQUFhLEVBQUUsRUFBcEIsQ0FBb0IsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN0RSxDQUFDO1FBQ0wsQ0FBQztRQUNELHdEQUF3RDtRQUN4RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDN0IseUJBQXlCO1lBQ3pCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztnQkFDbEMsZ0JBQWdCO2dCQUNoQixJQUFJLENBQUMsZUFBZSxHQUFHLFdBQVcsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFdBQVcsRUFBRSxFQUFsQixDQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3ZFLENBQUM7UUFDTCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUVELHlFQUF5RTtJQUN6RSxnQ0FBUyxHQUFUO1FBQ0ksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUM7UUFDWCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsZ0NBQWdDO1FBQ2xELGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyx3QkFBd0I7UUFDMUQsYUFBYSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLHdCQUF3QjtRQUM3RCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBcEZRLFlBQVk7UUFEeEIsaUJBQVUsRUFBRTt5Q0Fld0IsZ0NBQWlCO09BZHpDLFlBQVksQ0FzRnhCO0lBQUQsbUJBQUM7Q0FBQSxBQXRGRCxJQXNGQztBQXRGWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgYW5kcm9pZCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uL2FwcGxpY2F0aW9uXCI7XG5pbXBvcnQgeyBWaWJyYXRlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXZpYnJhdGUnO1xuXG5pbXBvcnQgeyBUaW1lclNldHRpbmdzIH0gZnJvbSBcIn4vc2hhcmVkL3NldHRpbmdzL3RpbWVyLXNldHRpbmdzLm1vZGVsXCI7XG5pbXBvcnQgeyBTeXN0ZW1EYXRhU2VydmljZSB9IGZyb20gXCJ+L3NoYXJlZC9kYXRhLnNlcnZpY2VcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1ZGlvU2VydmljZSB7XG5cbiAgICBpc1BsYXlpbmc6IGJvb2xlYW4gPSBmYWxzZTsgLy93aGV0aGVyIGFuIGFsYXJtIGlzIGN1cnJlbnRseSBiZWluZyBwbGF5ZWRcbiAgICBjdXJyU291bmQ6IGFueTsgLy9hIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBhdWRpbyBmaWxlIGJlaW5nIHBsYXllZFxuICAgIHRvbmVJbnRlcnZhbDogbnVtYmVyOyAvL2FuIGludGVydmFsIElEIGZvciBzZXRJbnRlcnZhbDsgdXNlZCB0byBsb29wIGFsYXJtIHRvbmVcbiAgICB2aWJyYXRlSW50ZXJ2YWw6IG51bWJlcjsgLy9hbiBpbnRlcnZhbCBJRCBmb3Igc2V0SW50ZXJ2YWw7IHVzZWQgdG8gbG9vcCBhbGFybSB2aWJyYXRpb24gcGF0dGVyblxuICAgIGF1ZGlvUGxheWVyID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1zb3VuZFwiKTtcbiAgICBzb3VuZHMgPSB7XG4gICAgICAgIFwidG9uZTFcIjp0aGlzLmF1ZGlvUGxheWVyLmNyZWF0ZShcIn4vc291bmRzL3RvbmUtMS5tcDNcIiksIC8vOCBzZWNvbmQgY2xpcFxuICAgICAgICBcInRvbmUxLXNob3J0XCI6dGhpcy5hdWRpb1BsYXllci5jcmVhdGUoXCJ+L3NvdW5kcy90b25lLTEtc2hvcnQubXAzXCIpIC8vMSBzZWNvbmQgY2xpcFxuICAgIH1cbiAgICB2aWJyYXRvciA9IG5ldyBWaWJyYXRlKCk7IC8vSSdtIHNvcnJ5Li4uIHRoZSBkb2NzIHVzZSBpdCB0b29cbiAgICBzZXR0aW5nczogVGltZXJTZXR0aW5nczsgLy9UaGUgc2V0dGluZ3MgdXNlZCB0byBkZWNpZGUgaG93IHRvIGFsZXJ0IHRoZSB1c2VyXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRhdGFTZXJ2aWNlOiBTeXN0ZW1EYXRhU2VydmljZSkge1xuICAgICAgICBcbiAgICB9XG5cbiAgICAvKiBSZWZyZXNoIHRoZSBhbGFybSBzZXR0aW5ncyB1c2VkIHRvIGRlY2lkZSBob3cgdG8gYWxlcnQgdGhlIHVzZXIsIGUuZy4sXG4gICAgaWYgdGhvc2Ugc2V0dGluZ3Mgd2VyZSBqdXN0IG1vZGlmaWVkIGJ5IHRoZSB1c2VyLiAqL1xuICAgIHJlZnJlc2hTZXR0aW5ncygpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHRoaXMuZGF0YVNlcnZpY2UuZ2V0VGltZXJTZXR0aW5ncygpO1xuICAgIH1cblxuICAgIC8qIFZpYnJhdGVzIHRoZSBkZXZpY2Ugd2l0aCBhIGRpc3RpbmN0IHBhdHRlcm4gKi9cbiAgICB2aWJyYXRlT25jZSgpIHtcbiAgICAgICAgdGhpcy52aWJyYXRvci52aWJyYXRlKFswLCA1MDAsIDIwMCwgNTAwLCAyMDAsIDUwMF0pO1xuICAgIH1cblxuICAgIC8qIFBsYXlzIHRoZSBhbGFybSB0b25lICovXG4gICAgcGxheVNvdW5kT25jZSgpIHtcbiAgICAgICAgdGhpcy5jdXJyU291bmQucGxheSgpO1xuICAgIH1cblxuICAgIC8qIFN0b3BzIHRoZSBhbGFybSB0b25lICovXG4gICAgc3RvcFNvdW5kKCkge1xuICAgICAgICB0aGlzLmN1cnJTb3VuZC5zdG9wKCk7XG4gICAgfVxuXG4gICAgLyogU3RhcnRzIHRoZSB0aW1lciBhbGFybSBpZmYgYW4gYWxhcm0gaXMgbm90IGFscmVhZHkgZ29pbmcgb2ZmLiBUaGlzIG1heSBjYXVzZVxuICAgIHRoZSBwaG9uZSB0byB2aWJyYXRlLCBwbGF5IGF1ZGlvLCBib3RoLCBvciBuZWl0aGVyLCBhbmQgYXQgZGlmZmVyZW50IGR1cmF0aW9ucyxcbiAgICBkZXBlbmRpbmcgb24gdGhlIHVzZXIncyBwcmVmZXJlbmNlcyBhcyBzcGVjaWZpZWQgb24gdGhlIHNldHRpbmdzIHBhZ2UuICovXG4gICAgcGxheUFsYXJtKCkge1xuICAgICAgICAvL2lmIGFuIGFsYXJtJ3MgZ29pbmcgb2ZmLCBkb24ndCBzdGFydCBhIG5ldyBvbmVcbiAgICAgICAgaWYgKHRoaXMuaXNQbGF5aW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyU291bmQgPSB0aGlzLnNvdW5kc1tcInRvbmUxLXNob3J0XCJdO1xuICAgICAgICBpZiAoIWFuZHJvaWQpIHtcbiAgICAgICAgICAgIC8vZm9yIGlQaG9uZXNcbiAgICAgICAgICAgIC8vSSBkb24ndCB1bmRlcnN0YW5kIHdoeSB0aGlzIGNvdWxkIGhlbHAsIGJ1dCBpdCdzIHJlY29tbWVuZGVkIGluIHRoZSBkb2NzLFxuICAgICAgICAgICAgLy9hbmQgSSBkb24ndCBoYXZlIGFuIGlQaG9uZSB0byB0ZXN0IHRoaXMgb24gYXQgdGhlIG1vbWVudC4uLlxuICAgICAgICAgICAgdGhpcy5jdXJyU291bmQgPSB0aGlzLmF1ZGlvUGxheWVyLmNyZWF0ZShcIn4vc291bmRzL3RvbmUtMS1zaG9ydC5tcDNcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy9pZiB0aGUgdXNlciB3YW50cyBhIHRvbmUgdG8gcGxheSB3aXRoIHRoZSBhbGFybVxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy53YW50c1RvbmUpIHtcbiAgICAgICAgICAgIC8vcGxheSBhbiBpbml0aWFsIHRvbmVcbiAgICAgICAgICAgIHRoaXMucGxheVNvdW5kT25jZSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuY29udGludW91c1RvbmUpIHtcbiAgICAgICAgICAgICAgICAvL2xvb3AgcGxheWJhY2tcbiAgICAgICAgICAgICAgICB0aGlzLnRvbmVJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHRoaXMucGxheVNvdW5kT25jZSgpLCAxMDMwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvL2lmIHRoZSB1c2VyIHdhbnRzIHRoZSBkZXZpY2UgdG8gdmlicmF0ZSB3aXRoIHRoZSBhbGFybVxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy53YW50c1ZpYnJhdGUpIHtcbiAgICAgICAgICAgIC8vZG8gYW4gaW5pdGlhbCB2aWJyYXRpb25cbiAgICAgICAgICAgIHRoaXMudmlicmF0ZU9uY2UoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLmNvbnRpbnVvdXNWaWJyYXRlKSB7XG4gICAgICAgICAgICAgICAgLy9sb29wIHZpYnJhdGlvblxuICAgICAgICAgICAgICAgIHRoaXMudmlicmF0ZUludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy52aWJyYXRlT25jZSgpLCAyODAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IHRydWU7XG4gICAgfVxuXG4gICAgLyogSWYgYW4gYWxhcm0gaXMgZ29pbmcgb2ZmLCBzdG9wcyBhbnkgYXNzb2NpYXRlZCB2aWJyYXRpb24gYW5kIGF1ZGlvLiAqL1xuICAgIHN0b3BBbGFybSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzUGxheWluZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RvcFNvdW5kKCk7IC8vc3RvcCBwbGF5aW5nIHRoZSBjdXJyZW50IHNvdW5kXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50b25lSW50ZXJ2YWwpOyAvL3N0b3AgbG9vcGluZyB0aGUgc291bmRcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnZpYnJhdGVJbnRlcnZhbCk7IC8vc3RvcCBsb29waW5nIHZpYnJhdGlvblxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xuICAgIH1cblxufVxuIl19