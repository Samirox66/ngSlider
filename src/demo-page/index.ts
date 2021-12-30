import $ from 'jquery';
import './styles.scss';
import '../plugin/slider';
import '../plugin/slider.scss'
import Presenter from '../plugin/components/Presenter/Presenter';

const slider =  {
    init: function() {
        const slider: Presenter = ($('#slider-1') as any).ngSlider({range: 'max', id: 'slider-1', max: 9, min: 2, isValueVisible: true, value: 5, step: 1.4, isVertical: false});
        const firstValue: HTMLInputElement = <HTMLInputElement>document.getElementById('first-value');
        firstValue?.addEventListener('change', () => slider.changeFirstValue(firstValue.value));
    }
}

slider.init();

