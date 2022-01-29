import { CompleteOptions } from '../../plugin/components/Model/Model';
import Observer from '../../plugin/components/Observer/Observer';

describe('Observer tests', () => {
  let observer: Observer;
  beforeEach(() => {
    observer = new Observer();
  });
  test('addObserver should add one observer', () => {
    const testFunction = () => 3;
    observer.addObserver(testFunction);
    expect(observer.observers.length).toBe(1);
  });
  test('notifyObservers should work with specific observer', () => {
    const options: CompleteOptions = {
      value: 0,
      value2: 0,
      step: 0,
      max: 4,
      min: 2,
      id: '',
      startCord: 0,
      endCord: 0,
      range: '',
      key: 'min',
      currentCord: 0,
    };
    const setValueToMin = () => {
      if (options.key !== 'min') {
        return;
      }
      options.value = options.min;
    };
    const mockSetValueToMax = jest.fn(() => {
      if (options.key !== 'max') {
        return;
      }
      options.value = options.max;
    });
    observer.addObserver(setValueToMin);
    observer.addObserver(mockSetValueToMax);
    observer.notifyObservers(options);
    expect(options.value).toBe(2);
    expect(mockSetValueToMax.mock.calls.length).toBe(1);
  });
  test('Observer should be empty after initializiation', () => {
    expect(observer.observers.length).toBe(0);
  });
  test('observerRemove should delete observer', () => {
    const testFunction = () => 3;
    observer.addObserver(testFunction);
    observer.removeObserver(testFunction);
    expect(observer.observers.length).toBe(0);
  });
});
