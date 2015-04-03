(function (document) {
  'use strict';

  var fb = new Firebase("https://hcrkubi.firebaseio.com/");
  var commands = fb.child("commands");
  var log = fb.child("wozlog");

  //log.push().set({
  //  time: Firebase.ServerValue.TIMESTAMP,
  //  event: "CONNECT",
  //  details: "Web app connected to Firebase"
  //});


  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');
  app.appName = 'Kubi Tutor - Wizard of Oz Controller App';
  app.menuOption = 0;

  app.sampleBtnClick = function() {
    commands.push().set({
      time: Firebase.ServerValue.TIMESTAMP,
      command: "SAMPLE_COMMAND_1"
    });
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('template-bound', function() {
    console.log('Our app is ready to rock!');
  });

// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
