class SliderHandle {
    private sliderHandle: HTMLDivElement;
    
    constructor() {
        this.sliderHandle = document.createElement('div');
    }

    setAttributes(max: number, min: number, value: number) {
       
    }

    get getSliderHandle() {
        return this.sliderHandle;
    }
}

export default SliderHandle;