import { Loader } from "state/Types";

/***
 * State/Reducers/LoadReducer
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 *
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
export function LoaderReducer(state = {}, action) {
  switch (action.type) {
    case Loader.HIDE_LOADER:
      return Object.assign({}, state, {
        visible: false
      });
    case Loader.SHOW_LOADER:
      return Object.assign({}, state, {
        visible: true
      });
    default:
      return state;
  }
}
