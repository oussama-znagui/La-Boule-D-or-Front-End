import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TournamentPageComponent } from './pages/tournament-page/tournament-page.component';
import { TournamentsPageComponent } from './pages/tournaments-page/tournaments-page.component';
import { PlayersPageComponent } from './pages/players-page/players-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { MainPageComponent } from './features/dashboard/components/main-page/main-page.component';
import { TournamentsManagementComponent } from './features/dashboard/components/tournaments-management/tournaments-management.component';
import { TournamentRequestComponent } from './features/dashboard/components/tournament-request/tournament-request.component';
import { ClubsManagementComponent } from './features/dashboard/components/clubs-management/clubs-management.component';
import { StagesManagementComponent } from './features/dashboard/components/stages-management/stages-management.component';

export const routes: Routes = [
    {path: "", component: HomePageComponent},
    {path: "tournaments",component: TournamentsPageComponent},
    {path: "tournaments/:id", component: TournamentPageComponent},
    {path: "players", component: PlayersPageComponent},
    {
        path: "dashboard",
        component: DashboardPageComponent,
        children: [
            {path: "", component: MainPageComponent},
            {path:'tournaments', component: TournamentsManagementComponent},
            {path:'add-tournament', component: TournamentRequestComponent},
             {path:'clubs', component: ClubsManagementComponent},
             {path:'stages', component: StagesManagementComponent}

        ]
    }

];
