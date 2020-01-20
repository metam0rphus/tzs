import t from '../action-types';
import { IPhrasesService } from "../services/phrases-service";
import { PhraseType } from '../services/phrases-service';
import { AnyAction, ActionCreator, Dispatch } from 'redux';
import { StateType } from '../reducers';
import { getRandomItems, getRandomColor } from '../utils';

export const showLoading: ActionCreator<AnyAction> = () => {
    return {
        type: t.SHOW_LOADING
    };
};

export const hideLoading: ActionCreator<AnyAction> = () => {
    return {
        type: t.HIDE_LOADING
    };
};

export const phrasesLoaded: ActionCreator<AnyAction> = (phrases: StateType["phrases"]) => {
    return {
        type: t.PHRASES_LOADED,
        payload: phrases
    };
};

export const phrasesError: ActionCreator<AnyAction> = (error: Error) => {
    return {
        type: t.FETCH_PHRASES_FAILURE,
        payload: error
    };
};

export const removePhrase: ActionCreator<AnyAction> = (id: number) => {
    return {
        type: t.REMOVE_PHRASE,
        payload: id
    };
};

export const fetchPhrases = (getPhrases: IPhrasesService["getList"]) =>
    () => (dispatch: Dispatch<AnyAction>) => new Promise((resolve) =>
{
    getPhrases()
        .then((srcPhrases: PhraseType[]) => {
            let cardId: number = 0;
            const phrases: StateType["phrases"] = getRandomItems(srcPhrases)
                .map((item) => ({
                    ...item,
                    id: cardId++,
                    color: getRandomColor()
                }));

            dispatch(phrasesLoaded(phrases));
            resolve();
        })
        .catch((error: Error) => {
            dispatch(phrasesError(error));
            resolve();
        });
});