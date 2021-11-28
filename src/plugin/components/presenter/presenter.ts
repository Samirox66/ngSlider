import Model from './../model/model'
import View from './../view/view'

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

class Presenter {
    private view: View;
    private model: Model;
    constructor(view: View, model: Model) {
        this.view = view;
        this.model = model;
    }

    get getModel() {
        return this.model;
    }

    get getView() {
        return this.view;
    }

    setOptions(options: Options) {

    }
}

export default Presenter;