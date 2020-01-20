import { StateType } from "../reducers";
import { ExtPhraseType } from '../services/phrases-service';

export const sortBySourceTextLength = (a: ExtPhraseType, b: ExtPhraseType): number => {
    if(a.sourceText.length < b.sourceText.length) return 1;

    return -1;
};

export const getPhrasesColumnsData = (phrases: StateType["phrases"], colCount: number): {
    [key: number]: StateType["phrases"]
} => {
    const phrasesColumns: {
        [key: number]: StateType["phrases"]
    } = {};

    for(let i = 0; i < colCount; i++) phrasesColumns[i] = [];

    if(phrases.length <= 3) {
        phrasesColumns[0] = phrases;
        return phrasesColumns;
    }

    phrasesColumns[0] = phrases.splice(0, 3);

    let i = 1;
    phrases.forEach(phrase => {
        if(i % colCount === 0 && phrasesColumns[0].length === 5) i++;

        phrasesColumns[i % colCount].push(phrase);
        i++;
    });

    for(let i = 0; i < colCount; i++) phrasesColumns[i] = phrasesColumns[i].sort(sortBySourceTextLength);

    return phrasesColumns;
};