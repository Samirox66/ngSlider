import { CompleteOptions } from '../Model/Model';

class SliderHandle {
  private sliderHandle: HTMLDivElement;

  constructor() {
    this.sliderHandle = document.createElement('div');
  }

  setHandle(notifyObservers: (options: CompleteOptions) => void, options: CompleteOptions, isSecondHandle: boolean) {
    const handleMouseDown = () => {
      const handleMouseMove = (event: PointerEvent) => {
        isSecondHandle ? options.key = 'secondHandle' : options.key = 'firstHandle';
        options.isVertical ? options.currentCord = event.pageY : options.currentCord = event.pageX;
        notifyObservers(options);
      };
      const handleMouseUp = () => {
        document.removeEventListener('pointermove', handleMouseMove);
        this.sliderHandle.removeEventListener('pointerup', handleMouseUp);
      };
      document.addEventListener('pointermove', handleMouseMove);
      document.addEventListener('pointerup', handleMouseUp);
    };
    document.ondragstart = function () {
      return false;
    };
    document.body.onselectstart = function () {
      return false;
    };
    this.sliderHandle.addEventListener('pointerdown', handleMouseDown);
  }

  get getSliderHandle() {
    return this.sliderHandle;
  }

  moveHandle(options: CompleteOptions, value: number) {
    const moveHandle = ((value - options.min) / (options.max - options.min) - this.sliderHandle.offsetWidth / 2 / (options.endCord - options.startCord)) * 100;
    if (options.isVertical) {
      this.sliderHandle.style.top = `${moveHandle}%`;
    } else {
      this.sliderHandle.style.left = `${moveHandle}%`;
    }
  }

  hide() {
    this.sliderHandle.style.display = 'none';
  }

  show() {
    this.sliderHandle.style.display = 'block';
  }
}

export default SliderHandle;
