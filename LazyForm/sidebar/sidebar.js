(function(ctx) {
    ctx.sidebar = function Sidebar(data) {
        Item.call(this);
        this.data = data;
        this.model = new ctx.sidebar.model(this);   //  将Sidebar实例保存到其m、v、c层
        this.controller = new ctx.sidebar.controller(this);
        this.view = new ctx.sidebar.view(this);
        this.init();
    }
    inheritProto(ctx.sidebar, Item);
    ctx.sidebar.prototype.init = function() {
        //  初始化视图层
        this.view.init(this.data);
    }
    ctx.sidebar.prototype.getElement = function() {
        return this.view.el;
    }
})(LazyForm);