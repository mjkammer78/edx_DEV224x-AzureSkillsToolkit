import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AzureHttpClient {
    constructor(private http: Http) { }
    get(url: string, apiKey: string) {
        const headers = new Headers();
        headers.append('Ocp-Apim-Subscription-Key', apiKey);
        return this.http.get(url, {
            headers: headers
        });
    }
    post(url, apiKey, data) {
        const headers = new Headers();
        headers.append('Ocp-Apim-Subscription-Key', apiKey);
        return this.http.post(url, data, {
            headers: headers
        });
    }
}
