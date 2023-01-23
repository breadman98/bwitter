import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgtg2CPWkBb-TCdPmn283QpVCoKGZpOqk",
  authDomain: "bwitter-37afc.firebaseapp.com",
  projectId: "bwitter-37afc",
  storageBucket: "bwitter-37afc.appspot.com",
  messagingSenderId: "750653521032",
  appId: "1:750653521032:web:62402201e889243348f33d",
};

firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();
