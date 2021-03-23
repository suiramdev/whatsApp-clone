import React, { Component } from 'react';
import './Root.scss';
import SideBar from 'components/SideBar';
import Conversation from 'components/Conversation';
import {Route} from "react-router";

class Root extends Component {
    render() {
        return (
            <div className="root">
                <SideBar />
                <Route path="/contacts/:uid" component={Conversation} />
            </div>
        );
    }
}

export default Root;