console.log("Loading auth...")


// Get URL parameter to know type of sign in
const USER_TYPE_PARAM = "user_type"
const CLINICIAN = "clinician"
const CLIENT = "client"
var user_type = CLIENT

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
user_type = urlParams.get(USER_TYPE_PARAM)


console.log(user_type)
// export { user_type };
// export { CLINICIAN };
// export { CLIENT };


// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    // signInFlow: 'popup',
    signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    // tosUrl: '<your-tos-url>',
    // // Privacy policy url.
    // privacyPolicyUrl: '<your-privacy-policy-url>'
  };

  uiConfig.signInSuccessUrl = "google.com"

  // The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);
