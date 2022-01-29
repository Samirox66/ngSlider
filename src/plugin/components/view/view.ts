import SliderTrack from './SliderTrack';
import SliderHandle from './SliderHandle';
import Labels from './Labels';
import CurrentValue from './СurrentValue';
import { CompleteOptions } from '../Model/Model';
import Observer from '../Observer/Observer';

export interface ViewElements {
  sliderTrack: SliderTrack,
  labels: Labels,
  firstHandle: SliderHandle,
  firstValue: CurrentValue,
  secondValue: CurrentValue,
  secondHandle: SliderHandle
}

class View extends Observer {
  private viewElements: ViewElements;

  private slider: HTMLElement;

  constructor(id: string) {
    super();
    this.viewElements = {
      labels: new Labels(),
      sliderTrack: new SliderTrack(),
      firstHandle: new SliderHandle(),
      firstValue: new CurrentValue(),
      secondHandle: new SliderHandle(),
      secondValue: new CurrentValue(),
    };
    const slider = document.getElementById(id);
    if (!slider) {
      throw new Error('Wrong Id');
    }
    this.slider = slider;
  }

  displaySlider(options: CompleteOptions) {
    this.slider.append(this.viewElements.labels.getLabels);
    this.slider.append(this.viewElements.sliderTrack.getSliderTrack);
    this.createHandleWithValue(this.viewElements.firstHandle, this.viewElements.firstValue);
    this.viewElements.labels.create(this.notifyObservers.bind(this), options);
    this.viewElements.sliderTrack.create();
    if (options.range === 'true') {
      this.createHandleWithValue(this.viewElements.secondHandle, this.viewElements.secondValue);
      this.viewElements.secondValue.getCurrentValue.textContent = options.value2.toString();
      this.changeValue(options, true);
    }
    if (options.isValueVisible === false) {
      this.viewElements.firstValue.hide();
      this.viewElements.secondValue.hide();
    } else {
      this.viewElements.firstValue.show();
      this.viewElements.secondValue.show();
    }
    this.changeValue(options, false);
    this.viewElements.sliderTrack.fillWithColor(options);
  }

  private createHandleWithValue(handle: SliderHandle, value: CurrentValue) {
    this.slider.append(handle.getSliderHandle);
    handle.getSliderHandle.append(value.getCurrentValue);
    value.getCurrentValue.classList.add('ng-slider__current-value');
    handle.getSliderHandle.classList.add('ng-slider__handle');
  }

  destroySlider() {
    this.viewElements.labels.destroy();
    while (this.slider.hasChildNodes()) {
      this.slider.firstChild?.remove();
    }
  }

  setHandles(options: CompleteOptions) {
    this.viewElements.firstHandle.setHandle(this.notifyObservers.bind(this), options.isVertical ?? false, false);
    this.viewElements.secondHandle.setHandle(this.notifyObservers.bind(this), options.isVertical ?? false, true);
  }

  get getViewElements() {
    return this.viewElements;
  }

  get getSlider() {
    return this.slider;
  }

  changeValue(options: CompleteOptions, isSecondHandle: boolean) {
    if (isSecondHandle) {
      this.viewElements.secondValue.setTextOfCurrentValue(options.value2.toString());
      this.viewElements.secondHandle.moveHandle(options, options.value2);
    } else {
      this.viewElements.firstValue.setTextOfCurrentValue(options.value.toString());
      this.viewElements.firstHandle.moveHandle(options, options.value);
    }
    if (options.isValueVisible) {
      this.detachCurrentValues(options.value);
      if (options.range === 'true' && this.checkIfCurrentValuesIntersect(options.isVertical ?? false)) {
        this.uniteCurrentValues(options.value, options.value2);
      }
    }
  }

  private uniteCurrentValues(value: number, value2: number) {
    this.viewElements.secondValue.hide();
    this.viewElements.firstValue.getCurrentValue.textContent = `${value2}-${value}`;
  }

  private detachCurrentValues(value: number) {
    this.viewElements.secondValue.show();
    this.viewElements.firstValue.getCurrentValue.textContent = value.toString();
  }

  private checkIfCurrentValuesIntersect(isVertical: boolean): boolean {
    const firstElement = this.viewElements.firstValue.getCurrentValue.getBoundingClientRect();
    const secondElement = this.viewElements.secondValue.getCurrentValue.getBoundingClientRect();
    const isFirstLowerThanSecond = isVertical && firstElement.top < secondElement.bottom;
    const isFirstMoreToTheLeftThanSecond = (
      isVertical === false && firstElement.left < secondElement.right
    );
    if (isFirstLowerThanSecond || isFirstMoreToTheLeftThanSecond) {
      return true;
    }
    return false;
  }

  makeVertical() {
    this.viewElements.firstHandle.getSliderHandle.style.left = '-5px';
    this.viewElements.secondHandle.getSliderHandle.style.left = '-5px';
    this.viewElements.sliderTrack.getSliderTrack.style.width = '5px';
    this.viewElements.sliderTrack.getSliderTrack.style.left = '0';
    this.slider.classList.add('ng-slider_vertical');
    this.viewElements.labels.getLabels.classList.add('ng-slider__values_vertical');
    this.viewElements.firstValue.getCurrentValue.classList.add('ng-slider__current-value_vertical');
    this.viewElements.secondValue.getCurrentValue.classList.add('ng-slider__current-value_vertical');
    this.viewElements.sliderTrack.getSliderTrack.classList.add('ng-slider__slider-track_vertical');
    this.viewElements.firstHandle.getSliderHandle.classList.add('ng-slider__handle_vertical');
    this.viewElements.secondHandle.getSliderHandle.classList.add('ng-slider__handle_vertical');
  }

  makeHorizontal() {
    this.viewElements.firstHandle.getSliderHandle.style.top = '-5px';
    this.viewElements.secondHandle.getSliderHandle.style.top = '-5px';
    this.viewElements.sliderTrack.getSliderTrack.style.height = '5px';
    this.viewElements.sliderTrack.getSliderTrack.style.top = '0';
    this.slider.classList.remove('ng-slider_vertical');
    this.viewElements.labels.getLabels.classList.remove('ng-slider__values_vertical');
    this.viewElements.firstValue.getCurrentValue.classList.remove('ng-slider__current-value_vertical');
    this.viewElements.secondValue.getCurrentValue.classList.remove('ng-slider__current-value_vertical');
    this.viewElements.sliderTrack.getSliderTrack.classList.remove('ng-slider__slider-track_vertical');
    this.viewElements.firstHandle.getSliderHandle.classList.remove('ng-slider__handle_vertical');
    this.viewElements.secondHandle.getSliderHandle.classList.remove('ng-slider__handle_vertical');
  }
}

export default View;
