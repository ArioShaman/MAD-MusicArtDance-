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
= require jquery-ui
= require worldLow
= require_tree ./controllers
= require devise
= require angular-cookies
*/


var app = angular.module("app", ['ui.router', 'oxymoron','Devise','ngCookies']);

//   /users/sign_up
app.config(['$stateProvider', function ($stateProvider) {
  $stateProvider.rails()
}])

//app.run(['$rootScope', function ($rootScope) {
  //$rootScope.gon = gon;
  //$rootScope.Routes = Routes;
//}])