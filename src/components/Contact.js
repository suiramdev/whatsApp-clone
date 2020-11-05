import React, { Component } from 'react';
import 'components/Contact.scss';
import { Avatar } from '@material-ui/core';

class Contact extends Component {
    state = {  }
    render() { 
        return (
            <a className="contact">
                <Avatar/>
                <div style={{marginLeft: 0.5+"rem"}}>
                    <h1 className="contact__name">Contact name</h1>
                    <p className="contact__description">The last message sent goes here</p>
                </div>
                <p className="contact__time">12:00:50</p>
            </a>
        );
    }
}
 
export default Contact;