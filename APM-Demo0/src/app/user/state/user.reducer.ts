import { createAction, createReducer, on } from "@ngrx/store";

export const usersReducer = createReducer({
    maskUserName: true
},
    on(createAction('[User] Mask User Name'), state => ({
        ...state,
        maskUserName: !state.maskUserName
    }))
);