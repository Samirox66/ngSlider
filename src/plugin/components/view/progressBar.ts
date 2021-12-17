import { Options } from "../Model/Model";

class ProgressBar {
    private progressBar: HTMLDivElement;
    private values: HTMLDivElement[];

    constructor() {
        this.progressBar = document.createElement('div');
        this.values = new Array;
    }
    create(notifyObservers: Function, options: Options) {
        this.progressBar.classList.add('ng-slider__values')
        for (let i = options.min; i <= options.max; i += (options.max - options.min) / 8) {
            const progressBarClick = (): void => {
                const value: number = parseInt(elementOfProgressBar.textContent!);
                const isValueFitForStep: boolean = Math.abs(value - options.value) % options.step === 0;
                options.key = 'progressBar';
                if (options.value2) {
                    if (value > options.value2 && isValueFitForStep) {
                        options.value = value;
                    }
                } else {
                    if (isValueFitForStep) {
                        options.value = value;
                    }
                }
                notifyObservers(options);
            }
            const elementOfProgressBar = document.createElement('div');
            elementOfProgressBar.textContent = i.toString();
            elementOfProgressBar.setAttribute('type', 'button');
            elementOfProgressBar.classList.add('ng-slider__value');
            elementOfProgressBar.addEventListener('click', progressBarClick);
            this.progressBar.append(elementOfProgressBar);
            this.values?.push(elementOfProgressBar);
        }
    }

    get getProgressBar() {
        return this.progressBar;
    }

    get getValues() {
        return this.values;
    }
}

export default ProgressBar;