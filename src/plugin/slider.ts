interface JQuery {
    slider: Function;
}

(function( $ ) {
    $.fn.slider = function(options: { name: string, age?: number }) {
        if ('age' in options) {
            console.log(options.age);
        }
        console.log(options.name);
    };
})(jQuery);