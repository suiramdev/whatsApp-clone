import React, { Component } from 'react';
import Contact from 'components/Contact';

class ContactList extends Component {
    render() {
        return (
            <>
            {this.props.contacts.map(<Contact />)}
            </>
        );
    }
}

export default ContactList;