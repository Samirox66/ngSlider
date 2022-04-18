import { CompleteOptions } from '../Model/Model';
import { rangeModule } from '../Model/consonants';

class Track {
  private trackElement: HTMLDivElement;

  constructor() {
    this.trackElement = document.createElement('div');
  }

  create() {
    this.trackElement.classList.add('ng-slider__track');
  }

  fillWithColor({
    value,
    min,
    max,
    isVertical,
    value2,
    range,
  }: CompleteOptions) {
    const fill = {
      min: () => {
        const percentToFill = ((value - min) / (max - min)) * 100;
        if (isVertical) {
          this.trackElement.style.top = '0%';
          this.trackElement.style.height = `${percentToFill}%`;
        } else {
          this.trackElement.style.left = '0%';
          this.trackElement.style.width = `${percentToFill}%`;
        }
      },
      max: () => {
        const percentToFill = ((max - value) / (max - min)) * 100;
        const percentToMoveLeft = ((value - min) / (max - min)) * 100;
        if (isVertical) {
          this.trackElement.style.top = `${percentToMoveLeft}%`;
          this.trackElement.style.height = `${percentToFill}%`;
        } else {
          this.trackElement.style.left = `${percentToMoveLeft}%`;
          this.trackElement.style.width = `${percentToFill}%`;
        }
      },
      true: () => {
        const percentToFill = ((value - value2) / (max - min)) * 100;
        const percentToMove = ((value2 - min) / (max - min)) * 100;
        if (isVertical) {
          this.trackElement.style.top = `${percentToMove}%`;
          this.trackElement.style.height = `${percentToFill}%`;
        } else {
          this.trackElement.style.left = `${percentToMove}%`;
          this.trackElement.style.width = `${percentToFill}%`;
        }
      },
      default: () => {
        if (isVertical) {
          this.trackElement.style.height = '0%';
        } else {
          this.trackElement.style.width = '0%';
        }
      },
    };
    switch (range) {
      case rangeModule.MIN: {
        fill.min();
        break;
      }
      case rangeModule.MAX: {
        fill.max();
        break;
      }
      case rangeModule.TRUE: {
        fill.true();
        break;
      }
      default: {
        fill.default();
      }
    }
  }

  hide() {
    this.trackElement.style.width = '0';
  }

  makeVertical() {
    this.trackElement.style.width = '5px';
    this.trackElement.style.left = '0';
    this.trackElement.classList.add('ng-slider__track_vertical');
  }

  makeHorizontal() {
    this.trackElement.style.height = '5px';
    this.trackElement.style.top = '0';
    this.trackElement.classList.remove('ng-slider__slider-track_vertical');
  }

  getSliderTrack() {
    return this.trackElement;
  }
}

export default Track;
