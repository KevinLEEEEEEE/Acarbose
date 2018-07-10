const {ccclass, property} = cc._decorator;

cc.Class({
    extends: cc.Component,
    
    properties: {
        arrowPrefab: cc.Prefab,
        //arrowSpeed: 200,//箭矢的移动速度
        intervalTime: 1.5,//箭矢发射的时间间隔
        arrowCount: 5,//对象池中箭矢数量
    },

    onLoad () {

        this.positionX = this.node.getPositionX() - 50;
        this.positionY = this.node.getPositionY() - 20;
        this.initArrowPool();
        this.shotEvent();   
       
    },  
    
    //初始化arrow对象池
    initArrowPool() {

        this.arrowPool = new cc.NodePool();//建立arrow对象池
        
        for(let i = 0; i < this.arrowCount; i++) {
            const arrow = cc.instantiate(this.arrowPrefab);
            this.arrowPool.put(arrow);
        }
          
    },

    getArrow() {
        let arrow = null;

        if(this.arrowPool.size() > 0) {
            arrow = this.arrowPool.get();
            //console.log("Arrow get done!");
        } else {
            arrow = cc.instantiate(this.arrowPrefab);
            //console.log("新创建的Arrow get done!");
        }

        arrow.getComponent('Arrow').init(this,this.node.convertToNodeSpace(this.positionX,this.positionY));
        //console.log('发射器的坐标'+this.position);

        return arrow;
    },

    putArrow(arrow) {
        this.arrowPool.put(arrow);
        //console.log("Arrow put back!");
    },

    shotEvent() {

        this.schedule(() => {
            let arrow = this.getArrow();
            arrow.parent = this.node;
            //arrow.getComponent('Arrow').init();
        },this.intervalTime,this);

    }
});