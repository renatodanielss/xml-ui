import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { CaseInsensitiveMatcher } from './utils/case-insensitive-matcher';
import { TranslationLoader } from './utils/translation-loader';
import { locale as localePtBr } from './i18n/pt-BR';
import { locale as localeEnUs } from './i18n/en-US';
import { locale as localeEsPy } from './i18n/es-PY';

export function TranslationLoaderFactory() {
  return new TranslationLoader(localePtBr, localeEnUs, localeEsPy);
}

const ptBrUrls = localePtBr.data.URLs;
const esPyUrls = localeEsPy.data.URLs;
const enUsUrls = localeEnUs.data.URLs;

const routes: Routes = [
  <Route>{
    matcher: CaseInsensitiveMatcher.matcher,
    matcherPath: [ptBrUrls.Agentes.Url, esPyUrls.Agentes.Url, enUsUrls.Agentes.Url],
    loadChildren: () => import('@views/agentes/agentes.module').then(m => m.AgentesModule)
  },
  <Route>{
    path: '',
    loadChildren: () => import('./views/master/master.module').then(m => m.MasterModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
