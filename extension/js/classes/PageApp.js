define(["require", "exports", './Messenger', './Message', './ActionManager'], function (require, exports, Messenger, Message, ActionManager) {
    "use strict";
    class PageApp {
        constructor() {
            this._name = "contentsScript";
            this.xpath = "11111";
            this.onContectMenu = (event) => {
                let element = $(event.target)[0];
                this.searchXpath(element);
                this._messenger.send(new Message('newXpath', { xpath: this.xpath }));
                console.dir(this.xpath);
            };
            this.messangeListener = (msg) => {
                this.actionManager.dispatch(msg);
            };
            this.init();
        }
        init() {
            this.actionManager = new ActionManager(this);
            this._messenger = new Messenger(this);
            chrome.runtime.onMessage.addListener(this.messangeListener);
            this.addEventListener('contextmenu', this.onContectMenu);
            return this;
        }
        searchXpath(element) {
            let xpath = '';
            for (; element && element.nodeType == 1; element = $(element.parentNode)[0]) {
                let id = $(element.parentNode).children(element.tagName).index(element) + 1;
                let idString = '';
                (id > 1 || id == 1)
                    ? (idString = '[' + String(id) + ']')
                    : (idString = '');
                xpath = '/' + element.tagName.toLowerCase() + idString + xpath;
            }
            this.xpath = xpath;
        }
        addEventListener(eventName, callBack, param = false) {
            document.addEventListener(eventName, callBack, param);
        }
        getXpath() {
            console.log("PageApp->getXpath");
            return this.xpath;
        }
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
    return PageApp;
});
