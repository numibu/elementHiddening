define(["require", "exports", "./Messenger", "./Message", "./ActionManager"], function (require, exports, Messanger, Message, ActionManager) {
    "use strict";
    class Widget {
        constructor() {
            this._name = "Panel";
            this.messangeListener = (msg) => {
                this.actionManager.dispatch(msg);
            };
            this.init();
        }
        init() {
            console.log('Widget->init()');
            this.actionManager = new ActionManager(this);
            chrome.runtime.onMessage.addListener(this.messangeListener);
            this.messanger = new Messanger(this);
            this.messanger.send(new Message('getXpathFromActivTab'));
            return this;
        }
        render(data) {
            console.log('Widget->render');
            console.dir(data);
            let msg = data.body.xpath;
            let element = document.getElementById('popupApp');
            element.innerText = msg;
            let res = $("#popupApp").text(msg);
            console.dir($);
            this.testReact();
        }
        testReact() {
            let element = $('div').text('asdasdasd');
        }
        ;
        set name(name) {
            this._name = name;
        }
        get name() {
            return this._name;
        }
        get extensionID() {
            return chrome.runtime.id;
        }
    }
    return Widget;
});
