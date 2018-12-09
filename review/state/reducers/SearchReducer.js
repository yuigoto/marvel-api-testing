import { Search } from "review/state/Types";

/***
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
export function SearchReducer(state = {}, action) {
  switch (action.type) {
    case Search.SEARCH_CLEAR:
      return Object.assign({}, state, action.search);
    case Search.SEARCH_HEROES_CLEAR:
      return Object.assign({}, state, action.search);
    case Search.SEARCH_HEROES_LOAD:
      return Object.assign({}, state, action.search);
    case Search.SET_ORDER:
      return Object.assign({}, state, action.search);
    case Search.SET_ORDER_BY_DESC:
      return Object.assign({}, state, action.search);
    case Search.SET_PAGE:
      return Object.assign({}, state, action.search);
    case Search.SET_RESULTS:
      return Object.assign({}, state, action.search);
    case Search.SET_SEARCH:
      return Object.assign({}, state, action.search);
    case Search.SET_TERM:
      return Object.assign({}, state, action.search);
    case Search.SET_TOTAL:
      return Object.assign({}, state, action.search);
    case Search.TRIGGER:
      return Object.assign({}, state, action.search);
    case Search.UNTRIGGER:
      return Object.assign({}, state, action.search);
    default:
      return state;
  }
}
