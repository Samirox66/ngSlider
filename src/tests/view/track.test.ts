import Track from '../../plugin/components/View/Track';
import { CompleteOptions } from '../../plugin/components/Model/Model';

describe('SliderTrack tests', () => {
  let sliderTrack: Track;
  const options: CompleteOptions = {
    value: 3,
    value2: 2,
    step: 0.1,
    max: 5,
    min: 1,
    id: '',
    startCord: 0,
    endCord: 200,
    range: 'true',
    key: '',
    currentCord: 0,
  };

  beforeEach(() => {
    sliderTrack = new Track();
  });

  test('hide should change width property to 0', () => {
    sliderTrack.hide();
    expect(sliderTrack.getSliderTrack.style.width).toBe('0px');
  });

  test('create should add class to element', () => {
    sliderTrack.create();
    expect(sliderTrack.getSliderTrack.classList.contains('ng-slider__slider-track')).toBeTruthy();
  });

  test('fillWithColor should change width or height of sliderTrack and move it', () => {
    sliderTrack.fillWithColor(options);
    expect(sliderTrack.getSliderTrack.style.left).toBe('25%');
    expect(sliderTrack.getSliderTrack.style.width).toBe('25%');
    options.value = 4;
    sliderTrack.fillWithColor(options);
    expect(sliderTrack.getSliderTrack.style.left).toBe('25%');
    expect(sliderTrack.getSliderTrack.style.width).toBe('50%');
    options.range = 'max';
    sliderTrack.fillWithColor(options);
    expect(sliderTrack.getSliderTrack.style.left).toBe('75%');
    expect(sliderTrack.getSliderTrack.style.width).toBe('25%');
    options.range = 'min';
    sliderTrack.fillWithColor(options);
    expect(sliderTrack.getSliderTrack.style.left).toBe('0%');
    expect(sliderTrack.getSliderTrack.style.width).toBe('75%');
    options.isVertical = true;
    sliderTrack.fillWithColor(options);
    expect(sliderTrack.getSliderTrack.style.top).toBe('0%');
    expect(sliderTrack.getSliderTrack.style.height).toBe('75%');
    options.range = 'true';
    sliderTrack.fillWithColor(options);
    expect(sliderTrack.getSliderTrack.style.top).toBe('25%');
    expect(sliderTrack.getSliderTrack.style.height).toBe('50%');
    options.range = 'max';
    sliderTrack.fillWithColor(options);
    expect(sliderTrack.getSliderTrack.style.top).toBe('75%');
    expect(sliderTrack.getSliderTrack.style.height).toBe('25%');
  });
});
