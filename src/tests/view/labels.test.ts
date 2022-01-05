import Labels from "../../plugin/components/View/Labels";

describe('Labels tests', () => {
    let labels: Labels;
    beforeEach(() => {
        labels = new Labels();
    });
    test('getValues should return values of labels', () => {
        expect(labels.getValues.length).toBe(0);
    });
})