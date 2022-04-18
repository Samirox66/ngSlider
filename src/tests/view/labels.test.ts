import Labels from '../../plugin/components/View/Labels';
import { CompleteOptions } from '../../plugin/components/Model/Model';
import View from '../../plugin/components/View/View';

describe('Labels tests', () => {
  let labels: Labels;
  const options: CompleteOptions = {
    value: 3,
    value2: 0,
    step: 1,
    max: 4,
    min: 2,
    startCord: 0,
    endCord: 0,
    range: '',
    key: 'min',
    currentCord: 0,
  };
  let view: View;
  let root: HTMLDivElement;
  beforeEach(() => {
    root = document.createElement('div');
    root.setAttribute('id', 'slider-test');
    document.body.append(root);
    labels = new Labels();
    view = new View();
    view.findSlider('slider-test');
  });

  afterEach(() => {
    root.remove();
  });
  test('destroy should remove childNodes of slider from DOM', () => {
    labels.create(view.notifyObservers.bind(view), options);
    labels.destroy();
    expect(labels.getLabels().hasChildNodes()).toBeFalsy();
  });
  test('create should add labels in DOM', () => {
    labels.create(view.notifyObservers.bind(view), options);
    expect(labels.getLabels().firstChild?.textContent).toBe(
      options.min.toString()
    );
  });
});
