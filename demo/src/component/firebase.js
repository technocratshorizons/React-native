import * as firebase from 'firebase';
var config = {
    apiKey: "AIzaSyB8i6KIRs0pYVzKoJhztGId61mmBFERZiw",
    authDomain: "socialapp-eadf0.firebaseapp.com",
    databaseURL: "https://socialapp-eadf0.firebaseio.com",
    projectId: "socialapp-eadf0",
    storageBucket: "socialapp-eadf0.appspot.com",
    messagingSenderId: "950737265367"
};
export default firebaseApp = firebase.initializeApp(config);