import {Injectable} from '@angular/core';
import {ApiBase} from './api-base';

@Injectable()
export class ApiAgentesService extends ApiBase {
  protected routePath = 'agentes';

  public processXml(consultant: FormData): Promise<void> {
    return super.post<void>('/xml', consultant);
  }
}
