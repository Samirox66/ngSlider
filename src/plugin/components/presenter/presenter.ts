import Model from '../Model/Model';
import View from '../View/View';
import { ObserverOptions } from '../Observer/Observer';

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
    let sliderRect: DOMRect;
    if (this.model.getOptions.isVertical) {
      this.view.makeVertical();
      sliderRect = this.view.getSlider.getBoundingClientRect();
      this.model.setCords(sliderRect.top, sliderRect.bottom);
    } else {
      sliderRect = this.view.getSlider.getBoundingClientRect();
      this.model.setCords(sliderRect.left, sliderRect.right);
    }
    this.view.displaySlider(this.model.getOptions);
    this.view.setHandles(this.model.getOptions);
  }

  handleInputListener(options: ObserverOptions): void {
    const keyIsNotRelatedToHandle = options.key !== 'firstHandle' && options.key !== 'secondHandle';
    if (keyIsNotRelatedToHandle) {
      return;
    }
    if (options.currentCord) {
      this.model.setCurrentCord(options.currentCord);
    }
    this.model.setKey(options.key);
    this.model.calcValue();
    this.model.notifyObservers(this.model.getOptions);
    this.updateSlider(options.key === 'secondHandle');
  }

  progressBarClickListener(options: ObserverOptions): void {
    const keyIsNotRelatedToLabels = options.key !== 'firstLabels' && options.key !== 'secondLabels';
    if (keyIsNotRelatedToLabels) {
      return;
    }
    this.model.setKey(options.key);
    if (options.value) {
      this.model.setFirstValue(options.value);
    } else if (options.value2) {
      this.model.setSecondValue(options.value2);
    }
    this.model.notifyObservers(this.model.getOptions);
    this.updateSlider(options.key === 'secondLabels');
  }

  changeFirstValue(value: number | string) {
    if (typeof (value) === 'string') {
      this.model.changeFirstValue(parseFloat(value));
    } else if (typeof (value) === 'number') {
      this.model.changeFirstValue(value);
    }
    this.model.getOptions.key = 'firstHandle';
    this.updateSlider(false);
  }

  changeSecondValue(value: number | string) {
    if (typeof (value) === 'string') {
      this.getModel.changeSecondValue(parseFloat(value));
    } else if (typeof (value) === 'number') {
      this.getModel.changeSecondValue(value);
    }
    this.model.getOptions.key = 'secondHandle';
    this.updateSlider(true);
  }

  changeMaxValue(value: number | string): string {
    let error = '';
    if (typeof (value) === 'string') {
      error = this.getModel.setMaxValue(parseFloat(value));
    } else if (typeof (value) === 'number') {
      error = this.getModel.setMaxValue(value);
    }
    this.rewriteSlider();
    return error;
  }

  changeMinValue(value: number | string): string {
    let error = '';
    if (typeof (value) === 'string') {
      error = this.getModel.setMinValue(parseFloat(value));
    } else if (typeof (value) === 'number') {
      error = this.getModel.setMinValue(value);
    }
    this.rewriteSlider();
    return error;
  }

  changeStep(step: number | string): string {
    let error = '';
    if (typeof (step) === 'string') {
      error = this.getModel.setStep(parseFloat(step));
    } else if (typeof (step) === 'number') {
      error = this.getModel.setStep(step);
    }
    this.rewriteSlider();
    return error;
  }

  changeRange(range: string) {
    this.model.setRange(range);
    const rangeIsNotDefined = range !== 'true' && range !== 'max' && range !== 'min';
    if (rangeIsNotDefined) {
      this.view.getViewElements.sliderTrack.hide();
    }
    this.rewriteSlider();
  }

  changeMode(isVertical: boolean) {
    let sliderRect: DOMRect;
    if (isVertical) {
      this.view.makeVertical();
      sliderRect = this.view.getSlider.getBoundingClientRect();
      this.model.setCords(sliderRect.top, sliderRect.bottom);
    } else {
      this.view.makeHorizontal();
      sliderRect = this.view.getSlider.getBoundingClientRect();
      this.model.setCords(sliderRect.left, sliderRect.right);
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

  private updateSlider(isSecond: boolean) {
    this.view.changeValue(this.model.getOptions, isSecond);
    this.view.getViewElements.sliderTrack.fillWithColor(this.model.getOptions);
  }
}

export default Presenter;
