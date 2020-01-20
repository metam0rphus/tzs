import t from '../action-types';
import { ExtPhraseType } from '../services/phrases-service';
import { AnyAction } from 'redux';

export type StateType = {
    phrases: Array<ExtPhraseType>,
    appLoading: boolean,
    appError: Array<Error>
};

export const initialState: StateType = {
    phrases: [],
    appLoading: true,
    appError: []
};

const reducer = (state: StateType = initialState, action: AnyAction) => {
    switch(action.type) {
        case t.SHOW_LOADING:
            return {
                ...state,
                appLoading: true,
            };
        case t.HIDE_LOADING:
            return {
                ...state,
                appLoading: false,
            };
        case t.REMOVE_PHRASE:
            const index = state.phrases.findIndex((phrase) => phrase.id === action.payload);

            return {
                ...state,
                phrases: [...state.phrases.slice(0, index), ...state.phrases.slice(index + 1)],
            };
        case t.PHRASES_LOADED:
            return {
                ...state,
                phrases: action.payload,
            };
        case t.FETCH_PHRASES_FAILURE:
            return {
                ...state,
                phrases: [],
                appError: [...state.appError, action.payload]
            };
        default:
            return state;
    }
};

export default reducer;