"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var application_1 = require("tns-core-modules/application/application");
var AudioService = /** @class */ (function () {
    function AudioService() {
        this.isPlaying = false;
        this.audioPlayer = require("nativescript-sound");
        this.sounds = {
            "tone1": this.audioPlayer.create("~/sounds/tone-1.mp3"),
            "tone1-short": this.audioPlayer.create("~/sounds/tone-1-short.mp3") //1 second clip
        };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaW8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1ZGlvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0Msd0VBQW1FO0FBR25FO0lBREE7UUFHSSxjQUFTLEdBQVksS0FBSyxDQUFDO1FBRTNCLGdCQUFXLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFFNUMsV0FBTSxHQUFHO1lBQ0wsT0FBTyxFQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDO1lBQ3RELGFBQWEsRUFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLGVBQWU7U0FDckYsQ0FBQTtJQThCTCxDQUFDO0lBNUJHLGdDQUFTLEdBQVQ7UUFBQSxpQkFpQkM7UUFoQkcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzVDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQztRQUNYLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxxQkFBTyxDQUFDLENBQUMsQ0FBQztZQUNWLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLGNBQVEsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQSxDQUFBLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLGVBQWU7UUFDdEYsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0YsYUFBYTtZQUNiLDJFQUEyRTtZQUMzRSw2REFBNkQ7WUFDN0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQ3RFLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxFQUFyQixDQUFxQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25FLENBQUM7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsNENBQTRDO1FBQ25FLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFFRCxnQ0FBUyxHQUFUO1FBQ0ksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNsQixNQUFNLENBQUM7UUFDWCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLDRDQUE0QztRQUNuRSxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsd0JBQXdCO1FBQ3RELElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFyQ1EsWUFBWTtRQUR4QixpQkFBVSxFQUFFO09BQ0EsWUFBWSxDQXVDeEI7SUFBRCxtQkFBQztDQUFBLEFBdkNELElBdUNDO0FBdkNZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBhbmRyb2lkIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24vYXBwbGljYXRpb25cIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEF1ZGlvU2VydmljZSB7XG5cbiAgICBpc1BsYXlpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBjdXJyU291bmQ6IGFueTtcbiAgICBhdWRpb1BsYXllciA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtc291bmRcIik7XG4gICAgaW50ZXJ2YWw6IG51bWJlcjsgLy9hbiBpbnRlcnZhbCBJRCBmb3Igc2V0SW50ZXJ2YWw7IHVzZWQgdG8gbG9vcCBhbGFybSB0b25lXG4gICAgc291bmRzID0ge1xuICAgICAgICBcInRvbmUxXCI6dGhpcy5hdWRpb1BsYXllci5jcmVhdGUoXCJ+L3NvdW5kcy90b25lLTEubXAzXCIpLCAvLzggc2Vjb25kIGNsaXBcbiAgICAgICAgXCJ0b25lMS1zaG9ydFwiOnRoaXMuYXVkaW9QbGF5ZXIuY3JlYXRlKFwifi9zb3VuZHMvdG9uZS0xLXNob3J0Lm1wM1wiKSAvLzEgc2Vjb25kIGNsaXBcbiAgICB9XG5cbiAgICBwbGF5QWxhcm0oKSB7XG4gICAgICAgIHRoaXMuY3VyclNvdW5kID0gdGhpcy5zb3VuZHNbXCJ0b25lMS1zaG9ydFwiXTtcbiAgICAgICAgaWYgKHRoaXMuaXNQbGF5aW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFuZHJvaWQpIHtcbiAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiAge3RoaXMuY3VyclNvdW5kLnBsYXkoKX0sIDEwMzApOyAvL2xvb3AgdGhlIGNsaXBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vZm9yIGlQaG9uZXNcbiAgICAgICAgICAgIC8vSSBkb24ndCB1bmRlcnN0YW5kIHdoeSB0aGlzIGNvdWxkIGhlbHAsIGJ1dCBpdCdzIHJlY29tbWVuZGVkIGluIHRoZSBkb2NzLFxuICAgICAgICAgICAgLy9hbmQgSSBkb24ndCBoYXZlIGFuIGlQaG9uZSB0byB0ZXN0IHRoaXMgb24gYXQgdGhlIG1vbWVudC4uLlxuICAgICAgICAgICAgdGhpcy5jdXJyU291bmQgPSB0aGlzLmF1ZGlvUGxheWVyLmNyZWF0ZShcIn4vc291bmRzL3RvbmUtMS1zaG9ydC5tcDNcIik7XG4gICAgICAgICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy5jdXJyU291bmQucGxheSgpLCAxMDMwKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnJTb3VuZC5wbGF5KCk7IC8vcGxheSBhbiBpbml0aWFsIGNsaXAgYmVmb3JlIGxvb3BpbmcgYmVnaW5zXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzdG9wQWxhcm0oKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1BsYXlpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnJTb3VuZC5zdG9wKCk7IC8vSSB0aGluayB0aGlzIGlzIGFjdHVhbGx5IGJyb2tlbiBpbiB0aGUgQVBJXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7IC8vc3RvcCBsb29waW5nIHRoZSBzb3VuZFxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xuICAgIH1cblxufVxuIl19