import L from '../cyoa.js';
import Part from 'Models/Part.js';
import angular from 'angular';
import $ from 'jquery';

// Promise
function loadIdentity() {
  console.log("Getting AWS credentials...");
  var credentials = AWS.config.credentials;

  return new Promise(function(success, error) {
    credentials.get(function(err) {
      if (err) {
          console.log("Error: " + err);
          error(err);
      }

      console.log("Amazon Cognito Identity ID: " + credentials.identityId);
      success(credentials.identityId)
    });
  })
  
}

L.provider('Identity', function() {

  let facebookAppId = "";
  this.setFacebookAppId = function(appId) {
    facebookAppId = appId;
  }

  this.$get = function($injector) {
    return $injector.instantiate(Identity(facebookAppId), []);
  }
})

function Identity(facebookAppId) {
  return function() {
    let self = this;
    let facebookEnabled = false;
    let facebookReady = false;

    this.load = function() {
      return loadIdentity();
    }

    this.getFacebookLoginStatus = function() {
      return new Promise(function(success, error) {
        FB.getLoginStatus(function(response) {
          if (response.status == "connected") {
            success(true, response)
          } else {
            success(false, response);
          }
        });
      })      
    }

    this.getAmazonCredentials = function(Logins) {
      // Add the Facebook access token to the Cognito credentials login map.
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:535c70a3-5275-4ce1-a683-00f5d29aa615',
        Logins: Logins
      });

      // Obtain AWS credentials
      AWS.config.credentials.get(function(){
        console.log(arguments);
      });
    }

    this.facebookLogin = function() {
      return new Promise(function(success, error) {
        FB.login(function(response) {
          if (response.authResponse) {
            
            console.log('You are now logged in.');
           
            self.getAmazonCredentials({
              'graph.facebook.com': response.authResponse.accessToken
            });

            success(true, resonse);
            // ctrl.facebookLoggedIn = true;

          } else {
            error(false, response)
          }

        }, {scope: 'public_profile'});
      });
    }

    let facebookQueue = [];

    // Promise
    this.useFacebook = function() {
      return new Promise(function(success, error) {
        if (facebookReady) success();
        facebookQueue.push(success);  
        if (facebookEnabled) return;
        facebookEnabled = true;

        var fb = require('Templates/facebook.html');
        $(document.body).children().first().before(fb);

        window.fbAsyncInit = function() {
          FB.init({
            appId            : facebookAppId,
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v2.10'
          });
          FB.AppEvents.logPageView();
          facebookReady = true;
          
          facebookQueue.forEach(function(fn) {
            window.setTimeout(function() {
              fn();
            }, 0);            
          });
        };
      })
    }
  }
}