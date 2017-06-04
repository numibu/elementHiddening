
import PageApp = require('./PageApp');
import Message = require('./Message');
import AppInterface = require('./AppInterface');

class Messenger{
    
    link: AppInterface;
    options: {};
    
    _logMessage: string;
    
    constructor( link: AppInterface){
        this.link = link;
        this._logMessage = 'message from ' + this.link.name;
    }
    
    send(message: Message, tab?: chrome.tabs.Tab ){
        /*console.dir(this.link);
        console.dir(tab);
        console.log("Messanger link: "+ typeof this.link+ " type of tab.id: " + tab);*/
        ( typeof tab === "undefined" || typeof tab.id !=="number" )
            ?chrome.runtime.sendMessage( this.link.extensionID,  
                                    message,  
                                    {}, 
                                    (answer)=>{
                                        console.log('answer');
                                        console.dir(answer);
                                        console.log(this._logMessage);
                                        //this.answer();
                                    })
            :chrome.tabs.sendMessage( tab.id,  
                                    message,  
                                    {}, 
                                    (answer)=>{
                                        console.log('answer');
                                        console.dir(answer);
                                        console.log(this._logMessage);
                                        //this.answer();
                                    });
    }

    private answer(){
        
    }
}

export = Messenger;