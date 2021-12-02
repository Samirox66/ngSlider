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
    private viewElements: ViewElements;
    private presenter: Presenter | undefined;

    constructor(viewElements: ViewElements) {
        this.viewElements = viewElements;
    }

    static createViewElements(options: Options): ViewElements {
        const progressBar = new ProgressBar();
        const sliderTrack = new SliderTrack();
        const firstInput = new SliderInput(<HTMLInputElement>document.getElementById(options.id));
        const currentValue = new CurrentValue();
        progressBar.create(options.max, options.min);
        sliderTrack.create();
        firstInput.setAttributes(options.max, options.min, options.value ?? (options.max + options.min) / 2);
        currentValue.getCurrentValue.classList.add('ng-slider__current-value');
        firstInput.getSliderInput.parentElement?.parentElement?.append(progressBar.getProgressBar);
        firstInput.getSliderInput.parentElement?.prepend(sliderTrack.getSliderTrack);
        firstInput.getSliderInput.parentElement?.parentElement?.prepend(currentValue.getCurrentValue);
        currentValue.setCurrentValue(firstInput.getSliderInput.value);
        const percent: number = ((parseInt(firstInput.getSliderInput.value) - options.min) / (options.max - options.min)) * 100;
        const marginLeft = percent - 15 * percent / 100;
        currentValue.getCurrentValue.style.marginLeft = `${marginLeft}%`;
        sliderTrack.getSliderTrack.style.background = `linear-gradient(to right, #3264fe ${percent}%, #dadae5 ${percent}%)`;
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

    addSliderInputListener() {
        this.viewElements.firstInput.getSliderInput.addEventListener('input', (e) => this.presenter?.sliderInputListener());
    }

    addProgressBarClickListener() {
        this.viewElements.progressBar.getProgressBar.childNodes.forEach(element => element.addEventListener('click', (e) => this.presenter?.progressBarElementClickListener(<HTMLDivElement>element)));
    }

    valueChanged(options: Options) {
        const percent: number = ((parseInt(this.viewElements.firstInput.getSliderInput.value) - options.min) / (options.max - options.min)) * 100;
        const marginLeft = percent - 15 * percent / 100;
        this.viewElements.currentValue.getCurrentValue.style.marginLeft = `${marginLeft}%`;
        this.viewElements.currentValue.getCurrentValue.textContent = options.value.toString();
        this.viewElements.sliderTrack.getSliderTrack.style.background = `linear-gradient(to right, #3264fe ${percent}%, #dadae5 ${percent}%)`;
    }
}

export default View;