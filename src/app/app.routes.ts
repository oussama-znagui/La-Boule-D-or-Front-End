import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TournamentPageComponent } from './pages/tournament-page/tournament-page.component';
import { TournamentsPageComponent } from './pages/tournaments-page/tournaments-page.component';

export const routes: Routes = [
    {path: "", component: HomePageComponent},
    {path: "tournaments",component: TournamentsPageComponent},
    {path: "tournaments/:id", component: TournamentPageComponent}

];
