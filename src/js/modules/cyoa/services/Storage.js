import L from '../cyoa.js';
import angular from 'angular';

L.service("Storage", function() {
  const self = this;
  const workspacePrefix = "cyoa-ws-";
  const defaultKey = workspacePrefix + "DefaultStory";
  const workspaceKey = "cyoa-Workspace";
  const localStorage = window.localStorage;
  const prefixMatcher = function() {
    return new RegExp('^' + workspacePrefix, 'g');
  }

  // Initialize the default workspace
  if (!localStorage.getItem(workspaceKey)) {
    localStorage.setItem(workspaceKey, defaultKey);
  }

  this.getWorkspace = function() {
    return localStorage.getItem(workspaceKey);
  }

  this.niceWorkspaceName = function(name) {
    return name.replace(prefixMatcher(), '');
  }

  this.rawWorkspaceName = function(name) {
    return workspacePrefix + name.replace(prefixMatcher(), '');
  }

  this.setWorkspace = function(key) {
    localStorage.setItem(workspaceKey, self.rawWorkspaceName(key));
  }

  this.createWorkspace = function(name) {
    var name = name.replace(prefixMatcher(), '');
    self.setWorkspace(workspacePrefix + name);
  }

  this.createDatedWorkspace = function() {
    let now = new Date();
    let key = now.toLocaleDateString() + " at " + now.toLocaleTimeString();
    self.setWorkspace(key);
  }

  this.usingDefaultWorkspace = function() {
    return this.getWorkspace() == defaultKey;
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
      return key.match(prefixMatcher());   
    });    
  }

  // String -> Eff
  this.saveToCurrentWorkspace = function(content) {
    self.save(self.getWorkspace(), content);
  }

  // String -> StringifiedJSON
  this.loadFromCurrentWorkspace = function() {
    return window.localStorage.getItem(self.getWorkspace());
  }

  // String -> StringifiedJSON
  this.loadFromCurrentWorkspace = function() {
    return window.localStorage.getItem(self.getWorkspace());
  }

  // String -> StringifiedJSON
  this.loadFrom = function(name) {
    name = this.rawWorkspaceName(name);
    return window.localStorage.getItem(name);
  }
  
  // String -> StringifiedJSON -> Eff
  this.save = function(key, content) {
    window.localStorage.setItem(key, content);
  }


});