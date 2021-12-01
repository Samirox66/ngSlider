import { Options } from "../Model/Model";

class ProgressBar {
    private progressBar: HTMLDivElement;
    private values: HTMLInputElement[];

    constructor() {
        this.progressBar = document.createElement('div');
        this.values = new Array;
    }
    create(max: number, min: number) {
        this.progressBar.classList.add('ng-slider__values')
        for (let i = min; i <= max; i += (max - min) / 5) {
            const value = document.createElement('input');
            value.value = i.toString();
            value.setAttribute('type', 'button');
            value.classList.add('ng-slider__value');
            this.progressBar.append(value);
            this.values?.push(value);
        }
    }

    addProgressBarClickListener() {
        
    }

    get getProgressBar() {
        return this.progressBar;
    }

    get getValues() {
        return this.values;
    }
}

export default ProgressBar;