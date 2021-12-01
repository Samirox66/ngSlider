class SliderTrack {
    private sliderTrack: HTMLDivElement;

    constructor() {
        this.sliderTrack = document.createElement('div');
    }
    
    create() {
        this.sliderTrack.classList.add('ng-slider__slider-track');
    }

    get getSliderTrack() {
        return this.sliderTrack;
    }
}

export default SliderTrack;