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
        this.view.addObserver(this.sliderInputListener);
        this.view.addObserver(this.progressBarElementClickListener);
    }

    sliderInputListener() {
        //this.model.getOptions.value = parseInt(this.view.getViewElements.firstHandle.getSliderHandle.value);
        //this.view.valueChanged(this.model.getOptions);
    }

    progressBarElementClickListener(element: HTMLDivElement) {
        //this.model.getOptions.value = parseInt(element.getAttribute('value') ?? '85');
        //this.view.getViewElements.firstHandle.getSliderHandle.value = this.model.getOptions.value.toString();
        //this.view.valueChanged(this.model.getOptions);
    }
}

export default Presenter;