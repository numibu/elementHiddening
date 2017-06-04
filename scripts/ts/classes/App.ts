
import ActionManager = require("./ActionManager");
import AppInterface = require("./AppInterface");
import Messenger = require("./Messenger");
import Message = require("./Message");

class App implements AppInterface{
    
    private _name: string = "backgroundScript(App.ts)";
    private _activTab: chrome.tabs.Tab;
    private _popup: chrome.windows.Window;
    public version: number = 0.1;
    public xpath: string;
    public dispatcher: ActionManager;
    public extensionId: string = chrome.runtime.id;
    public messenger: Messenger;
    
    public menuContext: string[] = ["page","selection","link","editable","image","video","audio"];
    public menuTitle: string = 'Обработать...';

    constructor(){
        this.init();
    }
    
    private init():App {
        this.dispatcher = new ActionManager(this);
        this.messenger = new Messenger(this);
        chrome.contextMenus.create({id: this.extensionId, title: this.menuTitle, contexts: this.menuContext});
        chrome.contextMenus.onClicked.addListener(this.contextItemClick.bind(this));
        chrome.runtime.onMessage.addListener(this.onMessageC);
        return this;
    }

    private createPopUp():void {
        chrome.windows.create({
            url: "popup.html",
            type: 'popup',
            height: 200,
            width: 500
        }, (window) => {this._popup = window;});
    }
    
    public contextItemClick(info: Object, tab: chrome.tabs.Tab){
        console.log('App->contextItemClick()');
        this.activTab = tab;
        this.createPopUp();// create Widget instance
        /*let objQuery = {
            action: 'getList',
            extID: this.extensionId
        }
        this.messanger(tab.id, objQuery, (e)=>{console.dir(e);});*/
    }
    
    /*public messanger(tabID: number, objQuery: Object, callBack: EventListener){
        console.log('inMessage');
        let result = chrome.tabs.sendMessage(tabID, objQuery, callBack=null);
        console.log('exitMessage ');
    }*/
    
    public onMessageC = (msg) => {
        console.log('inOnMessageC');
        //let el = document.getElementById("app");
        //el.innerText = msg.body.xpath;
        return this.dispatcher.dispatch(msg);
    }

    public newXpath(msg): string{
        this.xpath = msg.body.xpath;
        return 'newXpath has saved';
    }

    public getXpathFromActivTab(){
        this.messenger.send( new Message( 'render', {xpath:this.xpath} )) ;
        //return this.messenger.send( new Message( 'getXpath', this.activTab ) );
    }

    public render(){
        console.log($);
    }

    set  name(name: string){
        this._name = name;
    }
    get  name(): string{
        return this._name
    }
    get  extensionID(): string{
        return chrome.runtime.id;
    }

    set activTab(tab: chrome.tabs.Tab){
        this._activTab = tab;
    }
    get activTab(): chrome.tabs.Tab{
        return this._activTab;
    }
}

export = App;