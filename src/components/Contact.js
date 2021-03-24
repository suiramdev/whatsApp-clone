import React, { Component } from 'react';
import 'components/Contact.scss';
import { Avatar } from '@material-ui/core';
import {useHistory} from "react-router";
import {firestore} from "services/firebase";

class Contact extends Component {
    constructor(props) {
        super(props);

        this.select = this.select.bind(this);

        this.state = {
            user: []
        }
    }

    componentDidMount() {
        firestore.collection("users").doc(this.props.uid).get()
            .then(function(document) {
                this.setState({
                    user: document.data()
                })
            }.bind(this));
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
                    <p className="contact__info">{this.state.user.id}</p>
                </div>
            </button>
        );
    }
}
 
export default (props) => <Contact {...props} history={useHistory()}/>;