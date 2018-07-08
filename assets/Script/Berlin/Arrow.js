cc.Class({
    extends: cc.Component,

    properties: {
        moveSpeed: 200,//箭矢的移动速度
        //moveDistance: 800,//箭矢发射后的运动距离
    },

    init(that,position) {
        this.that = that;
        //console.log('传入的坐标'+position);
        this.node.position = position;
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.moveSpeed, 0);//子弹的线性速度

    },

    onBeginContact(contact, selfCollider, otherCollider){

        //Animtion 箭矢消失的帧动画

        const otherBody = otherCollider.body.node.group;
        contact.disabled = true;
        if(otherBody === 'player') {
            console.log('疼!');
            //调用减生命值的API
            this.that.putArrow(this.node);
        }
        else{
            //console.log('碰到player以外的物体，Arrow消失!');
            this.that.putArrow(this.node);
        }
        
    },

});
