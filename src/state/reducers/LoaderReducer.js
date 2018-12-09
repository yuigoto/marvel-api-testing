import { Loader } from "state/Types";

/**
 * State/Reducers/LoaderReducer
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 *
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
const LoaderReducer = (state = {}, action) => {
  switch (action.type) {
    case Loader.HIDE:
      return Object.assign({}, state, {
        visible: false
      });
    case Loader.SHOW:
      return Object.assign({}, state, {
        visible: true
      });
    default:
      return state;
  }
};

export default LoaderReducer;
