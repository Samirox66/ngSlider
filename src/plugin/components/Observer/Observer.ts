import { Options } from "../Model/Model";

class Observer {
    observers: Function[];

    constructor() {
        this.observers = [];
    }

    addObserver(observerToAdd: Function) {
        this.observers.push(observerToAdd);
    }

    removeObserver(observerToDelete: Function) {
        this.observers.forEach((observer, index) => {
            if (observer.toString() === observerToDelete.toString()) {
                this.observers.splice(index, 1);
            }
        })
    }

    notifyObservers(options: Options) {
        this.observers.forEach(observer => {
            observer(options);
        })
    }
}

export default Observer;