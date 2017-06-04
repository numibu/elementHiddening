define(["require", "exports"], function (require, exports) {
    "use strict";
    class msgListener {
        constructor(PageAppLink) {
            this._link = PageAppLink;
            return this;
        }
        handler() {
            return (message) => {
                switch (message.action) {
                    case "getList":
                        this._link[message.action];
                    default:
                        console.log('message hendler');
                }
            };
        }
    }
});
