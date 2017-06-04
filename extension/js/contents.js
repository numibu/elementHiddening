requirejs.config({
    baseUrl: chrome.extension.getURL("/js/classes"),
    paths: {},
    shim: {}
});
console.log('inContents');
require(['PageApp'], function (PageApp) {
    $(document).ready(function () {
        console.log('inOnReadyJquery');
        var page = new PageApp();
    });
});
