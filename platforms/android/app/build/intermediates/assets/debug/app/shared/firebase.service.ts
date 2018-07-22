import { Injectable } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase";

@Injectable()
export class FirebaseService {

    UUID_LENGTH: number = 8;
    UUID_ALPHABET: string = "ABCDEFGHJKLMNPRSTUVWXYZ23456789";
    
    /* Generates a short pseudo-unique UUID generated from characters that a user can
    easily type and distinguish from one another. I could not find a pre-built module
    that allows a custom length and alphabet. */
    generateUUID() {
        let uuid = "";
        for (let i = 0; i < this.UUID_LENGTH; i++) {
            uuid += this.UUID_ALPHABET.charAt(Math.floor(Math.random()*this.UUID_ALPHABET.length));
        }
        return uuid;
    }

    initializeFirebase() {
        firebase.init({})
        .then(() => {
            firebase.login({type: firebase.LoginType.ANONYMOUS})
            .then(user => console.log("User uid: " + user.uid))
        })
        .then(() => {
            firebase.getValue('/test123').then((res) => console.log('a'+JSON.stringify(res)));
        }, (err) => console.log(err))
        .catch(error => console.log("Firebase error: " + error));
    }

}

