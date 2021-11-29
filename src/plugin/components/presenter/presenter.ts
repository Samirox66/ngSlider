import Model from './../model/model'
import View from './../view/view'



class Presenter {
    private view: View;
    private model: Model;
    constructor(view: View, model: Model) {
        this.view = view;
        this.model = model;
    }

    getModel() {
        return this.model;
    }

    getView() {
        return this.view;
    }
}

export default Presenter;