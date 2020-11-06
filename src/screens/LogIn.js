import React, { Component } from 'react';
import './LogIn.scss';
import { ArrowBack, Face, Lock, WhatsApp } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

class LogIn extends Component {
    render() {
        return (
            <motion.div className="login" initial={{x: -100+"vw"}} animate={{x: 0, transition: {duration: 1}}} exit={{x: -100+"vw"}}>
                <Link className="login__return" to="/"><ArrowBack /></Link>
                <div className="login__form">
                    <WhatsApp className="login__form-logo"/>
                    <div className="login__form-input">
                        <Face />
                        <input type="text" placeholder="Phone or email" required></input>
                    </div>
                    <div className="login__form-input">
                        <Lock />
                        <input type="password" placeholder="Password" required></input>
                    </div>
                    <a className="login__form-more" href="#">Forgot password ?</a>
                    <button className="login__form-submit">SIGN IN</button>
                </div>
            </motion.div>
        );
    }
}

export default LogIn;