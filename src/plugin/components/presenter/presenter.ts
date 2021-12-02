import Model, { Options } from '../Model/Model'
import View from '../View/View'



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

    onInit() {
        this.view.addSliderInputListener();
        this.view.addProgressBarClickListener();
    }

    sliderInputListener() {
        this.model.options.value = parseInt(this.view.getViewElements.firstInput.getSliderInput.value);
        this.view.valueChanged(this.model.options);
    }

    progressBarElementClickListener(element: HTMLDivElement) {
        this.model.options.value = parseInt(element.getAttribute('value') ?? '85');
        this.view.getViewElements.firstInput.getSliderInput.value = this.model.options.value.toString();
        this.view.valueChanged(this.model.options);
    }
}

export default Presenter;