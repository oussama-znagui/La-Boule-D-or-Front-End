import { createAction, props } from '@ngrx/store';
import { User } from '../../../models/user';


export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string; role: string; user: User | null }>()
);

export const logout = createAction('[Auth] Logout');