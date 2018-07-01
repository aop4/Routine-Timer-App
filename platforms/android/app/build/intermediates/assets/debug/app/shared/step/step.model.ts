export class Step {
    name: string; //A name for the step (like "Mix reagents A and B")
    description: string; //a description/instructions for the step
    minutes: number; //the duration of the task to the nearest minute, rounding down
    seconds: number; //the number of seconds required for the step after "minutes" minutes go by
    repetitions: number; //the number of times the task is repeated

    constructor(name: string, description: string, minutes: number, seconds: number, repetitions: number) {
        this.name = name;
        this.description = description;
        this.minutes = minutes;
        this.seconds = seconds;
        this.repetitions = repetitions;
    }
}
