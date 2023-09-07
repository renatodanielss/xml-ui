import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {
  @Input() public steps: StepsComponent.Step[];
  @Output() public onSelect = new EventEmitter<any>();

  constructor(private router: Router) { }

  public ngOnInit(): void { }

  public select(stepId: number): void {
    this.onSelect.emit({
      stepId: stepId
    });
  }
}

export namespace StepsComponent {
  export interface Step{
    id: number;
    url: string;
    title: string;
    active?: boolean;
    block?: boolean;
    acceptClick?: boolean;
    queryParams?: any;
  }
}