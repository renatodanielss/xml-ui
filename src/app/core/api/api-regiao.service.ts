import {Injectable} from '@angular/core';
import {ApiBase} from './api-base';

@Injectable()
export class ApiRegiaoService extends ApiBase {
  protected routePath = 'regioes';
  public getConsolidated(): Promise<ApiRegiaoService.RegiaoConsolidatedDTO[]> {
    return super.get<ApiRegiaoService.RegiaoConsolidatedDTO[]>('', {});
  }
}

export namespace ApiRegiaoService {
  export interface RegiaoConsolidatedDTO {
    sigla: string;
    geracaoValorConsolidado: number;
    compraValorConsolidado: number;
    precoMedioValorConsolidado: number;
  }
}
