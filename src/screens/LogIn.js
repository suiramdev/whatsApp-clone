import React, { Component } from 'react';
import './LogIn.scss';
import LogInForm from 'components/LogInForm';

class LogIn extends Component {
    render() {
        return (
            <div className="main">
                <LogInForm />
            </div>
        );
    }
}

export default LogIn;