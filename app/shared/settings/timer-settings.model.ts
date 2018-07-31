export class TimerSettings {
    //settings controlling what happens when the timer alarm goes off
    wantsVibrate: boolean; //whether the user wants vibration
    wantsTone: boolean; //whether the user wants a tone to play
    continuousTone: boolean; //whether the user wants the tone to play continuously
                            //(or once, if false)
    continuousVibrate: boolean; //whether the user wants the device to vibrate continously
                                //(or the pattern to repeat once, if false)
    wantsNotifications: boolean; //whether the user wants to receibe a notification
}