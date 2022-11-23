import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as AppState from '../../state/app.state';

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
    on(createAction('[User] Mask User Name'), state => ({
        ...state,
        maskUserName: !state.maskUserName
    }))
);