import { createReducer, on } from "@ngrx/store";
import { User } from "../../../models/user";
import { loginSuccess, logout } from "./auth.action";


export interface AuthState {
    token: string | null;
    role: string | null;
    user: User | null;
}

const initialState: AuthState = {
    token: null,
    role: null,
    user: null
  };



  export const authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, { token, role, user }) => ({
      ...state,
      token,
      role,
      user
    })),
    on(logout, () => initialState)
  );