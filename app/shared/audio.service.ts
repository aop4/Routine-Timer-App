import { Injectable } from "@angular/core";
import { android } from "tns-core-modules/application/application";
import { Vibrate } from 'nativescript-vibrate';

import { TimerSettings } from "~/shared/settings/timer-settings.model";
import { SystemDataService } from "~/shared/data.service";

@Injectable()
export class AudioService {

    isPlaying: boolean = false; //whether an alarm is currently being played
    currSound: any; //a representation of the audio file being played
    toneInterval: number; //an interval ID for setInterval; used to loop alarm tone
    vibrateInterval: number; //an interval ID for setInterval; used to loop alarm vibration pattern
    audioPlayer = require("nativescript-sound");
    sounds = {
        "tone1":this.audioPlayer.create("~/sounds/tone-1.mp3"), //8 second clip
        "tone1-short":this.audioPlayer.create("~/sounds/tone-1-short.mp3") //1 second clip
    }
    vibrator = new Vibrate(); //I'm sorry... the docs use it too
    settings: TimerSettings; //The settings used to decide how to alert the user

    constructor(private dataService: SystemDataService) {
        
    }

    /* Refresh the alarm settings used to decide how to alert the user, e.g.,
    if those settings were just modified by the user. */
    refreshSettings() {
        this.settings = this.dataService.getTimerSettings();
    }

    /* Vibrates the device with a distinct pattern */
    vibrateOnce() {
        this.vibrator.vibrate([0, 500, 200, 500, 200, 500]);
    }

    /* Plays the alarm tone */
    playSoundOnce() {
        this.currSound.play();
    }

    /* Stops the alarm tone */
    stopSound() {
        this.currSound.stop();
    }

    /* Starts the timer alarm iff an alarm is not already going off. This may cause
    the phone to vibrate, play audio, both, or neither, and at different durations,
    depending on the user's preferences as specified on the settings page. */
    playAlarm() {
        //if an alarm's going off, don't start a new one
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
        //if the user wants a tone to play with the alarm
        if (this.settings.wantsTone) {
            //play an initial tone
            this.playSoundOnce();
            if (this.settings.continuousTone) {
                //loop playback
                this.toneInterval = setInterval(() => this.playSoundOnce(), 1030);
            }
        }
        //if the user wants the device to vibrate with the alarm
        if (this.settings.wantsVibrate) {
            //do an initial vibration
            this.vibrateOnce();
            if (this.settings.continuousVibrate) {
                //loop vibration
                this.vibrateInterval = setInterval(() => this.vibrateOnce(), 2800);
            }
        }
        this.isPlaying = true;
    }

    /* If an alarm is going off, stops any associated vibration and audio. */
    stopAlarm() {
        if (!this.isPlaying) {
            return;
        }
        this.stopSound(); //stop playing the current sound
        clearInterval(this.toneInterval); //stop looping the sound
        clearInterval(this.vibrateInterval); //stop looping vibration
        this.isPlaying = false;
    }

}
