import $ from 'jquery';
import './styles.scss';
import '../plugin/slider';
import '../plugin/slider.scss'

($('#slider-1') as any).ngSlider({range: 'true', id: 'slider-1', max: 9, min: 2, isValueVisible: true, value: 5, step: 1.4, isVertical: false});