import * as firebase from 'firebase';

const firebaseConfig = { 
    apiKey: "<your-api-key>", 
    authDomain: "<your-auth-domain>", 
    databaseURL: "<your-database-url>", 
    StorageBucket: "<your- thùng lưu trữ> ",, 
    }; 
    const firebaseApp = firebase.initializeApp (firebaseConfig);