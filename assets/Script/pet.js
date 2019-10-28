// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const {frame} = require('../libs/frame.js')
// let Item = cc.Class({
//     name: 'Item',
//     properties: {
//         id: 0,
//         itemName: ''
//     }
// });

cc.Class({
    extends: cc.Component,

    properties: {
        backButton: cc.Button,
        // petItems: {
        //     default: [],
        //     type: Item
        // },
        sprite: {
            default: null,
            type: cc.Sprite,
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.backButton.node.on('click', this.onBackClick, this)
    },

    start () {
        frame.http.get(frame.util.make_url('/get/all_pets'), {user_info: 1}, function (data) {
            console.log(data)
        })

        var url = "test assets/PurpleMonster";
        cc.loader.loadRes(url, cc.SpriteFrame, function (err, spriteFrame) {
            var node = new cc.Node("New Sprite");
            var sprite = node.addComponent(cc.Sprite);
            sprite.spriteFrame = spriteFrame;
            node.parent = self.node
        });

    },

    // update (dt) {},
    onBackClick(){
        cc.director.loadScene("home");
    }
});
