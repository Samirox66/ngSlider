import Presenter from './components/Presenter/Presenter'
import Model, {CompleteOptions} from './components/Model/Model'
import View from './components/View/View'

declare global {
    interface slider extends JQuery {
        ngSlider:(options: Options) => Presenter
    }
}

interface Options {
    range: string,
    id: string,
    min: number,
    max: number,
    step: number,
    value: number,
    value2?: number,
    isValueVisible?: boolean,
    isVertical?: boolean,
}

(function( $ ) {
    const methods = {
        init: (options: CompleteOptions): Presenter => {
            const model = new Model(options);
            const view = new View(options.id);
            const slider = new Presenter(view, model);
            slider.onInit(options);
            return slider;
        },
        setOptions: (options: Options): CompleteOptions => {
            const completeOptions = <CompleteOptions>options;
            if (!completeOptions.value2) {
                completeOptions.value2 = options.min;
            }
            return completeOptions;
        }

    };
    ($.fn as slider).ngSlider = function(options: Options) {
        const completeOptions = methods.setOptions(options);
        return methods.init(completeOptions);
    };
})(jQuery);
