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
        this.view.addObserver(this.sliderHandleInputListener.bind(this));
        this.view.addObserver(this.progressBarClickListener.bind(this));
        this.model.setCordsX(this.view.getViewElements.sliderTrack.getSliderTrack.getBoundingClientRect().left, this.view.getViewElements.sliderTrack.getSliderTrack.getBoundingClientRect().right);
        this.view.createViewElements(this.model.getOptions);
    }

    sliderHandleInputListener(options: Options) {
        if (options.key !== 'sliderHandle') {
            return;
        }
        this.view.moveHandler(options);
    }

    progressBarClickListener(options: Options) {
        if (options.key !== 'progressBar') {
            return;
        }
        this.view.changeValue(options);
    }
}

export default Presenter;