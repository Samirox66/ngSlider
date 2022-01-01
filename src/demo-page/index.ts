import $ from 'jquery';
import './styles.scss';
import '../plugin/slider';
import '../plugin/slider.scss'
import Presenter from '../plugin/components/Presenter/Presenter';


interface PanelIds {
    max: string,
    min: string,
    range: string,
    step: string,
    firstValue: string,
    secondValue: string,
    verticalMode: string,
    currentValueVisible: string
}

class ConfigPanel {

    private firstValue: HTMLInputElement;
    private secondValue: HTMLInputElement;
    private maxValue: HTMLInputElement;
    private minValue: HTMLInputElement;
    private step: HTMLInputElement;
    private range: HTMLInputElement;
    private verticalMode: HTMLInputElement;
    private currentValueVisible: HTMLInputElement;

    constructor(panelIds: PanelIds) {
        this.firstValue = <HTMLInputElement>document.getElementById(panelIds.firstValue);
        this.secondValue = <HTMLInputElement>document.getElementById(panelIds.secondValue);
        this.maxValue = <HTMLInputElement>document.getElementById(panelIds.max);
        this.minValue = <HTMLInputElement>document.getElementById(panelIds.min);
        this.step = <HTMLInputElement>document.getElementById(panelIds.step);
        this.range = <HTMLInputElement>document.getElementById(panelIds.range);
        this.verticalMode = <HTMLInputElement>document.getElementById(panelIds.verticalMode);
        this.currentValueVisible = <HTMLInputElement>document.getElementById(panelIds.currentValueVisible);
    }

    addEventListeners(slider: Presenter) {
        this.firstValue.addEventListener('change', () => slider.changeFirstValue(this.firstValue.value));
        this.secondValue.addEventListener('change', () => slider.changeSecondValue(this.secondValue.value));
        this.maxValue.addEventListener('change', () => slider.changeMaxValue(this.maxValue.value));
        this.minValue.addEventListener('change', () => slider.changeMinValue(this.minValue.value));
        this.range.addEventListener('change', () => slider.changeRange(this.range.value));
        this.step.addEventListener('change', () => slider.changeStep(this.step.value));
        this.verticalMode.addEventListener('change', () => slider.changeMode(this.verticalMode.checked));
        this.currentValueVisible.addEventListener('change', () => slider.changeVisabilityOfValues(this.currentValueVisible.checked));
    }

    get getFirstValue() {
        return this.firstValue;
    }

    get getSecondValue() {
        return this.secondValue;
    }

    get getMaxValue() {
        return this.maxValue;
    }

    get getMinValue() {
        return this.minValue;
    }

    get getRange() {
        return this.range;
    }

    get getStep() {
        return this.step;
    }

    get getVerticalMode() {
        return this.verticalMode;
    }

    get getCurrentValueVisible() {
        return this.currentValueVisible;
    }
}

const slider =  {
    init: function() {
        const slider: Presenter = ($('#slider-1') as any).ngSlider({range: 'true', id: 'slider-1', max: 9, min: 2, isValueVisible: true, value: 6.2, step: 1.4, isVertical: false});
        const configPanel: ConfigPanel = new ConfigPanel({
            firstValue: 'first-value',
            secondValue: 'second-value',
            min: 'min',
            max: 'max',
            range: 'range',
            step: 'step',
            verticalMode: 'vertical-button',
            currentValueVisible: 'current-value-visible-button'});
        configPanel.addEventListeners(slider);
    }
}

slider.init();

