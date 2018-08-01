import { Http } from "@angular/http";
import { Injectable } from "@angular/core";

@Injectable()
export class ConnectivityCheckService {
	
	constructor(private http: Http) {}
	
	/* Returns a promise that resolves if the user has an internet
	connection and rejects if they do not. Assumes http://google.com
	is a valid URL and that the google servers are currently up. */
	checkConnection() {
		return new Promise((resolve, reject) => {
      		this.http.get("http://google.com", {})
      			.subscribe((resp) => resolve(),
                		   (err) => reject());
    	});
	}
	
}

