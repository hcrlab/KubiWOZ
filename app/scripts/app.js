(function (document) {
    'use strict';

    // Add some properties to our auto-binding template:
    //  Any field added to the `app` object can be binded to using {{}} notation in index.html
    var app = document.querySelector('#app');
    var selectionMade = false;

    app.appName = 'Kubi Tutor - Wizard of Oz Controller App';
    app.menuOption = 0;

    app.email = "hcr@cs.uw.edu";
    app.password = "testpass";

    // Connect to the firebase and setup the login function
    var fb = new Firebase('https://hcrkubi.firebaseio.com/');
    app.submitLogin = function() {
        console.log('Logging in...');

        fb.authWithPassword({
            email    : app.email,
            password : app.password
        },
        function (error, authData) {
            if (error) {
                console.log('Login Failed!', error);
            } else {
                app.$.loginDialog.opened = false;
                app.authenticated = true;
                console.log('Authenticated successfully with payload:', authData);
            }
        });
    };

    app.confirmClearRequest = function() {
        app.$.ConfirmClearDialog.toggle();
    };

    app.clearFb = function() {
        if(selectionMade) {
            fb.child(app.$.globals.data.current).remove(function(error) {
                if(error) {
                    console.log('Error deleting data fom Firebase!');
                } else {
                    app.$.ClearedDialog.toggle();
                }
            });
        } else {
            app.$.clearWarning.show();
        }
    };

    // Allow the user to logout if need be
    app.logout = function() {
        fb.unauth();
        app.authenticated = false;
        app.$.loginDialog.opened = true;
    };

    // For initialization, lets check if they are already logged in, if not, disable the buttons
    app.authenticated = !!fb.getAuth();

    app.YesNo = ['Yes', 'No'];
    app.Ok = ['Ok'];

    app.expr = {
        smile: 'SMILE'
    };

    app.lessonStep = 0;
    app.totalSteps = 13;

    app.prevLessonPart = function() {
        app.lessonStep -= 1;
    };

    app.nextLessonPart = function() {
        app.lessonStep += 1;
    };

    // Listen for template bound event to know when bindings
    // have resolved and content has been stamped to the page
    app.addEventListener('template-bound', function() {
        console.log('Our app is ready to rock!');

        app.submitLogin();

        if(!app.authenticated) {
            document.querySelector('#loginDialog').opened = true;
        }

        app.$.globals.setListener("index", function() {
            app.devices = app.$.globals.data.ids;

            console.log(app.devices);
        });
    });

    app.devices = [];

    app.devSelected = function(e) {
        if(e.detail.isSelected) {
            selectionMade = true;
            console.log(e.detail.item.innerText);
            app.$.globals.data.current = e.detail.item.innerText;
        }
    };


// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
