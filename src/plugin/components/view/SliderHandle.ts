import { Options } from "../Model/Model";

class SliderHandle {
    private sliderHandle: HTMLDivElement;
    
    constructor() {
        this.sliderHandle = document.createElement('div');
    }

    setHandle(notifyObservers: Function, options: Options) {
        const handleMouseDown = (event: MouseEvent) => {
            options.key = 'sliderHandle';
            const handleMouseMove = (event: MouseEvent) => {
                const value = Math.ceil((event.pageX - options.startCord) * (options.max - options.min) / (options.endCord - options.startCord) + options.min);
                if (value >= options.min && value <= options.max) {
                    options.value = value;
                }
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
}

export default SliderHandle;