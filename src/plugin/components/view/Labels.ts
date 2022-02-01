import { actionModule, rangeModule } from '../Model/consonants';
import { CompleteOptions } from '../Model/Model';
import { ObserverOptions } from '../Observer/Observer';

class Labels {
  private labels: HTMLDivElement;

  private values: HTMLDivElement[];

  constructor() {
    this.labels = document.createElement('div');
    this.values = [];
  }

  create(notifyObservers: (options: ObserverOptions) => void, options: CompleteOptions) {
    const { step, min, max } = options;
    this.labels.classList.add('ng-slider__values');
    const countDecimals = (value: number): number => {
      if (String(value).includes('.')) {
        return String(value).split('.')[1].length;
      }

      return 0;
    };

    const decimals = countDecimals(step);
    let barStep = step;
    while ((max - min) / barStep > 7) {
      barStep *= 2;
    }

    barStep = parseFloat(barStep.toFixed(decimals));
    for (let i = min; i <= max; i = parseFloat((i + barStep).toFixed(decimals))) {
      this.createLabel(i, options, notifyObservers);
    }
  }

  private createLabel(
    i: number,
    options: CompleteOptions,
    notifyObservers: (options: ObserverOptions) => void,
  ): void {
    const { min, max, endCord, startCord, isVertical } = options;
    const label = document.createElement('div');
    label.textContent = String(i);
    label.setAttribute('type', 'button');
    label.classList.add('ng-slider__value');
    this.labels.append(label);
    if (isVertical) {
      const pixelsToMove = (
        ((i - min) / (max - min) - label.offsetHeight / 2 / (endCord - startCord)) * 100
      );
      label.style.top = `${pixelsToMove}%`;
    } else {
      const pixelsToMove = (
        ((i - min) / (max - min) - label.offsetWidth / 2 / (endCord - startCord)) * 100
      );
      label.style.left = `${pixelsToMove}%`;
    }

    label.addEventListener('click', this.handleLabelsClick.bind(this, options, label, notifyObservers));
    this.values?.push(label);
  }

  handleLabelsClick(
    { range, value2 }: CompleteOptions,
    label: HTMLDivElement,
    notifyObservers: (options: ObserverOptions) => void,
    ) {
    const labelsOptions: ObserverOptions = { key: actionModule.FIRST_LABELS };
      if (label.textContent) {
        const value = parseFloat(label.textContent);
        if (range === rangeModule.TRUE) {
          if (value > value2) {
            labelsOptions.value = value;
          } else if (value < value2) {
            labelsOptions.key = actionModule.SECOND_LABELS;
            labelsOptions.value2 = value;
          }
        } else {
          labelsOptions.value = value;
        }

        notifyObservers(labelsOptions);
      }
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
