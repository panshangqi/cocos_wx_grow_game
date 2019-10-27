// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        gameName: "成长家园v",
        speed: 0,
        progressBarView: {
            type: cc.ProgressBar,
            default: null
        }
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.progressBarView.progress = 0.0;
        console.log('onload')
    },

    start () {

        // 视口大小
        var csz = cc.view.getCanvasSize();
        // 设计分辨率
        var des = new cc.Vec2(1440, 720);
        // 进行分辨率适配
        cc.view.setDesignResolutionSize(des.x, des.y, cc.ResolutionPolicy.EXACT_FIT);
        console.log('start')
        cc.director.loadScene("home");
        // let timer = setInterval(()=>{
        //     var progress = this.progressBarView.progress;
        //     //this.speed += 0.01
        //     progress += 0.1;
        //
        //     if(progress <=1.0){
        //         this.progressBarView.progress = progress;
        //     }else{
        //         cc.director.loadScene("home");
        //         clearInterval(timer)
        //     }
        // },10)
    },
    update: function (dt) {
        //this._updateProgressBar(this.progressBarView, dt);
    },
    _updateProgressBar: function(progressBar, dt){



    }
});
//console.log('init')
//cc.director.loadScene("init");