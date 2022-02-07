import { actionModule, rangeModule } from './consonants';
import Observer from '../Observer/Observer';

interface CompleteOptions extends Options {
  key: string,
  value2: number,
  startCord: number,
  endCord: number,
  currentCord: number,
  range: string
}

interface Options extends Record<string, any> {
  range?: string,
  id: string,
  min: number,
  max: number,
  step: number,
  value: number,
  value2?: number,
  isValueVisible?: boolean,
  isVertical?: boolean,
}

class Model extends Observer {
  private options: CompleteOptions;

  constructor(op: Options) {
    super();
    this.options = <CompleteOptions>op;
  }

  validateOptions() {
    const decimals = Model.countDecimals(this.options.step);
    const integerStep = this.options.step * 10 ** decimals;
    const maxMinIntegerDifference = (this.options.max - this.options.min) * 10 ** decimals;
    const isStepIncorrect = maxMinIntegerDifference % integerStep !== 0 || this.options.step <= 0;
    if (!this.options.value2) {
      this.options.value2 = this.options.min;
    }

    if (this.options.min >= this.options.max) {
      throw new Error('Min value should be less than max one');
    }

    if (isStepIncorrect) {
      throw new Error(`${this.options.step} is incorrect step for ${this.options.id}`);
    }

    const value2isOutsideMaxMin = (
      this.options.value2 < this.options.min || this.options.value2 >= this.options.max
    );
    if (value2isOutsideMaxMin) {
      this.options.value2 = this.options.min;
    }

    const isValueMoreThanMax = this.options.value > this.options.max;
    const isValueLessThanMin = this.options.value < this.options.min;
    const isValue2NotLessThanValue = this.options.value2 >= this.options.value;
    if (isValueMoreThanMax || isValueLessThanMin || isValue2NotLessThanValue) {
      this.options.value = this.options.max;
    }
  }

  checkOptions(): boolean {
    const decimals = Model.countDecimals(this.options.step);
    const integerStep = this.options.step * 10 ** decimals;
    const maxMinIntegerDifference = (this.options.max - this.options.min) * 10 ** decimals;
    const isStepIncorrect = maxMinIntegerDifference % integerStep !== 0 || this.options.step <= 0;
    if (isStepIncorrect) {
      return false;
    }
    
    const value2isOutsideMaxMin = (
      this.options.value2 < this.options.min || this.options.value2 >= this.options.max
    );
    if (value2isOutsideMaxMin) {
      this.options.value2 = this.options.min;
    }

    const isValueMoreThanMax = this.options.value > this.options.max;
    const isValueLessThanMin = this.options.value < this.options.min;
    const isValue2NotLessThanValue = this.options.value2 >= this.options.value;
    if (isValueMoreThanMax || isValueLessThanMin || isValue2NotLessThanValue) {
      this.options.value = this.options.max;
    }
    return true;
  }

  setKey(key: string) {
    this.options.key = key;
  }

  setCurrentCord(currentCord: number) {
    this.options.currentCord = currentCord;
  }

  setCords(startCord: number, endCord: number) {
    this.options.startCord = startCord;
    this.options.endCord = endCord;
  }

  calcValue() {
    const ratioForValuesAndCords = (
      (this.options.max - this.options.min) / (this.options.endCord - this.options.startCord)
    );
    let value = (
      (this.options.currentCord - this.options.startCord) * ratioForValuesAndCords + this.options.min
    );
    const decimals = Model.countDecimals(this.options.step);
    const integerStep = this.options.step * 10 ** decimals;
    const valueMinIntegerDifference = (value - this.options.min) * 10 ** decimals;
    const isValueCloserToBiggerOne = valueMinIntegerDifference % integerStep > integerStep / 2;
    if (isValueCloserToBiggerOne) {
      value -= (valueMinIntegerDifference % integerStep) / 10 ** decimals - this.options.step;
    } else {
      value -= (valueMinIntegerDifference % integerStep) / 10 ** decimals;
    }

    value = Number(value.toFixed(decimals));
    const valueIsInsideMaxMin = value >= this.options.min && value <= this.options.max;
    if (valueIsInsideMaxMin) {
      if (this.options.key === actionModule.SECOND_HANDLE) {
        if (value >= this.options.value) {
          return;
        }

        this.options.value2 = value;
      } else {
        const valueIsLessThanValue2 = this.options.range === rangeModule.TRUE && value <= this.options.value2;
        if (valueIsLessThanValue2) {
          return;
        }

        this.options.value = value;
      }
    }
  }

  setFirstValue(value: number) {
    this.options.value = value;
  }

  setSecondValue(value: number) {
    this.options.value2 = value;
  }

  changeFirstValue(value: number) {
    const decimals = Model.countDecimals(this.options.step);
    const remainderOfValue = (value - this.options.min) % this.options.step;
    const isValueCloserToGreater = remainderOfValue > this.options.step / 2;
    if (value >= this.options.max) {
      this.options.value = this.options.max;
    } else if (this.options.range === rangeModule.TRUE) {
      if (value <= this.options.value2 + this.options.step) {
        this.options.value = this.options.value2 + this.options.step;
      } else if (isValueCloserToGreater) {
        this.options.value = value - remainderOfValue + this.options.step;
      } else {
        this.options.value = value - remainderOfValue;
      }
    } else if (value <= this.options.min) {
      this.options.value = this.options.min;
    } else if (isValueCloserToGreater) {
      this.options.value = value - remainderOfValue + this.options.step;
    } else {
      this.options.value = value - remainderOfValue;
    }

    this.options.value = Number(this.options.value.toFixed(decimals));
  }

  changeSecondValue(value: number) {
    const decimals = Model.countDecimals(this.options.step);
    const remainderOfValue = (value - this.options.min) % this.options.step;
    const isValueCloserToGreater = remainderOfValue > this.options.step / 2;
    if (this.options.range === rangeModule.TRUE) {
      if (value <= this.options.min) {
        this.options.value2 = this.options.min;
      } else if (value >= this.options.value - this.options.step) {
        this.options.value2 = this.options.value - this.options.step;
      } else if (isValueCloserToGreater) {
        this.options.value2 = value - remainderOfValue + this.options.step;
      } else {
        this.options.value2 = value - remainderOfValue;
      }

      this.options.value2 = parseFloat(this.options.value2.toFixed(decimals));
    }
  }

  setMaxValue(max: number): string {
    if (max > this.options.min) {
      const decimals = Model.countDecimals(this.options.step);
      const isStepMultiplier = (
        ((max - this.options.min) * 10 ** decimals) % (this.options.step * 10 ** decimals) === 0
      );
      if (isStepMultiplier) {
        this.options.max = max;
        if (this.options.value > this.options.max) {
          this.options.value = this.options.max;
        }
        const value2isGreaterThanMax = this.options.range === rangeModule.TRUE && this.options.value2 > this.options.max;
        if (value2isGreaterThanMax) {
          this.options.value2 = this.options.min;
        }

        return '';
      }

      return 'The step should be a multiplier of the difference between max and min values';
    }

    return 'Max value should be more than min one';
  }

  setMinValue(min: number):string {
    if (min < this.options.max) {
      const decimals = Model.countDecimals(this.options.step);
      const isStepMultiplier = (
        ((this.options.max - min) * 10 ** decimals) % (this.options.step * 10 ** decimals) === 0
      );
      if (isStepMultiplier) {
        this.options.min = min;
        const value2IsLessThanMin = this.options.range === rangeModule.TRUE && this.options.value2 < this.options.min;
        if (value2IsLessThanMin) {
          this.options.value2 = this.options.min;
        } else if (this.options.value < this.options.min) {
          this.options.value = this.options.min;
        }

        return '';
      }

      return 'The step should be a multiplier of the difference between max and min values';
    }

    return 'Min value should be less than max one';
  }

  setStep(step: number):string {
    if (step <= 0) {
      return 'Step should be positive';
    }

    const decimals = Model.countDecimals(step);
    const isStepMultiplier = (
      ((this.options.max - this.options.min) * 10 ** decimals) % (step * 10 ** decimals) === 0
    );
    if (isStepMultiplier) {
      this.options.step = step;
      return '';
    }

    return 'Step should be a multiplier of the difference between max and min values';
  }

  setRange(range: string) {
    const rangeIsDefined = range === rangeModule.MIN || range === rangeModule.MAX || range === rangeModule.TRUE;
    if (rangeIsDefined) {
      this.options.range = range;
    } else {
      this.options.range = rangeModule.FALSE;
    }
  }

  setVisibility(isVisible: boolean) {
    this.options.isValueVisible = isVisible;
  }

  setMode(isVertical: boolean) {
    this.options.isVertical = isVertical;
  }

  getOptions() {
    return this.options;
  }

  private static countDecimals(value: number): number {
    if (String(value).includes('.')) {
      return String(value).split('.')[1].length;
    }

    return 0;
  }
}

export default Model;
export { CompleteOptions, Options };
