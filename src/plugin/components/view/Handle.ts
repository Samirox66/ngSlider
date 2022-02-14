import { ObserverOptions } from '../Observer/Observer';
import { CompleteOptions } from '../Model/Model';
import { actionModule } from '../Model/consonants';

class Handle {
  private handleElement: HTMLDivElement;

  constructor() {
    this.handleElement = document.createElement('div');
  }

  setHandle(
    notifyObservers: (options: ObserverOptions) => void,
    options: CompleteOptions,
    isSecondHandle: boolean,
  ) {
    document.ondragstart = () => false;
    document.body.onselectstart = () => false;
    this.handleElement.addEventListener(
      'pointerdown',
      this.handleHandleMouseDown.bind(this, options, isSecondHandle, notifyObservers),
    );
  }

  private handleHandleMouseDown({ isVertical }: CompleteOptions, isSecondHandle: boolean, notifyObservers: (options: ObserverOptions) => void) {
    const handleHandleMouseMove = (event: PointerEvent) => {
      const handleOptions: ObserverOptions = { key: actionModule.FIRST_HANDLE };
      if (isSecondHandle) {
        handleOptions.key = actionModule.SECOND_HANDLE;
      }

      if (isVertical) {
        handleOptions.currentCord = event.pageY;
      } else {
        handleOptions.currentCord = event.pageX;
      }

      notifyObservers(handleOptions);
    };

    const handleHandleMouseUp = () => {
      document.removeEventListener('pointermove', handleHandleMouseMove);
      this.handleElement.removeEventListener('pointerup', handleHandleMouseUp);
    };

    document.addEventListener('pointermove', handleHandleMouseMove);
    document.addEventListener('pointerup', handleHandleMouseUp);
  }

  getSliderHandle() {
    return this.handleElement;
  }

  moveHandle(options: CompleteOptions, value: number) {
    const moveHandle = (
      ((value - options.min) / (options.max - options.min) - this.handleElement.offsetWidth / 2 / (options.endCord - options.startCord)) * 100
    );
    if (options.isVertical) {
      this.handleElement.style.top = `${moveHandle}%`;
    } else {
      this.handleElement.style.left = `${moveHandle}%`;
    }
  }

  makeVertical() {
    this.handleElement.style.left = '-5px';
    this.handleElement.classList.add('ng-slider__handle_vertical');
  }

  makeHorizontal() {
    this.handleElement.style.top = '-5px';
    this.handleElement.classList.remove('ng-slider__handle_vertical');
  }

  hide() {
    this.handleElement.style.display = 'none';
  }

  show() {
    this.handleElement.style.display = 'block';
  }
}

export default Handle;
