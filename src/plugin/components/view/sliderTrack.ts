import { CompleteOptions } from "../Model/Model";

class SliderTrack {
    private sliderTrack: HTMLDivElement;

    constructor() {
        this.sliderTrack = document.createElement('div');
    }
    
    create() {
        this.sliderTrack.classList.add('ng-slider__slider-track');
    }

    fillWithColor(options: CompleteOptions) {
        const fill = {
            min: (options: CompleteOptions) => {
                const percentToFill: number = ((options.value - options.min) / (options.max - options.min)) * 100;
                if (options.isVertical) {
                    this.sliderTrack.style.top = '0%';
                    this.sliderTrack.style.height = percentToFill + '%';
                } else {
                    this.sliderTrack.style.left = '0%';
                    this.sliderTrack.style.width = percentToFill + '%';
                }
            },
            max: (options: CompleteOptions) => {
                const percentToFill: number = ((options.max - options.value) / (options.max - options.min)) * 100;
                const percentToMoveLeft: number = (options.value - options.min) / (options.max - options.min) * 100;
                if (options.isVertical) {
                    this.sliderTrack.style.top = percentToMoveLeft + '%';
                    this.sliderTrack.style.height = percentToFill + '%';
                } else {
                    this.sliderTrack.style.left = percentToMoveLeft + '%';
                    this.sliderTrack.style.width = percentToFill + '%';
                }
            },
            true: (options: CompleteOptions) => {
                const percentToFill: number = (options.value - options.value2) / (options.max - options.min) * 100;
                const percentToMove: number = (options.value2 - options.min) / (options.max - options.min) * 100;
                if (options.isVertical) {
                    this.sliderTrack.style.top = percentToMove + '%';
                    this.sliderTrack.style.height = percentToFill + '%';
                } else {
                    this.sliderTrack.style.left = percentToMove + '%';
                    this.sliderTrack.style.width = percentToFill + '%';
                }
            },
            default: () => {
                if (options.isVertical) {
                    this.sliderTrack.style.height = '0%';
                } else {
                    this.sliderTrack.style.width = '0%';
                }
            }
        }
        switch (options.range) {
            case 'min': fill.min(options);
            break;
            case 'max': fill.max(options);
            break;
            case 'true': fill.true(options);
            break;
            default: fill.default();
            break;
        }
    }

    hide() {
        this.sliderTrack.style.width = '0';
    }

    get getSliderTrack() {
        return this.sliderTrack;
    }
}

export default SliderTrack;