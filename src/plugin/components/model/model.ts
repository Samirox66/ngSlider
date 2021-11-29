export interface Options {
    range: boolean,
    id: string,
    min: number,
    max: number,
    step?: number,
    value?: number,
    value2?: number,
    isValueVisible?: boolean,
    isVertical?: boolean,
}

class Model {
    options: Options;
    constructor(options: Options) {
        this.options = options;
    }
}

export default Model;