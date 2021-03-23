import React, { Component } from 'react';
import './Main.scss';
import SideBar from 'components/SideBar';
import Conversation from 'components/Conversation';
import {Route} from "react-router";

class Main extends Component {
    render() {
        return (
            <div className="main">
                <SideBar />
                <div className="main__content">
                    <Route path="/contacts/:uid" component={Conversation} />
                </div>
            </div>
        );
    }
}

export default Main;