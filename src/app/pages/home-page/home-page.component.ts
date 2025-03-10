import { Component } from '@angular/core';
import { NavBarComponent } from "../../shared/components/nav-bar/nav-bar.component";
import { HeroSectionComponent } from "../../features/home/components/hero-section/hero-section.component";
import { TournamentsSectionComponent } from "../../features/home/components/tournaments-section/tournaments-section.component";

@Component({
  selector: 'app-home-page',
  imports: [NavBarComponent, HeroSectionComponent, TournamentsSectionComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
