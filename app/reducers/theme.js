import * as c from '../actions/theme';

const initialState = {
  primaryColor: '#4F6D7A',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case c.CHANGE_PRIMARY_COLOR:
      return { ...state, primaryColor: action.color };
    default:
      return state;
  }
};

export default reducer;
