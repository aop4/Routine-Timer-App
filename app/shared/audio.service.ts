import { Injectable } from "@angular/core";
import { android } from "tns-core-modules/application/application";
import { Vibrate } from 'nativescript-vibrate';

import { TimerSettings } from "~/shared/settings/timer-settings.model";
import { SystemDataService } from "~/shared/data.service";

@Injectable()
export class AudioService {

    isPlaying: boolean = false;
    currSound: any;
    audioPlayer = require("nativescript-sound");
    toneInterval: number; //an interval ID for setInterval; used to loop alarm tone
    vibrateInterval: number; //an interval ID for setInterval; used to loop alarm vibration pattern
    sounds = {
        "tone1":this.audioPlayer.create("~/sounds/tone-1.mp3"), //8 second clip
        "tone1-short":this.audioPlayer.create("~/sounds/tone-1-short.mp3") //1 second clip
    }
    vibrator = new Vibrate(); //I'm sorry... the docs use it too
    settings: TimerSettings;

    constructor(private dataService: SystemDataService) {
        
    }

    refreshSettings() {
        this.settings = this.dataService.getTimerSettings();
    }

    vibrateOnce() {
        this.vibrator.vibrate([0, 500, 200, 500, 200, 500]);
    }

    playSoundOnce() {
        this.currSound.play();
    }

    stopSound() {
        this.currSound.stop();
    }

    playAlarm() {
        if (this.isPlaying) {
            return;
        }
        this.currSound = this.sounds["tone1-short"];
        if (!android) {
            //for iPhones
            //I don't understand why this could help, but it's recommended in the docs,
            //and I don't have an iPhone to test this on at the moment...
            this.currSound = this.audioPlayer.create("~/sounds/tone-1-short.mp3");
        }
        if (this.settings.wantsTone) {
            this.playSoundOnce(); //play an initial tone
            if (this.settings.continuousTone) {
                this.toneInterval = setInterval(() => this.playSoundOnce(), 1030); //loop playback
            }
        }
        if (this.settings.wantsVibrate) {
            this.vibrateOnce(); //do an initial vibration
            if (this.settings.continuousVibrate) {
                this.vibrateInterval = setInterval(() => this.vibrateOnce(), 2800); //loop vibration
            }
        }
        this.isPlaying = true;
    }

    stopAlarm() {
        if (!this.isPlaying) {
            return;
        }
        this.stopSound();
        clearInterval(this.toneInterval); //stop looping the sound
        clearInterval(this.vibrateInterval);
        this.isPlaying = false;
    }

}
