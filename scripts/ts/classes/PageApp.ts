
import Messenger = require('./Messenger');
import Message = require('./Message');
import AppInterface = require('./AppInterface');
import ActionManager = require('./ActionManager');
    
class PageApp implements AppInterface{
    
    private _name: string = "contentsScript";
    actionManager: ActionManager;
    xpath: string = "11111";
    selectors: string;
    
    _messenger: Messenger;

    constructor(){
        this.init();
    }
    
    private init(){
        this.actionManager = new ActionManager(this);
        this._messenger = new Messenger(this);
        chrome.runtime.onMessage.addListener(this.messangeListener);
        this.addEventListener('contextmenu', this.onContectMenu);
        return this;
    }

    private onContectMenu = (event: Event) => {
        let element: Element = $(event.target)[0];
        this.searchXpath(element);
        this._messenger.send(new Message('newXpath',{xpath:this.xpath}));
        console.dir(this.xpath);
    }
    
    private searchXpath(element: Element): void{
        let xpath = '';
 	
 	    for ( ; element && element.nodeType == 1; element = $(element.parentNode)[0] ) {
            let id: number = $(element.parentNode).children(element.tagName).index(element) + 1;
            let idString: string = '';
            (id > 1 || id == 1) 
                    ? (idString = '[' + String(id) + ']') 
                    : (idString = '');
            xpath = '/' + element.tagName.toLowerCase() + idString + xpath;
        }
        this.xpath = xpath;
    }
    
    /**
     * add to document event listener
     */
    private addEventListener(eventName: string, callBack: EventListener, param: boolean = false){
        document.addEventListener(eventName, callBack, param);
    }
    
    /**
    * Listen for messages
    */
    private messangeListener = (msg: Message) => {
        this.actionManager.dispatch(msg);
    }

    public getXpath(): string{
        console.log("PageApp->getXpath");
        return this.xpath;
    }


    set  name(name: string){
        this._name = name;
    }
    get  name(): string{
        return this._name;
    }
    get  extensionID(): string{
        return chrome.runtime.id;
    }

}

//})page
export = PageApp;