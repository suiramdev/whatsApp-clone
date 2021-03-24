import {firestore} from 'services/firebase';
import * as path from "path";

export function getUser(uid) {
    return firestore.collection("users").doc(uid);
}

export function getConversationByUsers(participants) {
    let document = firestore.collection("conversations")
        .where("participants", "array-contains-any", participants);

    document.get().then(doc => {
        if (!doc.docs[0]) {
            document = firestore.collection("conversations").doc();
            document.set({
                messages: [],
                participants: participants
            });
        }
    });

    return document;
}

export function getConversationByUID(conversationUID) {
    return firestore.collection("conversations").doc(conversationUID);
}

export async function addContact(senderUID, contactUID, contactName = undefined) {
    const senderDocument = await getUser(senderUID).get();
    const contactDocument = await getUser(contactUID).get();
    const conversation = await getConversationByUsers([senderUID, contactUID]).get();

    senderDocument.data().contacts.push([
        contactDocument.data().id = {
            name: contactName || contactDocument.data().id,
            user: contactDocument.ref,
            conversation: conversation.ref
        }
    ]);
}

export async function sendMessage(conversationUID, senderUID, messageContent, date) {
    const conversation = getConversationByUID(conversationUID);

    let conversationData = await conversation.get();
    conversationData = conversationData.data();
    conversationData.messages.push({
        content: messageContent,
        from: senderUID,
        date: date
    });
    conversation.set(conversationData);
}