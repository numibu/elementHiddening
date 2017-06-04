define(["require", "exports", "./ActionManager", "./Messenger", "./Message"], function (require, exports, ActionManager, Messenger, Message) {
    "use strict";
    class App {
        constructor() {
            this._name = "backgroundScript(App.ts)";
            this.version = 0.1;
            this.extensionId = chrome.runtime.id;
            this.menuContext = ["page", "selection", "link", "editable", "image", "video", "audio"];
            this.menuTitle = 'Обработать...';
            this.onMessageC = (msg) => {
                console.log('inOnMessageC');
                return this.dispatcher.dispatch(msg);
            };
            this.init();
        }
        init() {
            this.dispatcher = new ActionManager(this);
            this.messenger = new Messenger(this);
            chrome.contextMenus.create({ id: this.extensionId, title: this.menuTitle, contexts: this.menuContext });
            chrome.contextMenus.onClicked.addListener(this.contextItemClick.bind(this));
            chrome.runtime.onMessage.addListener(this.onMessageC);
            return this;
        }
        createPopUp() {
            chrome.windows.create({
                url: "popup.html",
                type: 'popup',
                height: 200,
                width: 500
            }, (window) => { this._popup = window; });
        }
        contextItemClick(info, tab) {
            console.log('App->contextItemClick()');
            this.activTab = tab;
            this.createPopUp();
        }
        newXpath(msg) {
            this.xpath = msg.body.xpath;
            return 'newXpath has saved';
        }
        getXpathFromActivTab() {
            this.messenger.send(new Message('render', { xpath: this.xpath }));
        }
        render() {
            console.log($);
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
        set activTab(tab) {
            this._activTab = tab;
        }
        get activTab() {
            return this._activTab;
        }
    }
    return App;
});
