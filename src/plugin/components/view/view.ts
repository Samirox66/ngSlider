import Presenter from '../Presenter/Presenter';
import SliderTrack from './SliderTrack'
import SliderInput from './SliderInput';
import ProgressBar from './ProgressBar';
import CurrentValue from './СurrentValue';
import { Options } from '../Model/Model';

export interface ViewElements {
    sliderTrack: SliderTrack,
    progressBar: ProgressBar,
    firstInput: SliderInput,
    currentValue: CurrentValue,
    secondInput?: SliderInput
}

class View {
    viewElements: ViewElements;
    presenter: Presenter | undefined;
    options: Options;

    constructor(options: Options, viewElements: ViewElements) {
        this.options = options;
        this.viewElements = viewElements;
    }

    static createViewElements(options: Options): ViewElements {
        const progressBar = new ProgressBar();
        const sliderTrack = new SliderTrack();
        const firstInput = new SliderInput(<HTMLInputElement>document.getElementById(options.id));
        const currentValue = new CurrentValue();
        progressBar.create(options.max, options.min);
        sliderTrack.create();
        firstInput.setAttributes(options.max, options.min, options.value ?? (options.max - options.min) / 2);
        currentValue.getCurrentValue.classList.add('ng-slider__current-value');
        firstInput.getSliderInput.parentElement?.parentElement?.append(progressBar.getProgressBar);
        firstInput.getSliderInput.parentElement?.prepend(sliderTrack.getSliderTrack);
        firstInput.getSliderInput.parentElement?.parentElement?.prepend(currentValue.getCurrentValue);
        currentValue.setCurrentValue(firstInput.getSliderInput.value);
        return {
            sliderTrack,
            progressBar,
            firstInput,
            currentValue           
        }
    }

    setPresenter(presenter: Presenter) {
        this.presenter = presenter;
    }

    get getPresenter() {
        return this.presenter;
    }

    get getViewElements() {
        return this.viewElements;
    }

    get getOptions() {
        return this.options;
    }
    
}

export default View;