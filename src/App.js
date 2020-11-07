import React, { Component } from 'react';
import './App.scss';
import LogIn from 'screens/LogIn';
import Root from 'screens/Root';
import Register from 'screens/Register';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import firebase from 'services/firebase';

class App extends Component {
    render() { 
        return (
            <div className="app">
                <Router>
                    <AnimatePresence>
                        <Route path={"/"}>
                        {firebase.auth().currentUser ? (
                            <Root />
                        ) : (
                            <>
                            <Register />
                            <Route path={"/login"} component={LogIn} />
                            </>
                        )}
                        </Route>
                    </AnimatePresence>
                </Router>
            </div>
        );
    }
}
 
export default App;