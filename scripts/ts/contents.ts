
requirejs.config({
  baseUrl: chrome.extension.getURL("/js/classes"),

  paths: {},

  shim: {}
});

console.log('inContents');

require(['PageApp'], 
    (PageApp) => {
        $( document ).ready(function(){
            console.log('inOnReadyJquery');
            let page = new PageApp();
        });
    }
);