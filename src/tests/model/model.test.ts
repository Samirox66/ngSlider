import Model, { CompleteOptions } from '../../plugin/components/Model/Model';

describe('Model tests', () => {
  let model: Model;
  let options: CompleteOptions;
  beforeEach(() => {
    options = {
      value: 5,
      value2: 3,
      step: 1,
      max: 10,
      min: 2,
      id: '',
      startCord: 200,
      endCord: 400,
      range: 'min',
      key: '',
      currentCord: 300,
    };
    model = new Model(options);
  });

  test('validateOptions should throw an error if step is incorrect', () => {
    expect(() => model.validateOptions()).not.toThrowError();
    model.getOptions().step = 3;
    expect(() => model.validateOptions()).toThrowError();
    model.getOptions().step = -1;
    expect(() => model.validateOptions()).toThrowError();
  });
  test('validateOptions should throw an error if max value is less than min one', () => {
    expect(() => model.validateOptions()).not.toThrowError();
    model.getOptions().max = 1;
    expect(() => model.validateOptions()).toThrowError();
  });
  test('validateOptions should set value2 to min value if it is incorrect', () => {
    model.validateOptions();
    expect(model.getOptions().value2).toBe(3);
    model.getOptions().value2 = -1;
    model.validateOptions();
    expect(model.getOptions().value2).toBe(2);
    model.getOptions().value2 = 10;
    model.validateOptions();
    expect(model.getOptions().value2).toBe(2);
  });
  test('validateOptions should set value to max value if it is incorrect', () => {
    model.validateOptions();
    expect(model.getOptions().value).toBe(5);
    model.getOptions().value = 0;
    model.validateOptions();
    expect(model.getOptions().value).toBe(10);
    model.getOptions().value = 12;
    model.validateOptions();
    expect(model.getOptions().value).toBe(10);
    model.getOptions().value = 3;
    model.validateOptions();
    expect(model.getOptions().value).toBe(10);
  });

  test('setKey should set key in options', () => {
    model.setKey('firstHandle');
    expect(model.getOptions().key).toBe('firstHandle');
  });

  test('setCords should set start and end coords in options', () => {
    model.setCords(300, 500);
    expect(model.getOptions().startCord).toBe(300);
    expect(model.getOptions().endCord).toBe(500);
  });

  test('setCurrentCord should set current cord in options', () => {
    model.setCurrentCord(240);
    expect(model.getOptions().currentCord).toBe(240);
  });

  test('calcValue should calculate values based on current coordinate', () => {
    model.calcValue();
    expect(model.getOptions().value).toBe(6);
    model.getOptions().currentCord = 290;
    model.calcValue();
    expect(model.getOptions().value).toBe(6);
    model.getOptions().key = 'secondHandle';
    model.getOptions().currentCord = 250;
    model.calcValue();
    expect(model.getOptions().value2).toBe(4);
  });
  test('calcValue should not change value if it it less than value2 and we are in range mode', () => {
    model.getOptions().currentCord = 200;
    model.getOptions().range = 'true';
    model.calcValue();
    expect(model.getOptions().value).toBe(5);
    model.getOptions().range = 'min';
    model.calcValue();
    expect(model.getOptions().value).toBe(2);
  });
  test('calcValue should not change value2 if it is more than first value', () => {
    model.getOptions().key = 'secondHandle';
    model.calcValue();
    expect(model.getOptions().value2).toBe(3);
  });

  test('setFirstValue should set first value in options', () => {
    model.setFirstValue(3);
    expect(model.getOptions().value).toBe(3);
  });

  test('setSecondValue should set second value on options', () => {
    model.setSecondValue(5);
    expect(model.getOptions().value2).toBe(5);
  });

  test('changeFirstValue should change first value to the closest appropriate value', () => {
    model.changeFirstValue(8.6);
    expect(model.getOptions().value).toBe(9);
    model.changeFirstValue(8.3);
    expect(model.getOptions().value).toBe(8);
    model.getOptions().range = 'true';
    model.changeFirstValue(2.3);
    expect(model.getOptions().value).toBe(4);
    model.changeFirstValue(8.6);
    expect(model.getOptions().value).toBe(9);
    model.changeFirstValue(8.3);
    expect(model.getOptions().value).toBe(8);
  });
  test('changeFirstValue should set first value to max value if it is bigger than max one', () => {
    model.changeFirstValue(11);
    expect(model.getOptions().value).toBe(10);
  });
  test('changeFirstValue should change fist value to min one if first value less than min one and there is no range mode', () => {
    model.changeFirstValue(1.3);
    expect(model.getOptions().value).toBe(2);
  });

  test('changeSecondValue should change second value to the closest appropriate value in range mode', () => {
    model.changeSecondValue(2);
    expect(model.getOptions().value2).toBe(3);
    model.getOptions().range = 'true';
    model.changeSecondValue(2);
    expect(model.getOptions().value2).toBe(2);
    model.changeSecondValue(6);
    expect(model.getOptions().value2).toBe(4);
    model.changeSecondValue(3.4);
    expect(model.getOptions().value2).toBe(3);
    model.changeSecondValue(3.6);
    expect(model.getOptions().value2).toBe(4);
  });

  test('changeMaxValue should change max value if new max value is bigger than min one', () => {
    model.changeMaxValue(12);
    expect(model.getOptions().max).toBe(12);
    model.changeMaxValue(1);
    expect(model.getOptions().max).toBe(12);
  });
  test('changeMaxValue should set value to new max value if max value is less than value', () => {
    model.getOptions().value = 8;
    model.changeMaxValue(6);
    expect(model.getOptions().max).toBe(6);
    expect(model.getOptions().value).toBe(6);
  });
  test('changeMaxValue should set value2 to min value if new max value is less than value2', () => {
    model.getOptions().range = 'true';
    model.getOptions().value = 8;
    model.getOptions().value2 = 7;
    model.changeMaxValue(6);
    expect(model.getOptions().value2).toBe(2);
  });
  test('changeMaxValue should return an error string if the step is not a multiplier of the difference between new max value and min one', () => {
    expect(model.changeMaxValue(7.7)).toBe('The step should be a multiplier of the difference between max and min values');
  });

  test('changeMinValue should change min value if new min value is less than max one', () => {
    model.changeMinValue(12);
    expect(model.getOptions().min).toBe(2);
    model.changeMinValue(1);
    expect(model.getOptions().min).toBe(1);
  });
  test('changeMinValue should set value2 to min value if new min value is more than value2', () => {
    model.getOptions().range = 'true';
    model.changeMinValue(4);
    expect(model.getOptions().value2).toBe(4);
  });
  test('changeMinValue should set value to min value if new min value is more than value', () => {
    model.changeMinValue(6);
    expect(model.getOptions().value).toBe(6);
  });
  test('changeMinValue should return an error string if the step is not a multiplier of the difference between new max value and min one', () => {
    expect(model.changeMinValue(1.2)).toBe('The step should be a multiplier of the difference between max and min values');
  });

  test('changeStep should change step if it is a multiplier of the difference between max and min values', () => {
    model.changeStep(3);
    expect(model.getOptions().step).toBe(1);
    model.changeStep(0.1);
    expect(model.getOptions().step).toBe(0.1);
  });
  test('changeStep should return error string if step is equal or less than zero', () => {
    expect(model.changeStep(-2)).toBe('Step should be positive');
  });

  test('setRange should change range option', () => {
    model.setRange('max');
    expect(model.getOptions().range).toBe('max');
    model.setRange('gg');
    expect(model.getOptions().range).toBe('false');
  });

  test('setVisibility should change boolean value displaying if current value is visible', () => {
    model.setVisibility(false);
    expect(model.getOptions().isValueVisible).toBeFalsy();
    model.setVisibility('true');
    expect(model.getOptions().isValueVisible).toBeTruthy();
  });

  test('setMode should change boolean value displaying if slider is in vertical mode', () => {
    model.setMode(true);
    expect(model.getOptions().isVertical).toBe(true);
    model.setMode('false');
    expect(model.getOptions().isVertical).toBeFalsy();
  });

  test('getOptions should return options', () => {
    expect(model.getOptions()).toEqual(options);
  });
});
