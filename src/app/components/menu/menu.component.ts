import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public navigations: MenuComponent.Nav[];

  constructor(
    private translateService: TranslateService
  ) {
    this.navigations = [
      {
        icon: "home",
        title: 'URLs.Home.Description',
        url: this.translateService.instant('URLs.Home.Url')
      },
      {
        icon: "work",
        title: 'URLs.Jobs.Description',
        url: this.translateService.instant('URLs.Jobs.Url')
      },
      {
        icon: "question_answer",
        title: 'URLs.SpecificQuestions.Description',
        url: this.translateService.instant('URLs.SpecificQuestions.Url')
      },
      {
        icon: "business",
        title: 'URLs.Companies.Description',
        url: this.translateService.instant('URLs.Companies.Url')
      },
      {
        icon: "gavel",
        title: 'URLs.ProspectionRules.Description',
        url: this.translateService.instant('URLs.ProspectionRules.Url')
      },
      {
        icon: "school",
        title: 'URLs.CourseGroup.Description',
        url: this.translateService.instant('URLs.CourseGroup.Url')
      },
      {
        icon: "event",
        title: 'URLs.Schedule.Description',
        url: this.translateService.instant('URLs.Schedule.Url')
      },
      {
        icon: "people",
        title: 'URLs.Managers.Description',
        url: this.translateService.instant('URLs.Managers.Url')
      },
    ];
  }

  public ngOnInit(): void {
  }

}

export namespace MenuComponent {
  export interface Nav {
    icon?: string,
    title: string,
    description?: string,
    class?: string;
    url?: string;
    queryParams?: any;
    click?: (...params: any[]) => Promise<any>
  }
}
