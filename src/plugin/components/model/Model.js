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
var consonants_1 = require("./consonants");
var Observer_1 = require("../Observer/Observer");
var Model = /** @class */ (function (_super) {
    __extends(Model, _super);
    function Model(op) {
        var _this = _super.call(this) || this;
        _this.options = op;
        return _this;
    }
    Model.prototype.validateOptions = function () {
        var decimals = Model.countDecimals(this.options.step);
        var integerStep = this.options.step * Math.pow(10, decimals);
        var maxMinIntegerDifference = (this.options.max - this.options.min) * Math.pow(10, decimals);
        var isStepIncorrect = maxMinIntegerDifference % integerStep !== 0 || this.options.step <= 0;
        if (!this.options.value2) {
            this.options.value2 = this.options.min;
        }
        if (this.options.min >= this.options.max) {
            throw new Error('Min value should be less than max one');
        }
        if (isStepIncorrect) {
            throw new Error(this.options.step + " is incorrect step for " + this.options.id);
        }
        var value2isOutsideMaxMin = (this.options.value2 < this.options.min || this.options.value2 >= this.options.max);
        if (value2isOutsideMaxMin) {
            this.options.value2 = this.options.min;
        }
        var isValueMoreThanMax = this.options.value > this.options.max;
        var isValueLessThanMin = this.options.value < this.options.min;
        var isValue2NotLessThanValue = this.options.value2 >= this.options.value;
        if (isValueMoreThanMax || isValueLessThanMin || isValue2NotLessThanValue) {
            this.options.value = this.options.max;
        }
    };
    Model.prototype.setKey = function (key) {
        this.options.key = key;
    };
    Model.prototype.setCurrentCord = function (currentCord) {
        this.options.currentCord = currentCord;
    };
    Model.prototype.setCords = function (startCord, endCord) {
        this.options.startCord = startCord;
        this.options.endCord = endCord;
    };
    Model.prototype.calcValue = function () {
        var ratioForValuesAndCords = ((this.options.max - this.options.min) / (this.options.endCord - this.options.startCord));
        var value = ((this.options.currentCord - this.options.startCord) * ratioForValuesAndCords + this.options.min);
        var decimals = Model.countDecimals(this.options.step);
        var integerStep = this.options.step * Math.pow(10, decimals);
        var valueMinIntegerDifference = (value - this.options.min) * Math.pow(10, decimals);
        var isValueCloserToBiggerOne = valueMinIntegerDifference % integerStep > integerStep / 2;
        if (isValueCloserToBiggerOne) {
            value -= (valueMinIntegerDifference % integerStep) / Math.pow(10, decimals) - this.options.step;
        }
        else {
            value -= (valueMinIntegerDifference % integerStep) / Math.pow(10, decimals);
        }
        value = Number(value.toFixed(decimals));
        var valueIsInsideMaxMin = value >= this.options.min && value <= this.options.max;
        if (valueIsInsideMaxMin) {
            if (this.options.key === consonants_1.actionModule.SECOND_HANDLE) {
                if (value >= this.options.value) {
                    return;
                }
                this.options.value2 = value;
            }
            else {
                var valueIsLessThanValue2 = this.options.range === consonants_1.rangeModule.TRUE && value <= this.options.value2;
                if (valueIsLessThanValue2) {
                    return;
                }
                this.options.value = value;
            }
        }
    };
    Model.prototype.setFirstValue = function (value) {
        this.options.value = value;
    };
    Model.prototype.setSecondValue = function (value) {
        this.options.value2 = value;
    };
    Model.prototype.changeFirstValue = function (value) {
        var decimals = Model.countDecimals(this.options.step);
        var remainderOfValue = (value - this.options.min) % this.options.step;
        var isValueCloserToGreater = remainderOfValue > this.options.step / 2;
        if (value >= this.options.max) {
            this.options.value = this.options.max;
        }
        else if (this.options.range === consonants_1.rangeModule.TRUE) {
            if (value <= this.options.value2 + this.options.step) {
                this.options.value = this.options.value2 + this.options.step;
            }
            else if (isValueCloserToGreater) {
                this.options.value = value - remainderOfValue + this.options.step;
            }
            else {
                this.options.value = value - remainderOfValue;
            }
        }
        else if (value <= this.options.min) {
            this.options.value = this.options.min;
        }
        else if (isValueCloserToGreater) {
            this.options.value = value - remainderOfValue + this.options.step;
        }
        else {
            this.options.value = value - remainderOfValue;
        }
        this.options.value = Number(this.options.value.toFixed(decimals));
    };
    Model.prototype.changeSecondValue = function (value) {
        var decimals = Model.countDecimals(this.options.step);
        var remainderOfValue = (value - this.options.min) % this.options.step;
        var isValueCloserToGreater = remainderOfValue > this.options.step / 2;
        if (this.options.range === consonants_1.rangeModule.TRUE) {
            if (value <= this.options.min) {
                this.options.value2 = this.options.min;
            }
            else if (value >= this.options.value - this.options.step) {
                this.options.value2 = this.options.value - this.options.step;
            }
            else if (isValueCloserToGreater) {
                this.options.value2 = value - remainderOfValue + this.options.step;
            }
            else {
                this.options.value2 = value - remainderOfValue;
            }
            this.options.value2 = parseFloat(this.options.value2.toFixed(decimals));
        }
    };
    Model.prototype.setMaxValue = function (max) {
        if (max > this.options.min) {
            var decimals = Model.countDecimals(this.options.step);
            var isStepMultiplier = (((max - this.options.min) * Math.pow(10, decimals)) % (this.options.step * Math.pow(10, decimals)) === 0);
            if (isStepMultiplier) {
                this.options.max = max;
                if (this.options.value > this.options.max) {
                    this.options.value = this.options.max;
                }
                var value2isGreaterThanMax = this.options.range === consonants_1.rangeModule.TRUE && this.options.value2 > this.options.max;
                if (value2isGreaterThanMax) {
                    this.options.value2 = this.options.min;
                }
                return '';
            }
            return 'The step should be a multiplier of the difference between max and min values';
        }
        return 'Max value should be more than min one';
    };
    Model.prototype.setMinValue = function (min) {
        if (min < this.options.max) {
            var decimals = Model.countDecimals(this.options.step);
            var isStepMultiplier = (((this.options.max - min) * Math.pow(10, decimals)) % (this.options.step * Math.pow(10, decimals)) === 0);
            if (isStepMultiplier) {
                this.options.min = min;
                var value2IsLessThanMin = this.options.range === consonants_1.rangeModule.TRUE && this.options.value2 < this.options.min;
                if (value2IsLessThanMin) {
                    this.options.value2 = this.options.min;
                }
                else if (this.options.value < this.options.min) {
                    this.options.value = this.options.min;
                }
                return '';
            }
            return 'The step should be a multiplier of the difference between max and min values';
        }
        return 'Min value should be less than max one';
    };
    Model.prototype.setStep = function (step) {
        var decimals = Model.countDecimals(step);
        var isStepMultiplier = (((this.options.max - this.options.min) * Math.pow(10, decimals)) % (step * Math.pow(10, decimals)) === 0);
        if (isStepMultiplier) {
            this.options.step = step;
            return '';
        }
        return 'The step should be a multiplier of the difference between max and min values';
    };
    Model.prototype.setRange = function (range) {
        var rangeIsDefined = range === consonants_1.rangeModule.MIN || range === consonants_1.rangeModule.MAX || range === consonants_1.rangeModule.TRUE;
        if (rangeIsDefined) {
            this.options.range = range;
        }
        else {
            this.options.range = consonants_1.rangeModule.FALSE;
        }
    };
    Model.prototype.setVisibility = function (isVisible) {
        this.options.isValueVisible = isVisible;
    };
    Model.prototype.setMode = function (isVertical) {
        this.options.isVertical = isVertical;
    };
    Model.prototype.getOptions = function () {
        return this.options;
    };
    Model.countDecimals = function (value) {
        if (String(value).includes('.')) {
            return String(value).split('.')[1].length;
        }
        return 0;
    };
    return Model;
}(Observer_1["default"]));
exports["default"] = Model;
