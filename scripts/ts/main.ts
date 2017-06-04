
requirejs.config({
  baseUrl: "js/classes/",

  paths: {},

  shim: {}
});

console.log('inMain');

require(['App'], (App) => {
    let app = new App();
});