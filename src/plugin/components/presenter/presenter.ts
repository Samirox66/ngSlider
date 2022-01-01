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
        this.view.displaySlider(this.model.getOptions);
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
        if (options.key !== 'progressBarFirst' && options.key !== 'progressBarSecond') {
            return;
        }
        this.view.changeValue(options);
        this.view.getViewElements.sliderTrack.fillWithColor(options);
    }

    changeFirstValue(value: number | string) {
        if (typeof(value) === 'string' && !isNaN(parseFloat(value))) {
            this.model.changeFirstValue(parseFloat(value));
        } else if (typeof(value) === 'number' && !isNaN(value)) {
            this.model.changeFirstValue(value);
        }
        this.model.getOptions.key = 'firstHandle';
        this.view.changeValue(this.model.getOptions);
        this.view.getViewElements.sliderTrack.fillWithColor(this.model.getOptions);
    }

    changeSecondValue(value: number | string) {
        if (typeof(value) === 'string' && !isNaN(parseFloat(value))) {
            this.getModel.changeSecondValue(parseFloat(value));
        } else if (typeof(value) === 'number' && !isNaN(value)) {
            this.getModel.changeSecondValue(value);
        }
        this.model.getOptions.key = 'secondHandle';
        this.view.changeValue(this.model.getOptions);
        this.view.getViewElements.sliderTrack.fillWithColor(this.model.getOptions);
    }

    changeMaxValue(value: number | string) {
        if (typeof(value) === 'string' && !isNaN(parseFloat(value))) {
            this.getModel.setMaxValue(parseFloat(value));
        } else if (typeof(value) === 'number' && !isNaN(value)) {
            this.getModel.setMaxValue(value);
        }
        this.view.destroySlider();
        this.view.displaySlider(this.model.getOptions);
    }

    changeMinValue(value: number | string) {
        if (typeof(value) === 'string' && !isNaN(parseFloat(value))) {
            this.getModel.setMinValue(parseFloat(value));
        } else if (typeof(value) === 'number' && !isNaN(value)) {
            this.getModel.setMinValue(value);
        }
        this.view.destroySlider();
        this.view.displaySlider(this.model.getOptions);
    }

    changeStep(step: number | string) {
        if (typeof(step) === 'string' && !isNaN(parseFloat(step))) {
            this.getModel.setStep(parseFloat(step));
        } else if (typeof(step) === 'number' && !isNaN(step)) {
            this.getModel.setStep(step);
        }
        console.log(step);
        this.view.destroySlider();
        this.view.displaySlider(this.model.getOptions);
    }

    changeRange(range: string) {
        this.model.setRange(range);
        if (range !== 'true' && range !== 'max' && range !== 'min') {
            this.view.getViewElements.sliderTrack.hide();
        }
        this.view.destroySlider();
        this.view.displaySlider(this.model.getOptions);
    }

    changeMode(isVertical: boolean) {
        if (isVertical) {
            this.view.makeVertical();
            this.model.setCords(this.view.getSlider.getBoundingClientRect().top, this.view.getSlider.getBoundingClientRect().bottom)
        } else {
            this.view.makeHorizontal();
            this.model.setCords(this.view.getSlider.getBoundingClientRect().left, this.view.getSlider.getBoundingClientRect().right);
        }
        this.model.setVerticalMode(isVertical);
        this.view.destroySlider();
        this.view.displaySlider(this.model.getOptions);
    }

    changeVisabilityOfValues(isVisible: boolean) {
        this.model.setVisability(isVisible);
        this.view.destroySlider();
        this.view.displaySlider(this.model.getOptions);
    }
}

export default Presenter;