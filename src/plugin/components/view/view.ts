import Presenter from '../presenter/presenter';
import SliderTrack from './sliderTrack'
import SliderInput from './sliderInput';
import ProgressBar from './progressBar';
import CurrentValue from './currentValue';

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
    
    constructor (viewElements: ViewElements) {
        this.viewElements = viewElements;
    }

    setPresenter(presenter: Presenter) {
        this.presenter = presenter;
    }
    
}

export default View;