class CurrentValue {
    private currentValue: HTMLDivElement;

    constructor() {
        this.currentValue = document.createElement('div');
    }

    get getCurrentValue() {
        return this.currentValue;
    }

    setCurrentValue(value: string) {
        this.currentValue.textContent = value;
    }
}

export default CurrentValue;