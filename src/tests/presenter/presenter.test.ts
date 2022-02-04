import Presenter from '../../plugin/components/Presenter/Presenter';
import View from '../../plugin/components/View/View';
import Model, { CompleteOptions } from '../../plugin/components/Model/Model';

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
    slider = new Presenter(new View(options.id), new Model(options));
  });

  afterEach(() => {
    root.remove();
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

  test('handleResizeWindow should set cords of the slider in options', () => {
    slider.handleResizeWindow();
    expect(slider.getModel().getOptions().startCord).toBe(slider.getView().getSlider().getBoundingClientRect().left);
  })

  test('handleInputListener should call calculateValue in model', () => {
    const calcValueMock = jest.fn(slider.getModel().calcValue);
    slider.getModel().calcValue = calcValueMock;
    slider.handleInputListener(options);
    expect(calcValueMock.mock.calls.length).toBe(0);
    options.key = 'secondHandle';
    slider.handleInputListener(options);
    expect(calcValueMock.mock.calls.length).toBe(1);
  });

  test('changeFirstValue should call changeFirstValue in model', () => {
    const changeFirstValueMock = jest.fn(slider.getModel().changeFirstValue);
    slider.getModel().changeFirstValue = changeFirstValueMock;
    slider.changeFirstValue(1);
    expect(changeFirstValueMock.mock.calls.length).toBe(1);
    slider.changeFirstValue('1');
    expect(changeFirstValueMock.mock.calls.length).toBe(2);
  });

  test('changeSecondValue should call changeSecondValue in model', () => {
    const changeSecondValueMock = jest.fn(slider.getModel().changeSecondValue);
    slider.getModel().changeSecondValue = changeSecondValueMock;
    slider.changeSecondValue(1);
    expect(changeSecondValueMock.mock.calls.length).toBe(1);
    slider.changeSecondValue('1');
    expect(changeSecondValueMock.mock.calls.length).toBe(2);
  });

  test('changeMaxValue should call setMaxValue in model', () => {
    const setMaxValueMock = jest.fn(slider.getModel().setMaxValue);
    slider.getModel().setMaxValue = setMaxValueMock;
    slider.changeMaxValue(1);
    expect(setMaxValueMock.mock.calls.length).toBe(1);
    slider.changeMaxValue('1');
    expect(setMaxValueMock.mock.calls.length).toBe(2);
  });

  test('changeMinValue should call setMinValue in model', () => {
    const setMinValueMock = jest.fn(slider.getModel().setMinValue);
    slider.getModel().setMinValue = setMinValueMock;
    slider.changeMinValue(1);
    expect(setMinValueMock.mock.calls.length).toBe(1);
    slider.changeMinValue('1');
    expect(setMinValueMock.mock.calls.length).toBe(2);
  });

  test('changeStep should call setStep in model', () => {
    const setStepMock = jest.fn(slider.getModel().setStep);
    slider.getModel().setStep = setStepMock;
    slider.changeStep(1);
    expect(setStepMock.mock.calls.length).toBe(1);
    slider.changeStep('1');
    expect(setStepMock.mock.calls.length).toBe(2);
  });

  test('changeRange should call setRange in model', () => {
    const setRangeMock = jest.fn(slider.getModel().setRange);
    slider.getModel().setRange = setRangeMock;
    slider.changeRange('');
    expect(setRangeMock.mock.calls.length).toBe(1);
  });
  test('changeRange should hide sliderTrack if there is not range options', () => {
    const hideMock = jest.fn(slider.getView().getViewElements().sliderTrack.hide);
    slider.getView().getViewElements().sliderTrack.hide = hideMock;
    slider.changeRange('true');
    expect(hideMock.mock.calls.length).toBe(0);
    slider.changeRange('');
    expect(hideMock.mock.calls.length).toBe(1);
  });

  test('changeMode should call makeVertical or makeHorizontal', () => {
    const makeVerticalMock = jest.fn(slider.getView().makeVertical);
    slider.getView().makeVertical = makeVerticalMock;
    slider.changeMode(false);
    expect(makeVerticalMock.mock.calls.length).toBe(0);
    slider.changeMode(true);
    expect(makeVerticalMock.mock.calls.length).toBe(1);
  });
  test('changeMode should call setCords in model', () => {
    const setCordsMock = jest.fn(slider.getModel().setCords);
    slider.getModel().setCords = setCordsMock;
    slider.changeMode(false);
    expect(setCordsMock.mock.calls.length).toBe(1);
  });
  test('changeMode should call setVerticalMode in model', () => {
    const setVerticalModeMock = jest.fn(slider.getModel().setMode);
    slider.getModel().setMode = setVerticalModeMock;
    slider.changeMode(false);
    expect(setVerticalModeMock.mock.calls.length).toBe(1);
  });

  test('changeVisibilityOfValues should call setVisibility in model', () => {
    const setVisibilityMock = jest.fn(slider.getModel().setVisibility);
    slider.getModel().setVisibility = setVisibilityMock;
    slider.changeVisibilityOfValues(true);
    expect(setVisibilityMock.mock.calls.length).toBe(1);
  });
});
