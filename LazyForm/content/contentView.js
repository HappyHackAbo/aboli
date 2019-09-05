(function(ctx) {
    ctx.content.view = function ContentView(context) {
        Item.call(this);
        this.content = context;
    }
    inheritProto(ctx.content.view, Item);
    ctx.content.view.prototype.init = function(data) {
        this.el = document.createElement('div');
        this.el.className = 'content';
        this.noticeController(data);
    }
    ctx.content.view.prototype.noticeController = function(data) {
        this.content.controller.handle(data);
    }
    ctx.content.view.prototype.update = function(data) {
        var tabContainer = new Item({
            className: 'tab-container'
        }).init();
        var tabList = new Item({
            className: 'tab-list'
        }).init();
        for(var i = 0, len = data.length, tabItem; i < len; i++) {
            tabItem = new Item({
                className: 'tab-item'
            }).init();
            tabItem.el.innerHTML = data[i].name;
            tabList.add(tabItem);
        }
        var operationContainer = new Item({
            className: 'tab-operation'
        }).init();
        tabContainer.add(tabList)
                    .add(operationContainer);
        this.add(tabContainer);
    }
})(LazyForm);