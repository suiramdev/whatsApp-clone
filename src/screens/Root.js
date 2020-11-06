import React, { Component } from 'react';
import './Root.scss';
import SideBar from 'components/SideBar';
import Main from 'components/Main';

class Logged extends Component {
    render() {
        return (
            <div class="root">
                <SideBar />
                <Main />
            </div>
        );
    }
}

export default Logged;