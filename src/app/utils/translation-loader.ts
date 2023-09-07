import { TranslateLoader } from "@ngx-translate/core";
import { Observable, of } from "rxjs";

export interface Locale { lang: string; data: Object; }

export class TranslationLoader implements TranslateLoader {
  private locales: Locale[];

  constructor(...args: Locale[]) {
    this.locales = args;
  }

  getTranslation(lang: string): Observable<any> {
    return of(this.locales.find(l => l.lang == lang).data);
  }
}

