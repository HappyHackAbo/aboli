(function(ctx) {
    ctx.sidebar = function Sidebar() {
        Controller.call(this);
        this.init();
    }
    inheritProto(ctx.sidebar, Controller);
    ctx.sidebar.prototype.init = function() {
        this.el = document.createElement('div');
        this.el.className = 'sidebar';
    }
})(LazyForm);