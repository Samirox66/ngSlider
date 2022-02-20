import Presenter from '../../plugin/components/Presenter/Presenter';
import View from '../../plugin/components/View/View';
import Model, { CompleteOptions } from '../../plugin/components/Model/Model';
import { ObserverOptions } from '../../plugin/components/Observer/Observer';

describe('Presenter tests', () => {
  let slider: Presenter;
  let options: CompleteOptions;
  let root: HTMLDivElement;
  beforeEach(() => {
    options = {
      value: 0,
      value2: 0,
      step: 1,
      max: 4,
      min: 2,
      id: 'slider-test',
      startCord: 0,
      endCord: 0,
      range: '',
      key: 'min',
      currentCord: 0,
    };
    root = document.createElement('div');
    root.setAttribute('id', 'slider-test');
    document.body.append(root);
    slider = new Presenter(new View(), new Model(options));
    slider.getView().findSlider(options.id);
  });

  afterEach(() => {
    root.remove();
  });

  test('getAttr should return the value of the existing property', () => {
    expect(slider.getAttr('value')).toBe('0');
    expect(slider.getAttr('max')).toBe('4');
    expect(slider.getAttr('min')).toBe('2');
    expect(slider.getAttr('value2')).toBe('0');
    expect(slider.getAttr('step')).toBe('1');
    expect(() => slider.getAttr('shingeki')).toThrowError();
  });

  test('setAttr should throw an error if got wrong property', () => {
    expect(() => slider.setAttr('wakanda', '43')).toThrowError();
  });
  test('setAttr should call changeFirstValue if prop is equal to value', () => {
    const changeFirstValueMock = jest.fn(slider.getModel().changeFirstValue);
    slider.getModel().changeFirstValue = changeFirstValueMock;
    slider.setAttr('value', '2');
    expect(changeFirstValueMock.mock.calls.length).toBe(1);
  });
  test('setAttr should call changeSecondValue if prop is equal to value2', () => {
    const changeSecondValueMock = jest.fn(slider.getModel().changeSecondValue);
    slider.getModel().changeSecondValue = changeSecondValueMock;
    slider.setAttr('value2', '2');
    expect(changeSecondValueMock.mock.calls.length).toBe(1);
  });
  test('setAttr should call changeMaxValue if prop is equal to max', () => {
    const changeMaxValueMock = jest.fn(slider.getModel().changeMaxValue);
    slider.getModel().changeMaxValue = changeMaxValueMock;
    slider.setAttr('max', '2');
    expect(changeMaxValueMock.mock.calls.length).toBe(1);
  });
  test('setAttr should call changeMinValue if prop is equal to min', () => {
    const changeMinValueMock = jest.fn(slider.getModel().changeMinValue);
    slider.getModel().changeMinValue = changeMinValueMock;
    slider.setAttr('min', '2');
    expect(changeMinValueMock.mock.calls.length).toBe(1);
  });
  test('setAttr should call changeStep if prop is equal to step', () => {
    const changeStepMock = jest.fn(slider.getModel().changeStep);
    slider.getModel().changeStep = changeStepMock;
    slider.setAttr('step', '2');
    expect(changeStepMock.mock.calls.length).toBe(1);
  });
  test('setAttr should call setVisibility if prop is equal to isValueVisible', () => {
    const setVisibilityMock = jest.fn(slider.getModel().setVisibility);
    slider.getModel().setVisibility = setVisibilityMock;
    slider.setAttr('isValueVisible', 'true');
    expect(setVisibilityMock.mock.calls.length).toBe(1);
  });
  test('setAttr should call makeVertical if prop is equal to isVertical and value is equal to true', () => {
    const makeVerticalMock = jest.fn(slider.getView().makeVertical);
    slider.getView().makeVertical = makeVerticalMock;
    slider.setAttr('isVertical', 'true');
    expect(makeVerticalMock.mock.calls.length).toBe(1);
  });
  test('setAttr should call makeHorizontal if prop is equal to isVertical and value is not equal to true', () => {
    const makeHorizontalMock = jest.fn(slider.getView().makeHorizontal);
    slider.getView().makeHorizontal = makeHorizontalMock;
    slider.setAttr('isVertical', 'false');
    expect(makeHorizontalMock.mock.calls.length).toBe(1);
  });
  test('setAttr should call setMode', () => {
    const setModeMock = jest.fn(slider.getModel().setMode);
    slider.getModel().setMode = setModeMock;
    slider.setAttr('isVertical', 'true');
    expect(setModeMock.mock.calls.length).toBe(1);
  });
  test('setAttr should call setRange if prop is equal to range', () => {
    const setRangeMock = jest.fn(slider.getModel().setRange);
    slider.getModel().setRange = setRangeMock;
    slider.setAttr('range', 'min');
    expect(setRangeMock.mock.calls.length).toBe(1);
  });

  test('onInit should call validateOptions', () => {
    const validateOptionsMock = jest.fn(slider.getModel().validateOptions);
    slider.getModel().validateOptions = validateOptionsMock;
    slider.onInit();
    expect(validateOptionsMock.mock.calls.length).toBe(1);
  });

  test('onInit should add 2 observers', () => {
    slider.onInit();
    expect(slider.getView().observers.length).toBe(2);
  });
  test('onInit should display slider', () => {
    const displaySliderMock = jest.fn(slider.getView().displaySlider);
    slider.getView().displaySlider = displaySliderMock;
    slider.onInit();
    expect(displaySliderMock.mock.calls.length).toBe(1);
  });
  test('onInit should set handles', () => {
    const setHandlesMock = jest.fn(slider.getView().setHandles);
    slider.getView().setHandles = setHandlesMock;
    slider.onInit();
    expect(setHandlesMock.mock.calls.length).toBe(1);
  });
  test('onInit should set cords', () => {
    const setCordsMock = jest.fn(slider.getModel().setCords);
    slider.getModel().setCords = setCordsMock;
    slider.onInit();
    expect(setCordsMock.mock.calls.length).toBe(1);
  });
  test('onInit should make slider vertical if it is necessary', () => {
    const makeVerticalMock = jest.fn(slider.getView().makeVertical);
    slider.getView().makeVertical = makeVerticalMock;
    slider.onInit();
    expect(makeVerticalMock.mock.calls.length).toBe(0);
    options.isVertical = true;
    slider.onInit();
    expect(makeVerticalMock.mock.calls.length).toBe(1);
  });

  test('handleInputListener should call calculateValue in model', () => {
    const calcValueMock = jest.fn(slider.getModel().calcValue);
    const observerOptions: ObserverOptions = {
      key: 'min',
      value: 3,
    };
    slider.getModel().calcValue = calcValueMock;
    slider.handleInputListener(observerOptions);
    expect(calcValueMock.mock.calls.length).toBe(0);
    observerOptions.key = 'secondHandle';
    slider.handleInputListener(observerOptions);
    expect(calcValueMock.mock.calls.length).toBe(1);
  });
  test('handleInputListener should set currentCord in model', () => {
    const observerOptions: ObserverOptions = {
      key: 'firstHandle',
      value: 3,
      currentCord: 300,
    };
    slider.handleInputListener(observerOptions);
    expect(slider.getModel().getOptions().currentCord).toBe(300);
  });

  test('labelsClickListener should set key property in model', () => {
    const observerOptions: ObserverOptions = {
      key: 'firstLabels',
      value: 3,
    };
    slider.labelsClickListener(observerOptions);
    expect(slider.getModel().getOptions().key).toBe('firstLabels');
  });
  test('labelsClickListener should set first or second value', () => {
    const observerOptions: ObserverOptions = {
      key: 'firstLabels',
      value: 3,
    };
    slider.labelsClickListener(observerOptions);
    expect(slider.getModel().getOptions().value).toBe(3);
    observerOptions.value2 = 4;
    observerOptions.value = undefined;
    slider.labelsClickListener(observerOptions);
    expect(slider.getModel().getOptions().value2).toBe(4);
    expect(slider.getModel().getOptions().value).toBe(3);
  });
});
