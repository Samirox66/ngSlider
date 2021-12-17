import { Options } from "../Model/Model";

class SliderHandle {
    private sliderHandle: HTMLDivElement;
    
    constructor() {
        this.sliderHandle = document.createElement('div');
    }

    setHandle(notifyObservers: Function, options: Options, isSecondHandle: boolean) {
        const handleMouseDown = (event: MouseEvent) => {
            const handleMouseMove = (event: MouseEvent) => {
                let value: number;
                if (options.isVertical) { 
                    value = Math.ceil((event.pageY - options.startCord) * (options.max - options.min) / (options.endCord - options.startCord) + options.min);
                } else {
                    value = Math.ceil((event.pageX - options.startCord) * (options.max - options.min) / (options.endCord - options.startCord) + options.min);
                }
                if (value >= options.min && value <= options.max) {
                    if(isSecondHandle) {
                        if (value >= options.value || Math.abs(options.value2! - value) % options.step !== 0 || options.value - value < options.step) {
                            return;
                        } 
                        options.value2 = value;
                        options.key = 'secondHandle';
                    } else {
                        if (options.value2 && value <= options.value2 || Math.abs(options.value - value) % options.step !== 0 || value - options.value2! < options.step) {
                            return;
                        }
                        options.value = value;
                        options.key = 'firstHandle';
                    }
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

    hide() {
        this.sliderHandle.style.display = 'none';
    }

    show() {
        this.sliderHandle.style.display = 'block';
    }
}

export default SliderHandle;