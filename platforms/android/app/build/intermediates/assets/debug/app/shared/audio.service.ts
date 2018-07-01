import { Injectable } from "@angular/core";
import { android } from "tns-core-modules/application/application";

@Injectable()
export class AudioService {

    isPlaying: boolean = false;
    audioPlayer = require("nativescript-sound");
    sounds = {
        "tone1":this.audioPlayer.create("~/sounds/tone-1.mp3")
    }

    playAlarm() {
        if (this.isPlaying) {
            return;
        }
        if (android) {
            this.sounds["tone1"].play();
        }
        else {
            //I don't understand why this could help, but it's recommended in the docs,
            //and I don't have an iPhone to test this on at the moment...
            let soundFile = this.audioPlayer.create("~/sounds/tone-1.mp3");
            soundFile.play();
        }
        this.isPlaying = true;
    }

    stopAlarm() {
        if (!this.isPlaying) {
            return;
        }
        this.audioPlayer.stop();
        this.isPlaying = false;
    }

}