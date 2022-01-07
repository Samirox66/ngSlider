import Labels from "../../plugin/components/View/Labels";
import {Options} from "../../plugin/components/Model/Model"
import View from "../../plugin/components/View/View"

describe('Labels tests', () => {
    let labels: Labels;
    const view: View = new View('', '');
    const options: Options = {
        value: 3,
        value2: 0,
        step: 1,
        max: 4,
        min: 2,
        id: '',
        startCord: 0,
        endCord: 0,
        range: '',
        key: 'min',
        currentCord: 0
    }
    beforeEach(() => {
        labels = new Labels();
    });
    test('getValues should return values of labels', () => {
        expect(labels.getValues.length).toBe(0);
    });
    test('destroy should remove childNodes of slider from DOM', () => {
        labels.create(view.notifyObservers.bind(view), options);
        labels.destroy();
        expect(labels.getValues.length).toBe(0);
        expect(labels.getLabels.hasChildNodes()).toBeFalsy();
    });
    test('create should add labels in DOM', () => {
        labels.create(view.notifyObservers.bind(view), options);
        expect(labels.getValues.length).toBe(3);
        expect(labels.getValues[0].textContent).toBe(options.min.toString());
    })
})