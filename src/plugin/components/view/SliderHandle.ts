import { Options } from "../Model/Model";

class SliderHandle {
    private sliderHandle: HTMLDivElement;
    private initialCordX: number;
    private initialCordY: number;
    
    constructor() {
        this.sliderHandle = document.createElement('div');
        this.initialCordX = 0;
        this.initialCordY = 0;
    }

    setHandle(notifyObservers: Function, options: Options) {
        const handleMouseDown = (event: MouseEvent) => {
            const newOptions = options;
            newOptions.key = 'sliderHandle';
            notifyObservers(newOptions);
            const handleMouseMove = (event: MouseEvent) => {
                this.sliderHandle.style.left = event.pageX - options.startCord + 'px';
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
}

export default SliderHandle;