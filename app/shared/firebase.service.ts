import { Injectable } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase";
import { Task } from "~/shared/task/task.model";

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

    /* Welcome to the database. It's only possible to read one task/routine at a time. There are over
    a trillion possible task IDs. So authentication isn't really important: the likelihood that you'll
    ever make that many requests is... 0. It would probably take over 3 million days, after which
    Firebase will probably not exist, as it will be something like the 114th century. But you can still
    only access an individual task from the app, so it's not really worth trying in the first place.
    This method initializes access to Firebase and authenticates the user. */
    initializeFirebase() {
        firebase.init({})
        .then(() => {
            return firebase.login({type: firebase.LoginType.ANONYMOUS});
        });
    }
    
    /* Adds a task to the database at a randomly generated path */
    addTask(task: Task) {
        let uuid = this.generateUUID();
        return new Promise<string>((resolve, reject) => {
            firebase.setValue("/routine/" + uuid, task)
            .then( () => resolve(uuid), () => reject())
        });
    }

    /* Returns a promise that resolves with the task in the firebase database
    with path taskID (uppercased). If none is found or if taskID is the empty
    string, the returned promise resolves with an object whose value attribute
    is equal to null. */
    getTask(taskID: string) {
        //if taskID is the empty string/null/undefined
        if (!taskID) {
            return new Promise((resolve) => resolve({value: null}));
        }
        return firebase.getValue("/routine/"+taskID.toUpperCase());
    }

}

