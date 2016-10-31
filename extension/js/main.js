'use strict';

requirejs.config({
  baseUrl: 'js',

  paths: {},

  shim: {}
});

require(['app'], function (App) {
  window.hideElementExtension = new App();
  window.hideElementExtension.init();
});