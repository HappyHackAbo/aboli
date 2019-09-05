(function(ctx) {
    ctx.sidebar.controller = function SidebarController(context) {
        if(!ctx.controllerList[this.constructor.name]) {
            ctx.controllerList[this.constructor.name] = this;
        }
        this.sidebar = context;
    }
    ctx.sidebar.controller.prototype.handle = function(data) {
        this.sidebar.model.handle(data);
    }
    ctx.sidebar.controller.prototype.receive = function(data) {
        this.sidebar.view.update(data);
    }
})(LazyForm);