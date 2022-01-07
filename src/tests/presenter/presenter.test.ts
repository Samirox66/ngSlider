import Presenter from "../../plugin/components/Presenter/Presenter";
import View from "../../plugin/components/View/View"
import Model, {Options} from "../../plugin/components/Model/Model"

describe('Presenter tests', ()=> {
    let presenter: Presenter;
    let options: Options;
    beforeEach(() => {
        options = {
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
        presenter = new Presenter(new View(options.id, options.range), new Model(options));
    })

    test('onInit should add 2 observers', ()=> {
        presenter.onInit(options);
        expect(presenter.getView.observers.length).toBe(2);
    })
})