import Presenter from '../../../plugin/components/Presenter/Presenter';
import { CompleteOptions } from '../../../plugin/components/Model/Model';
import { ObserverOptions } from '../../../plugin/components/Observer/Observer';

interface PanelElements {
  maxValue: HTMLInputElement;
  minValue: HTMLInputElement;
  range: HTMLInputElement;
  step: HTMLInputElement;
  firstValue: HTMLInputElement;
  secondValue: HTMLInputElement;
  verticalMode: HTMLInputElement;
  isValueVisible: HTMLInputElement;
}

class ConfigPanel {
  private firstValue: HTMLInputElement;

  private secondValue: HTMLInputElement;

  private maxValue: HTMLInputElement;

  private minValue: HTMLInputElement;

  private step: HTMLInputElement;

  private range: HTMLInputElement;

  private verticalMode: HTMLInputElement;

  private isValueVisible: HTMLInputElement;

  constructor(panelElements: PanelElements) {
    this.firstValue = panelElements.firstValue;
    this.secondValue = panelElements.secondValue;
    this.maxValue = panelElements.maxValue;
    this.minValue = panelElements.minValue;
    this.step = panelElements.step;
    this.range = panelElements.range;
    this.verticalMode = panelElements.verticalMode;
    this.isValueVisible = panelElements.isValueVisible;
  }

  changeFirstValue(slider: Presenter) {
    slider.setAttr('value', this.firstValue.value);
    if (this.firstValue.value !== slider.getAttr('value')) {
      this.firstValue.value = slider.getAttr('value');
    }
  }

  changeSecondValue(slider: Presenter) {
    slider.setAttr('value2', this.secondValue.value);
    if (this.secondValue.value !== slider.getAttr('value2')) {
      this.secondValue.value = slider.getAttr('value2');
    }
  }

  changeMinValue(slider: Presenter) {
    const error = slider.setAttr('min', this.minValue.value);
    if (error !== '') {
      ConfigPanel.manageError(error, this.minValue);
    }

    this.minValue.value = slider.getAttr('min');
    if (slider.getAttr('range') === 'true') {
      if (Number(slider.getAttr('min')) > Number(this.secondValue.value)) {
        this.secondValue.value = slider.getAttr('min');
      }
    } else if (Number(slider.getAttr('min')) > Number(this.firstValue.value)) {
      this.firstValue.value = slider.getAttr('min');
    }
  }

  changeStep(slider: Presenter) {
    const error = slider.setAttr('step', this.step.value);
    if (error !== '') {
      ConfigPanel.manageError(error, this.step);
    }

    this.step.value = String(slider.getAttr('step'));
  }

  changeMaxValue(slider: Presenter) {
    const error = slider.setAttr('max', this.maxValue.value);
    if (error !== '') {
      ConfigPanel.manageError(error, this.maxValue);
    }

    this.maxValue.value = slider.getAttr('max');
    if (Number(slider.getAttr('max')) < Number(this.firstValue.value)) {
      this.firstValue.value = slider.getAttr('max');
    }
  }

  changeVerticalMode(slider: Presenter) {
    slider.setAttr('isVertical', String(this.verticalMode.checked));
  }

  changeRange(slider: Presenter) {
    slider.setAttr('range', this.range.value);
  }

  changeIsValueVisible(slider: Presenter) {
    slider.setAttr('isValueVisible', String(this.isValueVisible.checked));
  }

  addEventListeners(slider: Presenter) {
    this.firstValue.addEventListener(
      'change',
      this.changeFirstValue.bind(this, slider)
    );
    this.secondValue.addEventListener(
      'change',
      this.changeSecondValue.bind(this, slider)
    );
    this.maxValue.addEventListener(
      'change',
      this.changeMaxValue.bind(this, slider)
    );
    this.minValue.addEventListener(
      'change',
      this.changeMinValue.bind(this, slider)
    );
    this.range.addEventListener('change', this.changeRange.bind(this, slider));
    this.step.addEventListener('change', this.changeStep.bind(this, slider));
    this.verticalMode.addEventListener(
      'change',
      this.changeVerticalMode.bind(this, slider)
    );
    this.isValueVisible.addEventListener(
      'change',
      this.changeIsValueVisible.bind(this, slider)
    );
  }

  setPanelValues({
    range,
    max,
    min,
    value,
    value2,
    isVertical,
    step,
  }: CompleteOptions) {
    this.range.value = range;
    this.step.value = String(step);
    this.maxValue.value = String(max);
    this.minValue.value = String(min);
    this.firstValue.value = String(value);
    this.verticalMode.checked = isVertical ?? false;
    if (range === 'true') {
      this.secondValue.value = String(value2);
    }
  }

  addObservers(slider: Presenter) {
    slider.addModelObserver(this.valueChangedInputListener.bind(this));
  }

  valueChangedInputListener({ key, value, value2 }: ObserverOptions) {
    const isRelatedToFirstValue =
      key === 'firstHandle' || key === 'firstLabels';
    const isRelatedToSecondValue =
      key === 'secondHandle' || key === 'secondLabels';
    if (isRelatedToFirstValue) {
      if (value) {
        this.firstValue.value = String(value);
      }
      return;
    }

    if (isRelatedToSecondValue) {
      if (value2) {
        this.secondValue.value = String(value2);
      }
    }
  }

  getFirstValue() {
    return this.firstValue;
  }

  getSecondValue() {
    return this.secondValue;
  }

  getMaxValue() {
    return this.maxValue;
  }

  getMinValue() {
    return this.minValue;
  }

  getRange() {
    return this.range;
  }

  getStep() {
    return this.step;
  }

  getVerticalMode() {
    return this.verticalMode;
  }

  getCurrentValueVisible() {
    return this.isValueVisible;
  }

  static manageError(error: string, inputWithError: HTMLInputElement) {
    const errorElement = ConfigPanel.showError(error, inputWithError);
    setTimeout((): void => {
      errorElement.style.opacity = '0.7';
    }, 1000);
    setTimeout((): void => {
      errorElement.style.opacity = '0.4';
    }, 2000);
    setTimeout(() => errorElement.remove(), 3000);
  }

  static showError(
    error: string,
    inputWithError: HTMLInputElement
  ): HTMLParagraphElement {
    const errorElement = document.createElement('p');
    errorElement.textContent = error;
    errorElement.classList.add('config__error');
    inputWithError.parentElement?.append(errorElement);
    return errorElement;
  }
}

export default ConfigPanel;
export { PanelElements };
