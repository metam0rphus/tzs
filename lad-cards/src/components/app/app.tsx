import React, { memo, useEffect } from 'react';
import { compose } from '../../utils';
import { connect } from 'react-redux';
import withPhrasesService from '../hoc/with-phrases-service';
import * as actions from '../../actions';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { StateType } from '../../reducers';
import { IPhrasesService } from '../../services/phrases-service';
import { getPhrasesColumnsData } from '../../helpers/phrases-helper';
import Card from '../card';
import LoadingIndicator from '../loading-indicator';
import ErrorIndicator from '../error-indicator';

type AppProps = StateType & {
    fetchPhrases: () => Promise<void>,
    showLoading: () => void,
    hideLoading: () => void,
    removePhrase: (id: number) => void
};

const App: React.FC<AppProps> = memo(({
    phrases,
    appLoading,
    appError,
    fetchPhrases,
    showLoading,
    hideLoading,
    removePhrase
}) => {
    useEffect(() => {
        showLoading();

        fetchPhrases().then(() => {
            hideLoading();
        });
    }, []);

    if(appLoading) return <LoadingIndicator />;

    if(appError.length) return <ErrorIndicator />;

    const phrasesColumns = getPhrasesColumnsData([...phrases], 3);

    return (
        <div className='phrases-block'>
            <div className='phrases-block__column'>
                {phrasesColumns[0].map((phrase) => (<Card
                    key={phrase.id}
                    phrase={phrase}
                    removePhrase={removePhrase}
                />))}
            </div>
            <div className='phrases-block__column'>
                {phrasesColumns[1].map((phrase) => (<Card
                    key={phrase.id}
                    phrase={phrase}
                    removePhrase={removePhrase}
                />))}
            </div>
            <div className='phrases-block__column'>
                {phrasesColumns[2].map((phrase) => (<Card
                    key={phrase.id}
                    phrase={phrase}
                    removePhrase={removePhrase}
                />))}
            </div>
        </div>
    );
});

const mapStateToProps = ({ phrases, appLoading, appError }: StateType) => {
    return {phrases, appLoading, appError};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<StateType, void, AnyAction>,
                            { getPhrases }: { getPhrases: IPhrasesService["getList"] }) =>
{
    return {
        fetchPhrases: () => dispatch(actions.fetchPhrases(getPhrases)()),
        showLoading: () => dispatch(actions.showLoading()),
        hideLoading: () => dispatch(actions.hideLoading()),
        removePhrase: (id: number) => dispatch(actions.removePhrase(id))
    }
};

export default compose(
    withPhrasesService((service: IPhrasesService) => {
        return {
            getPhrases: service.getList,
        };
    }),
    connect(mapStateToProps, mapDispatchToProps)
)(App);