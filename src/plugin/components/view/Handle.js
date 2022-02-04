"use strict";
exports.__esModule = true;
var consonants_1 = require("../Model/consonants");
var Handle = /** @class */ (function () {
    function Handle() {
        this.handleElement = document.createElement('div');
    }
    Handle.prototype.setHandle = function (notifyObservers, options, isSecondHandle) {
        document.ondragstart = function () { return false; };
        document.body.onselectstart = function () { return false; };
        this.handleElement.addEventListener('pointerdown', this.handleHandleMouseDown.bind(this, options, isSecondHandle, notifyObservers));
    };
    Handle.prototype.handleHandleMouseDown = function (_a, isSecondHandle, notifyObservers) {
        var _this = this;
        var isVertical = _a.isVertical;
        var handleHandleMouseMove = function (event) {
            var handleOptions = { key: consonants_1.actionModule.FIRST_HANDLE };
            if (isSecondHandle) {
                handleOptions.key = consonants_1.actionModule.SECOND_HANDLE;
            }
            if (isVertical) {
                handleOptions.currentCord = event.pageY;
            }
            else {
                handleOptions.currentCord = event.pageX;
            }
            notifyObservers(handleOptions);
        };
        var handleHandleMouseUp = function () {
            document.removeEventListener('pointermove', handleHandleMouseMove);
            _this.handleElement.removeEventListener('pointerup', handleHandleMouseUp);
        };
        document.addEventListener('pointermove', handleHandleMouseMove);
        document.addEventListener('pointerup', handleHandleMouseUp);
    };
    Handle.prototype.getSliderHandle = function () {
        return this.handleElement;
    };
    Handle.prototype.moveHandle = function (options, value) {
        var moveHandle = (((value - options.min) / (options.max - options.min) - this.handleElement.offsetWidth / 2 / (options.endCord - options.startCord)) * 100);
        if (options.isVertical) {
            this.handleElement.style.top = moveHandle + "%";
        }
        else {
            this.handleElement.style.left = moveHandle + "%";
        }
    };
    Handle.prototype.makeVertical = function () {
        this.handleElement.style.left = '-5px';
        this.handleElement.classList.add('ng-slider__handle_vertical');
    };
    Handle.prototype.makeHorizontal = function () {
        this.handleElement.style.top = '-5px';
        this.handleElement.classList.remove('ng-slider__handle_vertical');
    };
    Handle.prototype.hide = function () {
        this.handleElement.style.display = 'none';
    };
    Handle.prototype.show = function () {
        this.handleElement.style.display = 'block';
    };
    return Handle;
}());
exports["default"] = Handle;
