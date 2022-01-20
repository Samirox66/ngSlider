import Model, { CompleteOptions } from '../Model/Model'
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
        this.model.validateOptions();
        this.view.addObserver(this.handleInputListener.bind(this));
        this.view.addObserver(this.progressBarClickListener.bind(this));
        if (this.model.getOptions.isVertical) {
            this.view.makeVertical();
            this.model.setCords(this.view.getSlider.getBoundingClientRect().top, this.view.getSlider.getBoundingClientRect().bottom)
        } else {
            this.model.setCords(this.view.getSlider.getBoundingClientRect().left, this.view.getSlider.getBoundingClientRect().right);
        }
        this.view.displaySlider(this.model.getOptions);
        this.view.setHandles(this.model.getOptions);
    }

    handleInputListener(options: CompleteOptions): void {
        if (options.key !== 'firstHandle' && options.key !== 'secondHandle') {
            return;
        }
        this.model.calcValue();
        this.updateSlider();
    }

    progressBarClickListener(options: CompleteOptions): void {
        if (options.key !== 'progressBarFirst' && options.key !== 'progressBarSecond') {
            return;
        }
        this.updateSlider();
    }

    changeFirstValue(value: number | string) {
        if (typeof(value) === 'string' && !isNaN(parseFloat(value))) {
            this.model.changeFirstValue(parseFloat(value));
        } else if (typeof(value) === 'number' && !isNaN(value)) {
            this.model.changeFirstValue(value);
        }
        this.model.getOptions.key = 'firstHandle';
        this.updateSlider();
    }

    changeSecondValue(value: number | string) {
        if (typeof(value) === 'string' && !isNaN(parseFloat(value))) {
            this.getModel.changeSecondValue(parseFloat(value));
        } else if (typeof(value) === 'number' && !isNaN(value)) {
            this.getModel.changeSecondValue(value);
        }
        this.model.getOptions.key = 'secondHandle';
        this.updateSlider();
    }

    changeMaxValue(value: number | string): string {
        let error = '';
        if (typeof(value) === 'string' && !isNaN(parseFloat(value))) {
            error = this.getModel.setMaxValue(parseFloat(value));
        } else if (typeof(value) === 'number' && !isNaN(value)) {
            error = this.getModel.setMaxValue(value);
        }
        this.rewriteSlider();
        return error;
    }

    changeMinValue(value: number | string): string {
        let error = '';
        if (typeof(value) === 'string' && !isNaN(parseFloat(value))) {
            error = this.getModel.setMinValue(parseFloat(value));
        } else if (typeof(value) === 'number' && !isNaN(value)) {
            error = this.getModel.setMinValue(value);
        }
        this.rewriteSlider();
        return error;
    }

    changeStep(step: number | string): string {
        let error = '';
        if (typeof(step) === 'string' && !isNaN(parseFloat(step))) {
            error = this.getModel.setStep(parseFloat(step));
        } else if (typeof(step) === 'number' && !isNaN(step)) {
            error = this.getModel.setStep(step);
        }
        this.rewriteSlider();
        return error;
    }

    changeRange(range: string) {
        this.model.setRange(range);
        if (range !== 'true' && range !== 'max' && range !== 'min') {
            this.view.getViewElements.sliderTrack.hide();
        }
        this.rewriteSlider();
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
        this.rewriteSlider();
    }

    changeVisabilityOfValues(isVisible: boolean) {
        this.model.setVisability(isVisible);
        this.rewriteSlider();
    }

    private rewriteSlider() {
        this.view.destroySlider();
        this.view.displaySlider(this.model.getOptions);
    }

    private updateSlider() {
        this.view.changeValue(this.model.getOptions);
        this.view.getViewElements.sliderTrack.fillWithColor(this.model.getOptions);
    }
}

export default Presenter;