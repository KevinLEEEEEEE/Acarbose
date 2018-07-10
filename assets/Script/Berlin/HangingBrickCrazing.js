cc.Class({
    extends: cc.Component,

    properties: {
        crzaingTime: 2,//player站在悬浮砖上悬浮砖会碎裂的时间
        refreshTime: 5,//悬浮砖恢复的时间
    },

    onLoad () {
        this.crazingAnim = this.getComponent(cc.Animation);

        this.isBreak = false;//判断悬浮砖是否碎裂的变量
        this.isRefreshing = false;//判断是否在恢复状态
        
    },

    onBeginContact(contact, selfCollider, otherCollider){

        cc.log('onBeginContact');
        cc.log(this.isBreak);
        cc.log(this.isRefreshing);
        const otherBody = otherCollider.body.node.group;
        
        if(this.isBreak === false && otherBody === 'player'){

            contact.disabled = false;
            this.isBreak = true;
            this.scheduleOnce(() => {
                cc.log('Crazing!');
                contact.disabled = true;
                this.crazingAnim.play("Crazing");
            },this.crzaingTime);

        }else{

            cc.log('Already Crazing!');
            contact.disabled = true;
            return;

        }
       
    },

    onEndContact(contact, selfCollider, otherCollider){

        cc.log('onEndContact');
        cc.log(this.isBreak);
        cc.log(this.isRefreshing);
        const otherBody = otherCollider.body.node.group;

        if(this.isBreak === true && this.isRefreshing === false && otherBody === 'player'){

            this.isRefreshing = true;
            this.scheduleOnce(() => {
                cc.log('Refreshing!');
                contact.disabled = false;
                this.isBreak = false;
                this.isRefreshing = false;
            },this.refreshTime);
        }else{

            cc.log('Aready Refreshing!');
            return;

        }

    },

});
