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
        const fill = {
            min: (options: Options) => {
                const percentToFill: number = ((options.value - options.min) / (options.max - options.min)) * 100;
                if (options.isVertical) {
                    this.sliderTrack.style.top = '0';
                    this.sliderTrack.style.height = percentToFill + '%';
                } else {
                    this.sliderTrack.style.left = '0';
                    this.sliderTrack.style.width = percentToFill + '%';
                }
            },
            max: (options: Options) => {
                const percentToFill: number = ((options.max - options.value) / (options.max - options.min)) * 100;
                const pixelsToMoveLeft: number = (options.endCord - options.startCord) / (options.max - options.min) * (options.value - options.min);
                if (options.isVertical) {
                    this.sliderTrack.style.top = pixelsToMoveLeft + 'px';
                    this.sliderTrack.style.height = percentToFill + '%';
                } else {
                    this.sliderTrack.style.left = pixelsToMoveLeft + 'px'
                    this.sliderTrack.style.width = percentToFill + '%';
                }
            },
            true: (options: Options) => {
                const percentToFill: number = (options.value - options.value2!) / (options.max - options.min) * 100;
                const pixelsToMove: number = (options.endCord - options.startCord) / (options.max - options.min) * (options.value2! - options.min);
                if (options.isVertical) {
                    this.sliderTrack.style.top = pixelsToMove + 'px';
                    this.sliderTrack.style.height = percentToFill + '%';
                } else {
                    this.sliderTrack.style.left = pixelsToMove + 'px';
                    this.sliderTrack.style.width = percentToFill + '%';
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