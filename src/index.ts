import $ from 'jquery';
import './styles.scss';
import './plugin/slider';
import './plugin/slider.scss'

($('#slider-1') as any).ngSlider({range: 'min', id: 'slider-1', max: 100, min: 4, isValueVisible: true, value: 7, step: 3});