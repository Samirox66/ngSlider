import $ from 'jquery';
import './styles.scss';
import '../plugin/slider';
import '../plugin/slider.scss'

($('#slider-1') as any).ngSlider({range: 'true', id: 'slider-1', max: 100, min: 4, isValueVisible: true, value: 56, step: 1, isVertical: false});