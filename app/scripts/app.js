(function (document) {
    'use strict';

    // Add some properties to our auto-binding template:
    //  Any field added to the `app` object can be binded to using {{}} notation in index.html
    var app = document.querySelector('#app');
    app.appName = 'Kubi Tutor - Wizard of Oz Controller App';
    app.menuOption = 0;

    app.email = null;
    app.password = null;

    // Connect to the firebase and setup the login function
    var fb = new Firebase("https://hcrkubi.firebaseio.com/");
    app.submitLogin = function() {
        console.log("Logging in...");

        fb.authWithPassword({
            email    : app.email,
            password : app.password
        },
        function (error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                app.$.loginDialog.opened = false;
                app.authenticated = true;
                console.log("Authenticated successfully with payload:", authData);
            }
        });
    };

    app.confirmClearRequest = function() {
        app.$.ConfirmClearDialog.toggle();
    };

    app.clearFb = function() {
        fb.remove(function(error) {
            if(error) {
                console.log("Error deleting data fom Firebase!")
            } else {
                app.$.ClearedDialog.toggle();
            }
        });
    };

    // Allow the user to logout if need be
    app.logout = function() {
        fb.unauth();
        app.authenticated = false;
        app.$.loginDialog.opened = true;
    };

    // For initialization, lets check if they are already logged in, if not, disable the buttons
    app.authenticated = !!fb.getAuth();

    // Use this ref for adding commands to the Firebase
    var commands = fb.child("commands");

    // Use this ref for adding logging data to the Firebase
    var log = fb.child("wozlog");

    // These are examples of how to connect buttons to sending commands to the Firebase
    app.sampleBtnClick = function() {
        commands.push().set({
            time: Firebase.ServerValue.TIMESTAMP,
            command: "SAMPLE_COMMAND_1"
        });
    };

    app.sampleBtnClick2 = function() {
        commands.push().set({
            time: Firebase.ServerValue.TIMESTAMP,
            command: "SAMPLE_COMMAND_2"
        });
    };

    app.sampleBtnClick3 = function() {
        commands.push().set({
            time: Firebase.ServerValue.TIMESTAMP,
            command: "SAMPLE_COMMAND_3"
        });
    };

    app.sampleBtnClick4 = function() {
        commands.push().set({
            time: Firebase.ServerValue.TIMESTAMP,
            command: "SAMPLE_COMMAND_4"
        });
    };

    // Listen for template bound event to know when bindings
    // have resolved and content has been stamped to the page
    app.addEventListener('template-bound', function() {
        console.log('Our app is ready to rock!');

        if(!app.authenticated) {
            document.querySelector('#loginDialog').opened = true;
        }
    });

// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
