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
                options.key = 'progressBar';
                options.value = parseInt(value?.textContent ?? options.value.toString());
                notifyObservers(options);
            }
            const value = document.createElement('div');
            value.textContent = i.toString();
            value.setAttribute('type', 'button');
            value.classList.add('ng-slider__value');
            value.addEventListener('click', progressBarClick);
            this.progressBar.append(value);
            this.values?.push(value);
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