"use strict";
exports.__esModule = true;
var consonants_1 = require("../Model/consonants");
var Labels = /** @class */ (function () {
    function Labels() {
        this.labels = document.createElement('div');
    }
    Labels.prototype.create = function (notifyObservers, options) {
        var step = options.step, min = options.min, max = options.max;
        this.labels.classList.add('ng-slider__values');
        var countDecimals = function (value) {
            if (String(value).includes('.')) {
                return String(value).split('.')[1].length;
            }
            return 0;
        };
        var decimals = countDecimals(step);
        var barStep = step;
        while ((max - min) / barStep > 7) {
            barStep *= 2;
        }
        barStep = Number(barStep.toFixed(decimals));
        for (var i = min; i <= max; i = Number((i + barStep).toFixed(decimals))) {
            this.createLabel(i, options, notifyObservers);
        }
    };
    Labels.handleLabelsClick = function (_a, label, notifyObservers) {
        var range = _a.range, value2 = _a.value2;
        var labelsOptions = { key: consonants_1.actionModule.FIRST_LABELS };
        if (label.textContent) {
            var value = Number(label.textContent);
            if (range === consonants_1.rangeModule.TRUE) {
                if (value > value2) {
                    labelsOptions.value = value;
                }
                else if (value < value2) {
                    labelsOptions.key = consonants_1.actionModule.SECOND_LABELS;
                    labelsOptions.value2 = value;
                }
            }
            else {
                labelsOptions.value = value;
            }
            notifyObservers(labelsOptions);
        }
    };
    Labels.prototype.destroy = function () {
        var _a;
        while (this.labels.hasChildNodes()) {
            (_a = this.labels.firstChild) === null || _a === void 0 ? void 0 : _a.remove();
        }
    };
    Labels.prototype.getLabels = function () {
        return this.labels;
    };
    Labels.prototype.createLabel = function (i, options, notifyObservers) {
        var min = options.min, max = options.max, endCord = options.endCord, startCord = options.startCord, isVertical = options.isVertical;
        var label = document.createElement('div');
        label.textContent = String(i);
        label.setAttribute('type', 'button');
        label.classList.add('ng-slider__value');
        this.labels.append(label);
        if (isVertical) {
            var pixelsToMove = (((i - min) / (max - min) - label.offsetHeight / 2 / (endCord - startCord)) * 100);
            label.style.top = pixelsToMove + "%";
        }
        else {
            var pixelsToMove = (((i - min) / (max - min) - label.offsetWidth / 2 / (endCord - startCord)) * 100);
            label.style.left = pixelsToMove + "%";
        }
        label.addEventListener('click', Labels.handleLabelsClick.bind(this, options, label, notifyObservers));
    };
    return Labels;
}());
exports["default"] = Labels;
