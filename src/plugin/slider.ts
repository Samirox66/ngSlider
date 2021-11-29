import Presenter from './components/presenter/presenter'
import Model, {Options} from './components/model/model'
import View, {ViewElements} from './components/view/view'
import SliderTrack from './components/view/sliderTrack';
import SliderInput from './components/view/sliderInput';
import ProgressBar from './components/view/progressBar';
import CurrentValue from './components/view/currentValue'

declare global {
    interface JQuery {
        ngSlider:(options: Options) => void
    }
}

(function( $ ) {
    const methods = {
        createViewElements: function(): ViewElements {
            const progressBarHtmlElement = document.createElement('div');
            progressBarHtmlElement.classList.add('ng-slider__values');
            return {
                sliderTrack: new SliderTrack(),
                progressBar: new ProgressBar(progressBarHtmlElement),
                firstInput: new SliderInput(),
                currentValue: new CurrentValue()
            };
        }
    }
    $.fn.ngSlider = function(options: Options) {
        const viewElements = methods.createViewElements();
        const view = new View(viewElements);
        const model = new Model(options);
        const slider = new Presenter(view, model);
        view.setPresenter(slider);
    };
})(jQuery);

/*(function( $ ) {

    const methods = {
        init: function(options: Options) {
            const slider = <HTMLInputElement>document.getElementById(options.id);
            const sliderTrack = document.createElement('div');
            const currentValue = document.createElement('div');
            this.createView(slider, sliderTrack, options, currentValue);
            slider?.addEventListener('input',  e => this.valueChanged(slider, sliderTrack, options, currentValue));
        },
        createView: function(slider: HTMLInputElement, sliderTrack: HTMLDivElement, options: Options, currentValue: HTMLDivElement) {
            slider?.setAttribute('max', options.max.toString());
            slider?.setAttribute('min', options.min.toString());
            slider.setAttribute('value', options.value?.toString() ?? ((options.max + options.min) / 2).toString());
            const percent: number = ((parseInt(slider.value) - options.min) / (options.max - options.min)) * 100;
            sliderTrack.style.background = `linear-gradient(to right, #3264fe ${percent}%, #dadae5 ${percent}%)`;
            const values = document.createElement('div');
            if (options.isValueVisible) {
                this.createCurrentValue(slider, options, currentValue);
            }
            if (options.range) {
                this.createRangeSlider(slider, options);
            }
            sliderTrack.classList.add('ng-slider__slider-track');
            values.classList.add('ng-slider__values');
            slider?.parentElement?.prepend(sliderTrack);
            slider?.parentElement?.parentElement?.prepend(currentValue);
            for (let i = options.min; i <= options.max; i += (options.max - options.min) / 5) {
                const value = document.createElement('input');
                value.value = i.toString();
                value.setAttribute('type', 'button');
                value.classList.add('ng-slider__value');
                values.append(value);
                value.addEventListener('click', () => {
                    slider.value = value.value;
                    this.valueChanged(slider, sliderTrack, options, currentValue);
                })
            }
            if (options.isVertical) {
                //slider.parentElement?.style.transform = 'rotate(90deg)';
                slider.style.transform = 'rotate(90deg)';
                sliderTrack.style.transform = 'rotate(90deg)';
                values.style.flexDirection = 'column';
            }
            slider?.parentElement?.parentElement?.append(values);
        },
        valueChanged: function(slider: HTMLInputElement, sliderTrack: HTMLDivElement, options: Options, currentValue:HTMLDivElement) {
            if (options.range) {
                
            } else {
                if (parseInt(slider.value) % (options.step ?? 0) !== 0) {
                    slider.value = (parseInt(slider.value) - (options.step ?? 0)).toString(); 
                }
            }  
            const percent: number = ((parseInt(slider.value) - options.min) / (options.max - options.min)) * 100;
            const marginLeft = percent - 15 * percent / 100;
            if (options.isValueVisible) {
                currentValue.style.marginLeft = `${marginLeft}%`;
                currentValue.textContent = slider.value;
            }
            sliderTrack.style.background = `linear-gradient(to right, #3264fe ${percent}%, #dadae5 ${percent}%)`;
        },
        createRangeSlider: function(slider: HTMLInputElement, options: Options) {
            const slider2 = document.createElement('input');
            slider2.setAttribute('type', 'range');
            slider2.setAttribute('id', `${options.id}-2`);
            slider2.classList.add('ng-slider__slider')
            slider.parentElement?.prepend(slider2);
            slider2.addEventListener('input', e => this.slider2Changed());
        },
        createCurrentValue: function(slider: HTMLInputElement, options: Options, currentValue: HTMLDivElement) {
            const percent: number = ((parseInt(slider.value) - options.min) / (options.max - options.min)) * 100
            currentValue.classList.add('ng-slider__current-value');
            const marginLeft = percent - 15 * percent / 100;
            currentValue.style.marginLeft = `${marginLeft}%`;
            const currentValueText = document.createTextNode(slider.value);
            currentValue.appendChild(currentValueText);
            slider.parentElement?.parentElement?.prepend(currentValue);
        },
        slider2Changed: function() {

        }
    }
    $.fn.ngSlider = function(options: Options) {
        methods.init(options);
    };
})(jQuery);*/
