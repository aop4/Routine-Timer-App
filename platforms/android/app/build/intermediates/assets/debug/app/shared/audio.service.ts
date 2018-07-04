import { Injectable } from "@angular/core";
import { android } from "tns-core-modules/application/application";
import { Vibrate } from 'nativescript-vibrate';

@Injectable()
export class AudioService {

    isPlaying: boolean = false;
    currSound: any;
    audioPlayer = require("nativescript-sound");
    interval: number; //an interval ID for setInterval; used to loop alarm tone
    sounds = {
        "tone1":this.audioPlayer.create("~/sounds/tone-1.mp3"), //8 second clip
        "tone1-short":this.audioPlayer.create("~/sounds/tone-1-short.mp3") //1 second clip
    }
    vibrator = new Vibrate(); //I'm sorry... the docs use it too

    playAlarm() {
        this.currSound = this.sounds["tone1-short"];
        if (this.isPlaying) {
            return;
        }
        if (android) {
            this.interval = setInterval(() =>  {this.currSound.play()}, 1030); //loop the clip
        }
        else {
            //for iPhones
            //I don't understand why this could help, but it's recommended in the docs,
            //and I don't have an iPhone to test this on at the moment...
            this.currSound = this.audioPlayer.create("~/sounds/tone-1-short.mp3");
            this.interval = setInterval(() => this.currSound.play(), 1030);
        }
        this.currSound.play(); //play an initial clip before looping begins
        this.isPlaying = true;
        this.vibrator.vibrate([0, 500, 200, 500, 200, 500]);
    }

    stopAlarm() {
        if (!this.isPlaying) {
            return;
        }
        this.currSound.stop(); //I think this is actually broken in the API
        clearInterval(this.interval); //stop looping the sound
        this.isPlaying = false;
    }

}
