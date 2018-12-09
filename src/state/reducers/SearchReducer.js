import { Search } from "state/Types";
import InitialState from "state/InitialState";

/**
 * State/Reducers/SearchReducer
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 *
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
const SearchReducer = (state = {}, action) => {
  switch (action.type) {
    case Search.CLEAR:
      return Object.assign({}, state, InitialState.search());
    case Search.CLEAR_HEROES:
      return Object.assign({}, state, {
        children: []
      });
    case Search.LOAD:
      return Object.assign({}, state, action.search);
    case Search.LOAD_STATUS:
      return Object.assign({}, state, action.search);
    case Search.SET:
      return Object.assign({}, state, action.search);
    case Search.SET_ORDER:
      return Object.assign({}, state, action.search);
    case Search.SET_ERROR:
      return Object.assign({}, state, action.search);
    case Search.SET_ORDER_DIRECTION:
      return Object.assign({}, state, action.search);
    case Search.SET_PAGE:
      return Object.assign({}, state, action.search);
    case Search.SET_RESULTS:
      return Object.assign({}, state, action.search);
    case Search.SET_TERM:
      return Object.assign({}, state, action.search);
    case Search.SET_TOTAL:
      return Object.assign({}, state, action.search);
    case Search.TRIGGER:
      return Object.assign({}, state, {
        triggered: true
      });
    case Search.UNTRIGGER:
      return Object.assign({}, state, {
        triggered: false
      });
    default:
      return state;
  }
};

export default SearchReducer;
