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

    private countDecimals = (value: number): number => {
        if (value.toString().includes('.')) {
            return value.toString().split('.')[1].length
        }
        return 0;
    }

    calcValue() {
        let value: number = (this.options.currentCord - this.options.startCord) * (this.options.max - this.options.min) / (this.options.endCord - this.options.startCord) + this.options.min;
        const decimals: number = this.countDecimals(this.options.step);
        if ((value - this.options.min) % this.options.step > this.options.step / 2) {
            value = value - (value - this.options.min) % this.options.step + this.options.step;
        } else {
            value = value - (value - this.options.min) % this.options.step;
        }
        value = parseFloat(value.toFixed(decimals));
        if (value >= this.options.min && value <= this.options.max) {
            if (this.options.key === 'secondHandle') {
                if (value >= this.options.value) {
                    return;
                }
                this.options.value2 = value;
            } else {
                if (this.options.value2 && value <= this.options.value2) {
                    return;
                }
                this.options.value = value;
            }        
        }
    }

    changeFirstValue(value: number) {
        const decimals: number = this.countDecimals(this.options.step);
        const isValueCloserToBiggerNumber: boolean = (value - this.options.min) % this.options.step > this.options.step / 2;
        if (this.options.range === 'true' && this.options.value2) {
            if (value >= this.options.max) {
                value = this.options.max;
            } else if (value <= this.options.value2 + this.options.step) {
                value = this.options.value2 + this.options.step;
            } else if (isValueCloserToBiggerNumber) {
                value = value - (value - this.options.min) % this.options.step + this.options.step;
            } else {
                value = value - (value -this.options.min) % this.options.step;
            }
        } else {
            if (value >= this.options.max) {
                value = this.options.max;
            } else if (value <= this.options.min) {
                value = this.options.min;
            } else if (isValueCloserToBiggerNumber) {
                value = value - (value - this.options.min) % this.options.step + this.options.step;
            } else {
                value = value - (value -this.options.min) % this.options.step;
            }
        }
        this.options.value = parseFloat(value.toFixed(decimals));
    }
    
    changeSecondValue(value: number) {
        const decimals: number = this.countDecimals(this.options.step);
        const isValueCloserToBiggerNumber: boolean = (value - this.options.min) % this.options.step > this.options.step / 2;
        if (this.options.range === 'true') {
            if (value <= this.options.min) {
                value = this.options.min;
            }
            else if (value >= this.options.value - this.options.step) {
                value = this.options.value - this.options.step;
            }
            else if (isValueCloserToBiggerNumber) {
                value = value - (value - this.options.min) % this.options.step + this.options.step;
            } else {
                value = value - (value -this.options.min) % this.options.step;
            }
            this.options.value2 = parseFloat(value.toFixed(decimals));
        }
    }

    setMaxValue(value: number) {
        this.options.max = value;
    }

    setMinValue(value: number) {
        this.options.min = value;
    }

    setStep(step: number) {
        this.options.step = step;
    }

    setRange(range: string) {
        if (range === 'min' || range === 'max' || range === 'true') {
            this.options.range = range;
        } else {
            this.options.range = 'false';
        }
    }

    setVisability(isVisible: boolean) {
        this.options.isValueVisible = isVisible;
    }

    setVerticalMode(isVertical: boolean) {
        this.options.isVertical = isVertical;
    }

    get getOptions() {
        return this.options;
    }
}

export default Model;