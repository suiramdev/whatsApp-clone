import React, { Component } from 'react';
import './Register.scss';
import { Alert } from '@material-ui/lab';
import { AlternateEmail, Lock, WhatsApp, Face } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import firebase, { firestore } from 'services/firebase';

class Register extends Component {
    state = {}

    constructor(props) {
        super(props);
        this.usernameInput = React.createRef();
        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();
        this.confirmPasswordInput = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.generateID = this.generateID.bind(this);
    }
    
    generateID() {
        let id = Math.floor(100000 + Math.random() * 900000);
        if (firestore.collection('users').where('id', '==', id)) {
            this.generateID();
        }

        return id;
    }
    
    handleSubmit(event) {
        event.preventDefault();

        const usernameInput = this.usernameInput.current;
        const emailInput = this.emailInput.current;
        const passwordInput = this.passwordInput.current;
        const confirmPasswordInput = this.confirmPasswordInput.current;
        
        if (passwordInput.value != confirmPasswordInput.value) { 
            this.setState({error: 'The passwords mismatch'})
            return;
        } // Confirm password incorrect
        
        firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(function() {
            this.setState({success: 'You have signed up successfully'});
            
            firestore.collection('users').doc(firebase.auth().currentUser.uid).set({
                username: usernameInput.value,
                id: this.generateID(),
                email: emailInput.value,
                contacts: {}
            });
        }.bind(this))
        .catch(function(error) {
            this.setState({error: error.message});
        }.bind(this));
    }

    render() {
        return (
            <div className="register">
                <form className="register__form" onSubmit={this.handleSubmit}>
                    <WhatsApp className="register__form-logo"/>
                    {this.state.error ? (<Alert severity="error">{this.state.error}</Alert>) : null}
                    {this.state.success ? (<Alert severity="success">{this.state.success}</Alert>) : null}
                    <div className="register__form-input">
                        <Face />
                        <input ref={this.usernameInput} type="text" placeholder="Username" required></input>
                    </div>
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