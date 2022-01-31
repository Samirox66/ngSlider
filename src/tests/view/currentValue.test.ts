import CurrentValue from '../../plugin/components/View/CurrentValue';

describe('CurrentValue tests', () => {
  let currentValue: CurrentValue;

  beforeEach(() => {
    currentValue = new CurrentValue();
  });

  test('hide should change display property to none', () => {
    currentValue.hide();
    expect(currentValue.getCurrentValue.style.display).toBe('none');
  });

  test('show should change display property to block', () => {
    currentValue.show();
    expect(currentValue.getCurrentValue.style.display).toBe('block');
  });

  test('setTextOfCurrentValue should set text', () => {
    currentValue.setTextOfCurrentValue('3');
    expect(currentValue.getCurrentValue.textContent).toBe('3');
  });

  test('getCurrentValue should return html element of value', () => {
    expect(currentValue.getCurrentValue).toEqual(currentValue.getCurrentValue);
  });
});
