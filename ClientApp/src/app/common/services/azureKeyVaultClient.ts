import { Injectable } from '@angular/core';
// import { Http, Headers } from '@angular/http';
// import { KeyVaultClient, KeyVaultCredentials } from 'azure-keyvault';
import { AuthenticationContext } from 'adal-node';
import KeyVault = require('azure-keyvault');

@Injectable()
export class AzureKeyVaultClient {

    private clientId = process.env['AZURE_CLIENT_ID'];
    private secret = process.env['AZURE_CLIENT_SECRET'];

    private secretVault = 'AzureToolkitVault';

    private kvCreds = new KeyVault.KeyVaultCredentials(this.adalCallback, null);
    public keyVaultClient = new KeyVault.KeyVaultClient(this.kvCreds);

    public async getSecret(secretname: string): Promise<string> {
        // secretname = 'BingSearchApiKey';
        const secretVersion = '';
        const result = await this.keyVaultClient.getSecret(this.secretVault, secretname, secretVersion);
        return result.value;
    }

    // Callback for ADAL authentication.
    private adalCallback(challenge: any, callback: any) {

        const context = new AuthenticationContext(challenge.authorization);

        return context.acquireTokenWithClientCredentials(challenge.resource, this.clientId, this.secret,
            (err: any, tokenResponse: any) => {

                if (err) {
                    throw err;
                }

                // Calculate the value to be set in the request's Authorization header and resume the call.
                return callback(null, tokenResponse.tokenType + ' ' + tokenResponse.accessToken);
            });

    }

}
