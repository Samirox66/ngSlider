import Observer from "../Observer/Observer";

export interface Options {
    key: string
    range: boolean,
    id: string,
    min: number,
    max: number,
    step?: number,
    value: number,
    value2?: number,
    isValueVisible?: boolean,
    isVertical?: boolean,
    event?: MouseEvent
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

    get getOptions() {
        return this.options;
    }
}

export default Model;