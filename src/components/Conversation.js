import React, { Component } from 'react';
import 'components/Conversation.scss';
import { Avatar } from '@material-ui/core';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import SentimentVerySatisfiedRoundedIcon from '@material-ui/icons/SentimentVerySatisfiedRounded';
import firebase, {firestore} from "../services/firebase";
import {useHistory} from "react-router";
import {ArrowBack} from "@material-ui/icons";

class Conversation extends Component {
    constructor(props) {
        super(props);

        this.message = React.createRef();
        this.chatBox = React.createRef();

        this.state = {
            contact: [],
            conversationId: undefined,
            conversation: []
        }

        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount() {
        // Get contact
        firestore.collection("users").doc(firebase.auth().currentUser.uid).collection("contacts").get()
            .then(function(querySnapshot) {
                let contact;
                querySnapshot.forEach(doc => {
                    if (doc.data().user.id == this.props.match.params.uid) contact = doc;
                })

                if (contact) {
                    this.setState({contact: contact});
                } else {
                    this.props.history.goBack();
                }
            }.bind(this));

        // Get conversation and retrieve changes
        firestore.collection("conversations")
            .where("participants", "array-contains-any", [firebase.auth().currentUser.uid, this.props.match.params.uid])
            .onSnapshot(function(querySnapshot) {
                this.setState({
                    conversationId: querySnapshot.docs[0].id,
                    conversation: querySnapshot.docs[0].data()
                });
                this.chatBox.current.scrollTo(0, this.chatBox.current.scrollHeight);
            }.bind(this));
    }

    sendMessage(event) {
        event.preventDefault();

        if (this.message.current.value === "") return;

        this.state.conversation.messages.push({
            content: this.message.current.value,
            from: firebase.auth().currentUser.uid,
            date: Date.now()
        });
        firestore.collection("conversations").doc(this.state.conversationId).set(this.state.conversation);
    }

    render() {
        return (
            <div className="conversation">
                <div className="conversation__header">
                    <Avatar />
                    <h1 className="conversation__header-title">{this.state.contact.name || "New contact"}</h1>
                    <button className="conversation__header-back" onClick={() => this.props.history.goBack()}><ArrowBack /></button>
                </div>
                <div ref={this.chatBox} className="conversation__chat">
                    {this.state.conversation.messages && this.state.conversation.messages.map(message => (
                        <div className={`conversation__chat-message ${message.from == firebase.auth().currentUser.uid ? "me" : ""}`}>
                            <Avatar />
                            <div className="conversation__chat-messageContent">
                                <p>{message.content}</p>
                                <div className="conversation__chat-messageFooter">
                                    <span className="conversation__chat-messageTime">{new Date(message.date).toLocaleTimeString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <form className="conversation__footer" onSubmit={this.sendMessage}>
                    <div className="conversation__footer-entry">
                        <input ref={this.message} type="text" placeholder="Type your message" />
                    </div>
                    <button type="submit"><SendRoundedIcon /></button>
                </form>
            </div>
        );
    }
}
 
export default (props) => <Conversation {...props} history={useHistory()} />;