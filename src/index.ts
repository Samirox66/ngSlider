import $ from 'jquery';
import './styles.scss';
import './plugin/slider';
import './plugin/slider.scss'

$('#slider-1').slider({range: true, id: 'slider-1', max: 120, min: 50, step: 10});