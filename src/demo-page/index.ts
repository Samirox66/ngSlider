import $ from 'jquery';
import './styles.scss';
import '../plugin/slider';
import '../plugin/slider.scss'
import Presenter from '../plugin/components/Presenter/Presenter';

const slider =  {
    init: function() {
        const slider: Presenter = ($('#slider-1') as any).ngSlider({range: 'true', id: 'slider-1', max: 9, min: 2, isValueVisible: true, value: 6.2, step: 1.4, isVertical: false});
        const firstValue: HTMLInputElement = <HTMLInputElement>document.getElementById('first-value');
        const secondValue: HTMLInputElement = <HTMLInputElement>document.getElementById('second-value');
        const maxValue: HTMLInputElement = <HTMLInputElement>document.getElementById('max');
        const minValue: HTMLInputElement = <HTMLInputElement>document.getElementById('min');
        const step: HTMLInputElement = <HTMLInputElement>document.getElementById('step');
        const range: HTMLInputElement = <HTMLInputElement>document.getElementById('range');
        const verticalMode: HTMLInputElement = <HTMLInputElement>document.getElementById('vertical-button');
        const currentValueVisible: HTMLInputElement = <HTMLInputElement>document.getElementById('current-value-visible-button');
        firstValue?.addEventListener('change', () => slider.changeFirstValue(firstValue.value));
        secondValue.addEventListener('change', () => slider.changeSecondValue(secondValue.value));
        maxValue.addEventListener('change', () => slider.changeMaxValue(maxValue.value));
        minValue.addEventListener('change', () => slider.changeMinValue(minValue.value));
        step.addEventListener('change', () => slider.changeStep(step.value));
        range.addEventListener('change', () => slider.changeRange(range.value));
        verticalMode.addEventListener('change', () => slider.changeMode(verticalMode.checked));
        currentValueVisible.addEventListener('change', () => slider.changeVisabilityOfValues(currentValueVisible.checked));
    }
}

slider.init();

