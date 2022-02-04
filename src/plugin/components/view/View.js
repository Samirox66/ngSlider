"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Track_1 = require("./Track");
var Handle_1 = require("./Handle");
var Labels_1 = require("./Labels");
var CurrentValue_1 = require("./CurrentValue");
var Observer_1 = require("../Observer/Observer");
var consonants_1 = require("../Model/consonants");
var View = /** @class */ (function (_super) {
    __extends(View, _super);
    function View(id) {
        var _this = _super.call(this) || this;
        _this.viewElements = {
            labels: new Labels_1["default"](),
            sliderTrack: new Track_1["default"](),
            firstHandle: new Handle_1["default"](),
            firstValue: new CurrentValue_1["default"](),
            secondHandle: new Handle_1["default"](),
            secondValue: new CurrentValue_1["default"]()
        };
        var slider = document.getElementById(id);
        if (!slider) {
            throw new Error('Wrong Id');
        }
        _this.slider = slider;
        return _this;
    }
    View.prototype.displaySlider = function (options) {
        var range = options.range, isValueVisible = options.isValueVisible, value2 = options.value2;
        this.slider.append(this.viewElements.labels.getLabels());
        this.slider.append(this.viewElements.sliderTrack.getSliderTrack());
        this.createHandleWithValue(this.viewElements.firstHandle, this.viewElements.firstValue);
        this.viewElements.labels.create(this.notifyObservers.bind(this), options);
        this.viewElements.sliderTrack.create();
        if (range === consonants_1.rangeModule.TRUE) {
            this.createHandleWithValue(this.viewElements.secondHandle, this.viewElements.secondValue);
            this.viewElements.secondValue.getCurrentValue().textContent = String(value2);
            this.changeValue(options, true);
        }
        if (isValueVisible === false) {
            this.viewElements.firstValue.hide();
            this.viewElements.secondValue.hide();
        }
        else {
            this.viewElements.firstValue.show();
            this.viewElements.secondValue.show();
        }
        this.changeValue(options, false);
        this.viewElements.sliderTrack.fillWithColor(options);
    };
    View.prototype.destroySlider = function () {
        var _a;
        this.viewElements.labels.destroy();
        while (this.slider.hasChildNodes()) {
            (_a = this.slider.firstChild) === null || _a === void 0 ? void 0 : _a.remove();
        }
    };
    View.prototype.setHandles = function (options) {
        this.viewElements.firstHandle.setHandle(this.notifyObservers.bind(this), options, false);
        this.viewElements.secondHandle.setHandle(this.notifyObservers.bind(this), options, true);
    };
    View.prototype.getViewElements = function () {
        return this.viewElements;
    };
    View.prototype.getSlider = function () {
        return this.slider;
    };
    View.prototype.changeValue = function (options, isSecondHandle) {
        var range = options.range, isValueVisible = options.isValueVisible, value2 = options.value2, value = options.value, isVertical = options.isVertical;
        if (isSecondHandle) {
            this.viewElements.secondValue.setTextOfCurrentValue(String(value2));
            this.viewElements.secondHandle.moveHandle(options, value2);
        }
        else {
            this.viewElements.firstValue.setTextOfCurrentValue(String(value));
            this.viewElements.firstHandle.moveHandle(options, value);
        }
        if (isValueVisible) {
            this.detachCurrentValues(value);
            if (range === consonants_1.rangeModule.TRUE && this.checkIfCurrentValuesIntersect(isVertical !== null && isVertical !== void 0 ? isVertical : false)) {
                this.uniteCurrentValues(value, value2);
            }
        }
    };
    View.prototype.makeVertical = function () {
        this.slider.classList.add('ng-slider_vertical');
        this.viewElements.labels.getLabels().classList.add('ng-slider__values_vertical');
        this.viewElements.firstValue.getCurrentValue().classList.add('ng-slider__current-value_vertical');
        this.viewElements.secondValue.getCurrentValue().classList.add('ng-slider__current-value_vertical');
        this.viewElements.sliderTrack.makeVertical();
        this.viewElements.firstHandle.makeVertical();
        this.viewElements.secondHandle.makeVertical();
    };
    View.prototype.makeHorizontal = function () {
        this.slider.classList.remove('ng-slider_vertical');
        this.viewElements.labels.getLabels().classList.remove('ng-slider__values_vertical');
        this.viewElements.firstValue.getCurrentValue().classList.remove('ng-slider__current-value_vertical');
        this.viewElements.secondValue.getCurrentValue().classList.remove('ng-slider__current-value_vertical');
        this.viewElements.sliderTrack.makeHorizontal();
        this.viewElements.firstHandle.makeHorizontal();
        this.viewElements.secondHandle.makeHorizontal();
    };
    View.prototype.createHandleWithValue = function (handle, value) {
        handle.getSliderHandle().append(value.getCurrentValue());
        this.slider.append(handle.getSliderHandle());
        value.getCurrentValue().classList.add('ng-slider__current-value');
        handle.getSliderHandle().classList.add('ng-slider__handle');
    };
    View.prototype.uniteCurrentValues = function (value, value2) {
        this.viewElements.secondValue.hide();
        this.viewElements.firstValue.getCurrentValue().textContent = value2 + "-" + value;
    };
    View.prototype.detachCurrentValues = function (value) {
        this.viewElements.secondValue.show();
        this.viewElements.firstValue.getCurrentValue().textContent = String(value);
    };
    View.prototype.checkIfCurrentValuesIntersect = function (isVertical) {
        var firstElement = this.viewElements.firstValue.getCurrentValue().getBoundingClientRect();
        var secondElement = this.viewElements.secondValue.getCurrentValue().getBoundingClientRect();
        var isFirstLowerThanSecond = isVertical && firstElement.top < secondElement.bottom;
        var isFirstMoreToTheLeftThanSecond = (isVertical === false && firstElement.left < secondElement.right);
        if (isFirstLowerThanSecond || isFirstMoreToTheLeftThanSecond) {
            return true;
        }
        return false;
    };
    return View;
}(Observer_1["default"]));
exports["default"] = View;
