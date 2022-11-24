import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as AppState from '../../state/app.state';
import * as UserActions from '../state/user.actions';

export interface UserState {
    maskUserName: boolean;
}

export interface State extends AppState.State {
    users: UserState;
}

const userFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
    userFeatureState,
    state => state.maskUserName);

export const usersReducer = createReducer<UserState>({
    maskUserName: true
},
    on(UserActions.toggleMaskUserName, state => ({
        ...state,
        maskUserName: !state.maskUserName
    }))
);