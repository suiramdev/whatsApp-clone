import React, { Component } from 'react';
import './Register.scss';
import { AlternateEmail, Lock, Phone, WhatsApp } from '@material-ui/icons';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { firebase } from 'services/firebase';

class Register extends Component {
    render() {
        return (
            <div className="register">
                <div className="register__form">
                    <WhatsApp className="register__form-logo"/>
                    <div className="register__form-input">
                        <AlternateEmail />
                        <input type="text" placeholder="Email" required></input>
                    </div>
                    <div className="register__form-input">
                        <Phone />
                        <input type="tel" placeholder="Phone number" required></input>
                    </div>
                    <div className="register__form-input">
                        <Lock />
                        <input type="password" placeholder="Password" required></input>
                    </div>
                    <Link className="register__form-more" to="/LogIn">I already have an account</Link>
                    <button className="register__form-submit">SIGN UP</button>
                </div>
            </div>
        );
    }
}

export default Register;