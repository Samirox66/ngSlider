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

    onInit(options: Options) {
        this.view.addObserver(this.handleInputListener.bind(this));
        this.view.addObserver(this.progressBarClickListener.bind(this));
        if (options.isVertical) {
            this.view.makeVertical();
            this.model.setCords(this.view.getSlider.getBoundingClientRect().top, this.view.getSlider.getBoundingClientRect().bottom)
        } else {
            this.model.setCords(this.view.getSlider.getBoundingClientRect().left, this.view.getSlider.getBoundingClientRect().right);
        }
        this.view.createViewElements(this.model.getOptions);
        this.view.setHandles(options);
    }

    handleInputListener(options: Options) {
        if (options.key !== 'firstHandle' && options.key !== 'secondHandle') {
            return;
        }
        this.model.calcValue();
        this.view.changeValue(options);
        this.view.getViewElements.sliderTrack.fillWithColor(options);
    }

    progressBarClickListener(options: Options) {
        if (options.key !== 'progressBar') {
            return;
        }
        this.view.changeValue(options);
        this.view.getViewElements.sliderTrack.fillWithColor(options);
    }
}

export default Presenter;