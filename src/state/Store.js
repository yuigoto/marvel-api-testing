import { createStore } from "redux";

import Reducers from "state/Reducers";
import InitialState from "state/InitialState";

/**
 * State/Store
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
const Store = createStore(
  Reducers,
  InitialState.clearState()
);

export default Store;
