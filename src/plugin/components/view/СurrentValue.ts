class CurrentValue {
    private currentValue: HTMLDivElement;

    constructor() {
        this.currentValue = document.createElement('div');
    }

    get getCurrentValue() {
        return this.currentValue;
    }

    setTextOfCurrentValue(value: string) {
        this.currentValue.textContent = value;
    }

    hide() {
        this.currentValue.style.display = 'none';
    }

    show() {
        this.currentValue.style.display = 'block';
    }
}

export default CurrentValue;