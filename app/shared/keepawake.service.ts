import { keepAwake, allowSleepAgain } from "nativescript-insomnia";
import { Injectable } from "@angular/core";

@Injectable()
export class KeepAwakeService {
    keepScreenOn() {
        keepAwake();
    }
    letScreenTurnOff() {
        allowSleepAgain();
    }
}
