import React, { Component } from 'react';
import './Register.scss';
import { AlternateEmail, Lock, Phone, WhatsApp } from '@material-ui/icons';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import firebase from 'services/firebase';

class Register extends Component {
    constructor(props) {
        super(props);
        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();
        this.confirmPasswordInput = React.createRef();
    }

    componentDidMount() {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'callback': (response) => {
                window.captchaVerified = true;
            },
            'expired-callback': () => {
                window.captchaVerified = false;
            }
        });
        window.recaptchaVerifier.render();
    }
    
    submit() {
        if (!window.captchaVerified) { return; }
        const emailInput = this.emailInput.current;
        const passwordInput = this.passwordInput.current;
        const confirmPasswordInput = this.confirmPasswordInput.current;
        if (passwordInput.value != confirmPasswordInput.value) { return; }
        
        firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput.value).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...

            console.log(error.code + " : " + error.message);
        });
    }

    render() {
        return (
            <div className="register">
                <form className="register__form">
                    <WhatsApp className="register__form-logo"/>
                    <div className="register__form-input">
                        <AlternateEmail />
                        <input ref={this.emailInput} type="email" placeholder="Email" required></input>
                    </div>
                    <div className="register__form-input">
                        <Lock />
                        <input ref={this.passwordInput} type="password" placeholder="Password" required></input>
                    </div>
                    <div className="register__form-input">
                        <Lock />
                        <input ref={this.confirmPasswordInput} type="password" placeholder="Confirm password" required></input>
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