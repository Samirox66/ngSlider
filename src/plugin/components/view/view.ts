import SliderTrack from './SliderTrack'
import SliderHandle from './SliderHandle';
import Labels from './Labels';
import CurrentValue from './СurrentValue';
import { Options } from '../Model/Model';
import Observer from '../Observer/Observer';

export interface ViewElements {
    sliderTrack: SliderTrack,
    labels: Labels,
    firstHandle: SliderHandle,
    firstValue: CurrentValue,
    secondValue: CurrentValue,
    secondHandle: SliderHandle
}

class View extends Observer {
    private viewElements: ViewElements;
    private slider: HTMLElement;

    constructor(id: string, range: string) {
        super();
        this.viewElements = {
            labels: new Labels(),
            sliderTrack: new SliderTrack(),
            firstHandle: new SliderHandle(),
            firstValue: new CurrentValue(),
            secondHandle: new SliderHandle(),
            secondValue: new CurrentValue()
        }
        try {
            this.slider = document.getElementById(id) ?? document.createElement('div');
        } catch {
            throw new Error("Wrong Id");
        }
    }

    displaySlider(options: Options) {
        this.slider.append(this.viewElements.labels.getLabels);
        this.slider.append(this.viewElements.sliderTrack.getSliderTrack);
        this.slider.append(this.viewElements.firstHandle.getSliderHandle);
        this.viewElements.firstHandle.getSliderHandle.append(this.viewElements.firstValue.getCurrentValue);
        this.viewElements.labels.create(this.notifyObservers.bind(this), options);
        this.viewElements.sliderTrack.create();
        this.viewElements.firstValue.getCurrentValue.classList.add('ng-slider__current-value');
        this.viewElements.firstHandle.getSliderHandle.classList.add('ng-slider__handle');
        if (options.range === 'true') {
            this.slider.append(this.viewElements.secondHandle.getSliderHandle);
            this.viewElements.secondHandle!.getSliderHandle.append(this.viewElements.secondValue!.getCurrentValue);
            if (!options.value2) {
                options.value2 = options.min;
            }
            this.viewElements.secondValue?.getCurrentValue.classList.add('ng-slider__current-value');
            this.viewElements.secondHandle?.getSliderHandle.classList.add('ng-slider__handle');
            this.viewElements.secondValue!.getCurrentValue.textContent = options.value2.toString();
            options.key = 'secondHandle';
            this.changeValue(options);
        }
        if (options.isValueVisible === false) {
            this.viewElements.firstValue.hide();
            this.viewElements.secondValue.hide();
        } else {
            this.viewElements.firstValue.show();
            this.viewElements.secondValue.show();
        }
        options.key = 'firstHandle';
        this.changeValue(options);
        this.viewElements.sliderTrack.fillWithColor(options);
    }

    destroySlider() {
        this.viewElements.labels.destroy();
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

    changeValue(options: Options) {
        if (options.key === 'secondHandle' || options.key === 'progressBarSecond') {
            this.viewElements.secondValue.setCurrentValue(options.value2.toString());
            this.viewElements.secondHandle.moveHandle(options, options.value2)
        } else {
            this.viewElements.firstValue.setCurrentValue(options.value.toString());
            this.viewElements.firstHandle.moveHandle(options, options.value);
        }
        this.detachCurrentValues(options);
        if (options.range === 'true' && this.checkIfCurrentValuesIntersect(options)) {
            this.uniteCurrentValues(options);
            return;
        }
    }

    private uniteCurrentValues(options: Options) {
        this.viewElements.secondValue.hide();
        this.viewElements.firstValue.getCurrentValue.textContent = `${options.value2}-${options.value}`;
    }

    private detachCurrentValues(options: Options) {
        this.viewElements.secondValue.show();
        this.viewElements.firstValue.getCurrentValue.textContent = options.value.toString();
    }

    private checkIfCurrentValuesIntersect(options: Options): boolean {
        const firstElement = this.viewElements.firstValue.getCurrentValue.getBoundingClientRect();
        const secondElement = this.viewElements.secondValue?.getCurrentValue.getBoundingClientRect();
        if (options.isVertical && firstElement.top < secondElement!.bottom || !options.isVertical && firstElement.left < secondElement!.right) {
            return true;
        }
        return false;
    }

    makeVertical() {
        this.viewElements.firstHandle.getSliderHandle.style.left = '-5px';
        this.viewElements.sliderTrack.getSliderTrack.style.width = '5px';
        this.viewElements.sliderTrack.getSliderTrack.style.left = '0';
        if (this.viewElements.secondHandle) {
            this.viewElements.secondHandle.getSliderHandle.style.left = '-5px';
        }
        this.slider.classList.add('ng-slider_vertical');
        this.viewElements.labels.getLabels.classList.add('ng-slider__values_vertical');
        this.viewElements.firstValue.getCurrentValue.classList.add('ng-slider__current-value_vertical');
        this.viewElements.secondValue?.getCurrentValue.classList.add('ng-slider__current-value_vertical');
        this.viewElements.sliderTrack.getSliderTrack.classList.add('ng-slider__slider-track_vertical');
        this.viewElements.firstHandle.getSliderHandle.classList.add('ng-slider__handle_vertical');
        this.viewElements.secondHandle?.getSliderHandle.classList.add('ng-slider__handle_vertical');
    }

    makeHorizontal() {
        this.viewElements.firstHandle.getSliderHandle.style.top = '-5px';
        this.viewElements.sliderTrack.getSliderTrack.style.height = '5px';
        this.viewElements.sliderTrack.getSliderTrack.style.top = '0';
        if (this.viewElements.secondHandle) {
            this.viewElements.secondHandle.getSliderHandle.style.top = '-5px';
        }
        this.slider.classList.remove('ng-slider_vertical');
        this.viewElements.labels.getLabels.classList.remove('ng-slider__values_vertical');
        this.viewElements.firstValue.getCurrentValue.classList.remove('ng-slider__current-value_vertical');
        this.viewElements.secondValue?.getCurrentValue.classList.remove('ng-slider__current-value_vertical');
        this.viewElements.sliderTrack.getSliderTrack.classList.remove('ng-slider__slider-track_vertical');
        this.viewElements.firstHandle.getSliderHandle.classList.remove('ng-slider__handle_vertical');
        this.viewElements.secondHandle?.getSliderHandle.classList.remove('ng-slider__handle_vertical');
    }
}

export default View;