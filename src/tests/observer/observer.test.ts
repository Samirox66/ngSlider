import { Options } from '../../plugin/components/Model/Model';
import Observer from '../../plugin/components/Observer/Observer';

describe('Observer tests', () => {
    let observer: Observer;
    beforeEach(() => {
        observer = new Observer();
    })
    test('addObserver should add one observer', () => {
        const testFunction = () => {};
        observer.addObserver(testFunction);
        expect(observer.observers.length).toBe(1);
    })
    test('notifyObservers should work with specific observer', () => {
        const setValueToMin = (options: Options) => {
            if (options.key !== 'min') {
                return;
            }
            options.value = options.min;
        }
        observer.addObserver(setValueToMin);
        const options: Options = {
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
            currentCord: 0
        }
        observer.notifyObservers(options);
        expect(options.value).toBe(2);
    })
    test('Observer should be empty after initializiation', () => {
        expect(observer.observers.length).toBe(0);
    })
    test('observerRemove should delete observer', () => {
        const testFunction = () => {};
        observer.addObserver(testFunction);
        observer.removeObserver(testFunction);
        expect(observer.observers.length).toBe(0);
    })
})