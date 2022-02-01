interface ObserverOptions {
  key: string,
  currentCord?: number,
  value?: number,
  value2?: number
}

type ObserverFunction = (options: ObserverOptions) => void;

class Observer {
  observers: ObserverFunction[];

  constructor() {
    this.observers = [];
  }

  addObserver(observerToAdd: ObserverFunction) {
    this.observers.push(observerToAdd);
  }

  removeObserver(observerToDelete: ObserverFunction) {
    this.observers.forEach((observer, index) => {
      if (String(observer) === String(observerToDelete)) {
        this.observers.splice(index, 1);
      }
    });
  }

  notifyObservers(options: ObserverOptions) {
    this.observers.forEach((observer) => {
      observer(options);
    });
  }
}

export default Observer;
export { ObserverOptions };
