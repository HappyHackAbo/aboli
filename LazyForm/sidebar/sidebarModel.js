(function(ctx) {
    ctx.sidebar.model = function SidebarModel(context) {
        if(!ctx.modelList[this.constructor.name]) {
            ctx.modelList[this.constructor.name] = this;
        }
        this.sidebar = context;
    }
    ctx.sidebar.model.prototype.handle = function(data) {
        for(var i = 0, len = data.length; i < len; i++) {
            data[i].icon = 'lazyform-' + data[i].icon;
        }
        this.noticeController(data);
    }
    ctx.sidebar.model.prototype.noticeController = function(data) {
        this.sidebar.controller.receive(data);
    }
})(LazyForm);