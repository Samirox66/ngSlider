"use strict";
exports.__esModule = true;
var CurrentValue = /** @class */ (function () {
    function CurrentValue() {
        this.currentValue = document.createElement('div');
    }
    CurrentValue.prototype.getCurrentValue = function () {
        return this.currentValue;
    };
    CurrentValue.prototype.setTextOfCurrentValue = function (value) {
        this.currentValue.textContent = value;
    };
    CurrentValue.prototype.hide = function () {
        this.currentValue.style.display = 'none';
    };
    CurrentValue.prototype.show = function () {
        this.currentValue.style.display = 'block';
    };
    return CurrentValue;
}());
exports["default"] = CurrentValue;
