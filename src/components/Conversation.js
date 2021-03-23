import React, { Component } from 'react';
import 'components/Conversation.scss';
import { Avatar } from '@material-ui/core';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import SentimentVerySatisfiedRoundedIcon from '@material-ui/icons/SentimentVerySatisfiedRounded';
import firebase, {firestore} from "../services/firebase";
import {useHistory} from "react-router";

class Conversation extends Component {
    constructor(props) {
        super(props);

        this.message = React.createRef();

        this.state = {
            contact: [],
            conversationId: "",
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
                this.setState({conversation: querySnapshot.docs[0].data()});
            }.bind(this));
    }

    sendMessage() {
        firestore.collection("conversations").doc(this.state.conversationId).set({
            messages: [
                {
                    content: this.message.current.value,
                    from: firebase.auth().currentUser.uid
                }
            ]
        }, {merge: true});
    }

    render() {
        return (
            <div className="main">
                <div className="main__header">
                    <Avatar />
                    <h1 className="main__header-title">{this.state.contact.name || "New contact"}</h1>
                </div>
                <div className="main__chat">
                    {this.state.conversation.messages && this.state.conversation.messages.map(message => (
                        <div key={message} className={`main__chat-message ${message.from == firebase.auth().currentUser.uid ? "me" : ""}`}>
                            <Avatar />
                            <div className="main__chat-messageContent">
                                <p>{message.content}</p>
                            </div>
                            <p className="main__chat-messageTime">12:08:09</p>
                        </div>
                    ))}
                </div>
                <div className="main__footer">
                    <div className="main__footer-entry">
                        <input ref={this.message} type="text" placeholder="Type your message" />
                        <button><SentimentVerySatisfiedRoundedIcon /></button>
                    </div>
                    <button onClick={this.sendMessage}><SendRoundedIcon /></button>
                </div>
            </div>
        );
    }
}
 
export default (props) => <Conversation {...props} history={useHistory()} />;