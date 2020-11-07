import React, { Component } from 'react';
import './LogIn.scss';
import { ArrowBack, AlternateEmail, Lock, WhatsApp } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import firebase from 'services/firebase';

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();
    }

    submit() {
        firebase.auth().signInWithEmailAndPassword(this.emailInput.current.value, this.passwordInput.current.value).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...

            console.log(error.code + " : " + error.message);
        });
    }

    render() {
        return (
            <motion.div className="login" initial={{x: -100+"vw"}} animate={{x: 0, transition: {duration: 1}}}>
                <Link className="login__return" to="/"><ArrowBack /></Link>
                <div className="login__form">
                    <WhatsApp className="login__form-logo"/>
                    <div className="login__form-input">
                        <AlternateEmail />
                        <input ref={this.emailInput} type="text" placeholder="Email" required></input>
                    </div>
                    <div className="login__form-input">
                        <Lock />
                        <input ref={this.passwordInput} type="password" placeholder="Password" required></input>
                    </div>
                    <a className="login__form-more" href="#">Forgot password ?</a>
                    <button className="login__form-submit" onClick={this.submit}>SIGN IN</button>
                </div>
            </motion.div>
        );
    }
}

export default LogIn;