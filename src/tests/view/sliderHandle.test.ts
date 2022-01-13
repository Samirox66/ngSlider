import { Options } from "../../plugin/components/Model/Model";
import SliderHandle from "../../plugin/components/View/SliderHandle";

describe('SliderHandle tests', () => {
    let sliderHandle: SliderHandle;
    const options: Options = {
        value: 3,
        value2: 2,
        step: 0.1,
        max: 5,
        min: 1,
        id: '',
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
})