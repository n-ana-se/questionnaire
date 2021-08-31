import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCh6-gvMPATTTd1n72RTH_yBh3ynh3hdx0",
    authDomain: "questionnaire-4878e.firebaseapp.com",
    projectId: "questionnaire-4878e",
    storageBucket: "questionnaire-4878e.appspot.com",
    messagingSenderId: "240561843297",
    appId: "1:240561843297:web:e2f52f760562cdbcfc0e20"
}

firebase.initializeApp(firebaseConfig)

export default firebase