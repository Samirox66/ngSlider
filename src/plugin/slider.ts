import Presenter from './components/Presenter/Presenter';
import Model from './components/Model/Model';
import View from './components/View/View';

declare global {
  interface slider extends JQuery {
    ngSlider:(options: Options) => Presenter
  }
}

interface Options {
  range?: string,
  id: string,
  min: number,
  max: number,
  step: number,
  value: number,
  value2?: number,
  isValueVisible?: boolean,
  isVertical?: boolean,
}

(function ($) {
  ($.fn as slider).ngSlider = function (options: Options) {
    const model = new Model(options);
    const view = new View(options.id);
    const slider = new Presenter(view, model);
    slider.onInit();
    return slider;
  };
}(jQuery));

export { Options };
