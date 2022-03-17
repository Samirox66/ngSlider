import Track from './Track';
import Handle from './Handle';
import Labels from './Labels';
import CurrentValue from './CurrentValue';
import Observer from '../Observer/Observer';
import { CompleteOptions } from '../Model/Model';
import { rangeModule } from '../Model/consonants';

export interface ViewElements {
  sliderTrack: Track,
  labels: Labels,
  firstHandle: Handle,
  firstValue: CurrentValue,
  secondValue: CurrentValue,
  secondHandle: Handle
}

class View extends Observer {
  private viewElements: ViewElements;

  private slider: HTMLElement | undefined;

  constructor() {
    super();
    this.viewElements = {
      labels: new Labels(),
      sliderTrack: new Track(),
      firstHandle: new Handle(),
      firstValue: new CurrentValue(),
      secondHandle: new Handle(),
      secondValue: new CurrentValue(),
    };
  }

  findSlider(id: string) {
    const slider = document.getElementById(id);
    if (!slider) {
      throw new Error('Wrong Id');
    }

    this.slider = slider;
  }

  displaySlider(options: CompleteOptions) {
    const { range, isValueVisible, value2 } = options;
    if (this.slider) {
      this.slider.append(this.viewElements.labels.getLabels());
      this.slider.append(this.viewElements.sliderTrack.getSliderTrack());
    }
    this.createHandleWithValue(this.viewElements.firstHandle, this.viewElements.firstValue);
    this.viewElements.labels.create(this.notifyObservers.bind(this), options);
    this.viewElements.sliderTrack.create();
    if (range === rangeModule.TRUE) {
      this.createHandleWithValue(this.viewElements.secondHandle, this.viewElements.secondValue);
      this.viewElements.secondValue.getCurrentValue().textContent = String(value2);
      this.changeValue(options);
    }

    if (isValueVisible === false) {
      this.viewElements.firstValue.hide();
      this.viewElements.secondValue.hide();
    } else {
      this.viewElements.firstValue.show();
      this.viewElements.secondValue.show();
    }

    this.changeValue(options);
    this.viewElements.sliderTrack.fillWithColor(options);
  }

  destroySlider() {
    if (this.slider) {
      this.viewElements.labels.destroy();
      while (this.slider.hasChildNodes()) {
        this.slider.firstChild?.remove();
      }
    }
  }

  setHandles(options: CompleteOptions) {
    this.viewElements.firstHandle.setHandle(this.notifyObservers.bind(this), options, false);
    this.viewElements.secondHandle.setHandle(this.notifyObservers.bind(this), options, true);
  }

  getViewElements() {
    return this.viewElements;
  }

  getSlider() {
    return this.slider;
  }

  changeValue(options: CompleteOptions) {
    const {
      range, isValueVisible, value2, value, isVertical,
    } = options;
    this.viewElements.secondValue.setTextOfCurrentValue(String(value2));
    this.viewElements.secondHandle.moveHandle(options, value2);
    this.viewElements.firstValue.setTextOfCurrentValue(String(value));
    this.viewElements.firstHandle.moveHandle(options, value);

    if (isValueVisible) {
      this.detachCurrentValues(value);
      if (range === rangeModule.TRUE && this.checkIfCurrentValuesIntersect(isVertical ?? false)) {
        this.uniteCurrentValues(value, value2);
      }
    }
  }

  makeVertical() {
    if (this.slider) {
      this.slider.classList.add('ng-slider_vertical');
      this.viewElements.labels.getLabels().classList.add('ng-slider__values_vertical');
      this.viewElements.firstValue.getCurrentValue().classList.add('ng-slider__current-value_vertical');
      this.viewElements.secondValue.getCurrentValue().classList.add('ng-slider__current-value_vertical');
      this.viewElements.sliderTrack.makeVertical();
      this.viewElements.firstHandle.makeVertical();
      this.viewElements.secondHandle.makeVertical();
    }
  }

  makeHorizontal() {
    if (this.slider) {
      this.slider.classList.remove('ng-slider_vertical');
      this.viewElements.labels.getLabels().classList.remove('ng-slider__values_vertical');
      this.viewElements.firstValue.getCurrentValue().classList.remove('ng-slider__current-value_vertical');
      this.viewElements.secondValue.getCurrentValue().classList.remove('ng-slider__current-value_vertical');
      this.viewElements.sliderTrack.makeHorizontal();
      this.viewElements.firstHandle.makeHorizontal();
      this.viewElements.secondHandle.makeHorizontal();
    }
  }

  private createHandleWithValue(handle: Handle, value: CurrentValue) {
    if (this.slider) {
      handle.getSliderHandle().append(value.getCurrentValue());
      this.slider.append(handle.getSliderHandle());
      value.getCurrentValue().classList.add('ng-slider__current-value');
      handle.getSliderHandle().classList.add('ng-slider__handle');
    }
  }

  private uniteCurrentValues(value: number, value2: number) {
    this.viewElements.secondValue.hide();
    this.viewElements.firstValue.getCurrentValue().textContent = `${value2}-${value}`;
  }

  private detachCurrentValues(value: number) {
    this.viewElements.secondValue.show();
    this.viewElements.firstValue.getCurrentValue().textContent = String(value);
  }

  private checkIfCurrentValuesIntersect(isVertical: boolean): boolean {
    const firstElement = this.viewElements.firstValue.getCurrentValue().getBoundingClientRect();
    const secondElement = this.viewElements.secondValue.getCurrentValue().getBoundingClientRect();
    const isFirstLowerThanSecond = isVertical && firstElement.top <= secondElement.bottom;
    const isFirstMoreToTheLeftThanSecond = (
      isVertical === false && firstElement.left <= secondElement.right
    );
    if (isFirstLowerThanSecond || isFirstMoreToTheLeftThanSecond) {
      return true;
    }

    return false;
  }
}

export default View;
