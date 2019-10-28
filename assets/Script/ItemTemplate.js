
cc.Class({
    extends: cc.Component,
    properties: {
        itemName: cc.Label
    },
    //data: {id, itemName, itemPrice, iconSF}
    init: function (data) {
        this.itemName = data.itemName
    }
});