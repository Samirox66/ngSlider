import { Options } from "../Model/Model";

class Labels {
    private labels: HTMLDivElement;
    private values: HTMLDivElement[];

    constructor() {
        this.labels = document.createElement('div');
        this.values = new Array;
    }

    create(notifyObservers: Function, options: Options) {
        this.labels.classList.add('ng-slider__values')
        const countDecimals = (value: number): number => {
            if (value.toString().includes('.')) {
                return value.toString().split('.')[1].length
            }
            return 0;
        }
        const decimals: number = countDecimals(options.step);
        let barStep: number = options.step;
        while ((options.max - options.min) / barStep > 7) {
            barStep *= 2;
        }
        barStep = parseFloat(barStep.toFixed(decimals));
        for (let i = options.min; i <= options.max; i = parseFloat((i + barStep).toFixed(decimals))) {
            this.createLabel(i, options, notifyObservers);
        }
    }

    private createLabel(i: number, options: Options, notifyObservers: Function) {
        const label = document.createElement('div');
        label.textContent = i.toString();
        label.setAttribute('type', 'button');
        label.classList.add('ng-slider__value');
        const progressBarClick = (): void => {
            const value: number = parseFloat(label.textContent!);
            options.key = 'progressBarFirst';
            if (options.value2) {
                if (value > options.value2) {
                    options.value = value;
                } else if (value < options.value2) {
                    options.key = 'progressBarSecond';
                    options.value2 = value;
                }
            } else {
                options.value = value;
            }
            notifyObservers(options);
        }
        this.labels.append(label);
        const pixelsToMove: number = (options.endCord - options.startCord) / (options.max - options.min) * (i - options.min) - label.offsetWidth / 2;
        if (options.isVertical) {
            label.style.top = pixelsToMove + 'px';
        } else {
            label.style.left = pixelsToMove + 'px';
        }
        label.addEventListener('click', progressBarClick);
        this.values?.push(label);
    }

    destroy() {
        while (this.labels.hasChildNodes()) {
            this.labels.firstChild?.remove();
            this.values.pop();
        }
    }

    get getLabels() {
        return this.labels;
    }

    get getValues() {
        return this.values;
    }
}

export default Labels;