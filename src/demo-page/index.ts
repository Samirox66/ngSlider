import $ from 'jquery';
import './styles.scss';
import '../plugin/slider';
import '../plugin/slider.scss'
import Presenter from '../plugin/components/Presenter/Presenter';
import { Options } from './../plugin/components/Model/Model'


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

    changeFirstValue(slider: Presenter) {
        slider.changeFirstValue(this.firstValue.value);
        if (this.firstValue.value !== slider.getModel.getOptions.value.toString()) {
            this.firstValue.value = slider.getModel.getOptions.value.toString();
        }
    }

    changeSecondValue(slider: Presenter) {
        slider.changeSecondValue(this.secondValue.value);
        if (this.secondValue.value !== slider.getModel.getOptions.value2.toString()) {
            this.secondValue.value = slider.getModel.getOptions.value2.toString();
        }
    }

    changeMinValue(slider: Presenter) {
        slider.changeMinValue(this.minValue.value);
        this.minValue.value = slider.getModel.getOptions.min.toString();
        if (slider.getModel.getOptions.range == 'true') {
            if (slider.getModel.getOptions.min > parseFloat(this.secondValue.value)) {
                this.secondValue.value = slider.getModel.getOptions.min.toString();
            }
        } else {
            if (slider.getModel.getOptions.min > parseFloat(this.firstValue.value)) {
                this.firstValue.value = slider.getModel.getOptions.min.toString();
            }
        }
    }

    changeStep(slider:Presenter) {
        slider.changeStep(this.step.value);
        this.step.value = slider.getModel.getOptions.step.toString();
    }

    changeMaxValue(slider: Presenter) {
        slider.changeMaxValue(this.maxValue.value);
        this.maxValue.value = slider.getModel.getOptions.max.toString();
        if (slider.getModel.getOptions.max < parseFloat(this.firstValue.value)) {
            this.firstValue.value = slider.getModel.getOptions.max.toString();
        }
    }

    addEventListeners(slider: Presenter) {
        this.firstValue.addEventListener('change', () => this.changeFirstValue(slider));
        this.secondValue.addEventListener('change', () => this.changeSecondValue(slider));
        this.maxValue.addEventListener('change', () => this.changeMaxValue(slider));
        this.minValue.addEventListener('change', () => this.changeMinValue(slider));
        this.range.addEventListener('change', () => slider.changeRange(this.range.value));
        this.step.addEventListener('change', () => this.changeStep(slider));
        this.verticalMode.addEventListener('change', () => slider.changeMode(this.verticalMode.checked));
        this.currentValueVisible.addEventListener('change', () => slider.changeVisabilityOfValues(this.currentValueVisible.checked));
    }

    setPanel(options: Options) {
        this.range.value = options.range;
        this.step.value = options.step.toString();
        this.maxValue.value = options.max.toString();
        this.minValue.value = options.min.toString();
        this.firstValue.value = options.value.toString();
        if (options.range === 'true') {
            this.secondValue.value = options.value2.toString();
        }
    }

    addObservers(slider: Presenter) {
        slider.getView.addObserver(this.valueChangedInputListener.bind(this));
    }

    valueChangedInputListener(options: Options) {
        if (options.key === 'firstHandle' || options.key === 'progressBarFirst') {
            this.firstValue.value = options.value.toString();
            return;
        }
        if (options.key === 'secondHandle' || options.key === 'progressBarSecond') {
            this.secondValue.value = options.value2.toString();
        }
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
        const slider: Presenter = ($('#slider-1') as any).ngSlider({range: 'true', id: 'slider-1', max: 9, min: 2, isValueVisible: true, value: 6, step: 0.1, isVertical: false});
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
        configPanel.setPanel(slider.getModel.getOptions);
        configPanel.addObservers(slider);
    }
}

slider.init();

