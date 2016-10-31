'use strict';

$(document).ready(function onReadyJquery() {
    alert(12341234);

    var elements = [];

    var selectors = [];

    var selectString = '';

    document.addEventListener('contextmenu', function (event) {
        alert('contextmenu');
        var element = $(event.target)[0];
        var xpath = getXpath(element);
        $(selectXpath(xpath)).css({ 'border-bottom': "2px solid #ff4141" });
        console.dir(xpath);
    }, false);

    function getXpath(element) {
        //let val = element.value;
        var xpath = '';

        for (; element && element.nodeType == 1; element = element.parentNode) {
            var id = $(element.parentNode).children(element.tagName).index(element) + 1;
            id > 1 || id == 1 ? id = '[' + id + ']' : id = '';
            xpath = '/' + element.tagName.toLowerCase() + id + xpath;
        }
        return xpath;
    }

    function selectXpath(STR_XPATH) {
        var xresult = document.evaluate(STR_XPATH, document, null, XPathResult.ANY_TYPE, null);
        var xnodes = [];
        var xres;
        while (xres = xresult.iterateNext()) {
            xnodes.push(xres);
        }
        return xnodes;
    }

    function sendDataExtn() {}
    //chrome.runtime.sendMessage(string extensionId,  'message',  options, function(){console.log('sendDataExtn');});


    // Listen for messages
    /*
    chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
        // If the received message has the expected format...
        if (msg.text === 'report_back') {
            // Call the specified callback, passing
            // the web-page's DOM content as argument
            
            //let el = JSON.stringify(elements);
            sendResponse(selectors);
            selectors = [];
            elements = [];
        }
    });
    */
});