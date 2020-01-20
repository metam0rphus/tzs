import React, {Component} from 'react';
import ErrorIndicator from '../error-indicator';

type ErrorBoundaryState = {
    isError: boolean
}

export default class ErrorBoundary extends Component<{}, ErrorBoundaryState> {
    state = {
        isError: false
    };

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error(error, errorInfo);
        this.setState({isError: true});
    }

    render() {
        if(this.state.isError) {
            return <ErrorIndicator />;
        }

        return this.props.children;
    }
}