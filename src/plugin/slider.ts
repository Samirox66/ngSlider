import Presenter from './components/Presenter/Presenter'
import Model, {Options} from './components/Model/Model'
import View, {ViewElements} from './components/View/View'

declare global {
    interface JQuery {
        ngSlider:(options: Options) => void
    }
}

(function( $ ) {
    const methods = {
        
    }
    $.fn.ngSlider = function(options: Options) {
        const model = new Model(options);
        const view = new View(options.id, options.range);
        const slider = new Presenter(view, model);
        slider.onInit(options);
    };
})(jQuery);
