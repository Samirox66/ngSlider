import { CompleteOptions } from '../../plugin/components/Model/Model';
import View from '../../plugin/components/View/View';

describe('View tests', () => {
  let view: View;
  let root: HTMLDivElement;
  const options: CompleteOptions = {
    value: 3,
    value2: 2,
    step: 0.1,
    max: 4,
    min: 2,
    id: 'slider-test',
    startCord: 0,
    endCord: 0,
    range: 'true',
    key: '',
    currentCord: 0,
    isValueVisible: false,
  };

  beforeEach(() => {
    root = document.createElement('div');
    root.setAttribute('id', 'slider-test');
    document.body.append(root);
    view = new View(options.id);
  });

  afterEach(() => {
    root.remove();
  });

  test('constructor of view should throw an error if it gets a wrong id', () => {
    expect(() => new View('wrong id')).toThrowError();
  });

  test('displaySlider should hide first and second values if it says so in options', () => {
    options.range = '';
    view.displaySlider(options);
    expect(view.getViewElements().firstValue.getCurrentValue().style.display).toBe('none');
    expect(view.getViewElements().secondValue.getCurrentValue().style.display).toBe('none');
  });
  test('displaySlider should show first and second values if it says so in options', () => {
    options.isValueVisible = true;
    view.displaySlider(options);
    expect(view.getViewElements().firstValue.getCurrentValue().style.display).toBe('block');
    expect(view.getViewElements().secondValue.getCurrentValue().style.display).toBe('block');
  });

  test('destroySlider should call destroy labels', () => {
    const destroyMock = (
      jest.fn(view.getViewElements().labels.destroy.bind(view.getViewElements().labels))
    );
    view.getViewElements().labels.destroy = destroyMock;
    view.destroySlider();
    expect(destroyMock.mock.calls.length).toBe(1);
  });
  test('destroySlider should remove all child nodes of slider', () => {
    view.destroySlider();
    expect(view.getSlider().hasChildNodes()).toBeFalsy();
  });

  test('setHandles should call setHandle for each handle', () => {
    const setHandleMock = (
      jest.fn(view.getViewElements().firstHandle.setHandle.bind(view.getViewElements().firstHandle))
    );
    view.getViewElements().firstHandle.setHandle = setHandleMock;
    view.getViewElements().secondHandle.setHandle = setHandleMock;
    view.setHandles(options);
    expect(setHandleMock.mock.calls.length).toBe(2);
  });

  test('changeValue should call setCurrentValue in secondValue if we change second value', () => {
    const setCurrentValueMock = (
      jest.fn(view.getViewElements().secondValue.setTextOfCurrentValue.bind(view.getViewElements().secondValue))
    );
    view.getViewElements().secondValue.setTextOfCurrentValue = setCurrentValueMock;
    options.key = 'firstHandle';
    view.changeValue(options, false);
    expect(setCurrentValueMock.mock.calls.length).toBe(0);
    options.key = 'secondHandle';
    view.changeValue(options, true);
    expect(setCurrentValueMock.mock.calls.length).toBe(1);
  });
  test('changeValue should call setCurrentValue in firstValue if we change first value', () => {
    const setCurrentValueMock = (
      jest.fn(view.getViewElements().firstValue.setTextOfCurrentValue.bind(view.getViewElements().firstValue))
    );
    view.getViewElements().firstValue.setTextOfCurrentValue = setCurrentValueMock;
    options.key = 'secondHandle';
    view.changeValue(options, true);
    expect(setCurrentValueMock.mock.calls.length).toBe(0);
    options.key = 'firstHandle';
    view.changeValue(options, false);
    expect(setCurrentValueMock.mock.calls.length).toBe(1);
  });
  test('changeValue should call moveHandle in secondHandle if we change second value', () => {
    const moveHandleMock = (
      jest.fn(view.getViewElements().secondHandle.moveHandle.bind(view.getViewElements().secondHandle))
    );
    view.getViewElements().secondHandle.moveHandle = moveHandleMock;
    options.key = 'firstHandle';
    view.changeValue(options, false);
    expect(moveHandleMock.mock.calls.length).toBe(0);
    options.key = 'secondHandle';
    view.changeValue(options, true);
    expect(moveHandleMock.mock.calls.length).toBe(1);
  });
  test('changeValue should call setCurrentValue in firstValue if we change first value', () => {
    const moveHandleMock = (
      jest.fn(view.getViewElements().firstHandle.moveHandle.bind(view.getViewElements().firstHandle))
    );
    view.getViewElements().firstHandle.moveHandle = moveHandleMock;
    options.key = 'secondHandle';
    view.changeValue(options, true);
    expect(moveHandleMock.mock.calls.length).toBe(0);
    options.key = 'firstHandle';
    view.changeValue(options, false);
    expect(moveHandleMock.mock.calls.length).toBe(1);
  });

  test('makeVertical should add css classes with vertical postfix of elements of slider', () => {
    view.makeVertical();
    expect(view.getSlider().classList.contains('ng-slider_vertical')).toBeTruthy();
    expect(view.getViewElements().firstHandle.getSliderHandle().classList.contains('ng-slider__handle_vertical')).toBeTruthy();
    expect(view.getViewElements().secondHandle.getSliderHandle().classList.contains('ng-slider__handle_vertical')).toBeTruthy();
    expect(view.getViewElements().sliderTrack.getSliderTrack().classList.contains('ng-slider__track_vertical')).toBeTruthy();
    expect(view.getViewElements().labels.getLabels().classList.contains('ng-slider__values_vertical')).toBeTruthy();
    expect(view.getViewElements().firstValue.getCurrentValue().classList.contains('ng-slider__current-value_vertical')).toBeTruthy();
    expect(view.getViewElements().secondValue.getCurrentValue().classList.contains('ng-slider__current-value_vertical')).toBeTruthy();
  });
  test('makeVertical should add default styles for some properties', () => {
    view.makeVertical();
    expect(view.getViewElements().sliderTrack.getSliderTrack().style.width).toBe('5px');
    expect(view.getViewElements().sliderTrack.getSliderTrack().style.left).toBe('0px');
    expect(view.getViewElements().firstHandle.getSliderHandle().style.left).toBe('-5px');
    expect(view.getViewElements().secondHandle.getSliderHandle().style.left).toBe('-5px');
  });

  test('makeHorizontal should remove css classes with vertical postfix of elements of slider', () => {
    view.makeHorizontal();
    expect(view.getSlider().classList.contains('ng-slider_vertical')).toBeFalsy();
    expect(view.getViewElements().firstHandle.getSliderHandle().classList.contains('ng-slider__handle_vertical')).toBeFalsy();
    expect(view.getViewElements().secondHandle.getSliderHandle().classList.contains('ng-slider__handle_vertical')).toBeFalsy();
    expect(view.getViewElements().sliderTrack.getSliderTrack().classList.contains('ng-slider__slider-track_vertical')).toBeFalsy();
    expect(view.getViewElements().labels.getLabels().classList.contains('ng-slider__values_vertical')).toBeFalsy();
    expect(view.getViewElements().firstValue.getCurrentValue().classList.contains('ng-slider__current-value_vertical')).toBeFalsy();
    expect(view.getViewElements().secondValue.getCurrentValue().classList.contains('ng-slider__current-value_vertical')).toBeFalsy();
  });
  test('makeHorizontal should add default styles for some properties', () => {
    view.makeHorizontal();
    expect(view.getViewElements().sliderTrack.getSliderTrack().style.height).toBe('5px');
    expect(view.getViewElements().sliderTrack.getSliderTrack().style.top).toBe('0px');
    expect(view.getViewElements().firstHandle.getSliderHandle().style.top).toBe('-5px');
    expect(view.getViewElements().secondHandle.getSliderHandle().style.top).toBe('-5px');
  });
});
