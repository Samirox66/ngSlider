import View from '../View/View';
import { ObserverFunction, ObserverOptions } from '../Observer/Observer';
import Model from '../Model/Model';
import { actionModule } from '../Model/consonants';

class Presenter {
  constructor(private view: View, private model: Model) {}

  getModel() {
    return this.model;
  }

  getView() {
    return this.view;
  }

  getAttr(prop: string): string {
    if (Object.prototype.hasOwnProperty.call(this.model.getOptions(), prop)) {
      return String(this.model.getOptions()[prop]);
    }
    throw new Error('Wrong property of options');
  }

  setAttr(prop: string, value: string): string {
    let err = '';
    if (prop === 'value') {
      this.model.changeFirstValue(Number(value));
    } else if (prop === 'value2') {
      this.model.changeSecondValue(Number(value));
    } else if (prop === 'max') {
      err = this.model.changeMaxValue(Number(value));
    } else if (prop === 'min') {
      err = this.model.changeMinValue(Number(value));
    } else if (prop === 'step') {
      err = this.model.changeStep(Number(value));
    } else if (prop === 'isValueVisible') {
      this.model.setVisibility(value);
    } else if (prop === 'isVertical') {
      if (value === 'true') {
        this.view.makeVertical();
      } else {
        this.view.makeHorizontal();
      }

      this.model.setMode(value);
      this.setCords();
    } else if (prop === 'range') {
      this.model.setRange(value);
    }

    this.rewriteSlider();
    return err;
  }

  addModelObserver(observerFunction: ObserverFunction) {
    this.model.addObserver(observerFunction);
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
    this.updateSlider();
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
    this.updateSlider();
  }

  private rewriteSlider() {
    this.view.destroySlider();
    this.view.displaySlider(this.model.getOptions());
  }

  private updateSlider() {
    this.view.changeValue(this.model.getOptions());
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
