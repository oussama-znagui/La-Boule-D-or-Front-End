import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthService } from "../../../services/auth.service";
import { AuthState } from "./auth.reducer";

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => !!state.token
);

export const selectUserRole = createSelector(
  selectAuthState,
  (state) => state.role
);

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);