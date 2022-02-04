import $ from 'jquery';

import './styles.scss';
import '../plugin/slider';
import Presenter from '../plugin/components/Presenter/Presenter';
import ConfigPanel from './blocks/config/ConfigPanel';

const sliderApp = {
  init() {
    const slider1: Presenter = ($('#slider-1') as Slider).ngSlider({
      range: 'true', id: 'slider-1', max: 9, min: 2, isValueVisible: true, value: 2, step: 0.1, isVertical: false,
    });
    const configPanel1: ConfigPanel = new ConfigPanel({
      firstValue: 'first-value1',
      secondValue: 'second-value1',
      min: 'min1',
      max: 'max1',
      range: 'range1',
      step: 'step1',
      verticalMode: 'vertical-button1',
      isValueVisible: 'current-value-visible-button1',
    });
    const slider2: Presenter = ($('#slider-2') as Slider).ngSlider({
      range: 'max', id: 'slider-2', max: 21, min: 6, isValueVisible: true, value: 10, step: 3, isVertical: true,
    });
    const configPanel2: ConfigPanel = new ConfigPanel({
      firstValue: 'first-value2',
      secondValue: 'second-value2',
      min: 'min2',
      max: 'max2',
      range: 'range2',
      step: 'step2',
      verticalMode: 'vertical-button2',
      isValueVisible: 'current-value-visible-button2',
    });
    const slider3: Presenter = ($('#slider-3') as Slider).ngSlider({
      range: 'min', id: 'slider-3', max: 180, min: 120, isValueVisible: true, value: 170, step: 10,
    });
    const configPanel3: ConfigPanel = new ConfigPanel({
      firstValue: 'first-value3',
      secondValue: 'second-value3',
      min: 'min3',
      max: 'max3',
      range: 'range3',
      step: 'step3',
      verticalMode: 'vertical-button3',
      isValueVisible: 'current-value-visible-button3',
    });
    const slider4: Presenter = ($('#slider-4') as Slider).ngSlider({
      range: '', id: 'slider-4', max: 10, min: 0, isValueVisible: true, value: 6, step: 1, isVertical: true,
    });
    const configPanel4: ConfigPanel = new ConfigPanel({
      firstValue: 'first-value4',
      secondValue: 'second-value4',
      min: 'min4',
      max: 'max4',
      range: 'range4',
      step: 'step4',
      verticalMode: 'vertical-button4',
      isValueVisible: 'current-value-visible-button4',
    });
    this.set(slider1, configPanel1);
    this.set(slider2, configPanel2);
    this.set(slider3, configPanel3);
    this.set(slider4, configPanel4);
  },
  set(slider: Presenter, configPanel: ConfigPanel) {
    configPanel.addEventListeners(slider);
    configPanel.setPanelValues(slider.getModel().getOptions());
    configPanel.addObservers(slider);
  },
};

sliderApp.init();
