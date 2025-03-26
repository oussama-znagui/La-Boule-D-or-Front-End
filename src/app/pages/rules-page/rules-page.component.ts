import { Component } from '@angular/core';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from "../../shared/components/footer/footer.component";

@Component({
  selector: 'app-rules-page',
  imports: [NavBarComponent, FooterComponent],
  templateUrl: './rules-page.component.html',
  styleUrl: './rules-page.component.css'
})
export class RulesPageComponent {

}
