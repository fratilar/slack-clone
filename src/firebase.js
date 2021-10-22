import firebase from 'firebase';

const firebaseConfig = {
   apiKey: "AIzaSyDTd84K5QULb3Qp5c4ExN_yfI4zaNzVPTY",
   authDomain: "slack-clone-c9303.firebaseapp.com",
   projectId: "slack-clone-c9303",
   storageBucket: "slack-clone-c9303.appspot.com",
   messagingSenderId: "747541655656",
   appId: "1:747541655656:web:bb89d396890a450a9f0bdd"
 };

 const firebaseApp = firebase.initializeApp(firebaseConfig);
 const db = firebaseApp.firestore();
 const auth = firebase.auth();

 const provider = new firebase.auth.GoogleAuthProvider();

 export { db, auth, provider};