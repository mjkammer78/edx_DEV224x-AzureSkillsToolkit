import { Injectable } from '@angular/core';
// import { Headers, HttpModule } from '@angular/http';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AzureHttpClient } from './azureHttpClient';
import { BingSearchResponse } from '../models/bingSearchResponse';
import { AzureKeyVaultClient } from './azureKeyVaultClient';
@Injectable()
export class CognitiveService {
    bingSearchAPIEndpoint = 'https://api.cognitive.microsoft.com/bing/v7.0/images/search';
    private bingSearchAPIKey: string;

    constructor(private http: AzureHttpClient, private vault: AzureKeyVaultClient) {
        const queriedKey = vault.getSecret('BingSearchApiKey');
        queriedKey.then((val: string) => this.bingSearchAPIKey = val)
        .catch((err: any) =>  this.bingSearchAPIKey = '');
    }
    searchImages(searchTerm: string): Observable<BingSearchResponse> {
        return this.http.get(`${this.bingSearchAPIEndpoint}?q=${searchTerm}`, this.bingSearchAPIKey)
            .map(response => response.json() as BingSearchResponse)
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
