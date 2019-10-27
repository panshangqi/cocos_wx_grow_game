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
        petsButton: cc.Button,
        petsList: cc.ScrollView
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
        this.petsButton.node.on('click', this.onPetsBtnClick, this);
        this.petsList.node.active = false
    },

    start () {
        //必须是在用户已经授权的情况下调用
        // 设计分辨率
        var des = new cc.Vec2(1440, 720);
        // 进行分辨率适配
        cc.view.setDesignResolutionSize(des.x, des.y, cc.ResolutionPolicy.EXACT_FIT);

        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.getUserInfo({
                success: (res) => {
                    console.log('已授权');
                    console.log(res);
                    // if(res.userInfo){
                    //     this.loginButton.image = res.userInfo.avatarUrl;
                    //     let nickname = new Text({
                    //         fontColor: '#fff',
                    //         fontSize: px(12),
                    //         text: res.userInfo.nickName,
                    //         x: px(110),
                    //         y: px(24)
                    //     })
                    //     nickname.render(this.ctx);
                    // }
                },
                fail: (res) => {
                    console.log('未授权');
                }
            })
        }

    },
    onPetsBtnClick(){
        //this.petsList.node.active = true
        cc.director.loadScene("pet");
    }
    // update (dt) {},
});
