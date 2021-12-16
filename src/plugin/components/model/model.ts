import Observer from "../Observer/Observer";

export interface Options {
    key: string
    range: string,
    id: string,
    min: number,
    max: number,
    step?: number,
    value: number,
    value2?: number,
    isValueVisible?: boolean,
    isVertical?: boolean,
    startCord: number,
    endCord: number
}

class Model extends Observer{
    private options: Options;

    constructor(options: Options) {
        super();
        this.options = options;
        if (!options.value) {
            this.options.value = (options.max + options.min) / 2;
        }
    }

    setCords(startCord: number, endCord: number) {
        this.options.startCord = startCord;
        this.options.endCord = endCord;
        console.log(startCord, endCord)
    }

    get getOptions() {
        return this.options;
    }
}

export default Model;