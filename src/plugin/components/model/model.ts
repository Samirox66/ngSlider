import Observer from "../Observer/Observer";

export interface Options {
    key: string
    range: string,
    id: string,
    min: number,
    max: number,
    step: number,
    value: number,
    value2?: number,
    isValueVisible?: boolean,
    isVertical?: boolean,
    startCord: number,
    endCord: number,
    currentCord: number
}

class Model extends Observer{
    private options: Options;

    constructor(options: Options) {
        super();
        this.options = options;
        if (!options.value) {
            this.options.value = options.max;
        }
        if (!options.step) {
            options.step = (options.max - options.min) / 10;
        }
    }

    setCords(startCord: number, endCord: number) {
        this.options.startCord = startCord;
        this.options.endCord = endCord;
    }

    calcValue() {
        let value: number;
        value = (this.options.currentCord - this.options.startCord) * (this.options.max - this.options.min) / (this.options.endCord - this.options.startCord) + this.options.min;
        value -= value % this.options.step;
        if (value % this.options.step > this.options.step / 2) {
            value += this.options.step;
        }
        if (value >= this.options.min && value <= this.options.max) {
            if(this.options.key === 'secondHandle') {
                if (value >= this.options.value || Math.abs(this.options.value2! - value) % this.options.step !== 0 || this.options.value - value < this.options.step) {
                    return;
                }
                this.options.value2 = value;
            } else {
                if (this.options.value2 && value <= this.options.value2 || Math.abs(this.options.value - value) % this.options.step !== 0 || value - this.options.value2! < this.options.step) {
                    return;
                }
                this.options.value = value;
            }
        }        
    }

    get getOptions() {
        return this.options;
    }
}

export default Model;