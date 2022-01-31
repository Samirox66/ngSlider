import Presenter from '../../plugin/components/Presenter/Presenter';
import View from '../../plugin/components/View/View';
import Model, { CompleteOptions } from '../../plugin/components/Model/Model';

describe('Presenter tests', () => {
  let presenter: Presenter;
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
    presenter = new Presenter(new View(options.id), new Model(options));
  });

  afterEach(() => {
    root.remove();
  });

  test('onInit should call validateOptions', () => {
    const validateOptionsMock = (
      jest.fn(presenter.getModel.validateOptions.bind(presenter.getModel))
    );
    presenter.getModel.validateOptions = validateOptionsMock;
    presenter.onInit();
    expect(validateOptionsMock.mock.calls.length).toBe(1);
  });

  test('onInit should add 2 observers', () => {
    presenter.onInit();
    expect(presenter.getView.observers.length).toBe(2);
  });
  test('onInit should display slider', () => {
    const displaySliderMock = jest.fn(presenter.getView.displaySlider.bind(presenter.getView));
    presenter.getView.displaySlider = displaySliderMock;
    presenter.onInit();
    expect(displaySliderMock.mock.calls.length).toBe(1);
  });
  test('onInit should set handles', () => {
    const setHandlesMock = jest.fn(presenter.getView.setHandles.bind(presenter.getView));
    presenter.getView.setHandles = setHandlesMock;
    presenter.onInit();
    expect(setHandlesMock.mock.calls.length).toBe(1);
  });
  test('onInit should set cords', () => {
    const setCordsMock = jest.fn(presenter.getModel.setCords.bind(presenter.getModel));
    presenter.getModel.setCords = setCordsMock;
    presenter.onInit();
    expect(setCordsMock.mock.calls.length).toBe(1);
  });
  test('onInit should make slider vertical if it is necessary', () => {
    const makeVerticalMock = jest.fn(presenter.getView.makeVertical.bind(presenter.getView));
    presenter.getView.makeVertical = makeVerticalMock;
    presenter.onInit();
    expect(makeVerticalMock.mock.calls.length).toBe(0);
    options.isVertical = true;
    presenter.onInit();
    expect(makeVerticalMock.mock.calls.length).toBe(1);
  });

  test('handleInputListener should call calculateValue in model', () => {
    const calcValueMock = jest.fn(presenter.getModel.calcValue.bind(presenter.getModel));
    presenter.getModel.calcValue = calcValueMock;
    presenter.handleInputListener(options);
    expect(calcValueMock.mock.calls.length).toBe(0);
    options.key = 'secondHandle';
    presenter.handleInputListener(options);
    expect(calcValueMock.mock.calls.length).toBe(1);
  });

  test('changeFirstValue should call changeFirstValue in model', () => {
    const changeFirstValueMock = (
      jest.fn(presenter.getModel.changeFirstValue.bind(presenter.getModel))
    );
    presenter.getModel.changeFirstValue = changeFirstValueMock;
    presenter.changeFirstValue(1);
    expect(changeFirstValueMock.mock.calls.length).toBe(1);
    presenter.changeFirstValue('1');
    expect(changeFirstValueMock.mock.calls.length).toBe(2);
  });

  test('changeSecondValue should call changeSecondValue in model', () => {
    const changeSecondValueMock = (
      jest.fn(presenter.getModel.changeSecondValue.bind(presenter.getModel))
    );
    presenter.getModel.changeSecondValue = changeSecondValueMock;
    presenter.changeSecondValue(1);
    expect(changeSecondValueMock.mock.calls.length).toBe(1);
    presenter.changeSecondValue('1');
    expect(changeSecondValueMock.mock.calls.length).toBe(2);
  });

  test('changeMaxValue should call setMaxValue in model', () => {
    const setMaxValueMock = jest.fn(presenter.getModel.setMaxValue.bind(presenter.getModel));
    presenter.getModel.setMaxValue = setMaxValueMock;
    presenter.changeMaxValue(1);
    expect(setMaxValueMock.mock.calls.length).toBe(1);
    presenter.changeMaxValue('1');
    expect(setMaxValueMock.mock.calls.length).toBe(2);
  });

  test('changeMinValue should call setMinValue in model', () => {
    const setMinValueMock = jest.fn(presenter.getModel.setMinValue.bind(presenter.getModel));
    presenter.getModel.setMinValue = setMinValueMock;
    presenter.changeMinValue(1);
    expect(setMinValueMock.mock.calls.length).toBe(1);
    presenter.changeMinValue('1');
    expect(setMinValueMock.mock.calls.length).toBe(2);
  });

  test('changeStep should call setStep in model', () => {
    const setStepMock = jest.fn(presenter.getModel.setStep.bind(presenter.getModel));
    presenter.getModel.setStep = setStepMock;
    presenter.changeStep(1);
    expect(setStepMock.mock.calls.length).toBe(1);
    presenter.changeStep('1');
    expect(setStepMock.mock.calls.length).toBe(2);
  });

  test('changeRange should call setRange in model', () => {
    const setRangeMock = jest.fn(presenter.getModel.setRange.bind(presenter.getModel));
    presenter.getModel.setRange = setRangeMock;
    presenter.changeRange('');
    expect(setRangeMock.mock.calls.length).toBe(1);
  });
  test('changeRange should hide sliderTrack if there is not range options', () => {
    const hideMock = (
      jest.fn(presenter.getView.getViewElements.sliderTrack.hide.bind(presenter.getView.getViewElements.sliderTrack))
    );
    presenter.getView.getViewElements.sliderTrack.hide = hideMock;
    presenter.changeRange('true');
    expect(hideMock.mock.calls.length).toBe(0);
    presenter.changeRange('');
    expect(hideMock.mock.calls.length).toBe(1);
  });

  test('changeMode should call makeVertical or makeHorizontal', () => {
    const makeVerticalMock = jest.fn(presenter.getView.makeVertical.bind(presenter.getView));
    presenter.getView.makeVertical = makeVerticalMock;
    presenter.changeMode(false);
    expect(makeVerticalMock.mock.calls.length).toBe(0);
    presenter.changeMode(true);
    expect(makeVerticalMock.mock.calls.length).toBe(1);
  });
  test('changeMode should call setCords in model', () => {
    const setCordsMock = jest.fn(presenter.getModel.setCords.bind(presenter.getModel));
    presenter.getModel.setCords = setCordsMock;
    presenter.changeMode(false);
    expect(setCordsMock.mock.calls.length).toBe(1);
  });
  test('changeMode should call setVerticalMode in model', () => {
    const setVerticalModeMock = (
      jest.fn(presenter.getModel.setMode.bind(presenter.getModel))
    );
    presenter.getModel.setMode = setVerticalModeMock;
    presenter.changeMode(false);
    expect(setVerticalModeMock.mock.calls.length).toBe(1);
  });

  test('changeVisibilityOfValues should call setVisibility in model', () => {
    const setVisibilityMock = jest.fn(presenter.getModel.setVisibility.bind(presenter.getModel));
    presenter.getModel.setVisibility = setVisibilityMock;
    presenter.changeVisibilityOfValues(true);
    expect(setVisibilityMock.mock.calls.length).toBe(1);
  });
});
