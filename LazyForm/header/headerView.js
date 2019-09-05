(function(ctx) {
    ctx.header.view = function HeaderView(context) {
        Item.call(this);
        this.header = context;
    }
    inheritProto(ctx.header.view, Item);
    ctx.header.view.prototype.init = function(data) {
        this.el = document.createElement('div');
        this.el.className = 'header';
        this.noticeController(data);
    }
    ctx.header.view.prototype.noticeController = function(data) {
        this.header.controller.handle(data);
    }
    ctx.header.view.prototype.update = function(data) {
        if(data.length > 0) {
            var operationList = new Item({
                className: 'operation-list'
            }).init();
            for(var i = 0, len = data.length, item; i < len; i++) {
                item = new Item({
                    className: 'operation-item ' + data[i].icon
                }).init();
                item.el.setAttribute('title', data[i].name);
                operationList.add(item);
            }
            this.add(operationList);
        }
    }
})(LazyForm);