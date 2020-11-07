import React, { Component } from 'react';
import './Register.scss';
import { Alert } from '@material-ui/lab';
import { AlternateEmail, Lock, WhatsApp, ErrorOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import firebase from 'services/firebase';

class Register extends Component {
    state = {}

    constructor(props) {
        super(props);
        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();
        this.confirmPasswordInput = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event) {
        event.preventDefault();

        const emailInput = this.emailInput.current;
        const passwordInput = this.passwordInput.current;
        const confirmPasswordInput = this.confirmPasswordInput.current;
        
        if (passwordInput.value != confirmPasswordInput.value) { 
            this.setState({error: "The passwords mismatch"})
            return;
        } // Confirm password incorrect
        
        firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(function() {
            this.setState({success: 'You have signed up successfully'});

            emailInput.value = '';
            passwordInput.value = '';
            confirmPasswordInput.value = '';
        })
        .catch(function(error) {
            this.setState({error: error.message});
        });
    }

    render() {
        return (
            <div className="register">
                <form className="register__form" onSubmit={this.handleSubmit}>
                    <WhatsApp className="register__form-logo"/>
                    {this.state.error ? (<Alert severity="error">{this.state.error}</Alert>) : null}
                    {this.state.success ? (<Alert severity="success">{this.state.success}</Alert>) : null}
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
                    <div id="recaptcha-container"></div>
                    <input className="register__form-submit" type="submit" value="SIGN UP" />
                    <Link className="register__form-more" to="/LogIn">I already have an account</Link>
                </form>
            </div>
        );
    }
}

export default Register;