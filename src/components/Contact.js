import React, { Component } from 'react';
import 'components/Contact.scss';
import { Avatar } from '@material-ui/core';
import {useHistory} from "react-router";

class Contact extends Component {
    constructor(props) {
        super(props);

        this.select = this.select.bind(this);
    }

    select() {
        this.props.history.push(`/contacts/${this.props.uid}`);
    }

    render() {
        return (
            <button className="contact" onClick={this.select}>
                <Avatar/>
                <div style={{marginLeft: 0.5+"rem"}}>
                    <h1 className="contact__name">{this.props.name || "New contact"}</h1>
                    <p className="contact__description">The last message sent goes here</p>
                </div>
                <p className="contact__time">12:00:50</p>
            </button>
        );
    }
}
 
export default (props) => <Contact {...props} history={useHistory()}/>;