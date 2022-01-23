import Presenter from "../../plugin/components/Presenter/Presenter";
import View from "../../plugin/components/View/View";
import Model, {CompleteOptions} from "../../plugin/components/Model/Model";

describe('Presenter tests', ()=> {
    let presenter: Presenter;
    let options: CompleteOptions;
    let root: HTMLDivElement;
    beforeEach(() => {
        options = {
            value: 0,
            value2: 0,
            step: 1,
            max: 4,
            min: 2,
            id: 'slider-test',
            startCord: 0,
            endCord: 0,
            range: '',
            key: 'min',
            currentCord: 0
        };
        root = document.createElement('div');
        root.setAttribute('id', 'slider-test');
        document.body.append(root);
        presenter = new Presenter(new View(options.id), new Model(options));
    });

    afterEach(() => {
        root.remove();
    })

    test('onInit should call validateOptoins', () => {
        const validateOptionsMock = jest.fn(presenter.getModel.validateOptions.bind(presenter.getModel));
        presenter.getModel.validateOptions = validateOptionsMock;
        presenter.onInit();
        expect(validateOptionsMock.mock.calls.length).toBe(1);
    });

    test('onInit should add 2 observers', () => {
        presenter.onInit();
        expect(presenter.getView.observers.length).toBe(2);
    });
    test('onInit should display slider', () => {
        const displaySliderMock = jest.fn(presenter.getView.displaySlider.bind(presenter.getView));
        presenter.getView.displaySlider = displaySliderMock;
        presenter.onInit();
        expect(displaySliderMock.mock.calls.length).toBe(1);
    });
    test('onInit should set handles', () => {
        const setHandlesMock = jest.fn(presenter.getView.setHandles.bind(presenter.getView));
        presenter.getView.setHandles = setHandlesMock;
        presenter.onInit();
        expect(setHandlesMock.mock.calls.length).toBe(1);
    });
    test('onInit should set cords', () => {
        const setCordsMock = jest.fn(presenter.getModel.setCords.bind(presenter.getModel));
        presenter.getModel.setCords = setCordsMock;
        presenter.onInit();
        expect(setCordsMock.mock.calls.length).toBe(1);
    });
    test('onInit should make slider vertical if it is necessary', () => {
        const makeVerticalMock = jest.fn(presenter.getView.makeVertical.bind(presenter.getView));
        presenter.getView.makeVertical = makeVerticalMock;
        presenter.onInit();
        expect(makeVerticalMock.mock.calls.length).toBe(0);
        options.isVertical = true;
        presenter.onInit();
        expect(makeVerticalMock.mock.calls.length).toBe(1);
    });

    test('handleInputListener should call calueValue in model', () => {
        const calcValueMock = jest.fn(presenter.getModel.calcValue.bind(presenter.getModel));
        presenter.getModel.calcValue = calcValueMock;
        presenter.handleInputListener(options);
        expect(calcValueMock.mock.calls.length).toBe(0);
        options.key = 'secondHandle';
        presenter.handleInputListener(options);
        expect(calcValueMock.mock.calls.length).toBe(1);
    });
    test('handleInputListener should call updateSlider', () => {
        const updateSliderMock = jest.fn(presenter['updateSlider']);
        presenter['updateSlider'] = updateSliderMock;
        presenter.progressBarClickListener(options);
        expect(updateSliderMock.mock.calls.length).toBe(0);
        options.key = 'firstHandle';
        presenter.handleInputListener(options);
        expect(updateSliderMock.mock.calls.length).toBe(1);
    });

    test('progressBarClickListener should call updateSlider', () => {
        const updateSliderMock = jest.fn(presenter['updateSlider']);
        presenter['updateSlider'] = updateSliderMock;
        presenter.progressBarClickListener(options);
        expect(updateSliderMock.mock.calls.length).toBe(0);
        options.key = 'progressBarFirst';
        presenter.progressBarClickListener(options);
        expect(updateSliderMock.mock.calls.length).toBe(1);
    });

    test('changeFirstValue should call updateSlider', () => {
        const updateSliderMock = jest.fn(presenter['updateSlider']);
        presenter['updateSlider'] = updateSliderMock;
        presenter.changeFirstValue(1);
        expect(updateSliderMock.mock.calls.length).toBe(1);
        expect(presenter.getModel.getOptions.key).toBe('firstHandle');
    });
    test('changeFirstValue should call changeFirstValue in model', () => {
        const changeFirstValueMock = jest.fn(presenter.getModel.changeFirstValue.bind(presenter.getModel));
        presenter.getModel.changeFirstValue = changeFirstValueMock;
        presenter.changeFirstValue(1);
        expect(changeFirstValueMock.mock.calls.length).toBe(1);
    });

    test('changeSecondValue should call updateSlider', () => {
        const updateSliderMock = jest.fn(presenter['updateSlider']);
        presenter['updateSlider'] = updateSliderMock;
        presenter.changeSecondValue(1);
        expect(updateSliderMock.mock.calls.length).toBe(1);
        expect(presenter.getModel.getOptions.key).toBe('secondHandle');
    });
    test('changeSecondValue should call changeSecondValue in model', () => {
        const changeSecondValueMock = jest.fn(presenter.getModel.changeSecondValue.bind(presenter.getModel));
        presenter.getModel.changeSecondValue = changeSecondValueMock;
        presenter.changeSecondValue(1);
        expect(changeSecondValueMock.mock.calls.length).toBe(1);
    });

    test('changeMaxValue should call rewriteSlider', () => {
        const rewriteSliderMock = jest.fn(presenter['rewriteSlider']);
        presenter['rewriteSlider'] = rewriteSliderMock;
        presenter.changeMaxValue(1);
        expect(rewriteSliderMock.mock.calls.length).toBe(1);
    });
    test('changeMaxValue should call setMaxValue in model', () => {
        const setMaxValueMock = jest.fn(presenter.getModel.setMaxValue.bind(presenter.getModel));
        presenter.getModel.setMaxValue = setMaxValueMock;
        presenter.changeMaxValue(1);
        expect(setMaxValueMock.mock.calls.length).toBe(1);
    });

    test('changeMinValue should call rewriteSlider', () => {
        const rewriteSliderMock = jest.fn(presenter['rewriteSlider']);
        presenter['rewriteSlider'] = rewriteSliderMock;
        presenter.changeMaxValue(1);
        expect(rewriteSliderMock.mock.calls.length).toBe(1);
    });
    test('changeMinValue should call setMinValue in model', () => {
        const setMinValueMock = jest.fn(presenter.getModel.setMinValue.bind(presenter.getModel));
        presenter.getModel.setMinValue = setMinValueMock;
        presenter.changeMinValue(1);
        expect(setMinValueMock.mock.calls.length).toBe(1);
    });

    test('changeStep should call rewriteSlider', () => {
        const rewriteSliderMock = jest.fn(presenter['rewriteSlider']);
        presenter['rewriteSlider'] = rewriteSliderMock;
        presenter.changeStep(1);
        expect(rewriteSliderMock.mock.calls.length).toBe(1);
    });
    test('changeStep should call setStep in model', () => {
        const setStepMock = jest.fn(presenter.getModel.setStep.bind(presenter.getModel));
        presenter.getModel.setStep = setStepMock;
        presenter.changeStep(1);
        expect(setStepMock.mock.calls.length).toBe(1);
    });

    test('changeRange should call rewriteSlider', () => {
        const rewriteSliderMock = jest.fn(presenter['rewriteSlider']);
        presenter['rewriteSlider'] = rewriteSliderMock;
        presenter.changeRange('');
        expect(rewriteSliderMock.mock.calls.length).toBe(1);
    });
    test('changeRange should call setRange in model', () => {
        const setRangeMock = jest.fn(presenter.getModel.setRange.bind(presenter.getModel));
        presenter.getModel.setRange = setRangeMock;
        presenter.changeRange('');
        expect(setRangeMock.mock.calls.length).toBe(1);
    });
    test('changeRange should hide sliderTrack if there is not range options', () => {
        const hideMock = jest.fn(presenter.getView.getViewElements.sliderTrack.hide.bind(presenter.getView.getViewElements.sliderTrack));
        presenter.getView.getViewElements.sliderTrack.hide = hideMock;
        presenter.changeRange('true');
        expect(hideMock.mock.calls.length).toBe(0);
        presenter.changeRange('');
        expect(hideMock.mock.calls.length).toBe(1);
    });

    test('changeMode should call makeVertical or makeHorizontal', () => {
        const makeVerticalMock = jest.fn(presenter.getView.makeVertical.bind(presenter.getView));
        presenter.getView.makeVertical = makeVerticalMock;
        presenter.changeMode(false);
        expect(makeVerticalMock.mock.calls.length).toBe(0);
        presenter.changeMode(true);
        expect(makeVerticalMock.mock.calls.length).toBe(1);
    });
    test('changeMode should call setCords in model', () => {
        const setCordsMock = jest.fn(presenter.getModel.setCords.bind(presenter.getModel));
        presenter.getModel.setCords = setCordsMock;
        presenter.changeMode(false);
        expect(setCordsMock.mock.calls.length).toBe(1);
    });
    test('changeMode should call rewriteSlider', () => {
        const rewriteSliderMock = jest.fn(presenter['rewriteSlider']);
        presenter['rewriteSlider'] = rewriteSliderMock;
        presenter.changeMode(true);
        expect(rewriteSliderMock.mock.calls.length).toBe(1);
    });
    test('changeMode should call setVerticalMode in model', () => {
        const setVerticalModeMock = jest.fn(presenter.getModel.setVerticalMode.bind(presenter.getModel));
        presenter.getModel.setVerticalMode = setVerticalModeMock;
        presenter.changeMode(false);
        expect(setVerticalModeMock.mock.calls.length).toBe(1);
    });

    test('changeVisabilityOfValues should call rewriteSlider', () => {
        const rewriteSliderMock = jest.fn(presenter['rewriteSlider']);
        presenter['rewriteSlider'] = rewriteSliderMock;
        presenter.changeVisabilityOfValues(true);
        expect(rewriteSliderMock.mock.calls.length).toBe(1);
    });
    test('changeVisabilityOfValues should call setVisability in model', () => {
        const setVisabilityMock = jest.fn(presenter.getModel.setVisability.bind(presenter.getModel));
        presenter.getModel.setVisability = setVisabilityMock;
        presenter.changeVisabilityOfValues(true);
        expect(setVisabilityMock.mock.calls.length).toBe(1);
    });

    test('rewriteSlider should call destroySlider in view', () => {
        const destroySliderMock = jest.fn(presenter.getView.destroySlider.bind(presenter.getView));
        presenter.getView.destroySlider = destroySliderMock;
        presenter['rewriteSlider']();
        expect(destroySliderMock.mock.calls.length).toBe(1);
    });
    test('rewriteSlider should call displaySlider in view', () => {
        const displaySliderMock = jest.fn(presenter.getView.displaySlider.bind(presenter.getView));
        presenter.getView.displaySlider = displaySliderMock;
        presenter['rewriteSlider']();
        expect(displaySliderMock.mock.calls.length).toBe(1);
    });
})