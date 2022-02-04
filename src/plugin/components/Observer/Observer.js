"use strict";
exports.__esModule = true;
var Observer = /** @class */ (function () {
    function Observer() {
        this.observers = [];
    }
    Observer.prototype.addObserver = function (observerToAdd) {
        this.observers.push(observerToAdd);
    };
    Observer.prototype.removeObserver = function (observerToDelete) {
        var _this = this;
        this.observers.forEach(function (observer, index) {
            if (String(observer) === String(observerToDelete)) {
                _this.observers.splice(index, 1);
            }
        });
    };
    Observer.prototype.notifyObservers = function (options) {
        this.observers.forEach(function (observer) {
            observer(options);
        });
    };
    return Observer;
}());
exports["default"] = Observer;
