import App = require("./App");
import Messanger = require("./Messenger");
import Message = require("./Message");
import AppInterface = require("./AppInterface");
import ActionManager = require("./ActionManager");
//import * as React from 'react';
//import ReactDom = require("react-dom");

class Widget implements AppInterface{

    private _name: string = "Panel";
    private messanger: Messanger;
    private actionManager: ActionManager;
    //private message: Message;

    constructor(){
        this.init();
    }

    private init(): Widget {
        console.log('Widget->init()');
        this.actionManager = new ActionManager(this);
        chrome.runtime.onMessage.addListener(this.messangeListener);
        this.messanger = new Messanger(this);
        this.messanger.send(new Message('getXpathFromActivTab'));
        return this;
    }

    private messangeListener = (msg: Message) => {
        this.actionManager.dispatch(msg);
    }
    
    public render(data: Object){
        console.log('Widget->render');
        console.dir(data);
        let msg: string = data.body.xpath;
        let element = document.getElementById('popupApp');
        element.innerText = msg;
        let res = $("#popupApp").text(msg);
        console.dir($);
        this.testReact();
    }

    testReact(){
        let element = $('div').text('asdasdasd');
       /* ReactDOM.render(
                element,
                document.getElementById('popupApp')
            );*/
    };

    set  name(name: string){
        this._name = name;
    }
    get  name(): string{
        return this._name
    }
    get  extensionID(): string{
        return chrome.runtime.id;
    }
}

export = Widget;