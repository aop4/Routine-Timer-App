import { Injectable } from "@angular/core";

/* This class is merely used as a way to pass arbitrary data from one route to another,
without the use of the router. */
@Injectable()
export class DataRetriever {

    data: any;
    identifier: string;

}
