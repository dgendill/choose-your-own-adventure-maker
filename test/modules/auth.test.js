var assert = require('assert');
var expect = require('chai').expect;

require('angular-mocks');

// Perform an integration
// test instead of a unit test. Make real
// http requests.
function intTest(fn) {
  return function(done) {
    inject(function (httpReal) {
      fn(done);
      httpReal.submit();
    });
  }  
}

function timeTest(t, fn) {
  var f = function(done) {
    this.timeout(t);
    console.log('dd', done);
    fn(done);
  }
  return f;
}

function intTimeTest(t, fn) {
  return function(done) {
    let f = timeTest(t, fn).bind(this);
    intTest(f)(done)
  }
}

angular.module('httpReal', ['ng'])
  .config(['$provide', function ($provide) {
      $provide.decorator('$httpBackend', function () {
          return angular.injector(['ng']).get('$httpBackend');
      });
  }])
  .service('httpReal', ['$rootScope', function ($rootScope) {
      this.submit = function () {
          $rootScope.$digest();
      };
  }]);

describe('appAuth module', function () {

  beforeEach(function() {
    angular.mock.module('appAuth', 'httpReal');
  });
 
  var $controller;
  var $componentController;
  var $Auth;
  var $window;
  var $state;
  var $rootScope;
  var $scope;
  var controller;

  beforeEach(inject(function(_$controller_, _$componentController_, _Auth_, _$window_, _$q_, _$rootScope_){
    $Auth = _Auth_;
    $window = _$window_;
    $controller = _$controller_;
    $componentController = _$componentController_;
    $q = _$q_;
    $rootScope = _$rootScope_;

    $scope = {};
    controller = $componentController('loginForm', {
      $scope: $rootScope,
      Auth: $Auth,
      $state: { go : function() {} },
      $window: $window
    });
  }));


  describe('loginForm', function () {
    
		it('no credentials', timeTest(5000, function (done) {
      var defer = $q.defer();
      controller.login().then(function(r) {
        expect.fail('failure', 'passed');
        done();
      }, function(err) {
        expect(err.data.id).to.equal('NoPassword');
        done();
      });
    }));

    it('with credentials', intTimeTest(10000, function (done) {
      
      var defer = $q.defer();
      controller.username = "demo";
      controller.password = "demo";
      
      controller.login().then(function(r) {
        expect(true).to.be.true;
        done();
      }, function(err) {
        console.log('err', err);
        expect.fail('success', 'failure');
        done();
      });
    
    }));	    
    
	});


});