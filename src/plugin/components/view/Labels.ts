import { CompleteOptions } from '../Model/Model';

class Labels {
  private labels: HTMLDivElement;

  private values: HTMLDivElement[];

  constructor() {
    this.labels = document.createElement('div');
    this.values = [];
  }

  create(notifyObservers: (options: CompleteOptions) => void, options: CompleteOptions) {
    this.labels.classList.add('ng-slider__values');
    const countDecimals = (value: number): number => {
      if (value.toString().includes('.')) {
        return value.toString().split('.')[1].length;
      }
      return 0;
    };
    const decimals: number = countDecimals(options.step);
    let barStep: number = options.step;
    while ((options.max - options.min) / barStep > 7) {
      barStep *= 2;
    }
    barStep = parseFloat(barStep.toFixed(decimals));
    for (let i = options.min; i <= options.max; i = parseFloat((i + barStep).toFixed(decimals))) {
      this.createLabel(i, options, notifyObservers);
    }
  }

  private createLabel(i: number, options: CompleteOptions, notifyObservers: (options: CompleteOptions) => void): void {
    const label = document.createElement('div');
    label.textContent = i.toString();
    label.setAttribute('type', 'button');
    label.classList.add('ng-slider__value');
    const progressBarClick = (): void => {
      if (label.textContent) {
        const value: number = parseFloat(label.textContent);
        options.key = 'progressBarFirst';
        if (options.range === 'true') {
          if (value > options.value2) {
            options.value = value;
          } else if (value < options.value2) {
            options.key = 'progressBarSecond';
            options.value2 = value;
          }
        } else {
          options.value = value;
        }
        notifyObservers(options);
      }
    };
    this.labels.append(label);
    if (options.isVertical) {
      const pixelsToMove: number = ((i - options.min) / (options.max - options.min) - label.offsetHeight / 2 / (options.endCord - options.startCord)) * 100;
      label.style.top = `${pixelsToMove}%`;
    } else {
      const pixelsToMove: number = ((i - options.min) / (options.max - options.min) - label.offsetWidth / 2 / (options.endCord - options.startCord)) * 100;
      label.style.left = `${pixelsToMove}%`;
    }
    label.addEventListener('click', progressBarClick);
    this.values?.push(label);
  }

  destroy() {
    while (this.labels.hasChildNodes()) {
      this.labels.firstChild?.remove();
      this.values.pop();
    }
  }

  get getLabels() {
    return this.labels;
  }

  get getValues() {
    return this.values;
  }
}

export default Labels;
