import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDatepicker} from '@angular/material/datepicker';
import {BreadcrumbsComponent} from '@app/components/breadcrumbs/breadcrumbs.component';
import {ModalComponent} from '@app/components/modal/modal.component';
import {FormsUtils} from '@app/utils/forms-utils';
import {TranslateService} from '@ngx-translate/core';
import {ScrollToConfigOptions, ScrollToService} from '@nicky-lenaers/ngx-scroll-to';
import {Moment} from 'moment';
import {SlickCarouselComponent} from 'ngx-slick-carousel';
import {ApiAgentesService} from '@app/core/api/api-agentes.service';
import {ApiRegiaoService} from '@app/core/api/api-regiao.service';


@Component({
  selector: 'app-agentes',
  templateUrl: './agentes.component.html',
  styleUrls: ['./agentes.component.scss']
})
export class AgentesComponent implements OnInit {
  @ViewChild('yearPicker', {static: false}) public yearPicker: MatDatepicker<Moment>;
  @ViewChild('addVideoModal', {static: false}) public addVideoModal: ModalComponent;
  @ViewChild('galleryModal', {static: false}) public galleryModal: ModalComponent;
  @ViewChild('gallerySlider', {static: false}) public gallerySlider: SlickCarouselComponent;

  public phoneMask = '00009-0000';
  public consolidatedForm: FormGroup;
  public passwordForm: FormGroup;
  public xmlFile: File;
  public xmlName: string;
  public createJobUrl: string;
  public loading: boolean;
  public showSuccess: boolean;
  public breadcrumbs: BreadcrumbsComponent.Breadcrumb[];
  public navs: AgentesComponent.Nav[];
  public regiaoConsolidated: ApiRegiaoService.RegiaoConsolidatedDTO[];

  constructor(
    private translateService: TranslateService,
    private formBuilder: FormBuilder,
    private scrollToService: ScrollToService,
    private apiRegiaoService: ApiRegiaoService,
    private apiAgentesService: ApiAgentesService
  ) {
    this.breadcrumbs = [
      {
        title: 'URLs.System.Description',
        url: this.translateService.instant('URLs.MyAccount.Url')
      },
      {
        title: 'Agentes.XmlProcessing',
        url: this.translateService.instant('URLs.ConsultantPageSetup.Url')
      }
    ];

    this.navs = [
      {
        items: [
          'Agentes.LoadXml'

        ],
        active: true
      },
      {
        items: [
          'Agentes.LoadConsolidatedData'
        ],
        active: false
      }
    ];

    this.createJobUrl = this.translateService.instant('URLs.Jobs.Url');
  }

  public async ngOnInit(): Promise<void> {
    console.log('teste');
    this.buildForms();
    // await this.loadPersonal();
  }

  public buildForms(): void {
    this.consolidatedForm = this.formBuilder.group({
      sigla: ['', Validators.required],
      geracaoValorConsolidado: ['', Validators.required],
      compraValorConsolidado: ['', Validators.required],
      precoMedioValorConsolidado: ['', Validators.required]
    });
  }

  private async loadConsolidated(): Promise<void> {
    try {
      this.loading = true;
      this.regiaoConsolidated = await this.apiRegiaoService.getConsolidated();
      FormsUtils.autoFillForm(this.consolidatedForm, this.regiaoConsolidated);
      this.loading = false;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  public async selectNav(nav: AgentesComponent.Nav, index: number): Promise<void> {
    try {
      this.navs.forEach(n => n.active = false);
      nav.active = true;

      const config: ScrollToConfigOptions = {
        target: 'content',
        duration: 500,
        easing: 'easeOutQuad',
        offset: 0
      };
      this.scrollToService.scrollTo(config);
      if (index === AgentesComponent.MenuItem.CONSOLIDATED_DATA) {
        await this.loadConsolidated();
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  // private validFileSize(file: File): boolean {
  //   const sizeInMb = file.size / 1024;
  //   const sizeLimit = 1024 * 5; // if you want 5 MB
  //
  //   if (sizeInMb > sizeLimit) {
  //     const params: AlertComponent.Parameters = {
  //       title: this.translateService.instant('General.ExceededFileSize'),
  //       description: this.translateService.instant('General.ExceededFileSizeLimit'),
  //       buttons: [{
  //         label: 'Ok',
  //         class: 'primary',
  //         classAnimate: 'white'
  //       }]
  //     };
  //
  //     this.alertService.show(params);
  //     return false;
  //   }
  //
  //   return true;
  // }

  public onXmlFileSelect(event): void {
    if (event.target.files.length > 0) {
      console.log(event.target.files[0]);
      this.xmlFile = event.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        this.xmlName = event.target.files[0].name;
      };

      if (this.xmlFile) {
        reader.readAsDataURL(this.xmlFile);
      } else {
        this.xmlName = '';
      }
    }
  }

  public async sendFile(): Promise<void> {
    if (!this.xmlFile) {
      alert(this.translateService.instant('ConsultantPageSetup.ImageError'));
      return;
    }

    this.loading = true;
    try {
      const formData = new FormData();
      formData.append('xmlFile', this.xmlFile);
      console.log(this.xmlFile);
      await this.apiAgentesService.processXml(formData);
      this.loading = false;
      this.saveSuccess(0);
    } catch (e) {
      this.loading = false;
      alert(this.translateService.instant('General.SaveError'));
      console.log(e);
    }
  }

  // public async savePassword(): Promise<void> {
  //   this.loading = true;
  //   if (this.passwordForm.valid) {
  //     try {
  //       const atsUserPasswordFormDTO = this.passwordForm.value;
  //       const result = await this.apiAgentesService.updatePassword(this.authService.userId, atsUserPasswordFormDTO);
  //       if (result) {
  //         this.loading = false;
  //         this.saveSuccess(1);
  //       } else {
  //         this.loading = false;
  //         alert(this.translateService.instant('General.PasswordInvalid'));
  //       }
  //     } catch (e) {
  //       this.loading = false;
  //       alert(this.translateService.instant('General.SaveError'));
  //       console.log(e);
  //     }
  //   } else {
  //     this.loading = false;
  //     FormsUtils.touchFormControls(this.personalForm);
  //     alert(this.translateService.instant('General.FillRequiredFields'));
  //   }
  // }

  public inputHasError(form: FormGroup, formControlName: string, validationAttrs?: Array<string>): boolean {
    return FormsUtils.inputHasError(form, formControlName, validationAttrs);
  }

  private saveSuccess(index: number): void {
    this.showSuccess = true;
    this.selectNav(this.navs[index], index);

    setTimeout(() => {
      this.showSuccess = false;
    }, 5000);
  }
}

export namespace AgentesComponent {
  export interface Nav {
    items: string[];
    active: boolean;
  }

  export class MenuItem {
    public static CONSOLIDATED_DATA = 1;
  }
}
