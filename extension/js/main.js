requirejs.config({
    baseUrl: "js/classes/",
    paths: {},
    shim: {}
});
console.log('inMain');
require(['App'], function (App) {
    var app = new App();
});
