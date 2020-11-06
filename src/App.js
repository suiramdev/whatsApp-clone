import React, { Component } from 'react';
import './App.scss';
import LogIn from 'screens/LogIn';
import Root from 'screens/Root';
import Register from 'screens/Register';
import { BrowserRouter as Router } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const isLogged = false;
class App extends Component {
    render() { 
        return (
            <div className="app">
                <Router>
                    <AnimatePresence>
                        {isLogged ? (
                            <Root path={"/"} />
                        ) : (
                            <>
                            <Register path={"/"} />
                            <LogIn path={"/login"} />
                            </>
                        )}
                    </AnimatePresence>
                </Router>
            </div>
        );
    }
}
 
export default App;