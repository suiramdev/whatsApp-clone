import React, { Component } from 'react';
import './LogInForm.scss';

class LogInForm extends Component {
    render() {
        return (
            <div className="form">
                <div className="form__input">
                    <select>
                        <option>+33</option>
                    </select>
                    <input type="tel" placeholder="00000000"></input>
                </div>
            </div>
        );
    }
}

export default LogInForm;