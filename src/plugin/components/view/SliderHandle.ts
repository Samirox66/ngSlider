import { Options } from "../Model/Model";

class SliderHandle {
    private sliderHandle: HTMLDivElement;
    
    constructor() {
        this.sliderHandle = document.createElement('div');
    }

    setHandle(notifyObservers: Function, options: Options) {
        const handleMouseDown = (event: MouseEvent) => {
            const newOptions = options;
            newOptions.key = 'sliderHandle';
            notifyObservers(newOptions);
            let initialX = event.clientX;
            const handleMouseMove = (event: MouseEvent) => {
                console.log(event.clientX);
                this.sliderHandle.style.left = event.pageX - initialX + 'px';
            }
            const handleMouseUp = (event: MouseEvent) => {
                document.removeEventListener('mousemove', handleMouseMove);
                this.sliderHandle.onmouseup = null;
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
}

export default SliderHandle;