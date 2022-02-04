import View from '../View/View';
import { ObserverOptions } from '../Observer/Observer';
import Model from '../Model/Model';
import { actionModule, rangeModule } from '../Model/consonants';

class Presenter {
  constructor(private view: View, private model: Model) {}

  getModel() {
    return this.model;
  }

  getView() {
    return this.view;
  }

  onInit() {
    this.model.validateOptions();
    this.view.addObserver(this.handleInputListener.bind(this));
    this.view.addObserver(this.progressBarClickListener.bind(this));
    if (this.model.getOptions().isVertical) {
      this.view.makeVertical();
    }

    this.setCords();
    this.view.displaySlider(this.model.getOptions());
    this.view.setHandles(this.model.getOptions());
    window.addEventListener('resize', this.handleResizeWindow.bind(this));
  }

  handleResizeWindow() {
    this.setCords();
    this.rewriteSlider();
  }

  handleInputListener({ key, currentCord }: ObserverOptions): void {
    const keyIsNotRelatedToHandle = key !== actionModule.FIRST_HANDLE && key !== actionModule.SECOND_HANDLE;
    if (keyIsNotRelatedToHandle) {
      return;
    }

    if (currentCord) {
      this.model.setCurrentCord(currentCord);
    }
    
    this.model.setKey(key);
    this.model.calcValue();
    this.model.notifyObservers(this.model.getOptions());
    this.updateSlider(key === actionModule.SECOND_HANDLE);
  }

  progressBarClickListener({ key, value, value2 }: ObserverOptions): void {
    const keyIsNotRelatedToLabels = key !== actionModule.FIRST_LABELS && key !== actionModule.SECOND_LABELS;
    if (keyIsNotRelatedToLabels) {
      return;
    }

    this.model.setKey(key);
    if (value) {
      this.model.setFirstValue(value);
    } else if (value2) {
      this.model.setSecondValue(value2);
    }

    this.model.notifyObservers(this.model.getOptions());
    this.updateSlider(key === actionModule.SECOND_LABELS);
  }

  changeFirstValue(value: number | string) {
    if (typeof value === 'string') {
      this.model.changeFirstValue(Number(value));
    } else if (typeof value === 'number') {
      this.model.changeFirstValue(value);
    }

    this.model.getOptions().key = actionModule.FIRST_HANDLE;
    this.updateSlider(false);
  }

  changeSecondValue(value: number | string) {
    if (typeof (value) === 'string') {
      this.model.changeSecondValue(Number(value));
    } else if (typeof (value) === 'number') {
      this.model.changeSecondValue(value);
    }

    this.model.getOptions().key = actionModule.SECOND_HANDLE;
    this.updateSlider(true);
  }

  changeMaxValue(value: number | string): string {
    let error = '';
    if (typeof (value) === 'string') {
      error = this.model.setMaxValue(Number(value));
    } else if (typeof (value) === 'number') {
      error = this.model.setMaxValue(value);
    }

    this.rewriteSlider();
    return error;
  }

  changeMinValue(value: number | string): string {
    let error = '';
    if (typeof (value) === 'string') {
      error = this.model.setMinValue(Number(value));
    } else if (typeof (value) === 'number') {
      error = this.model.setMinValue(value);
    }

    this.rewriteSlider();
    return error;
  }

  changeStep(step: number | string): string {
    let error = '';
    if (typeof (step) === 'string') {
      error = this.model.setStep(Number(step));
    } else if (typeof (step) === 'number') {
      error = this.model.setStep(step);
    }

    this.rewriteSlider();
    return error;
  }

  changeRange(range: string) {
    this.model.setRange(range);
    const rangeIsDefined = range === rangeModule.TRUE || range === rangeModule.MAX || range === rangeModule.MIN;
    if (!rangeIsDefined) {
      this.view.getViewElements().sliderTrack.hide();
    }

    this.rewriteSlider();
  }

  changeMode(isVertical: boolean) {
    if (isVertical) {
      this.view.makeVertical();
    } else {
      this.view.makeHorizontal();
    }

    this.model.setMode(isVertical);
    this.setCords();
    this.rewriteSlider();
  }

  changeVisibilityOfValues(isVisible: boolean) {
    this.model.setVisibility(isVisible);
    this.rewriteSlider();
  }

  private rewriteSlider() {
    this.view.destroySlider();
    this.view.displaySlider(this.model.getOptions());
  }

  private updateSlider(isSecond: boolean) {
    this.view.changeValue(this.model.getOptions(), isSecond);
    this.view.getViewElements().sliderTrack.fillWithColor(this.model.getOptions());
  }

  private setCords() {
    const sliderRect = this.view.getSlider().getBoundingClientRect();
    if (this.model.getOptions().isVertical) {
      this.model.setCords(sliderRect.top + window.scrollY, sliderRect.bottom + window.scrollY);
    } else {
      this.model.setCords(sliderRect.left + window.scrollX, sliderRect.right + window.scrollX);
    }
  }
}

export default Presenter;
