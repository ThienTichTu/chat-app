import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
import { getStorage, connectStorageEmulator } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAo_Seh3EBHTX61MHbDvwXExe9ka6jsYGw",
    authDomain: "chatproject-fcede.firebaseapp.com",
    databaseURL: "https://chatproject-fcede-default-rtdb.firebaseio.com",
    projectId: "chatproject-fcede",
    storageBucket: "chatproject-fcede.appspot.com",
    messagingSenderId: "33630935396",
    appId: "1:33630935396:web:0be87942f403951e820271",
    measurementId: "G-L8912Y367C"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics()
const auth = firebase.auth()
// const storage = getStorage(firebaseApp);
const db = firebase.firestore()


const storage = getStorage();
connectStorageEmulator(storage, "localhost", 9199);
auth.useEmulator("http://localhost:9099", { disableWarnings: true })
if (window.location.hostname === 'localhost') {
    db.useEmulator('localhost', '8080')
}

export { auth, db, storage };
export default firebase;