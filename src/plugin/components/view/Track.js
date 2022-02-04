"use strict";
exports.__esModule = true;
var consonants_1 = require("../Model/consonants");
var Track = /** @class */ (function () {
    function Track() {
        this.trackElement = document.createElement('div');
    }
    Track.prototype.create = function () {
        this.trackElement.classList.add('ng-slider__track');
    };
    Track.prototype.fillWithColor = function (_a) {
        var _this = this;
        var value = _a.value, min = _a.min, max = _a.max, isVertical = _a.isVertical, value2 = _a.value2, range = _a.range;
        var fill = {
            min: function () {
                var percentToFill = ((value - min) / (max - min)) * 100;
                if (isVertical) {
                    _this.trackElement.style.top = '0%';
                    _this.trackElement.style.height = percentToFill + "%";
                }
                else {
                    _this.trackElement.style.left = '0%';
                    _this.trackElement.style.width = percentToFill + "%";
                }
            },
            max: function () {
                var percentToFill = ((max - value) / (max - min)) * 100;
                var percentToMoveLeft = (((value - min) / (max - min)) * 100);
                if (isVertical) {
                    _this.trackElement.style.top = percentToMoveLeft + "%";
                    _this.trackElement.style.height = percentToFill + "%";
                }
                else {
                    _this.trackElement.style.left = percentToMoveLeft + "%";
                    _this.trackElement.style.width = percentToFill + "%";
                }
            },
            "true": function () {
                var percentToFill = (((value - value2) / (max - min)) * 100);
                var percentToMove = ((value2 - min) / (max - min)) * 100;
                if (isVertical) {
                    _this.trackElement.style.top = percentToMove + "%";
                    _this.trackElement.style.height = percentToFill + "%";
                }
                else {
                    _this.trackElement.style.left = percentToMove + "%";
                    _this.trackElement.style.width = percentToFill + "%";
                }
            },
            "default": function () {
                if (isVertical) {
                    _this.trackElement.style.height = '0%';
                }
                else {
                    _this.trackElement.style.width = '0%';
                }
            }
        };
        switch (range) {
            case consonants_1.rangeModule.MIN: {
                fill.min();
                break;
            }
            case consonants_1.rangeModule.MAX: {
                fill.max();
                break;
            }
            case consonants_1.rangeModule.TRUE: {
                fill["true"]();
                break;
            }
            default: {
                fill["default"]();
            }
        }
    };
    Track.prototype.hide = function () {
        this.trackElement.style.width = '0';
    };
    Track.prototype.makeVertical = function () {
        this.trackElement.style.width = '5px';
        this.trackElement.style.left = '0';
        this.trackElement.classList.add('ng-slider__track_vertical');
    };
    Track.prototype.makeHorizontal = function () {
        this.trackElement.style.height = '5px';
        this.trackElement.style.top = '0';
        this.trackElement.classList.remove('ng-slider__slider-track_vertical');
    };
    Track.prototype.getSliderTrack = function () {
        return this.trackElement;
    };
    return Track;
}());
exports["default"] = Track;
