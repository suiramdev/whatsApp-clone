import React, { Component } from 'react';
import 'components/SideBar.scss';
//#region Icons
import { Alert } from '@material-ui/lab';
import { Avatar } from '@material-ui/core';
import { Add, ArrowBack, ExitToApp, Save, Face, Dialpad } from '@material-ui/icons';
//#endregion
import { Route, Link, Switch } from 'react-router-dom';
import firebase, { firestore } from 'services/firebase';
import Contact from "./Contact";

class SideBar extends Component {
    state = {}

    constructor(props) {
        super(props);

        this.newContactName = React.createRef();
        this.newContactID = React.createRef();
        this.searchBar = React.createRef();

        this.newContact = this.newContact.bind(this);
        this.searchContact = this.searchContact.bind(this);
        this.state = {
            contacts: []
        }
    }

    componentDidMount() {
        firestore.collection("users").doc(firebase.auth().currentUser.uid).collection("contacts").get()
            .then(function(querySnapshot) {
                let contacts = [];
                querySnapshot.forEach(function(doc) {
                    contacts.push(doc.data());
                });
                this.setState({
                    contacts: contacts
                });
            }.bind(this));
    }

    disconnect() {
        firebase.auth().signOut();
    }

    newContact(event) {
        event.preventDefault();

        const contactName = this.newContactName.current.value;
        const contactID = this.newContactID.current.value;

        firestore.collection("users").where("id", "==", parseInt(contactID)).get()
        .then(function(querySnapshot) {
            if (!querySnapshot.empty) {
                if (querySnapshot.docs[0].id === firebase.auth().currentUser.uid) {
                    this.setState({error: 'You can\'t add yourself as a contact dumbass', success: undefined});
                    return;
                }

                firestore.collection("users").doc(firebase.auth().currentUser.uid).collection("contacts").doc(contactID).set({
                    name: contactName,
                    user: querySnapshot.docs[0].ref
                });

                this.setState({success: 'Contact successfully added'});
            } else {
                this.setState({error: 'User not found, please verify the ID entered', success: undefined});
            }
        }.bind(this))
        .catch(function(reason) {
            this.setState({error: reason, success: undefined});
        }.bind(this));
    }

    searchContact() {
        document.querySelectorAll(".contact").forEach(element => {
            const name = element.querySelector(".contact__name").innerHTML;

            if (name.toLowerCase().includes(this.searchBar.current.value.toLowerCase())) {
                element.classList.remove("contact-hide");
            } else {
                element.classList.add("contact-hide");
            }
        })
    }

	render() {
		return (
			<div className="sidebar">
                <Switch>
                    <Route path="/new">
                        <div className="sidebar__header">
                            <Link to="/"><ArrowBack /></Link>
                            <p>New contact</p>
                            <div className="sidebar__header-options">
                                <button onClick={this.disconnect}><ExitToApp /></button>
                            </div>
                        </div>
                        <form className="sidebar__content" style={{padding: '0 2rem'}} onSubmit={this.newContact}>
                            <div className="sidebar__content-avatar">
                                <Avatar />
                            </div>
                            {this.state.error ? (<Alert severity="error">{this.state.error}</Alert>) : null}
                            {this.state.success ? (<Alert severity="success">{this.state.success}</Alert>) : null}
                            <div className="sidebar__content-input">
                                <Face />
                                <input ref={this.newContactName} type="text" placeholder="Contact name" required />
                            </div>
                            <div className="sidebar__content-input">
                                <Dialpad />
                                <input ref={this.newContactID} type="text" placeholder="XXXXXX" required />
                            </div>
                            <button className="sidebar__content-option" type="submit">
                                <Save />
                            </button>
                        </form>
                    </Route>
                    <Route path="/">
                        <div className="sidebar__header">
                            <Avatar />
                            <div className="sidebar__header-options">
                                <button onClick={this.disconnect}><ExitToApp /></button>
                            </div>
                        </div>
                        <div className="sidebar__search">
                            <div className="sidebar__search-entry">
                                <input onChange={this.searchContact} ref={this.searchBar} type="text" placeholder="Search a chat" />
                            </div>
                        </div>
                        <div className="sidebar__content">
                            {this.state.contacts.map(contact => <Contact name={contact.name} uid={contact.user.id} key={contact.user.id}/>)}
                            <Link className="sidebar__content-option" to="/new">
                                <Add />
                            </Link>
                        </div>
                    </Route>
                </Switch>
			</div>
		);
	}
}
 
export default SideBar;