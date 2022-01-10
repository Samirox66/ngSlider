import View from "../../plugin/components/View/View";
import { Options } from "../../plugin/components/Model/Model";

describe('View tests', () => {
    let view: View;
    const options = {
        value: 0,
        value2: 0,
        step: 0,
        max: 4,
        min: 2,
        id: '',
        startCord: 0,
        endCord: 0,
        range: '',
        key: 'min',
        currentCord: 0
    };

    beforeEach(() => {
        view = new View(options.id, options.range);
    })

    test('destroySlider should call destroy labels', () => {
        const destroyMock = jest.fn(view.getViewElements.labels.destroy.bind(view.getViewElements.labels));
        view.getViewElements.labels.destroy = destroyMock;
        view.destroySlider();
        expect(destroyMock.mock.calls.length).toBe(1);
    });
})