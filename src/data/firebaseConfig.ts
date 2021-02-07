import firebase from 'firebase';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyBhfs-pc1_6cPyRB2n0_jmk6cp478cXd8I',
  authDomain: 'prop-bets-lv.firebaseapp.com',
  projectId: 'prop-bets-lv',
  storageBucket: 'prop-bets-lv.appspot.com',
  messagingSenderId: '415908399409',
  appId: '1:415908399409:web:28d0acad438dd1bdb2c810',
});
const db = app.firestore();
export { db };
