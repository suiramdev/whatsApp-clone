import React, { Component } from 'react';
import './LogIn.scss';
import { Alert } from '@material-ui/lab';
import { ArrowBack, AlternateEmail, Lock, WhatsApp } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import firebase from 'services/firebase';

class LogIn extends Component {
    state = {}

    constructor(props) {
        super(props);
        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        const emailInput = this.emailInput.current;
        const passwordInput = this.passwordInput.current;

        firebase.auth().signInWithEmailAndPassword(emailInput.value, passwordInput.value)
        .catch(function(error) {
            this.setState({error: error.message});
        }.bind(this));
    }

    render() {
        return (
            <motion.div className="login" initial={{x: -100+"vw"}} animate={{x: 0, transition: {duration: 1}}}>
                <Link className="login__return" to="/"><ArrowBack /></Link>
                <form className="login__form" onSubmit={this.handleSubmit}>
                    <WhatsApp className="login__form-logo"/>
                    {this.state.error ? (<Alert severity="error">{this.state.error}</Alert>) : null}
                    <div className="login__form-input">
                        <AlternateEmail />
                        <input ref={this.emailInput} type="text" placeholder="Email" required></input>
                    </div>
                    <div className="login__form-input">
                        <Lock />
                        <input ref={this.passwordInput} type="password" placeholder="Password" required></input>
                    </div>
                    <a className="login__form-more" href="#">Forgot password ?</a>
                    <input className="login__form-submit" type="submit" value="SIGN IN" />
                </form>
            </motion.div>
        );
    }
}

export default LogIn;