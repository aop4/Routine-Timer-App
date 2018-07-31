import { Step } from "../step/step.model";

export class Task {
    name: string;
    description: string;
    steps: Array<Step>;
    modifiedTimestamp: number;

    constructor(name: string, desc: string, steps: Array<Step>) {
        this.name = name;
        this.description = desc;
        this.steps = steps;
    }

    /* Delete the indexth step of this task */
    removeStep(index: number) {
        this.steps.splice(index, 1);
    }
}
