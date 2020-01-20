export type PhraseType = {
    "theme": string,
    "sourceText": string,
    "translation": string
}

export type ExtPhraseType = PhraseType & {id: number, color: string};

export interface IPhrasesService {
    getList: () => Promise<PhraseType[]>
}

export default class PhrasesService implements IPhrasesService {
    getList() {
        return new Promise<PhraseType[]>((resolve) => {
            setTimeout(() => resolve(import('./Phrases.json')
                .then((module) => module.default)), 500)
        });
    }
}