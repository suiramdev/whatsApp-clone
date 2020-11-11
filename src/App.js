import React, { Component } from 'react';
import './App.scss';
import Register from 'screens/Register';
import LogIn from 'screens/LogIn';
import Root from 'screens/Root';
import NewContact from 'screens/root/NewContact';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import firebase from 'services/firebase';

class App extends Component {
    state = {
        user: null
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(function(user) {
            this.setState({user: user});
        }.bind(this));
    }

    render() { 
        return (
            <div className="app">
                <Router>
                    <AnimatePresence>
                        <Route path="/">
                        {this.state.user ? (
                            <>
                            <Root />
                            <Route path="/new" component={NewContact} />
                            </>
                        ) : (
                            <>
                            <Register />
                            <Route path="/login" component={LogIn} />
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