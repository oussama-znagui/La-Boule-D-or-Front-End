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
import { ChallengesManagmentComponent } from './features/dashboard/components/challenges-managment/challenges-managment.component';
import { RulesPageComponent } from './pages/rules-page/rules-page.component';
import { AboutUsPageComponent } from './pages/about-us-page/about-us-page.component';
import { AuthComponent } from './features/auth/components/auth/auth.component';
import { ProfilPageComponent } from './pages/profil-page/profil-page.component';
import { authGuard } from './guards/auth.guard';
import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';

export const routes: Routes = [
    {path: "", component: HomePageComponent},
    {path: "tournaments",component: TournamentsPageComponent},
    {path: "tournaments/:id", component: TournamentPageComponent},
    {path: "players", component: PlayersPageComponent},
    {path: "rules", component: RulesPageComponent},
    {path: "about", component: AboutUsPageComponent},
    {path: "auth", component: AuthComponent},
    {path: "profile", component: ProfilPageComponent,canActivate: [authGuard], data: { role: '[ROLE_PLAYER]' } },
    {path: "caledar", component:CalendarPageComponent},
    {
        path: "dashboard",
        component: DashboardPageComponent,
        children: [
            {path: "", component: MainPageComponent},
            {path:'tournaments', component: TournamentsManagementComponent},
            {path:'add-tournament', component: TournamentRequestComponent},
             {path:'clubs', component: ClubsManagementComponent},
             {path:'stages', component: StagesManagementComponent},
             {path: 'challenges', component: ChallengesManagmentComponent}

        ],canActivate: [authGuard], data: { role: '[ROLE_ADMIN]' }
    }

];
