import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD-T3lWYdPadfLTy0kHAgZjRsacvDpDklU",
    authDomain: "whatsapp-clone-9fd22.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-9fd22.firebaseio.com",
    projectId: "whatsapp-clone-9fd22",
    storageBucket: "whatsapp-clone-9fd22.appspot.com",
    messagingSenderId: "1017784785482",
    appId: "1:1017784785482:web:6c34cb077157fff88c24b3",
    measurementId: "G-93EWC01NLS"
}

export default firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();