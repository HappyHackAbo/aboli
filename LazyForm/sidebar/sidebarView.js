(function(ctx) {
    ctx.sidebar.view = function SidebarView(context) {
        Item.call(this);
        this.sidebar = context;
    }
    inheritProto(ctx.sidebar.view, Item);
    ctx.sidebar.view.prototype.init = function(data) {
        this.el = document.createElement('div');
        this.el.className = 'sidebar';
        this.noticeController(data);
    }
    ctx.sidebar.view.prototype.noticeController = function(data) {
        this.sidebar.controller.handle(data);
    }
    ctx.sidebar.view.prototype.update = function(data) {
        var searchControl = new Item({
            className: 'control-search'
        }).init();
        var searchInput = new Item({
            tagName: 'input',
            className: 'control-search-input'
        }).init();
        searchControl.add(searchInput);
        this.add(searchControl);
        if(data.length > 0) {
            var controlList = new Item({
                tagName: 'ul',
                className: 'control-list'
            }).init();
            for(var i = 0, len = data.length, controlContriner, icon, span, aContainer; i < len; i++) {
                controlContriner = new Item({
                    tagName: 'li',
                    className: 'control-container'
                }).init();
                icon = new Item({
                    tagName: 'i',
                    className: 'control-icon ' + data[i].icon
                }).init();
                span = new Item({
                    tagName: 'span',
                    className: 'control-text'
                }).init();
                span.el.innerHTML = data[i].name;
                aContainer = new Item({
                    tagName: 'a',
                    className: 'control-a'
                }).init();
                aContainer.add(icon)
                          .add(span);
                controlContriner.add(aContainer);
                controlList.add(controlContriner);
            }
            this.add(controlList);
        }
    }
})(LazyForm);