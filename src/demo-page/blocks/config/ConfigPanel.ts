import Presenter from '../../../plugin/components/Presenter/Presenter';
import { CompleteOptions, ObserverOptions } from '../../../plugin/components/Model/Model';

interface PanelIds {
  max: string,
  min: string,
  range: string,
  step: string,
  firstValue: string,
  secondValue: string,
  verticalMode: string,
  isValueVisible: string
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

  constructor(panelIds: PanelIds) {
    this.firstValue = <HTMLInputElement>document.getElementById(panelIds.firstValue);
    this.secondValue = <HTMLInputElement>document.getElementById(panelIds.secondValue);
    this.maxValue = <HTMLInputElement>document.getElementById(panelIds.max);
    this.minValue = <HTMLInputElement>document.getElementById(panelIds.min);
    this.step = <HTMLInputElement>document.getElementById(panelIds.step);
    this.range = <HTMLInputElement>document.getElementById(panelIds.range);
    this.verticalMode = <HTMLInputElement>document.getElementById(panelIds.verticalMode);
    this.isValueVisible = <HTMLInputElement>document.getElementById(panelIds.isValueVisible);
  }

  changeFirstValue(slider: Presenter) {
    slider.changeFirstValue(this.firstValue.value);
    if (this.firstValue.value !== slider.getModel.getOptions.value.toString()) {
      this.firstValue.value = slider.getModel.getOptions.value.toString();
    }
  }

  changeSecondValue(slider: Presenter) {
    slider.changeSecondValue(this.secondValue.value);
    if (this.secondValue.value !== slider.getModel.getOptions.value2.toString()) {
      this.secondValue.value = slider.getModel.getOptions.value2.toString();
    }
  }

  changeMinValue(slider: Presenter) {
    const error = slider.changeMinValue(this.minValue.value);
    if (error !== '') {
      ConfigPanel.manageError(error, this.minValue);
    }
    this.minValue.value = slider.getModel.getOptions.min.toString();
    if (slider.getModel.getOptions.range === 'true') {
      if (slider.getModel.getOptions.min > parseFloat(this.secondValue.value)) {
        this.secondValue.value = slider.getModel.getOptions.min.toString();
      }
    } else if (slider.getModel.getOptions.min > parseFloat(this.firstValue.value)) {
      this.firstValue.value = slider.getModel.getOptions.min.toString();
    }
  }

  changeStep(slider:Presenter) {
    const error = slider.changeStep(this.step.value);
    if (error !== '') {
      ConfigPanel.manageError(error, this.step);
    }
    this.step.value = slider.getModel.getOptions.step.toString();
  }

  changeMaxValue(slider: Presenter) {
    const error = slider.changeMaxValue(this.maxValue.value);
    if (error !== '') {
      ConfigPanel.manageError(error, this.maxValue);
    }
    this.maxValue.value = slider.getModel.getOptions.max.toString();
    if (slider.getModel.getOptions.max < parseFloat(this.firstValue.value)) {
      this.firstValue.value = slider.getModel.getOptions.max.toString();
    }
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

  static showError(error: string, inputWithError: HTMLInputElement): HTMLParagraphElement {
    const errorElement = document.createElement('p');
    errorElement.textContent = error;
    errorElement.classList.add('config__error');
    inputWithError.parentElement?.append(errorElement);
    return errorElement;
  }

  addEventListeners(slider: Presenter) {
    this.firstValue.addEventListener('change', () => this.changeFirstValue(slider));
    this.secondValue.addEventListener('change', () => this.changeSecondValue(slider));
    this.maxValue.addEventListener('change', () => this.changeMaxValue(slider));
    this.minValue.addEventListener('change', () => this.changeMinValue(slider));
    this.range.addEventListener('change', () => slider.changeRange(this.range.value));
    this.step.addEventListener('change', () => this.changeStep(slider));
    this.verticalMode.addEventListener('change', () => slider.changeMode(this.verticalMode.checked));
    this.isValueVisible.addEventListener('change', () => slider.changeVisabilityOfValues(this.isValueVisible.checked));
  }

  setPanel(options: CompleteOptions) {
    this.range.value = options.range;
    this.step.value = options.step.toString();
    this.maxValue.value = options.max.toString();
    this.minValue.value = options.min.toString();
    this.firstValue.value = options.value.toString();
    this.verticalMode.checked = options.isVertical ?? false;
    if (options.range === 'true') {
      this.secondValue.value = options.value2.toString();
    }
  }

  addObservers(slider: Presenter) {
    slider.getView.addObserver(this.valueChangedInputListener);
  }

  valueChangedInputListener(options: ObserverOptions) {
    if (options.key === 'firstHandle' || options.key === 'firstLabels') {
      if (options.value) {
        this.firstValue.value = options.value.toString();
      }
      return;
    }
    if (options.key === 'secondHandle' || options.key === 'secondLabels') {
      if (options.value2) {
        this.secondValue.value = options.value2.toString();
      }
    }
  }

  get getFirstValue() {
    return this.firstValue;
  }

  get getSecondValue() {
    return this.secondValue;
  }

  get getMaxValue() {
    return this.maxValue;
  }

  get getMinValue() {
    return this.minValue;
  }

  get getRange() {
    return this.range;
  }

  get getStep() {
    return this.step;
  }

  get getVerticalMode() {
    return this.verticalMode;
  }

  get getCurrentValueVisible() {
    return this.isValueVisible;
  }
}

export default ConfigPanel;
