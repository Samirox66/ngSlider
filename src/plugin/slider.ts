interface JQuery {
    slider: Function;
}

(function( $ ) {

    let methods = {
        init: function(options: { range: boolean, id: string, min: number, max: number, step?: number}) {
            methods.createView(options);
        },
        createView: function(options: { range: boolean, id: string, min: number, max: number, step?: number }) {
            let slider = document.getElementById(options.id)?.parentElement;
            let sliderTrack = document.createElement('div');
            let values = document.createElement('div');
            sliderTrack.classList.add('ng-slider__slider-track');
            values.classList.add('ng-slider__values');
            slider?.prepend(sliderTrack);
            slider?.append(values);
        }
    }
    $.fn.slider = function(options: { range: boolean, id: string, min: number, max: number, step?: number }) {
        methods.init(options);
    };
})(jQuery);