import React, { Component } from 'react';
import 'components/Main.scss';
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
                    <div className="main__chat-message">
                        <Avatar />
                        <div className="main__chat-messageContent">
                            <p>Lorem ipsum dolor sit amet, consectetur.</p>
                        </div>
                        <p className="main__chat-messageTime">12:08:09</p>
                    </div>
                    <div className="main__chat-message me">
                        <Avatar />
                        <div className="main__chat-messageContent">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quis ullamcorper ipsum. Praesent id dapibus est. Morbi velit ipsum, semper sed libero venenatis, imperdiet bibendum ipsum. Fusce pulvinar mauris turpis, non faucibus ipsum luctus in. Praesent varius maximus enim. Sed auctor lectus ac quam dapibus, eu tincidunt odio iaculis. Cras congue malesuada neque in iaculis. Etiam varius efficitur sollicitudin. Nullam sagittis diam ipsum, sed ornare nunc tincidunt porta. Donec aliquet ex non tincidunt pharetra.</p>
                        </div>
                        <p className="main__chat-messageTime">12:08:09</p>
                    </div>
                    <div className="main__chat-message">
                        <Avatar />
                        <div className="main__chat-messageContent">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quis ullamcorper ipsum. Praesent id dapibus est. Morbi velit ipsum, semper sed libero venenatis, imperdiet bibendum ipsum. Fusce pulvinar mauris turpis, non faucibus ipsum luctus in. Praesent varius maximus enim. Sed auctor lectus ac quam dapibus, eu tincidunt odio iaculis. Cras congue malesuada neque in iaculis. Etiam varius efficitur sollicitudin. Nullam sagittis diam ipsum, sed ornare nunc tincidunt porta. Donec aliquet ex non tincidunt pharetra.</p>
                        </div>
                        <p className="main__chat-messageTime">12:08:09</p>
                    </div>
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