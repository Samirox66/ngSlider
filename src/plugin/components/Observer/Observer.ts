import { CompleteOptions } from '../Model/Model';

type ObserverFunction = (options: CompleteOptions) => void;

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
      if (observer.toString() === observerToDelete.toString()) {
        this.observers.splice(index, 1);
      }
    });
  }

  notifyObservers(options: CompleteOptions) {
    this.observers.forEach((observer) => {
      observer(options);
    });
  }
}

export default Observer;
