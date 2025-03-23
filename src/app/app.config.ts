import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { requestTournamentReducer, tournamentReducer } from './store/tournaments/tournament.reducer';
import { TournamentEffects } from './store/tournaments/tournament.effects';
import { provideHttpClient } from '@angular/common/http';
import { playerReducer } from './store/players/player.reducer';
import { PlayerEffects } from './store/players/player.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
      requestTournament: requestTournamentReducer,
      tournament: tournamentReducer,
      player: playerReducer
    }),
    provideEffects(TournamentEffects, PlayerEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
};
