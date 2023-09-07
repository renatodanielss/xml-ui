import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input() public background: string;

  constructor() {
  }

  public ngOnInit(): void {
  }

}
