import { CompleteOptions } from '../../plugin/components/Model/Model';
import Handle from '../../plugin/components/View/Handle';
import View from '../../plugin/components/View/View';

describe('Handle tests', () => {
  let sliderHandle: Handle;
  const options: CompleteOptions = {
    value: 3,
    value2: 2,
    step: 0.1,
    max: 5,
    min: 1,
    startCord: 0,
    endCord: 200,
    range: 'true',
    key: '',
    currentCord: 0,
  };

  beforeEach(() => {
    sliderHandle = new Handle();
  });

  test('hide should change display property to none', () => {
    sliderHandle.hide();
    expect(sliderHandle.getSliderHandle().style.display).toBe('none');
  });

  test('show should change display property to block', () => {
    sliderHandle.show();
    expect(sliderHandle.getSliderHandle().style.display).toBe('block');
  });

  test('getSliderHandle should return sliderHandle', () => {
    expect(sliderHandle.getSliderHandle).toEqual(sliderHandle.getSliderHandle);
  });

  test('moveHandle should change top or left property of sliderHandle', () => {
    sliderHandle.moveHandle(options, 4);
    expect(sliderHandle.getSliderHandle().style.left).toBe('75%');
  });

  test('setHandle should set event listener of pointerdown to handle', () => {
    const eventListenerMock = jest.fn(sliderHandle.getSliderHandle().addEventListener);
    sliderHandle.getSliderHandle().addEventListener = eventListenerMock;
    document.body.innerHTML = '<div id=\'slider-test\'></div>';
    const view = new View();
    view.findSlider('slider-test');
    sliderHandle.setHandle(view.notifyObservers, options, false);
    expect(eventListenerMock.mock.calls.length).toBe(1);
  });
});
