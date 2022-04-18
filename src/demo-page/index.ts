import $ from 'jquery';

import './styles.scss';
import '../plugin/slider';
import ConfigPanel, { PanelElements } from './blocks/config/ConfigPanel';

interface PanelIds {
  maxValue: string;
  minValue: string;
  range: string;
  step: string;
  firstValue: string;
  secondValue: string;
  verticalMode: string;
  isValueVisible: string;
}

const sliderApp = {
  init() {
    const slider1 = $('#slider-1').ngSlider({
      range: 'true',
      id: 'slider-1',
      max: 9,
      min: 2,
      isValueVisible: true,
      value: 2,
      step: 0.1,
      isVertical: false,
    });
    const configPanel1 = new ConfigPanel(
      this.setElements({
        firstValue: 'first-value1',
        secondValue: 'second-value1',
        minValue: 'min1',
        maxValue: 'max1',
        range: 'range1',
        step: 'step1',
        verticalMode: 'vertical-button1',
        isValueVisible: 'current-value-visible-button1',
      })
    );
    const slider2 = $('#slider-2').ngSlider({
      range: 'max',
      id: 'slider-2',
      max: 21,
      min: 6,
      isValueVisible: true,
      value: 10,
      step: 3,
      isVertical: true,
    });
    const configPanel2 = new ConfigPanel(
      this.setElements({
        firstValue: 'first-value2',
        secondValue: 'second-value2',
        minValue: 'min2',
        maxValue: 'max2',
        range: 'range2',
        step: 'step2',
        verticalMode: 'vertical-button2',
        isValueVisible: 'current-value-visible-button2',
      })
    );
    const slider3 = $('#slider-3').ngSlider({
      range: 'min',
      id: 'slider-3',
      max: 180,
      min: 120,
      isValueVisible: true,
      value: 170,
      step: 10,
    });
    const configPanel3 = new ConfigPanel(
      this.setElements({
        firstValue: 'first-value3',
        secondValue: 'second-value3',
        minValue: 'min3',
        maxValue: 'max3',
        range: 'range3',
        step: 'step3',
        verticalMode: 'vertical-button3',
        isValueVisible: 'current-value-visible-button3',
      })
    );
    const slider4 = $('#slider-4').ngSlider({
      range: '',
      id: 'slider-4',
      max: 10,
      min: 0,
      isValueVisible: true,
      value: 6,
      step: 1,
      isVertical: true,
    });
    const configPanel4 = new ConfigPanel(
      this.setElements({
        firstValue: 'first-value4',
        secondValue: 'second-value4',
        minValue: 'min4',
        maxValue: 'max4',
        range: 'range4',
        step: 'step4',
        verticalMode: 'vertical-button4',
        isValueVisible: 'current-value-visible-button4',
      })
    );
    configPanel1.addEventListeners(slider1);
    configPanel1.setPanelValues(slider1.getModel().getOptions());
    configPanel1.addObservers(slider1);
    configPanel2.addEventListeners(slider2);
    configPanel2.setPanelValues(slider2.getModel().getOptions());
    configPanel2.addObservers(slider2);
    configPanel3.addEventListeners(slider3);
    configPanel3.setPanelValues(slider3.getModel().getOptions());
    configPanel3.addObservers(slider3);
    configPanel4.addEventListeners(slider4);
    configPanel4.setPanelValues(slider4.getModel().getOptions());
    configPanel4.addObservers(slider4);
  },
  setElements(panelIds: PanelIds): PanelElements {
    return {
      firstValue: <HTMLInputElement>(
        document.getElementById(panelIds.firstValue)
      ),
      secondValue: <HTMLInputElement>(
        document.getElementById(panelIds.secondValue)
      ),
      maxValue: <HTMLInputElement>document.getElementById(panelIds.maxValue),
      minValue: <HTMLInputElement>document.getElementById(panelIds.minValue),
      step: <HTMLInputElement>document.getElementById(panelIds.step),
      range: <HTMLInputElement>document.getElementById(panelIds.range),
      verticalMode: <HTMLInputElement>(
        document.getElementById(panelIds.verticalMode)
      ),
      isValueVisible: <HTMLInputElement>(
        document.getElementById(panelIds.isValueVisible)
      ),
    };
  },
};

sliderApp.init();
