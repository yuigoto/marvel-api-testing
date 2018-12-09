import { Hero } from "state/Types";
import InitialState from "state/InitialState";

/**
 * State/Reducers/HeroReducer
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 *
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
const HeroReducer = (state = {}, action) => {
  switch (action.type) {
    case Hero.CLEAR:
      return Object.assign({}, state, {
        data: {}
      });
    case Hero.CLEAR_COMICS:
      return Object.assign({}, state, {
        comics: InitialState.heroResource()
      });
    case Hero.CLEAR_EVENTS:
      return Object.assign({}, state, {
        events: InitialState.heroResource()
      });
    case Hero.CLEAR_SERIES:
      return Object.assign({}, state, {
        series: InitialState.heroResource()
      });
    case Hero.CLEAR_STORIES:
      return Object.assign({}, state, {
        stories: InitialState.heroResource()
      });
    case Hero.LOAD:
      return Object.assign({}, state, action.hero);
    case Hero.LOAD_STATUS:
      return Object.assign({}, state, action.hero);
    case Hero.RESET:
      return Object.assign({}, state, {
        data: InitialState.hero()
      });
    case Hero.SET:
      return Object.assign({}, state, action.hero);
    case Hero.SET_COMICS:
      return Object.assign({}, state, action.hero);
    case Hero.SET_EVENTS:
      return Object.assign({}, state, action.hero);
    case Hero.SET_SERIES:
      return Object.assign({}, state, action.hero);
    case Hero.SET_STORIES:
      return Object.assign({}, state, action.hero);
    default:
      return state;
  }
};

export default HeroReducer;
