class SliderInput {
    private sliderInput: HTMLInputElement;
    
    constructor(sliderInput: HTMLInputElement) {
        this.sliderInput = sliderInput;
    }

    setAttributes(max: number, min: number, value: number) {
        this.sliderInput.min = min.toString();
        this.sliderInput.max = max.toString();
        this.sliderInput.value = value.toString();
    }

    get getSliderInput() {
        return this.sliderInput;
    }

    addSliderInputListener() {

    }
}

export default SliderInput;