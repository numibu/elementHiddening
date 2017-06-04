
import App = require("./App");
import Message = require("./Message");
import AppInterface = require("./AppInterface");

class ActionManager {

    private _obj: AppInterface;

    public constructor(appLink: AppInterface){
        this._obj = appLink;
    }

    public dispatch(message:Message){
        if ( !(typeof message['action'] === "string") ) {
            console.log('no action: "'+message['action']+'" in Message object or action not string!');
        }
        let actionName = message['action'];
        if ( typeof this._obj[actionName] !== 'function' ) {
            console.log('actionName: "'+message['action']+'" not method in'+this._obj.name+'!');
        }
        console.log('call action "' + actionName +'"');
        this._obj[actionName](message);
    }
}

export = ActionManager;