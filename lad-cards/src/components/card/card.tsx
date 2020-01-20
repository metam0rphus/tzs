import React, { memo, useState } from 'react';
import { ExtPhraseType } from '../../services/phrases-service';

type CardProps = {
    phrase: ExtPhraseType,
    removePhrase?: (id: number) => void
};

const Card: React.FC<CardProps> = memo(({ phrase, removePhrase }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [timerId, setTimerId] = useState<number>(0);

    const onClickHandler = () => {
        if(isOpen) {
            setIsOpen(false);

            if(timerId) {
                window.clearTimeout(timerId);

                setTimerId(0);
            }
        } else {
            setIsOpen(true);

            setTimerId(window.setTimeout(() => setIsOpen(false), 2000));
        }
    };

    const onDoubleClickHandler = () => removePhrase && removePhrase(phrase.id);

    return (<div className='phrases-block__item phrase'
                 style={{backgroundColor: phrase.color}}
                 onClick={onClickHandler}
                 onDoubleClick={onDoubleClickHandler}
    >
        <div className='phrase__header'>{phrase.theme}</div>
        <div className='phrase__content'>{isOpen ? phrase.translation : phrase.sourceText}</div>
    </div>);
});

export default Card;