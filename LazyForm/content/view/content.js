(function(ctx) {
    ctx.content = function Content() {
        Controller.call(this);
        this.designArea = null;
        this.propertyArea = null;
        this.init();
    }
    inheritProto(ctx.content, Controller);
    ctx.content.prototype.init = function() {
        this.el = document.createElement('div');
        this.el.className = 'content';
        this.designArea = new Controller();
        this.designArea.el = document.createElement('div');
        this.designArea.getElement().className = 'design-area';
        this.propertyArea = new Controller();
        this.propertyArea.el = document.createElement('div');
        this.propertyArea.getElement().className = 'property-area';
        this.add(this.designArea)
            .add(this.propertyArea);
    }
})(LazyForm);