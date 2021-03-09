// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBLC6MnxuYWqEsC6S1guqTkwX19j2Zu1hU",
    authDomain: "mct-booking-app.firebaseapp.com",
    databaseURL: "https://mct-booking-app-default-rtdb.firebaseio.com",
    projectId: "mct-booking-app",
    storageBucket: "mct-booking-app.appspot.com",
    messagingSenderId: "965956358066",
    appId: "1:965956358066:web:947d08185306ffc7b4deab",
    measurementId: "G-F1TBLKW8EF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
console.log("Firebase init complete")