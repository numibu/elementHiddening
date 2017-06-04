define(["require", "exports"], function (require, exports) {
    "use strict";
    class Messenger {
        constructor(link) {
            this.link = link;
            this._logMessage = 'message from ' + this.link.name;
        }
        send(message, tab) {
            (typeof tab === "undefined" || typeof tab.id !== "number")
                ? chrome.runtime.sendMessage(this.link.extensionID, message, {}, (answer) => {
                    console.log('answer');
                    console.dir(answer);
                    console.log(this._logMessage);
                })
                : chrome.tabs.sendMessage(tab.id, message, {}, (answer) => {
                    console.log('answer');
                    console.dir(answer);
                    console.log(this._logMessage);
                });
        }
        answer() {
        }
    }
    return Messenger;
});
