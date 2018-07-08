cc.Class({
    extends: cc.Component,

    properties: {

        height: 30,//地刺上升高度
       
    },

    onBeginContact(contact, selfCollider, otherCollider){
        
        contact.disabled = true;

        const otherBody = otherCollider.body.node.group;
        if(otherBody === 'player'){
            //这里要加入减血的代码
            const X = this.node.getPositionX();
            const Y = this.node.getPositionY();
            const action = cc.moveTo(0.1, X, Y + this.height);
            this.node.runAction(action);
        }
        
    },

    onEndContact(contact, selfCollider, otherCollider){

        const otherBody = otherCollider.body.node.group;
        if(otherBody === 'player'){
            const X = this.node.getPositionX();
            const Y = this.node.getPositionY();
            const action = cc.moveTo(0.1, X, Y - this.height);
            this.node.runAction(action);
        }

    }

});
