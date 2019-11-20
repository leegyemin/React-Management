import React from 'react';

class ErrorBoundary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null
        }
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error,
            errorInfo
        });
    }

    render() {
        const {error, errorInfo} = this.state;
        if (errorInfo) {
            const errorDetails = (
                <details>
                    {error && error.toString()}
                </details>
            );
            return (
                <div>
                    <h2 className="error">An unexpected error has occurred.</h2>
                    {errorDetails}
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
