import Model, {CompleteOptions} from '../../plugin/components/Model/Model';

describe('Model tests', () => {
    let model: Model;
    let options: CompleteOptions;
    beforeEach(() => {
        options = {
            value: 5,
            value2: 3,
            step: 1,
            max: 10,
            min: 2,
            id: '',
            startCord: 200,
            endCord: 400,
            range: 'min',
            key: '',
            currentCord: 300
        }
        model = new Model(options);
    });

    test('validateOptoins should throw an error if step is incorrect', () => {
        expect(() => model.validateOptions()).not.toThrowError();
        model.getOptions.step = 3;
        expect(() => model.validateOptions()).toThrowError();
        model.getOptions.step = -1;
        expect(() => model.validateOptions()).toThrowError();
    });
    test('validateOptions should throw an error if max value is less than min one', () => {
        expect(() => model.validateOptions()).not.toThrowError();
        model.getOptions.max = 1;
        expect(() => model.validateOptions()).toThrowError();
    });
    test('validateOptions should set value2 to min value if it is incorrect', () => {
        model.validateOptions();
        expect(model.getOptions.value2).toBe(3);
        model.getOptions.value2 = -1
        model.validateOptions();
        expect(model.getOptions.value2).toBe(2);
        model.getOptions.value2 = 10
        model.validateOptions();
        expect(model.getOptions.value2).toBe(2);
    });
    test('validateOptions should set value to max value if it is incorrect', () => {
        model.validateOptions();
        expect(model.getOptions.value).toBe(5);
        model.getOptions.value = 0;
        model.validateOptions();
        expect(model.getOptions.value).toBe(10);
        model.getOptions.value = 12;
        model.validateOptions();
        expect(model.getOptions.value).toBe(10);
        model.getOptions.value = 3;
        model.validateOptions();
        expect(model.getOptions.value).toBe(10);
    });

    test('setCords should set start and end coords in options', () => {
        model.setCords(300, 500);
        expect(model.getOptions.startCord).toBe(300);
        expect(model.getOptions.endCord).toBe(500);
    });

    test('calcValue should calcalute values based on current coordinate', () => {
        model.calcValue();
        expect(model.getOptions.value).toBe(6);
        model.getOptions.key = 'secondHandle';
        model.getOptions.currentCord = 250;
        model.calcValue();
        expect(model.getOptions.value2).toBe(4);
    });
    test('calcValue should not change value if it it less than value2 and we are in range mode', () => {
        model.getOptions.currentCord = 200;
        model.getOptions.range = 'true';
        model.calcValue();
        expect(model.getOptions.value).toBe(5);
        model.getOptions.range = 'min';
        model.calcValue();
        expect(model.getOptions.value).toBe(2);
    })

    test('changeFirstValue should change first value to the closest appropraite value', () => {
        model.changeFirstValue(8.6);
        expect(model.getOptions.value).toBe(9);
        model.getOptions.range = 'true';
        model.changeFirstValue(2);
        expect(model.getOptions.value).toBe(4);
    });

    test('changeSecondValue should change second value to the closest appropraite value in range mode', () => {
        model.changeSecondValue(2);
        expect(model.getOptions.value2).toBe(3);
        model.getOptions.range = 'true';
        model.changeSecondValue(2);
        expect(model.getOptions.value2).toBe(2);
    });

    test('setMaxValue should change max value if new max value is bigger than min one', () => {
        model.setMaxValue(12);
        expect(model.getOptions.max).toBe(12);
        model.setMaxValue(1);
        expect(model.getOptions.max).toBe(12);
    });

    test('setMinValue should change min value if new min value is less than max one', () => {
        model.setMinValue(12);
        expect(model.getOptions.min).toBe(2);
        model.setMinValue(1);
        expect(model.getOptions.min).toBe(1);
    });

    test('setStep should change step if it is a multiplier of the difference between max and min values', () => {
        model.setStep(3);
        expect(model.getOptions.step).toBe(1);
        model.setStep(0.1);
        expect(model.getOptions.step).toBe(0.1);
    });

    test('setRange should change range option', () => {
        model.setRange('max');
        expect(model.getOptions.range).toBe('max');
        model.setRange('gg');
        expect(model.getOptions.range).toBe('false');
    });

    test('setVisability should change boolean value displaying if current value is visible', () => {
        model.setVisability(false);
        expect(model.getOptions.isValueVisible).toBe(false);
    });

    test('setVerticalMode should change boolean value displaying if slider is in vertical mode', () => {
        model.setVerticalMode(true);
        expect(model.getOptions.isVertical).toBe(true);
    });
    
    test('getOptions should return options', () => {
        expect(model.getOptions).toEqual(options);
    });
})