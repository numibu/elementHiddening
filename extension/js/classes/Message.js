define(["require", "exports"], function (require, exports) {
    "use strict";
    class Message {
        constructor(action, body) {
            this.body = body;
            this.action = action;
            return this;
        }
    }
    return Message;
});
