
import PageApp = require('./PageApp');
import Message = require("./Message")

class msgListener{
    
    private _link: PageApp;
    
    constructor( PageAppLink: PageApp ){
        this._link = PageAppLink;
        return this;
    }
    
    public handler(){
        return (message: Message) => {
            switch(message.action){
                case "getList":
                    this._link[message.action];
                default:
                    console.log('message hendler');
            }
        }
    }
}