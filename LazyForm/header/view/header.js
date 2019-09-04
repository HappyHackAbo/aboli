(function(ctx) {
    ctx.header = function Header() {
        Controller.call(this);
        this.init();
    }
    inheritProto(ctx.header, Controller);
    ctx.header.prototype.init = function() {
        this.el = document.createElement('div');
        this.el.className = 'header';
    }
})(LazyForm);