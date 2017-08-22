/*
= require oxymoron/underscore
= require oxymoron/angular
= require oxymoron/angular-resource
= require oxymoron/angular-cookies
= require oxymoron/angular-ui-router
= require oxymoron/ng-notify
= require oxymoron
= require_self
= require jquery
= require jquery_ujs
= require script
= require ammap
= require worldLow
= require_tree ./controllers
*/


var app = angular.module("app", ['ui.router', 'oxymoron']);

app.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.rails()
}])