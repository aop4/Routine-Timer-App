import { Task } from "./task/task.model";

/* This class is merely used as a way to pass arbitrary data from one route to another,
without the use of a router. Another approach is to use an injectable service or query
parameters, but a static variable also does the job. */
export class DataRetriever {

    static data: any;
    static identifier: string;
    static modified: boolean = false;
    static alreadySetBackPressed: boolean = false;

}
