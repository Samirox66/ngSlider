import { Options } from "../../plugin/components/Model/Model";
import SliderHandle from "../../plugin/components/View/SliderHandle";
import View from "../../plugin/components/View/View";

describe('SliderHandle tests', () => {
    let sliderHandle: SliderHandle;
    const options: Options = {
        value: 3,
        value2: 2,
        step: 0.1,
        max: 5,
        min: 1,
        id: 'slider',
        startCord: 0,
        endCord: 200,
        range: 'true',
        key: '',
        currentCord: 0
    };

    beforeEach(() => {
        sliderHandle = new SliderHandle();
    });

    test('hide should change display property to none', () => {
        sliderHandle.hide();
        expect(sliderHandle.getSliderHandle.style.display).toBe('none');
    });

    test('show should change disaply property to block', () => {
        sliderHandle.show();
        expect(sliderHandle.getSliderHandle.style.display).toBe('block');
    });

    test('getSliderHandle should return sliderHandle', () => {
        expect(sliderHandle.getSliderHandle).toEqual(sliderHandle['sliderHandle']);
    });

    test('moveHandle should change top or left property of sliderHandle', () => {
        sliderHandle.moveHandle(options, 4);
        expect(sliderHandle.getSliderHandle.style.left).toBe('75%');
    });

    test('setHandle should set event listener of pointerdown to handle', () => {
        const eventListenerMock = jest.fn(sliderHandle.getSliderHandle.addEventListener);
        sliderHandle.getSliderHandle.addEventListener = eventListenerMock;
        const view = new View(options.id, options.range);
        document.body.innerHTML = `<div class='ng-slider' id='slider'></div>`;
        sliderHandle.setHandle(view.notifyObservers , options, false);
        expect(eventListenerMock.mock.calls.length).toBe(1);
    })
})