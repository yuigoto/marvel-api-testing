import { combineReducers } from "redux";
import HeroReducer from "state/reducers/HeroReducer";
import LoaderReducer from "state/reducers/LoaderReducer";
import SearchReducer from "state/reducers/SearchReducer";

/**
 * State/Reducers
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 *
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
const Reducers = combineReducers({
  hero: HeroReducer,
  loader: LoaderReducer,
  search: SearchReducer
});

export default Reducers;
