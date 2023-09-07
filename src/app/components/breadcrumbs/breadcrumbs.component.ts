import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  @Input() public breadcrumbs: BreadcrumbsComponent.Breadcrumb[];
  @Input() public class: string;
  
  constructor() { }

  public ngOnInit(): void {
  }

}

export namespace BreadcrumbsComponent {
  export class Breadcrumb {
    public title: string;
    public url: string;
    public queryParams?: any;

    constructor(title: string, url: string){
      this.title = title;
      this.url = url;
    }   
  }
}