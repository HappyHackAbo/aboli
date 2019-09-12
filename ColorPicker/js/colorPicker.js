(function() {
    this.ColorPicker = function() {
        Container.call(this);
        this.hsv = [0, 0, 0];
        this.rgb = [0, 0, 0];
        this.svFieldHsv = [0, 1, 1];
        this.svFieldRgb = [0, 0, 0];
    }
    inheritProto(ColorPicker, Container);
    ColorPicker.prototype.init = function() {
        this.element = document.createElement('div');
        this.element.className = 'color-picker-container';
        var _container = createContainer(),
            _self = this;
        Event.call(_container);
        extend(_container, Event.prototype);
        createVal.call(this);
        createSV.call(_container);
        createH.call(_container);
        _container.addEvent('sv-change', function(e) {
            //  暴露出饱和度change接口
            _self.onSVChange(e);
        });
        _container.addEvent('h-change', function(e) {
            //  暴露出色相change接口
            _self.onHChange(e);
        });
        this.add(_container);
    }
    ColorPicker.prototype.select = function(opt) {
        if(opt && typeof opt !== 'undefined') {
            this.hsv[0] = opt.h || 0;
            this.hsv[1] = opt.s || 0;
            this.hsv[2] = opt.b || 0;
            this.svFieldHsv[0] = opt.hue || 0;
        }
        if(this.children[0].children[0].getElement().value !== '') {
            var val = this.children[0].children[0].getElement().value,
                regRgb = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/,
                r = val.replace(regRgb, '$1'),
                g = val.replace(regRgb, '$2'),
                b = val.replace(regRgb, '$3');
                this.hsv = rgb2hsv(r, g, b);
                this.svFieldHsv[0] = this.hsv[0];
        }
        this.svFieldRgb = hsv2rgb(this.svFieldHsv[0], this.svFieldHsv[1], this.svFieldHsv[2]);
        this.updateSVField();
        this.rgb = hsv2rgb(this.hsv[0], this.hsv[1], this.hsv[2]);
        this.updateSVPointer();
        this.updateVal(opt);
        this.children[1].children[0].getElement().style.cssText += ';left: ' + this.hsv[1] * 255 + 'px;top: ' + (255 - this.hsv[2] * 255) + 'px;';
        this.children[1].children[2].children[0].getElement().style.cssText += ';top: ' + (255 - this.hsv[0]) + 'px;';
        document.body.appendChild(this.element);
        return this;
    }
    ColorPicker.prototype.updateSVField = function() {
        this.children[1].children[1].getElement().style.cssText = ';background: -webkit-linear-gradient(left, rgb(255, 255, 255) 0%, rgb(' + ~~this.svFieldRgb[0] + ', ' + ~~this.svFieldRgb[1] + ', ' + ~~this.svFieldRgb[2] + ') 100%)';
    }
    ColorPicker.prototype.updateSVPointer = function() {
        this.children[1].children[0].getElement().style.cssText += ';background-color: rgb(' + ~~this.rgb[0] + ', ' + ~~this.rgb[1] + ', ' + ~~this.rgb[2] + ')';
    }
    ColorPicker.prototype.updateVal = function() {
        var _hsv_temp = [0, 0, 0];
        if(this.hsv[1] < 0.5 && this.hsv[2] > 0.5) {
            _hsv_temp = [this.hsv[0], 1, 0];
        } else {
            _hsv_temp = [this.hsv[0], 0, 1];
        }
        var _rgb_temp = hsv2rgb(_hsv_temp[0], _hsv_temp[1], _hsv_temp[2]);
        this.children[0].children[0].getElement().style.cssText += ';text-shadow: 0 0 5px;color: rgb(' + ~~_rgb_temp[0] + ', ' + ~~_rgb_temp[1] + ', ' + ~~_rgb_temp[2] + ');background-color: rgb(' + ~~this.rgb[0] + ', ' + ~~this.rgb[1] + ', ' + ~~this.rgb[2] + ')';
        this.children[1].children[0].getElement().style.cssText += ';border-color: rgb(' + ~~_rgb_temp[0] + ', ' + ~~_rgb_temp[1] + ', ' + ~~_rgb_temp[2] + ')';
        this.children[0].children[0].getElement().value = 'rgb(' + ~~this.rgb[0] + ', ' + ~~this.rgb[1] + ', ' + ~~this.rgb[2] + ')';
    }
    ColorPicker.prototype.onSVChange = function(callVal) {
        arguments.callee.call(this, callVal);
        return this;
    }
    ColorPicker.prototype.onHChange = function(callVal) {
        arguments.callee.call(this, callVal);
        return this;
    }
    
    function createVal() {
        var _container = new Container('val-container'),
            _input = new Item('val', 'input');
        Event.call(_input);
        extend(_input, Event.prototype);
        _input.addEvent('blur', this.select.bind(this));
        _container.add(_input);
        this.add(_container);
    }
    
    function createContainer() {
        var _container = new Container('picker-container');
        return _container;
    }
    
    function createSV() {
        var _pointer = new Item('pointer'),
            _saturationRange = new Container('saturation-range'),
            _cover = new Item('cover'),
            _self = this;
        Event.call(_pointer);
        extend(_pointer, Event.prototype);
        _saturationRange.add(_cover);
    
        function cursorDown(e) {
            var _top = typeof e.target.style.top === 'undefined' ? 255 : parseFloat(e.target.style.top),
                _left = typeof e.target.style.left === 'undefined' ? 0 : parseFloat(e.target.style.left),
                _distanceY, _distanceX, realTop, realLeft;
    
            function move(e2) {
                _distanceY = e2.clientY - e.clientY;
                _distanceX = e2.clientX - e.clientX;
                realTop = _top + _distanceY;
                realLeft = _left + _distanceX;
                realTop < 0 && (realTop = 0);
                realTop > 255 && (realTop = 255);
                realLeft < 0 && (realLeft = 0);
                realLeft > 255 && (realLeft = 255);
                e.target.style.top = realTop + 'px';
                e.target.style.left = realLeft + 'px';
                _self.parent.hsv[1] = realLeft / 255;
                _self.parent.hsv[2] = (255 - realTop) / 255;
                _self.parent.rgb = hsv2rgb(_self.parent.hsv[0], _self.parent.hsv[1], _self.parent.hsv[2]);
                _self.parent.updateSVPointer();
                _self.parent.updateVal();
            }
    
            function up() {
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', up);
                _self.triggerEvent('sv-change', [realLeft / 255, (255 - realTop) / 255]);
            }
            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', up);
        }
        _pointer.addEvent('mousedown', cursorDown);
        this.add(_pointer)
            .add(_saturationRange);
    }
    
    function createH() {
        var _hueRange = new Container('hue-range'),
            _cursor = new Item('cursor'),
            _self = this;
        Event.call(_cursor);
        extend(_cursor, Event.prototype);
    
        function cursorDown(e) {
            var _top = typeof e.target.style.top === 'undefined' ? 255 : parseFloat(e.target.style.top),
                _distance, realTop;
    
            function move(e2) {
                _distance = e2.clientY - e.clientY;
                realTop = _top + _distance;
                realTop < 0 && (realTop = 0);
                realTop > 255 && (realTop = 255);
                e.target.style.top = realTop + 'px';
                _self.parent.svFieldHsv[0] = 255 - realTop;
                _self.parent.svFieldRgb = hsv2rgb(_self.parent.svFieldHsv[0], _self.parent.svFieldHsv[1], _self.parent.svFieldHsv[2]);
                _self.parent.updateSVField();
                _self.parent.hsv[0] = 255 - realTop;
                _self.parent.rgb = hsv2rgb(_self.parent.hsv[0], _self.parent.hsv[1], _self.parent.hsv[2]);
                _self.parent.updateSVPointer();
                _self.parent.updateVal();
            }
    
            function up() {
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', up);
                _self.triggerEvent('h-change', 255 - realTop);
            }
            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', up);
        }
        _cursor.addEvent('mousedown', cursorDown);
        _hueRange.add(_cursor);
        this.add(_hueRange);
    }
    
    function hsv2rgb(h, s, v) {
        h = h / 255 * 360;
        var hi = Math.floor(h / 60) % 6,
            f = h / 60 - Math.floor(h / 60),
            p = v * (1 - s),
            q = v * (1 - f * s),
            t = v * (1 - (1 - f) * s),
            c = [
            [v, t, p],
            [q, v, p],
            [p, v, t],
            [p, q, v],
            [t, p, v],
            [v, p, q]
        ][hi];
        return [c[0] * 255, c[1] * 255, c[2] * 255];
    }
    
    function rgb2hsv(r, g, b) {
        var max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            h, s, v,
            d = max - min;
        if (max == min) {
            h = 0;
        } else if (max == r) {
            h = 60 * ((g - b) / d);
        } else if (max == g) {
            h = 60 * ((b - r) / d) + 120;
        } else {
            h = 60 * ((r - g) / d) + 240;
        }
        s = max == 0 ? 0 : (1 - min / max);
        v = max;
        if(h < 0) {
            h += 360;
        }
        return [h * 255 / 360, s, v / 255];
    }
})()

var aa = new ColorPicker();
aa.select(
    // {
    //     h: 120,
    //     s: 1,
    //     b: 1
    // }
);
aa.onHChange = function(e) {};
aa.onSVChange = function(e) {};