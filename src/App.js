import React, { Component } from 'react';
import './App.scss';
import LogIn from 'screens/LogIn';
import Logged from 'screens/Logged';

const isLogged = false;
class App extends Component {
    render() { 
        return (
            <div className="app">
                {isLogged ? <Logged /> : <LogIn />}
            </div>
        );
    }
}
 
export default App;