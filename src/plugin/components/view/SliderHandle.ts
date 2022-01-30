import { CompleteOptions } from '../Model/Model';
import { ObserverOptions } from '../Observer/Observer';

class SliderHandle {
  private sliderHandle: HTMLDivElement;

  constructor() {
    this.sliderHandle = document.createElement('div');
  }

  setHandle(
    notifyObservers: (options: ObserverOptions) => void,
    options: CompleteOptions,
    isSecondHandle: boolean,
  ) {
    const handleMouseDown = () => {
      const handleMouseMove = (event: PointerEvent) => {
        const handleOptions: ObserverOptions = { key: 'firstHandle' };
        if (isSecondHandle) {
          handleOptions.key = 'secondHandle';
        }
        if (options.isVertical) {
          handleOptions.currentCord = event.pageY;
        } else {
          handleOptions.currentCord = event.pageX;
        }
        notifyObservers(handleOptions);
      };
      const handleMouseUp = () => {
        document.removeEventListener('pointermove', handleMouseMove);
        this.sliderHandle.removeEventListener('pointerup', handleMouseUp);
      };
      document.addEventListener('pointermove', handleMouseMove);
      document.addEventListener('pointerup', handleMouseUp);
    };
    document.ondragstart = () => false;
    document.body.onselectstart = () => false;
    this.sliderHandle.addEventListener('pointerdown', handleMouseDown);
  }

  get getSliderHandle() {
    return this.sliderHandle;
  }

  moveHandle(options: CompleteOptions, value: number) {
    const moveHandle = (
      ((value - options.min) / (options.max - options.min) - this.sliderHandle.offsetWidth / 2 / (options.endCord - options.startCord)) * 100
    );
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
