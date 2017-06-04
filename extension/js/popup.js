requirejs.config({
    baseUrl: "js/classes/",
    paths: {
        jquery: "../lib/jquery.min",
        react: "../lib/react",
        "react-dom": "../lib/react-dom"
    },
    shim: {
        jquery: {
            exports: '$'
        },
        react: {
            exports: 'React'
        },
        "react-dom": {
            exports: "ReactDom"
        }
    }
});
console.log('inWidget');
require(['jquery', 'react', 'react-dom', 'Widget'], function ($, React, ReactDOM, Widget) {
    var widget = new Widget();
});
