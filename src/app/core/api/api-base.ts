import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export abstract class ApiBase {
  protected abstract routePath: string;
  protected apiBaseUrl: string;
  protected version: string = "";
  protected scope: string;

  constructor(protected httpClient: HttpClient) {
    this.apiBaseUrl = environment.baseUrl;
  }

  protected get<TResult>(path: string, options?: ApiBase.Options): Promise<TResult> {
    return new Promise<TResult>((resolve, reject) => {
      const url = this.buildURL(path);

      options = this.prepareOptions(options);

      return this.httpClient.get<TResult>(url, options)
        .subscribe(
          result => { resolve(result) },
          error => this.errorHandler(error, reject));
    });
  }

  protected post<TResult>(path: string, content?: any, options?: ApiBase.Options): Promise<TResult> {
    return new Promise<TResult>((resolve, reject) => {
      const url = this.buildURL(path);

      options = this.prepareOptions(options);

      this.httpClient.post<TResult>(url, content, options)
        .subscribe(
          result => resolve(result),
          error => this.errorHandler(error, reject));
    });
  }

  protected patch<TResult>(path: string, content?: any, options?: ApiBase.Options): Promise<TResult> {
    return new Promise<TResult>((resolve, reject) => {
      const url = this.buildURL(path);

      options = this.prepareOptions(options);

      this.httpClient.patch<TResult>(url, content, options)
        .subscribe(
          result => resolve(result),
          error => this.errorHandler(error, reject));
    });
  }

  protected put<TResult>(path: string, content?: any, options?: ApiBase.Options): Promise<TResult> {
    return new Promise<TResult>((resolve, reject) => {
      const url = this.buildURL(path);

      options = this.prepareOptions(options);

      this.httpClient.put<TResult>(url, content, options)
        .subscribe(
          result => resolve(result),
          error => this.errorHandler(error, reject));
    });
  }

  protected delete<TResult>(path: string, content?: any, options?: ApiBase.Options): Promise<TResult> {
    return new Promise<TResult>((resolve, reject) => {
      const url = this.buildURL(path);

      options = this.prepareOptions(options);

      if (content) {
        (options as any).body = content;
      }

      this.httpClient.delete<TResult>(url, options)
        .subscribe(
          result => resolve(result),
          error => this.errorHandler(error, reject));
    });
  }

  private errorHandler(error: any, onError: (reason: any) => void): void {
    if (onError) {
      let errorMessage = new ApiBase.ErrorMessage();

      if (error instanceof HttpErrorResponse) {
        let err = error.error;
        if (err && typeof err === "string") {
          err = JSON.parse(err);
        }

        errorMessage = Object.assign<ApiBase.ErrorMessage, ApiBase.ErrorMessage>(errorMessage, err);
      }
      else {
        errorMessage.message = JSON.stringify(error);
      }

      onError(errorMessage);
    }
  }

  protected buildHeader(auth: boolean = false): { [header: string]: string | string[] } {
    var headers: any = {
      'Accept-Language': 'pt-BR'
    };

    if (auth) {
      headers.Authorization = 'true';
    }

    return headers;
  }

  private prepareOptions(options: ApiBase.Options): ApiBase.Options {
    if (!options) {
      options = {};
    }

    if (options.headers) {
      options.headers = Object.assign(this.buildHeader(true), options.headers);
    } else {
      options.headers = this.buildHeader(true);
    }

    if (options.params) {
      Object.keys(options.params).forEach(
        key => options.params[key] === undefined || options.params[key] === null ? delete options.params[key] : '');
    }
    return options;
  }

  protected buildURL(path: string): string {
    let url = this.apiBaseUrl;

    if (!url.endsWith("/")) {
      url += "/";
    }

    url += this.routePath;

    if (!path) {
      return url;
    }

    if (!url.endsWith("/") && !path.startsWith("/")) {
      url += "/";
    }

    return url + path;
  }
}

export namespace ApiBase {
  export type Options = {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    withCredentials?: boolean;
  };

  export class QueryFilter {
    page: number;
    size: number;
    search: string;
    sort: string[];
  }

  export class ErrorMessage {
    public message: string;
    public error: string;
    public invalidField: string;
  }

  export class ListViewModel<TItem> {
		public totalElements: number;
    public totalPages: number;
    public first: boolean;
    public last: boolean;
    public number: number;
    public numberOfElements: number;
    public size: number;
    public empty: boolean;
		public content: TItem[];
	}

	export class Pageable {
		public pageNumber: number;
		public pageSize: number;
		public offset: number;
		public paged: boolean;
    public unpaged: boolean;
    public sort: Sort;
  }

  export class Sort {
    public sorted: boolean;
    public unsorted: false;
    public empty: boolean;
  }

	export namespace PaginatedListRequestViewModel {
		export enum SortOrder {
			ASC = "ASC",
			DESC = "DESC",
		}
	}
}
