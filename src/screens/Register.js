import React, { Component } from 'react';
import './Register.scss';
import { AlternateEmail, Lock, WhatsApp } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import firebase from 'services/firebase';

class Register extends Component {
    constructor(props) {
        super(props);
        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();
        this.confirmPasswordInput = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
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
    
    handleSubmit(event) {
        event.preventDefault();

        if (!window.captchaVerified) { return; } // Captha non verified
        const emailInput = this.emailInput.current;
        const passwordInput = this.passwordInput.current;
        const confirmPasswordInput = this.confirmPasswordInput.current;
        if (passwordInput.value != confirmPasswordInput.value) { return; } // Confirm password incorrect
        
        firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(function() {
            emailInput.value = "";
            passwordInput.value = "";
            confirmPasswordInput.value = "";
        })
        .catch(function(error) {
            console.log(error.code + " : " + error.message); // Could not login
        });
    }

    render() {
        return (
            <div className="register">
                <form className="register__form" onSubmit={this.handleSubmit}>
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
                    <input className="register__form-submit" type="submit" value="SIGN UP" />
                </form>
            </div>
        );
    }
}

export default Register;