import React, { Component } from 'react';
import './Main.scss';
import { Avatar } from '@material-ui/core';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import SentimentVerySatisfiedRoundedIcon from '@material-ui/icons/SentimentVerySatisfiedRounded';

class Main extends Component {
    state = {  }
    render() { 
        return (
            <div className="main">
                <div className="main__header">
                    <Avatar />
                    <h1 className="main__header-title">Contact name</h1>
                </div>
                <div className="main__chat">
                    
                </div>
                <div className="main__footer">
                    <div className="main__footer-entry">
                        <input type="text" placeholder="Type your message"></input>
                        <button><SentimentVerySatisfiedRoundedIcon /></button>
                    </div>
                    <button><SendRoundedIcon /></button>
                </div>
            </div>
        );
    }
}
 
export default Main;