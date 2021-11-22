interface JQuery {
    slider: Function;
}

interface Options {
    range: boolean,
    id: string,
    min: number,
    max: number,
    step?: number,
    value?: number
}

(function( $ ) {

    let methods = {
        init: function(options: Options) {
            let slider = <HTMLInputElement>document.getElementById(options.id);
            let sliderTrack = document.createElement('div');
            methods.createView(slider, sliderTrack, options);
            slider?.addEventListener('input', () => {
                //if (parseInt(slider.value) % 5 !== 0) {
                //    slider.value = (parseInt(slider.value) - 5).toString(); 
                //}
                let percent: number = ((parseInt(slider.value) - options.min) / (options.max - options.min)) * 100;
                sliderTrack.style.background = `linear-gradient(to right, #3264fe ${percent}%, #dadae5 ${percent}%)`;
            });
        },
        createView: function(slider: HTMLInputElement, sliderTrack: HTMLDivElement, options: Options) {
            slider?.setAttribute('max', options.max.toString());
            slider?.setAttribute('min', options.min.toString());
            slider.setAttribute('value', options.value?.toString() ?? ((options.max + options.min) / 2).toString());
            let percent: number = ((parseInt(slider.value) - options.min) / (options.max - options.min)) * 100;
            sliderTrack.style.background = `linear-gradient(to right, #3264fe ${percent}%, #dadae5 ${percent}%)`;
            let values = document.createElement('div');
            sliderTrack.classList.add('ng-slider__slider-track');
            values.classList.add('ng-slider__values');
            slider?.parentElement?.prepend(sliderTrack);
            for (let i = options.min; i <= options.max; i += (options.max - options.min) / 5) {
                const value = document.createElement('p');
                const valueText = document.createTextNode(i.toString());
                value.appendChild(valueText);
                value.classList.add('ng-slider__value');
                values.append(value);
            }
            slider?.parentElement?.append(values);
        }
    }
    $.fn.slider = function(options: Options) {
        methods.init(options);
    };
})(jQuery);