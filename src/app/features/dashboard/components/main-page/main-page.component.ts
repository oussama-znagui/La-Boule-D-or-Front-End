import { Component } from '@angular/core';
import { StatsComponent } from "../stats/stats.component";

@Component({
  selector: 'app-main-page',
  imports: [StatsComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
