"use strict";
exports.__esModule = true;
var consonants_1 = require("../Model/consonants");
var Presenter = /** @class */ (function () {
    function Presenter(view, model) {
        this.view = view;
        this.model = model;
    }
    Presenter.prototype.getModel = function () {
        return this.model;
    };
    Presenter.prototype.getView = function () {
        return this.view;
    };
    Presenter.prototype.onInit = function () {
        this.model.validateOptions();
        this.view.addObserver(this.handleInputListener.bind(this));
        this.view.addObserver(this.progressBarClickListener.bind(this));
        if (this.model.getOptions().isVertical) {
            this.view.makeVertical();
        }
        this.setCords();
        this.view.displaySlider(this.model.getOptions());
        this.view.setHandles(this.model.getOptions());
        window.addEventListener('resize', this.handleResizeWindow.bind(this));
    };
    Presenter.prototype.handleResizeWindow = function () {
        this.setCords();
        this.rewriteSlider();
    };
    Presenter.prototype.handleInputListener = function (_a) {
        var key = _a.key, currentCord = _a.currentCord;
        var keyIsNotRelatedToHandle = key !== consonants_1.actionModule.FIRST_HANDLE && key !== consonants_1.actionModule.SECOND_HANDLE;
        if (keyIsNotRelatedToHandle) {
            return;
        }
        if (currentCord) {
            this.model.setCurrentCord(currentCord);
        }
        this.model.setKey(key);
        this.model.calcValue();
        this.model.notifyObservers(this.model.getOptions());
        this.updateSlider(key === consonants_1.actionModule.SECOND_HANDLE);
    };
    Presenter.prototype.progressBarClickListener = function (_a) {
        var key = _a.key, value = _a.value, value2 = _a.value2;
        var keyIsNotRelatedToLabels = key !== consonants_1.actionModule.FIRST_LABELS && key !== consonants_1.actionModule.SECOND_LABELS;
        if (keyIsNotRelatedToLabels) {
            return;
        }
        this.model.setKey(key);
        if (value) {
            this.model.setFirstValue(value);
        }
        else if (value2) {
            this.model.setSecondValue(value2);
        }
        this.model.notifyObservers(this.model.getOptions());
        this.updateSlider(key === consonants_1.actionModule.SECOND_LABELS);
    };
    Presenter.prototype.changeFirstValue = function (value) {
        if (typeof value === 'string') {
            this.model.changeFirstValue(Number(value));
        }
        else if (typeof value === 'number') {
            this.model.changeFirstValue(value);
        }
        this.model.getOptions().key = consonants_1.actionModule.FIRST_HANDLE;
        this.updateSlider(false);
    };
    Presenter.prototype.changeSecondValue = function (value) {
        if (typeof (value) === 'string') {
            this.model.changeSecondValue(Number(value));
        }
        else if (typeof (value) === 'number') {
            this.model.changeSecondValue(value);
        }
        this.model.getOptions().key = consonants_1.actionModule.SECOND_HANDLE;
        this.updateSlider(true);
    };
    Presenter.prototype.changeMaxValue = function (value) {
        var error = '';
        if (typeof (value) === 'string') {
            error = this.model.setMaxValue(Number(value));
        }
        else if (typeof (value) === 'number') {
            error = this.model.setMaxValue(value);
        }
        this.rewriteSlider();
        return error;
    };
    Presenter.prototype.changeMinValue = function (value) {
        var error = '';
        if (typeof (value) === 'string') {
            error = this.model.setMinValue(Number(value));
        }
        else if (typeof (value) === 'number') {
            error = this.model.setMinValue(value);
        }
        this.rewriteSlider();
        return error;
    };
    Presenter.prototype.changeStep = function (step) {
        var error = '';
        if (typeof (step) === 'string') {
            error = this.model.setStep(Number(step));
        }
        else if (typeof (step) === 'number') {
            error = this.model.setStep(step);
        }
        this.rewriteSlider();
        return error;
    };
    Presenter.prototype.changeRange = function (range) {
        this.model.setRange(range);
        var rangeIsDefined = range === consonants_1.rangeModule.TRUE || range === consonants_1.rangeModule.MAX || range === consonants_1.rangeModule.MIN;
        if (!rangeIsDefined) {
            this.view.getViewElements().sliderTrack.hide();
        }
        this.rewriteSlider();
    };
    Presenter.prototype.changeMode = function (isVertical) {
        if (isVertical) {
            this.view.makeVertical();
        }
        else {
            this.view.makeHorizontal();
        }
        this.model.setMode(isVertical);
        this.setCords();
        this.rewriteSlider();
    };
    Presenter.prototype.changeVisibilityOfValues = function (isVisible) {
        this.model.setVisibility(isVisible);
        this.rewriteSlider();
    };
    Presenter.prototype.rewriteSlider = function () {
        this.view.destroySlider();
        this.view.displaySlider(this.model.getOptions());
    };
    Presenter.prototype.updateSlider = function (isSecond) {
        this.view.changeValue(this.model.getOptions(), isSecond);
        this.view.getViewElements().sliderTrack.fillWithColor(this.model.getOptions());
    };
    Presenter.prototype.setCords = function () {
        var sliderRect = this.view.getSlider().getBoundingClientRect();
        if (this.model.getOptions().isVertical) {
            this.model.setCords(sliderRect.top + window.scrollY, sliderRect.bottom + window.scrollY);
        }
        else {
            this.model.setCords(sliderRect.left + window.scrollX, sliderRect.right + window.scrollX);
        }
    };
    return Presenter;
}());
exports["default"] = Presenter;
