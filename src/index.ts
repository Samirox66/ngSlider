import $ from 'jquery';
import './styles.scss';
import './plugin/slider';
import './plugin/slider.scss'

($('#slider-1') as any).ngSlider({range: 'min', id: 'slider-1', max: 10, min: 2, isValueVisible: true, value: 4, isVertical: true});