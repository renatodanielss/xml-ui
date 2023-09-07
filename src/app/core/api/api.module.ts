import {NgModule} from '@angular/core';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {ApiAgentesService} from '@app/core/api/api-agentes.service';
import {ApiRegiaoService} from '@app/core/api/api-regiao.service';


@NgModule({
    imports: [
      HttpClientModule,
      HttpClientJsonpModule
    ],
    providers: [
      ApiAgentesService,
      ApiRegiaoService
    ]

})
export class ApiModule {
}
