import {Injectable} from '@angular/core';
import {
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'environments/environment';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {
  constructor() {
  }

  private addHeaders(req: HttpRequest<any>): HttpRequest<any> {
    let headers: any;

    if (req.headers) {
      headers = {
        ...headers
      };
    }

    if (headers) {
      return req.clone({setHeaders: headers});
    }

    return req;
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent |
    HttpResponse<any> | HttpUserEvent<any>> {
    if (req.url.includes('/oauth')) {
      return next.handle(req);
    }

    if (req.url.indexOf(environment.baseUrl) > -1) {
      return next.handle(this.addHeaders(req)).pipe();
    } else {
      return next.handle(req);
    }
  }
}
