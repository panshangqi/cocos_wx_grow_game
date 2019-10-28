// var Item = cc.Class({
//     name: 'Item',
//     properties: {
//         id: 0,
//         itemName: '',
//         itemPrice: 0,
//         iconSF: cc.SpriteFrame
//     }
// });

cc.Class({
    extends: cc.Component,
    properties: {
        items: {
            default: [],
            type: cc.Label
        },
        itemPrefab: cc.Prefab
    },
    onLoad(){
        let items = []
        for(let i=0;i<2;i++){
            items.push({
                id: i,
                itemName: 'name'+i
            })
        }
        for(let i=0;i<2;i++){
            // let item = cc.instantiate(this.itemPrefab);
            // this.node.addChild(item)
            // item.getComponent('ItemTemplate').init(items[i])
        }
    }
});