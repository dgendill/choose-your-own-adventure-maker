import angular from 'angular';
import L from '../cyoa.js';

L.component('currentUserIdentity', {
  bindings : {
    // The Amazon Cognito Identity ID
    id : '<',

    // Boolean.  If true, assumes you have the facebook
    // sdk on the page
    facebook : '<'
  },
  template: require('./currentUserIdentity.html'),
  controller : CurrentUserIdentityCtrl
});


function CurrentUserIdentityCtrl($scope, $element, $attrs, Identity) {
  let ctrl = this;

  ctrl.facebookReady = false;
  ctrl.facebookLoggedIn = false;

  ctrl.facebookLogin = function() {
    Identity.facebookLogin().then(function(success, response) {
      if (success) {
        ctrl.facebookLoggedIn = true;
      }
    })
  }

  ctrl.facebookLogout = function() {
    FB.logout();
    this.facebookLoggedIn = false;
  }

  this.$onInit = function() {
    if (this.facebook === true) {
      Identity.useFacebook().then(function() {

        Identity.getFacebookLoginStatus()
          .then(function(isLogin) {
            ctrl.facebookReady = true;
            if (isLogin) {
              ctrl.facebookLoggedIn = true;
            }
          })

      });
    }
  }
}
