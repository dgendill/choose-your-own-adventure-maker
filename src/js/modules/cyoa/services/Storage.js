import L from '../cyoa.js';
import angular from 'angular';

L.service("Storage", function() {
  const self = this;
  const defaultKey = "cyoa-ws-DefaultStory";
  const workspaceKey = "cyoa-Workspace";
  const localStorage = window.localStorage;

  // Initialize the default workspace
  if (!localStorage.getItem(workspaceKey)) {
    localStorage.setItem(workspaceKey, defaultKey);
  }

  this.getWorkspace = function() {
    return localStorage.getItem(workspaceKey);
  }

  this.setWorkspace = function(key) {
    localStorage.setItem(workspaceKey, key);
  }

  this.viewWorkspaces = function() {
    function localStorageKeys() {
      let keys = [];
      for(var i = 0; i < localStorage.length; i++) {
        keys.push(localStorage.key(i));
      }
      return keys;
    }
    
    return localStorageKeys().filter(function(key) {
      return key.match(/^cyoa-ws-/);   
    });    
  }

  // String -> Eff
  this.saveToCurrentWorkspace = function(content) {
    self.save(self.getWorkspace(), content);
  }

  // String -> StringifiedJSON
  this.loadFromCurrentWorkspace = function(key) {
    return window.localStorage.getItem(self.getWorkspace());
  }
  
  // String -> StringifiedJSON -> Eff
  this.save = function(key, content) {
    window.localStorage.setItem(key, content);
  }


});