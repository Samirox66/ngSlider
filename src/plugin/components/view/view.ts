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
        this.slider.append(this.viewElements.progressBar.getProgressBar);
        this.slider.append(this.viewElements.sliderTrack.getSliderTrack);
        this.slider.append(this.viewElements.firstHandle.getSliderHandle);
        this.viewElements.firstHandle.getSliderHandle.append(this.viewElements.firstValue.getCurrentValue);
        if (range === 'true') {
            this.viewElements.secondHandle = new SliderHandle();
            this.viewElements.secondValue = new CurrentValue();
            this.slider.append(this.viewElements.secondHandle.getSliderHandle);
            this.viewElements.secondHandle.getSliderHandle.append(this.viewElements.secondValue.getCurrentValue);
        }
    }

    setViewElements(viewElements: ViewElements) {
        this.viewElements = viewElements;
    }

    createViewElements(options: Options) {
        this.viewElements.progressBar.create(this.notifyObservers.bind(this), options);
        this.viewElements.sliderTrack.create();
        this.viewElements.sliderTrack.fillWithColor(options);
        this.viewElements.firstValue.getCurrentValue.classList.add('ng-slider__current-value');
        this.viewElements.firstHandle.getSliderHandle.classList.add('ng-slider__handle');
        if (options.range === 'true') {
            this.viewElements.secondValue?.getCurrentValue.classList.add('ng-slider__current-value');
            this.viewElements.secondHandle?.getSliderHandle.classList.add('ng-slider__handle');
            this.viewElements.secondValue!.getCurrentValue.textContent = options.value2!.toString();
        }
        this.viewElements.firstHandle.setHandle(this.notifyObservers.bind(this), options);
        this.changeValue(options);
    }

    get getViewElements() {
        return this.viewElements;
    }

    test(options: Options) {
        let newOptions = options;
        newOptions.key = 'sliderHandle';
        this.notifyObservers(newOptions);
    }

    changeValue(options: Options) {
        this.viewElements.firstValue.setCurrentValue(options.value.toString());
        this.viewElements.firstHandle.getSliderHandle.style.left = (options.value - options.min) / (options.max - options.min) * (options.endCord - options.startCord) - this.viewElements.firstHandle.getSliderHandle.offsetWidth / 2 + 'px';
    }
}

export default View;