import * as c from '../actions/currencies';

const initialState = {
  baseCurrency: 'USD',
  quoteCurrency: 'GBP',
  amount: 100,
  conversions: {},
  error: null,
};

const setConversions = (state, action) => {
  let conversion = {
    isFetching: true,
    date: '',
    rates: {},
  };

  if (state.conversions[action.currency]) {
    conversion = state.conversions[action.currency];
  }

  return {
    ...state.conversions,
    [action.currency]: conversion,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case c.CHANGE_CURRENCY_AMOUNT:
      return { ...state, amount: action.amount || 0 };
    case c.SWAP_CURRENCY:
      return {
        ...state,
        baseCurrency: state.quoteCurrency,
        quoteCurrency: state.baseCurrency,
        conversions: setConversions(state, { currency: state.quoteCurrency }),
      };
    case c.CHANGE_BASE_CURRENCY:
      return {
        ...state,
        baseCurrency: action.currency,
        conversions: setConversions(state, action),
      };
    case c.CHANGE_QUOTE_CURRENCY:
      return {
        ...state,
        quoteCurrency: action.currency,
      };
    case c.GET_INITIAL_CONVERSION:
      return { ...state, conversions: setConversions(state, { currency: state.baseCurrency }) };
    case c.CONVERSION_RESULT:
      return {
        ...state,
        baseCurrency: action.result.base,
        conversions: {
          ...state.conversions,
          [action.result.base]: {
            isFetching: false,
            ...action.result,
          },
        },
      };
    case c.CONVERSION_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
