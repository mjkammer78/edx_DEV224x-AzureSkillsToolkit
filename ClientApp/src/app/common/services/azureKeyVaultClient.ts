import { Injectable } from '@angular/core';
// import { KeyVaultClient, KeyVaultCredentials } from 'azure-keyvault';
import * as KeyVault from 'azure-keyvault';
import { Http } from '@angular/http';
// import * as msRestAzure from 'ms-rest-azure';
import { loginWithAppServiceMSI, MSIAppServiceTokenCredentials } from 'ms-rest-azure';
import { ServiceClientCredentials } from 'ms-rest';

@Injectable()
export class AzureKeyVaultClient {

    private secretVault = 'https://azuretoolkitvault.vault.azure.net';  // could be moved to ENV variable

    public async getSecret(secretname: string): Promise<string> {

        const credentials = await this.getKeyVaultCredentials();
        const result = await this.getKeyVaultSecret(credentials, secretname);

        return result.value;
    }

    private getKeyVaultCredentials(): Promise<MSIAppServiceTokenCredentials> {
        return loginWithAppServiceMSI({resource: 'https://vault.azure.net'});
    }

    private getKeyVaultSecret(credentials: ServiceClientCredentials, secretname: string) {
        const keyVaultClient = new KeyVault.KeyVaultClient(credentials);
        return keyVaultClient.getSecret(this.secretVault, secretname, '');
    }
}
