import { Injectable } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase";

import { Task } from "~/shared/task/task.model";

@Injectable()
export class FirebaseService {

    UUID_LENGTH: number = 8; //the length of task UUIDs in the database
    UUID_ALPHABET: string = "ABCDEFGHJKLMNPRSTUVWXYZ23456789"; //letter used in UUIDs
    //Together there are 8^31 ~= 1 trillion possible UUIDs
    initialized: boolean = false; //whether the firebase instance has been initialized
    
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

    /* Welcome to the database. It's only possible to read one task/routine at a time. There about
    a trillion possible task IDs. So authentication isn't really important: the likelihood that you'll
    ever make that many requests is... 0. It would probably take over 3 million days, after which
    Firebase will probably not exist, as it will be something like the 114th century. But you can still
    only access an individual task from the app, so it's not really worth trying in the first place.
    This method initializes access to Firebase and authenticates the user. */
    initializeFirebase() {
        if (this.initialized) {
            return;
        }
        firebase.init({})
        .then(() => {
            this.initialized = true;
            return firebase.login({type: firebase.LoginType.ANONYMOUS});
        });
    }
    
    /* Adds a task to the database at a randomly generated path. Returns
    a promise that resolves with the generated path UUID on success.  */
    addTask(task: Task) {
        //generate a UUID for the task
        let uuid = this.generateUUID();
        return new Promise<string>((resolve, reject) => {
            //store the task in the database at the path
            // /routine/<generated uuid>
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

