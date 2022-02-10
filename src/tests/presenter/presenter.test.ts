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
  });

  test('handleInputListener should call calculateValue in model', () => {
    const calcValueMock = jest.fn(slider.getModel().calcValue);
    slider.getModel().calcValue = calcValueMock;
    slider.handleInputListener(options);
    expect(calcValueMock.mock.calls.length).toBe(0);
    options.key = 'secondHandle';
    slider.handleInputListener(options);
    expect(calcValueMock.mock.calls.length).toBe(1);
  });
});
