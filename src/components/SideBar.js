import React, { Component } from 'react';
import './SideBar.scss';
import Contact from './Contact';
import { Avatar } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

class SideBar extends Component {
	state = {  }
	render() { 
		return (
			<div className="sidebar">
                <div className="sidebar__header">
                    <Avatar />
                    <div className="sidebar__header-options">
                        <a><DonutLargeIcon/></a>
                        <a><ChatIcon /></a>
                        <a><MoreVertIcon /></a>
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