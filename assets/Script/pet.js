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
        },
        itemHeight: 20,
        itemCount: 5,
        itemPrefab: {
            type: cc.Prefab,
            default: null
        },
        scrollView: {
            type: cc.ScrollView,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.backButton.node.on('click', this.onBackClick, this)
        this.pets_list = []
        this.opt_item_set = []
        this.content = this.scrollView.content
        // for (var i = 0; i < 20; ++i) {
        //     var item = cc.instantiate(this.itemPrefab);
        //     console.log(item.getChildByName('name').getComponent(cc.Label))
        //     console.log(item)
        //     let label = item.getChildByName("name").getComponent(cc.Label)
        //     label.string = "xxxxxxxxx"
        //     item.x = 0
        //     this.scrollView.content.addChild(item)
        // }
        frame.http.get(frame.util.make_url('/pet/all_pets'), {user_info: 1}, (res) => {
            console.log(res)
            if(res.status == 0){
                let pets_list = res.data.data
                for(let pet of pets_list){
                    var item = cc.instantiate(this.itemPrefab);
                    let icon = item.getChildByName("icon").getComponent(cc.Sprite)
                    cc.loader.loadRes("images/cattle",cc.SpriteFrame, (err, spriteFrame)=>{
                        console.log(err)
                        console.log(spriteFrame)
                        icon.spriteFrame = spriteFrame
                    })
                    let label = item.getChildByName("name").getComponent(cc.Label)
                    label.string = pet.pet_name
                    item.x = 0
                    this.scrollView.content.addChild(item)
                    this.pets_list.push({
                        name: pet.pet_name,
                        _id: pet._id,
                        pet_id: pet.pet_id
                    })
                }
            }
        })


        let nodeAni = new cc.Node()
        nodeAni.name = 'nodeAni'
        let sprite = nodeAni.addComponent(cc.Sprite)
        sprite.spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/gif/game_0000.png'))
        nodeAni.parent = this.node

        let animation = nodeAni.addComponent(cc.Animation)
        var frames = [];
        for(let i=0;i<16;i++){
            let order = '00000' + i
            let filename = 'game_' + order.substring(order.length - 5, order.length - 1) + '.png'
            frames[i] = new cc.SpriteFrame(cc.url.raw('resources/gif/'+filename));
        }
        let clip = cc.AnimationClip.createWithSpriteFrames(frames, 5)
        clip.name = 'anim_boom'
        clip.wrapMode = cc.WrapMode.Loop
        // clip.events.push({
        //     frame: 1,
        //     func: ''
        // })
        animation.addClip(clip)
        animation.play('anim_boom')




        // this.opt_item_set = []
        // //每次加载3页
        // for(let i=0;i<this.itemCount*3;i++){
        //
        //
        //     this.opt_item_set.push(item)
        // }
        //this.scrollView.node.on("scroll-ended", this.on_scroll_ended.bind(this), this);

    },

    start () {


        this.start_y = this.content.y
        this.start_index = 0


        // let petsListNode = this.node.getChildByName('PetsList')
        // petsListNode.width = 400
        // petsListNode.color = new cc.color(100,100,100,20)
        // let contentNode = petsListNode.getChildByName('view').getChildByName('content')
        // console.log(contentNode)
        // for(let i=0;i<10;i++){
        //     let labelNode = new cc.Node()
        //     let label = labelNode.addComponent('cc.Label')
        //     label.string = 'this is ' + i
        //     label.fontSize = 26
        //     labelNode.color = new cc.color(255,0,0,255)
        //     labelNode.parent = contentNode
        // }
    },

    update (dt) {
        //this.load_scroll_recode()
    },
    onBackClick(){
        cc.director.loadScene("home");
    },
    load_recode: function(){

        for(let i=0;i<this.pets_list.length;i++){
            console.log(this.opt_item_set[i])
            let label = this.opt_item_set[i].getComponent(cc.Label)//getChildByName('Label').
            label.string = this.pets_list[i].name
            this.opt_item_set[i].color = new cc.color(255,0,0,255)
        }
    },
    on_scroll_ended: function(){
        //this.load_scroll_recode()
        //this.scrollView.elastic = true; //加载结束后自动滚动回弹开启
    },
    load_scroll_recode:function(){
        //向下加载数据
        //当开始位置比value_set的长度小则代表没加载完

        // if(this.start_index + this.itemCount * 3 < this.pets_list.length &&
        //     this.content.y >= this.start_y + this.itemCount * 2 * this.itemHeight)//content超过2个PAGE的高度
        // {
            // //_autoScrolling在引擎源码中负责处理scrollview的滚动动作
            // if(this.scrollView._autoScrolling){ //等自动滚动结束后再加载防止滚动过快，直接跳到非常后的位置
            //     this.scrollView.elastic = false; //关闭回弹效果 美观
            //     return;
            // }
            // var down_loaded = this.itemCount;
            // this.start_index += down_loaded;
            //
            // if(this.start_index + this.PAGE_NUM * 3>this.pets_list.length)
            // {
            //     //超过数据范围的长度
            //     var out_len = this.start_index + this.PAGE_NUM * 3 - this.pets_list.length;
            //     down_loaded -= out_len;
            //     this.start_index -= out_len;
            // }
            // this.load_recode(this.start_index);
            // this.content.y -= down_loaded * this.itemHeight;
            // return;
        //}
        // //向上加载
        // if(this.start_index>0 && this.content.y<=this.start_y)
        // {
        //     if(this.scroll_view._autoScrolling){
        //         this.scroll_view.elastic = false;
        //         return;
        //     }
        //     var up_loaded = this.PAGE_NUM;
        //     this.start_index -= up_loaded;
        //     if(this.start_index<0){
        //         up_loaded +=this.start_index;
        //         this.start_index=0;
        //     }
        //     this.load_recode(this.start_index);
        //     this.content.y += up_loaded * this.HIGH;
        // }
    },
});
