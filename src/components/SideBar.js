import React, { Component } from 'react';
import 'components/SideBar.scss';
import Contact from 'components/Contact';
import { Avatar } from '@material-ui/core';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import { ExitToApp } from '@material-ui/icons';
import firebase from 'services/firebase';

class SideBar extends Component {    
    disconnect() {
        firebase.auth().signOut();
    }

	render() { 
		return (
			<div className="sidebar">
                <div className="sidebar__header">
                    <Avatar />
                    <div className="sidebar__header-options">
                        <a onClick={this.disconnect}><ExitToApp /></a>
                    </div>
                </div>
                <div className="sidebar__search">
                    <div className="sidebar__search-entry">
                        <input type="text" placeholder="Search a chat"></input>
                        <button><SearchRoundedIcon /></button>
                    </div>
                </div>
                <div className="sidebar__chats">
                    <Contact />
                </div>
			</div>
		);
	}
}
 
export default SideBar;