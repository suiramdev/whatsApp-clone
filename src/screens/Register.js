import React, { Component } from 'react';
import './Register.scss';
import { AlternateEmail, Lock, Phone, WhatsApp } from '@material-ui/icons';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import firebase from 'services/firebase';

import ReactFlagsSelect from 'react-flags-select';
//import css module
import 'react-flags-select/css/react-flags-select.css';
//OR import sass module
import 'react-flags-select/scss/react-flags-select.scss';

class Register extends Component {
    componentDidMount() {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        window.recaptchaVerifier.render();
    }
    
    submit() {
        var phoneNumber = "+33609663375";
        firebase.auth().signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)
        .then(function (confirmationResult) {
            console.log(confirmationResult);
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="register">
                <form className="register__form">
                    <WhatsApp className="register__form-logo"/>
                    <div className="register__form-input">
                        <AlternateEmail />
                        <input type="email" placeholder="Email" required></input>
                    </div>
                    <div className="register__form-input">
                        <Phone />
                        <ReactFlagsSelect
                        defaultCountry="FR" 
                        countries={["US", "GB", "FR","DE","IT"]}
                        customLabels={{"US": "EN-US","GB": "EN-GB","FR": "FR","DE": "DE","IT": "IT"}} />
                    </div>
                    <div className="register__form-input">
                        <Lock />
                        <input type="password" placeholder="Password" required></input>
                    </div>
                    <Link className="register__form-more" to="/LogIn">I already have an account</Link>
                    <div id="recaptcha-container" style={{marginTop: 2+"rem"}}></div>
                    <button className="register__form-submit" onClick={this.submit}>SIGN UP</button>
                </form>
            </div>
        );
    }
}

export default Register;