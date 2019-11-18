import { NgModule } from '@angular/core';
import { CognitiveService } from './services/cognitive.service';
import { AzureHttpClient } from './services/azureHttpClient';
import { AzureKeyVaultClient } from './services/azureKeyVaultClient';
@NgModule({
    providers: [AzureHttpClient, CognitiveService, AzureKeyVaultClient]
})
export class CommonModule { }
