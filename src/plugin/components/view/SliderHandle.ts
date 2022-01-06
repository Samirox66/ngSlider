import { Options } from "../Model/Model";

class SliderHandle {
    private sliderHandle: HTMLDivElement;
    
    constructor() {
        this.sliderHandle = document.createElement('div');
    }

    setHandle(notifyObservers: Function, options: Options, isSecondHandle: boolean) {
        const handleMouseDown = (event: PointerEvent) => {
            const handleMouseMove = (event: PointerEvent) => {
                isSecondHandle ? options.key = 'secondHandle' : options.key = 'firstHandle';
                options.isVertical ? options.currentCord = event.pageY: options.currentCord = event.pageX;
                notifyObservers(options);
            }
            const handleMouseUp = (event: PointerEvent) => {
                document.removeEventListener('pointermove', handleMouseMove);
                this.sliderHandle.removeEventListener('pointerup', handleMouseUp);
            }
            document.addEventListener('pointermove', handleMouseMove);
            document.addEventListener('pointerup', handleMouseUp);
        };
        document.ondragstart = function() {
            return false;
        };
        document.body.onselectstart = function() {
            return false;
        };
        this.sliderHandle.addEventListener('pointerdown', handleMouseDown);
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