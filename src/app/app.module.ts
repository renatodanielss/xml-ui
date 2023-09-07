import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {AppRoutingModule} from '@app/app.routes';
import {AppComponent} from '@app/app.component';
import {SEOService} from './services/seo.service';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {TranslationLoaderService} from './services/translation-loader.service';
import {CultureService} from './services/culture.service';
import {AlertModule} from './components/alert/alert.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {RequestInterceptorService} from './services/request-interceptor.service';
import {ApiModule} from './core/api/api.module';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
import {StepsService} from './components/steps/steps.service';
import {WindowScrollService} from './services/window-scroll.service';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';
import {SafeUrlPipe} from './pipes/safe-url.pipe';

registerLocaleData(localePt, 'pt');

export function appInitializer(seoService: SEOService) {
  return () => {
    seoService.setTitle('XML Processing');
    seoService.setUrl(window.location.origin);
    seoService.setFavicon('');
    seoService.setImage('');
    seoService.setDescription('System that process and persist from a xml file');

    return new Promise<void>(async (resolve) => {
      resolve();
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
    SafeUrlPipe
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    BrowserAnimationsModule,
    AppRoutingModule,
    AlertModule,
    ApiModule,
    ScrollToModule.forRoot(),
    TranslateModule.forRoot()
  ],
  entryComponents: [],
  providers: [
    SEOService,
    TranslationLoaderService,
    CultureService,
    StepsService,
    WindowScrollService,
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    {provide: LOCALE_ID, useValue: 'pt'},
    {provide: APP_INITIALIZER, useFactory: appInitializer, deps: [SEOService], multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
