define(["require", "exports"], function (require, exports) {
    "use strict";
    class ActionManager {
        constructor(appLink) {
            this._obj = appLink;
        }
        dispatch(message) {
            if (!(typeof message['action'] === "string")) {
                console.log('no action: "' + message['action'] + '" in Message object or action not string!');
            }
            let actionName = message['action'];
            if (typeof this._obj[actionName] !== 'function') {
                console.log('actionName: "' + message['action'] + '" not method in' + this._obj.name + '!');
            }
            console.log('call action "' + actionName + '"');
            this._obj[actionName](message);
        }
    }
    return ActionManager;
});
