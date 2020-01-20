import React from 'react';
import PhrasesServiceContext from '../../contexts/phrases-service-context';

/**
 * Передает через контекст сервис работы с группами
 * @param mapMethodsToProps - мапер методов в свойства wrapped
 * @returns function
 */
const withPhrasesService = (mapMethodsToProps: (service: any) => {[key: string]: Function}) =>
    (Wrapped: React.ComponentClass): React.FC => {
    return (props) => {
        return (
            <PhrasesServiceContext.Consumer>
                {(service) => {
                    if(mapMethodsToProps) {
                        service = mapMethodsToProps(service);
                    }

                    return <Wrapped
                        {...props}
                        {...service}
                    />
                }}
            </PhrasesServiceContext.Consumer>
        );
    };
};

export default withPhrasesService;