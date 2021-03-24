import React, { Component } from 'react';
import 'components/Conversation.scss';
import { Avatar } from '@material-ui/core';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import SentimentVerySatisfiedRoundedIcon from '@material-ui/icons/SentimentVerySatisfiedRounded';
import firebase, {firestore} from "../services/firebase";
import {useHistory} from "react-router";
import {ArrowBack} from "@material-ui/icons";
import {getConversationByUsers, sendMessage} from "../services/api";

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

        this.sendMessageHandler = this.sendMessageHandler.bind(this);
        this.messageHandler = this.messageHandler.bind(this);
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
                    this.setState({contact: contact.data()});
                } else {
                    this.props.history.goBack();
                }
            }.bind(this));

        // Set the message handler
        getConversationByUsers([firebase.auth().currentUser.uid, this.props.match.params.uid])
            .onSnapshot((querySnapshot) => this.messageHandler(querySnapshot));
    }

    async messageHandler(querySnapshot) {
        let document = querySnapshot.docs[0];
        if (!document) {
            document = await firestore.collection("conversations").doc();
            document.set({
                messages: [],
                participants: [
                    firebase.auth().currentUser.uid,
                    this.props.match.params.uid
                ]
            });
        }

        this.setState({
            conversationId: document.id,
            conversation: document.data()
        });

        if (this.chatBox.current) {
            this.chatBox.current.scrollTo(0, this.chatBox.current.scrollHeight);
        }
    }

    sendMessageHandler(event) {
        event.preventDefault();

        const messageContent = this.message.current.value;
        if (messageContent === "") return;

        sendMessage(this.state.conversationId, firebase.auth().currentUser.uid, messageContent, Date.now());
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
                <form className="conversation__footer" onSubmit={this.sendMessageHandler}>
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