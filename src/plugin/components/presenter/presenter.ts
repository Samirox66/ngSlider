import Model, { Options } from '../Model/Model'
import View from '../View/View'



class Presenter {
    private view: View;
    private model: Model;
    private options: Options;
    constructor(view: View, model: Model, options: Options) {
        this.view = view;
        this.model = model;
        this.options = options;
    }

    get getModel() {
        return this.model;
    }

    get getView() {
        return this.view;
    }

    onInit() {
        this.view.getViewElements.firstInput.addSliderInputListener();
        this.view.getViewElements.currentValue.addCurrentValueInputListener();
        this.view.getViewElements.progressBar.addProgressBarClickListener();
    }
}

export default Presenter;