import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {CultureService} from './services/culture.service';
import {TranslationLoaderService} from './services/translation-loader.service';
import {locale as localePtBr} from './i18n/pt-BR';
import {locale as localeEnUs} from './i18n/en-US';
import {locale as localeEsPy} from './i18n/es-PY';
import {AlertService} from './components/alert/alert.service';
import {WindowScrollService} from './services/window-scroll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('main', { static: true }) public scrollContainer: ElementRef;

  constructor(
    public translationLoaderService: TranslationLoaderService,
    public translateService: TranslateService,
    public cultureService: CultureService,
    public windowScrollService: WindowScrollService,
    private alertService: AlertService
  ) {
    translateService.setDefaultLang('pt-BR');
    translateService.use(cultureService.currentCulture);
    translationLoaderService.loadTranslations(localePtBr, localeEnUs, localeEsPy);

    cultureService.onCultureChanged.subscribe((lang) => {
      translateService.use(lang);
    });

    try { // Override alert()
      window.alert = this.alertMethod.bind(this);
    } catch (ex) {
      console.log(ex);
    }
  }

  public ngOnInit(): void {
    this.windowScrollService.window = this.scrollContainer.nativeElement;
    this.scrollContainer.nativeElement.onscroll = this.scrollContainerOnScroll;
  }

  public scrollContainerOnScroll = (): void => {
    this.windowScrollService.currentScrollOffsetTop = this.scrollContainer.nativeElement.scrollTop;
  }

  private alertMethod(message: string): void {
    this.alertService.show(message);
  }
}
