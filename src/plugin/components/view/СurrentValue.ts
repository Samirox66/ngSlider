class CurrentValue {
    private currentValue: HTMLDivElement;

    constructor() {
        this.currentValue = document.createElement('div');
    }

    get getCurrentValue() {
        return this.currentValue;
    }

    setCurrentValue(value: string) {
        const textNode = document.createTextNode(value);
        this.currentValue.appendChild(textNode);
    }
}

export default CurrentValue;