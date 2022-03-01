import { CompleteOptions } from '../../plugin/components/Model/Model';
import View from '../../plugin/components/View/View';

describe('View tests', () => {
  let view: View;
  let root: HTMLDivElement;
  let options: CompleteOptions;

  beforeEach(() => {
    options = {
      value: 3,
      value2: 2,
      step: 0.1,
      max: 4,
      min: 2,
      startCord: 100,
      endCord: 200,
      range: 'true',
      key: '',
      currentCord: 0,
      isValueVisible: false,
    };
    root = document.createElement('div');
    root.setAttribute('id', 'slider-test');
    document.body.append(root);
    view = new View();
    view.findSlider('slider-test');
  });

  afterEach(() => {
    root.remove();
  });

  test('displaySlider should create secondHandle and secondValue if range is true', () => {
    view.displaySlider(options);
    expect(view.getViewElements().secondHandle.getSliderHandle().classList.contains('ng-slider__handle')).toBeTruthy();
    expect(view.getViewElements().secondValue.getCurrentValue().classList.contains('ng-slider__current-value')).toBeTruthy();
    expect(view.getSlider()?.contains(view.getViewElements().secondHandle.getSliderHandle())).toBeTruthy();
    expect(view.getViewElements().secondHandle.getSliderHandle().contains(view.getViewElements().secondValue.getCurrentValue())).toBeTruthy();
  });

  test('displaySlider should hide first and second values if it says so in options', () => {
    options.range = '';
    view.displaySlider(options);
    expect(view.getViewElements().firstValue.getCurrentValue().style.display).toBe('none');
    expect(view.getViewElements().secondValue.getCurrentValue().style.display).toBe('none');
  });
  test('displaySlider should value if it says so in options', () => {
    options.isValueVisible = true;
    view.displaySlider(options);
    expect(view.getViewElements().firstValue.getCurrentValue().style.display).toBe('block');
  });

  test('destroySlider should call destroy labels', () => {
    const destroyMock = (
      jest.fn(view.getViewElements().labels.destroy)
    );
    view.getViewElements().labels.destroy = destroyMock;
    view.destroySlider();
    expect(destroyMock.mock.calls.length).toBe(1);
  });
  test('destroySlider should remove all child nodes of slider', () => {
    view.destroySlider();
    expect(view.getSlider()?.hasChildNodes()).toBeFalsy();
  });

  test('setHandles should call setHandle for each handle', () => {
    const setHandleMock = (
      jest.fn(view.getViewElements().firstHandle.setHandle)
    );
    view.getViewElements().firstHandle.setHandle = setHandleMock;
    view.getViewElements().secondHandle.setHandle = setHandleMock;
    view.setHandles(options);
    expect(setHandleMock.mock.calls.length).toBe(2);
  });

  test('changeValue should call setCurrentValue in firstValue and secondValue', () => {
    const setCurrentFirstValueMock = (
      jest.fn(view.getViewElements().firstValue.setTextOfCurrentValue)
    );
    const setCurrentSecondValueMock = (
      jest.fn(view.getViewElements().secondValue.setTextOfCurrentValue)
    );
    view.getViewElements().secondValue.setTextOfCurrentValue = setCurrentSecondValueMock;
    view.getViewElements().firstValue.setTextOfCurrentValue = setCurrentFirstValueMock;
    view.changeValue(options);
    expect(setCurrentFirstValueMock.mock.calls.length).toBe(1);
    expect(setCurrentSecondValueMock.mock.calls.length).toBe(1);
  });
  test('changeValue should call moveHandle in firstHandle and secondHandle', () => {
    const moveFirstHandleMock = (
      jest.fn(view.getViewElements().firstHandle.moveHandle)
    );
    const moveSecondHandleMock = (
      jest.fn(view.getViewElements().secondHandle.moveHandle)
    );
    view.getViewElements().firstHandle.moveHandle = moveFirstHandleMock;
    view.getViewElements().secondHandle.moveHandle = moveSecondHandleMock;
    view.changeValue(options);
    expect(moveFirstHandleMock.mock.calls.length).toBe(1);
    expect(moveSecondHandleMock.mock.calls.length).toBe(1);
  });
  test('changeValue should unite current values if they intersect', () => {
    options.value = 2.1;
    view.displaySlider(options);
    view.changeValue(options);
    expect(view.getViewElements().secondValue.getCurrentValue().style.display).toBe('none');
  });

  test('makeVertical should add css classes with vertical postfix of elements of slider', () => {
    view.makeVertical();
    expect(view.getSlider()?.classList.contains('ng-slider_vertical')).toBeTruthy();
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
    expect(view.getSlider()?.classList.contains('ng-slider_vertical')).toBeFalsy();
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
