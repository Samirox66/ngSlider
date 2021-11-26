import './components/model/model'
import './components/presenter/presenter'
import './components/view/view'

declare global {
    interface JQuery {
        ngSlider:(options: Options) => void
    }
}

interface Options {
    range: boolean,
    id: string,
    min: number,
    max: number,
    step?: number,
    value?: number,
    isValueVisible?: boolean,
    isVertical?: boolean,
}

(function( $ ) {

    const methods = {
        init: function(options: Options) {
            let slider = <HTMLInputElement>document.getElementById(options.id);
            let sliderTrack = document.createElement('div');
            let currentValue = document.createElement('div');
            if (options.range) {
                
            }
            methods.createView(slider, sliderTrack, currentValue, options);
            slider?.addEventListener('input', () => {
                if (parseInt(slider.value) % (options.step ?? 0) !== 0) {
                    slider.value = (parseInt(slider.value) - (options.step ?? 0)).toString(); 
                }
                const percent: number = ((parseInt(slider.value) - options.min) / (options.max - options.min)) * 100;
                const marginLeft = percent - 15 * percent / 100;
                currentValue.style.marginLeft = `${marginLeft}%`;
                sliderTrack.style.background = `linear-gradient(to right, #3264fe ${percent}%, #dadae5 ${percent}%)`;
                currentValue.textContent = slider.value;
            });
        },
        createView: function(slider: HTMLInputElement, sliderTrack: HTMLDivElement, currentValue: HTMLDivElement, options: Options) {
            slider?.setAttribute('max', options.max.toString());
            slider?.setAttribute('min', options.min.toString());
            slider.setAttribute('value', options.value?.toString() ?? ((options.max + options.min) / 2).toString());
            let percent: number = ((parseInt(slider.value) - options.min) / (options.max - options.min)) * 100;
            sliderTrack.style.background = `linear-gradient(to right, #3264fe ${percent}%, #dadae5 ${percent}%)`;
            let values = document.createElement('div');
            if (options.isValueVisible) {
                const percent: number = ((parseInt(slider.value) - options.min) / (options.max - options.min)) * 100
                currentValue.classList.add('ng-slider__current-value');
                const marginLeft = percent - 15 * percent / 100;
                currentValue.style.marginLeft = `${marginLeft}%`;
                let currentValueText = document.createTextNode(slider.value);
                currentValue.appendChild(currentValueText);
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
                value.addEventListener('input', () => {
                    console.log(slider.value);
                })
            }
            if (options.isVertical) {
                //slider.parentElement?.style.transform = 'rotate(90deg)';
                slider.style.transform = 'rotate(90deg)';
                sliderTrack.style.transform = 'rotate(90deg)';
                values.style.flexDirection = 'column';
            }
            slider?.parentElement?.parentElement?.append(values);
        }
    }
    $.fn.ngSlider = function(options: Options) {
        methods.init(options);
    };
})(jQuery);
