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
            const progressBarClick = (): void => {
                const value: number = parseFloat(elementOfProgressBar.textContent!);
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
            const elementOfProgressBar = document.createElement('div');
            elementOfProgressBar.textContent = i.toString();
            elementOfProgressBar.setAttribute('type', 'button');
            elementOfProgressBar.classList.add('ng-slider__value');
            this.labels.append(elementOfProgressBar);
            const pixelsToMove: number = (options.endCord - options.startCord) / (options.max - options.min) * (i - options.min) - elementOfProgressBar.offsetWidth / 2;
            if (options.isVertical) {
                elementOfProgressBar.style.top = pixelsToMove + 'px';
            } else {
                elementOfProgressBar.style.left = pixelsToMove + 'px';
            }
            elementOfProgressBar.addEventListener('click', progressBarClick);
            this.values?.push(elementOfProgressBar);
        }
    }

    destroy() {
        while (this.labels.hasChildNodes()) {
            this.labels.firstChild?.remove();
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