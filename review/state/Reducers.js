import { combineReducers } from "redux";

import { HeroReducer } from "reducers/HeroReducer";
import { LoaderReducer } from "reducers/LoaderReducer";
import { SearchReducer } from "reducers/SearchReducer";

/***
 * State/Reducers
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
const Reducers = combineReducers({
  hero: HeroReducer,
  loader: LoaderReducer,
  search: SearchReducer
});

export default Reducers;
