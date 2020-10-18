import React, { Component } from 'react';
import './App.scss';
import SideBar from './SideBar';
import Main from './Main';

class App extends Component {
    state = {  }
    render() { 
        return (
            <div className="app">
                <SideBar />
                <Main />
            </div>
        );
    }
}
 
export default App;