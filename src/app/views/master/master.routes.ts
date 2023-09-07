import {NgModule} from '@angular/core';
import {Route, RouterModule, Routes} from '@angular/router';
import {CaseInsensitiveMatcher} from '@app/utils/case-insensitive-matcher';
import {MasterComponent} from './master.component';
import {TranslationLoader} from 'app/utils/translation-loader';
import {locale as localePtBr} from 'app/i18n/pt-BR';
import {locale as localeEnUs} from 'app/i18n/en-US';
import {locale as localeEsPy} from 'app/i18n/es-PY';

export function TranslationLoaderFactory() {
  return new TranslationLoader(localePtBr, localeEnUs, localeEsPy);
}

const ptBrUrls = localePtBr.data.URLs;
const esPyUrls = localeEsPy.data.URLs;
const enUsUrls = localeEnUs.data.URLs;

const routes: Routes = [
  {
    path: '',
    component: MasterComponent,
    children: [
      { path: '**', redirectTo: ptBrUrls.Dashboard.Url }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
