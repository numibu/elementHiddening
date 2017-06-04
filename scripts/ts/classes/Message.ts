class Message {
    
    body: Object;
    action: string;
    
    constructor(action: string, body?: Object){
        this.body = body;
        this.action = action;
        return this;
    }
}
export = Message;