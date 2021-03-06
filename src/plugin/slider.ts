import Presenter from './components/Presenter/Presenter';
import Model, { Options } from './components/Model/Model';
import View from './components/View/View';
import './slider.scss';

declare global {
  interface JQuery {
    ngSlider: (options: Options) => Presenter;
  }
}

// eslint-disable-next-line no-param-reassign,func-names
(function ($) {
  // eslint-disable-next-line no-param-reassign,func-names
  $.fn.ngSlider = function (options: Options) {
    const model = new Model(options);
    const view = new View();
    view.findSlider($(this).attr('id') ?? '');
    const slider = new Presenter(view, model);
    slider.onInit();
    return slider;
  };
})(jQuery);
