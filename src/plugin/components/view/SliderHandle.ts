import { Options } from "../Model/Model";

class SliderHandle {
    private sliderHandle: HTMLDivElement;
    
    constructor() {
        this.sliderHandle = document.createElement('div');
    }

    setHandle(notifyObservers: Function, options: Options, isSecondHandle: boolean) {
        const handleMouseDown = (event: MouseEvent) => {
            const handleMouseMove = (event: MouseEvent) => {
                isSecondHandle ? options.key = 'secondHandle' : options.key = 'firstHandle';
                options.isVertical ? options.currentCord = event.pageY: options.currentCord = event.pageX;
                notifyObservers(options);
            }
            const handleMouseUp = (event: MouseEvent) => {
                document.removeEventListener('mousemove', handleMouseMove);
                this.sliderHandle.removeEventListener('mouseup', handleMouseUp);
            }
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        this.sliderHandle.addEventListener('mousedown', handleMouseDown);
        this.sliderHandle.ondragstart = function() {
            return false;
        };
    }

    get getSliderHandle() {
        return this.sliderHandle;
    }

    hide() {
        this.sliderHandle.style.display = 'none';
    }

    show() {
        this.sliderHandle.style.display = 'block';
    }
}

export default SliderHandle;