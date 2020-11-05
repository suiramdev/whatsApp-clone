import React, { Component } from 'react';
import SideBar from 'components/SideBar';
import Main from 'components/Main';

class Logged extends Component {
    render() {
        return (
            <>
                <SideBar />
                <Main />
            </>
        );
    }
}

export default Logged;