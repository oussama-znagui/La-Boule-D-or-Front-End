import { Component, Input } from '@angular/core';
import { Stage } from '../../../../models/stage';

@Component({
  selector: 'app-dashboard-stage-card',
  imports: [],
  templateUrl: './dashboard-stage-card.component.html',
  styleUrl: './dashboard-stage-card.component.css'
})
export class DashboardStageCardComponent {
  @Input() stage! : Stage;

}
