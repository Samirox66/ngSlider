import { Options } from "../Model/Model";

class SliderHandle {
    private sliderHandle: HTMLDivElement;
    
    constructor() {
        this.sliderHandle = document.createElement('div');
    }

    setHandle(notifyObservers: Function, options: Options) {
        const handleMouseDown = function(event: MouseEvent) {
            const newOptions = options;
            newOptions.key = 'sliderHandle';
            newOptions.event = event;
            notifyObservers(newOptions);
        }
        this.sliderHandle.onmousedown = handleMouseDown;
    }

    get getSliderHandle() {
        return this.sliderHandle;
    }
}

export default SliderHandle;