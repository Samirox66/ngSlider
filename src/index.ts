import $ from 'jquery';
import './styles.scss';
import './plugin/slider';
import './plugin/slider.scss'

($('#slider-1') as any).ngSlider({range: false, id: 'ng-slider', max: 120, min: 50, isValueVisible: true});