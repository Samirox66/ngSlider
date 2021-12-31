import SliderTrack from './SliderTrack'
import SliderHandle from './SliderHandle';
import ProgressBar from './ProgressBar';
import CurrentValue from './СurrentValue';
import { Options } from '../Model/Model';
import Observer from '../Observer/Observer';

export interface ViewElements {
    sliderTrack: SliderTrack,
    progressBar: ProgressBar,
    firstHandle: SliderHandle,
    firstValue: CurrentValue,
    secondValue?: CurrentValue,
    secondHandle?: SliderHandle
}

class View extends Observer {
    private viewElements: ViewElements;
    private slider: HTMLElement;

    constructor(id: string, range: string) {
        super();
        this.viewElements = {
            progressBar: new ProgressBar(),
            sliderTrack: new SliderTrack(),
            firstHandle: new SliderHandle(),
            firstValue: new CurrentValue(),
        }
        if (document.getElementById(id)) {
            this.slider = document.getElementById(id) ?? document.createElement('div');
        } else {
            throw new Error("Wrong Id");
        }
        if (range === 'true') {
            this.viewElements.secondHandle = new SliderHandle();
            this.viewElements.secondValue = new CurrentValue();
        }
    }

    setViewElements(viewElements: ViewElements) {
        this.viewElements = viewElements;
    }

    displaySlider(options: Options) {
        this.slider.append(this.viewElements.progressBar.getProgressBar);
        this.slider.append(this.viewElements.sliderTrack.getSliderTrack);
        this.slider.append(this.viewElements.firstHandle.getSliderHandle);
        this.viewElements.firstHandle.getSliderHandle.append(this.viewElements.firstValue.getCurrentValue);
        this.viewElements.progressBar.create(this.notifyObservers.bind(this), options);
        this.viewElements.sliderTrack.create();
        this.viewElements.firstValue.getCurrentValue.classList.add('ng-slider__current-value');
        this.viewElements.firstHandle.getSliderHandle.classList.add('ng-slider__handle');
        if (options.range === 'true') {
            this.slider.append(this.viewElements.secondHandle!.getSliderHandle);
            this.viewElements.secondHandle!.getSliderHandle.append(this.viewElements.secondValue!.getCurrentValue);
            if (!options.value2) {
                options.value2 = options.min;
            }
            this.viewElements.secondValue?.getCurrentValue.classList.add('ng-slider__current-value');
            this.viewElements.secondHandle?.getSliderHandle.classList.add('ng-slider__handle');
            this.viewElements.secondValue!.getCurrentValue.textContent = options.value2!.toString();
            options.key = 'secondHandle';
            this.changeValue(options);
        }
        if (options.isValueVisible === false) {
            this.viewElements.firstValue.hide();
            this.viewElements.secondValue?.hide();
        } else {
            this.viewElements.firstValue.show();
            this.viewElements.secondValue?.show();
        }
        options.key = 'firstHandle';
        this.changeValue(options);
        this.viewElements.sliderTrack.fillWithColor(options);
    }

    destroySlider() {
        this.viewElements.progressBar.destroy();
        while (this.slider.hasChildNodes()) {
            this.slider.firstChild?.remove();
        }
    }

    setHandles(options: Options) {
        this.viewElements.firstHandle.setHandle(this.notifyObservers.bind(this), options, false);
        this.viewElements.secondHandle?.setHandle(this.notifyObservers.bind(this), options, true);
    }

    get getViewElements() {
        return this.viewElements;
    }

    get getSlider() {
        return this.slider;
    }

    test(options: Options) {
        let newOptions = options;
        newOptions.key = 'sliderHandle';
        this.notifyObservers(newOptions);
    }

    changeValue(options: Options) {
        let moveHandle: number;
        if (options.key === 'secondHandle' || options.key === 'progressBarSecond') {
            this.viewElements.secondValue?.setCurrentValue(options.value2!.toString());
            moveHandle = (options.value2! - options.min) / (options.max - options.min) * (options.endCord - options.startCord) - this.viewElements.secondHandle!.getSliderHandle.offsetWidth / 2;
            if (options.isVertical) {
                this.viewElements.secondHandle!.getSliderHandle.style.top = moveHandle + 'px';
            } else {
                this.viewElements.secondHandle!.getSliderHandle.style.left = moveHandle + 'px';
            }
        } else {
            this.viewElements.firstValue.setCurrentValue(options.value.toString());
            moveHandle = (options.value - options.min) / (options.max - options.min) * (options.endCord - options.startCord) - this.viewElements.firstHandle.getSliderHandle.offsetWidth / 2;
            if (options.isVertical) {
                this.viewElements.firstHandle.getSliderHandle.style.top = moveHandle + 'px';
            } else {
                this.viewElements.firstHandle.getSliderHandle.style.left = moveHandle + 'px';
            }
        }
    }

    changeSecondValue(options: Options) {
        let value: number;
        this.viewElements.secondValue?.setCurrentValue(options.value2!.toString());
        const moveHandle: number = (options.value2! - options.min) / (options.max - options.min) * (options.endCord - options.startCord) - this.viewElements.firstHandle.getSliderHandle.offsetWidth / 2;
        if (options.isVertical) {
            this.viewElements.secondHandle!.getSliderHandle.style.top = moveHandle + 'px';
        } else {
            this.viewElements.secondHandle!.getSliderHandle.style.left = moveHandle + 'px';
        }
    }

    makeVertical() {
        this.slider.classList.add('ng-slider_vertical');
        this.viewElements.progressBar.getProgressBar.classList.add('ng-slider__values_vertical');
        this.viewElements.firstValue.getCurrentValue.classList.add('ng-slider__current-value_vertical');
        this.viewElements.secondValue?.getCurrentValue.classList.add('ng-slider__current-value_vertical');
        this.viewElements.sliderTrack.getSliderTrack.classList.add('ng-slider__slider-track_vertical');
        this.viewElements.firstHandle.getSliderHandle.classList.add('ng-slider__handle_vertical');
        this.viewElements.secondHandle?.getSliderHandle.classList.add('ng-slider__handle_vertical');
    }

    makeHorizontal() {
        this.slider.classList.remove('ng-slider_vertical');
        this.viewElements.progressBar.getProgressBar.classList.remove('ng-slider__values_vertical');
        this.viewElements.firstValue.getCurrentValue.classList.remove('ng-slider__current-value_vertical');
        this.viewElements.secondValue?.getCurrentValue.classList.remove('ng-slider__current-value_vertical');
        this.viewElements.sliderTrack.getSliderTrack.classList.remove('ng-slider__slider-track_vertical');
        this.viewElements.firstHandle.getSliderHandle.classList.remove('ng-slider__handle_vertical');
        this.viewElements.secondHandle?.getSliderHandle.classList.remove('ng-slider__handle_vertical');
    }
}

export default View;