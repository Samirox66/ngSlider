import Observer from '../Observer/Observer';
import Options from '../../slider';

interface CompleteOptions extends Options {
  key: string,
  value2: number,
  startCord: number,
  endCord: number,
  currentCord: number,
  range: string
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
    const isStepIncorrect = maxMinIntegerDifference % integerStep !== 0;
    if (!this.options.value2) {
      this.options.value2 = this.options.min;
    }
    if (this.options.min >= this.options.max) {
      throw new Error('Min value should be less than max one');
    }
    if (isStepIncorrect || this.options.step <= 0) {
      throw new Error(`${this.options.step} is incorrect step for ${this.options.id}`);
    }
    if (this.options.value2 < this.options.min || this.options.value2 >= this.options.max) {
      this.options.value2 = this.options.min;
    }
    const isValueMoreThanMax = this.options.value > this.options.max;
    const isValueLessThanMin = this.options.value < this.options.min;
    const isValue2NotLessThanValue = this.options.value2 >= this.options.value;
    if (isValueMoreThanMax || isValueLessThanMin || isValue2NotLessThanValue) {
      this.options.value = this.options.max;
    }
  }

  setCords(startCord: number, endCord: number) {
    this.options.startCord = startCord;
    this.options.endCord = endCord;
  }

  calcValue() {
    const ratioForValuesAndCords = (
      (this.options.max - this.options.min) / (this.options.endCord - this.options.startCord)
    );
    let value = (this.options.currentCord - this.options.startCord) * ratioForValuesAndCords + this.options.min;
    const decimals = Model.countDecimals(this.options.step);
    const integerStep = this.options.step * 10 ** decimals;
    const valueMinIntegerDifference = (value - this.options.min) * 10 ** decimals;
    const isValueCloserToBiggerOne = valueMinIntegerDifference % integerStep > integerStep / 2;
    if (isValueCloserToBiggerOne) {
      value = value - valueMinIntegerDifference % integerStep / 10 ** decimals + this.options.step;
    } else {
      value -= valueMinIntegerDifference % integerStep / 10 ** decimals;
    }
    value = parseFloat(value.toFixed(decimals));
    if (value >= this.options.min && value <= this.options.max) {
      if (this.options.key === 'secondHandle') {
        if (value >= this.options.value) {
          return;
        }
        this.options.value2 = value;
      } else {
        if (this.options.range === 'true' && value <= this.options.value2) {
          return;
        }
        this.options.value = value;
      }
    }
  }

  changeFirstValue(value: number) {
    const decimals = Model.countDecimals(this.options.step);
    const isValueCloserToBiggerNumber = (value - this.options.min) % this.options.step > this.options.step / 2;
    if (value >= this.options.max) {
      value = this.options.max;
    } else if (this.options.range === 'true' && this.options.value2) {
      if (value <= this.options.value2 + this.options.step) {
        value = this.options.value2 + this.options.step;
      } else if (isValueCloserToBiggerNumber) {
        value -= (value - this.options.min) % this.options.step - this.options.step;
      } else {
        value -= (value - this.options.min) % this.options.step;
      }
    } else if (value <= this.options.min) {
      value = this.options.min;
    } else if (isValueCloserToBiggerNumber) {
      value -= (value - this.options.min) % this.options.step - this.options.step;
    } else {
      value -= (value - this.options.min) % this.options.step;
    }
    this.options.value = parseFloat(value.toFixed(decimals));
  }

  changeSecondValue(value: number) {
    const decimals = Model.countDecimals(this.options.step);
    const isValueCloserToBiggerNumber = (value - this.options.min) % this.options.step > this.options.step / 2;
    if (this.options.range === 'true') {
      if (value <= this.options.min) {
        value = this.options.min;
      } else if (value >= this.options.value - this.options.step) {
        value = this.options.value - this.options.step;
      } else if (isValueCloserToBiggerNumber) {
        value -= (value - this.options.min) % this.options.step - this.options.step;
      } else {
        value -= (value - this.options.min) % this.options.step;
      }
      this.options.value2 = parseFloat(value.toFixed(decimals));
    }
  }

  setMaxValue(max: number): string {
    if (max > this.options.min) {
      const decimals = Model.countDecimals(this.options.step);
      const isStepMultiplier = ((max - this.options.min) * 10 ** decimals) % (this.options.step * 10 ** decimals) === 0;
      if (isStepMultiplier) {
        this.options.max = max;
        if (this.options.value > this.options.max) {
          this.options.value = this.options.max;
        }
        if (this.options.range === 'true' && this.options.value2 > this.options.max) {
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
      const isStepMultiplier = ((this.options.max - min) * 10 ** decimals) % (this.options.step * 10 ** decimals) === 0;
      if (isStepMultiplier) {
        this.options.min = min;
        if (this.options.range === 'true' && this.options.value2 < this.options.min) {
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
    const decimals = Model.countDecimals(step);
    const isStepMultiplier = ((this.options.max - this.options.min) * 10 ** decimals) % (step * 10 ** decimals) === 0;
    if (isStepMultiplier) {
      this.options.step = step;
      return '';
    }
    return 'The step should be a multiplier of the difference between max and min values';
  }

  setRange(range: string) {
    if (range === 'min' || range === 'max' || range === 'true') {
      this.options.range = range;
    } else {
      this.options.range = 'false';
    }
  }

  setVisability(isVisible: boolean) {
    this.options.isValueVisible = isVisible;
  }

  setVerticalMode(isVertical: boolean) {
    this.options.isVertical = isVertical;
  }

  private static countDecimals = (value: number): number => {
    if (value.toString().includes('.')) {
      return value.toString().split('.')[1].length;
    }
    return 0;
  };

  get getOptions() {
    return this.options;
  }
}

export default Model;
export { CompleteOptions };
