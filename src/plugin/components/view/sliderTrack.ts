import { Options } from "../Model/Model";

class SliderTrack {
    private sliderTrack: HTMLDivElement;

    constructor() {
        this.sliderTrack = document.createElement('div');
    }
    
    create() {
        this.sliderTrack.classList.add('ng-slider__slider-track');
    }

    fillWithColor(options: Options) {
        const percent: number = ((options.value - options.min) / (options.max - options.min)) * 100;
        this.sliderTrack.style.width = percent + '%';
    }

    get getSliderTrack() {
        return this.sliderTrack;
    }
}

export default SliderTrack;