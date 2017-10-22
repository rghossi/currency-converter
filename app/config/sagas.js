/* eslint prefer-destructuring: 0 */
/* eslint func-names: 0 */

import { takeEvery, select, call, put } from 'redux-saga/effects';

// 1. Swap currency
// 2. Change base currency
// 3. Upon initial app load

import {
  SWAP_CURRENCY,
  CHANGE_BASE_CURRENCY,
  GET_INITIAL_CONVERSION,
  CONVERSION_RESULT,
  CONVERSION_ERROR,
} from '../actions/currencies';

const getLatestRate = currency => fetch(`http://api.fixer.io/latest?base=${currency}`);

const fetchLatestConversionRate = function* (action) {
  try {
    let currency = action.currency;

    if (!currency) {
      currency = yield select(state => state.currencies.baseCurrency);
    }

    const response = yield call(getLatestRate, currency);
    const result = yield response.json();

    if (result.error) {
      yield put({ type: CONVERSION_ERROR, error: result.error });
    } else {
      yield put({ type: CONVERSION_RESULT, result });
    }
  } catch (e) {
    // yield put({ type: CONVERSION_ERROR, error: e.message });
  }
};

const rootSaga = function* () {
  yield takeEvery(GET_INITIAL_CONVERSION, fetchLatestConversionRate);
  yield takeEvery(SWAP_CURRENCY, fetchLatestConversionRate);
  yield takeEvery(CHANGE_BASE_CURRENCY, fetchLatestConversionRate);
};

export default rootSaga;
