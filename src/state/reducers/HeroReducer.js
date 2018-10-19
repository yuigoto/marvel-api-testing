import { Hero } from "state/Types";

/***
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
export function HeroReducer(state = {}, action) {
  console.log(state);
  console.log(action);
  switch (action.type) {
    case Hero.CLEAR_HERO:
      return Object.assign({}, state, {
        data: {}
      });
    case Hero.CLEAR_HERO_COMICS:
      return Object.assign({}, state, {
        comics: {
          children: [],
          total: 0,
          page: 1
        }
      });
    case Hero.CLEAR_HERO_EVENTS:
      return Object.assign({}, state, {
        events: {
          children: [],
          total: 0,
          page: 1
        }
      });
    case Hero.CLEAR_HERO_SERIES:
      return Object.assign({}, state, {
        series: {
          children: [],
          total: 0,
          page: 1
        }
      });
    case Hero.CLEAR_HERO_STORIES:
      return Object.assign({}, state, {
        stories: {
          children: [],
          total: 0,
          page: 1
        }
      });
    case Hero.RESET_HERO:
      return Object.assign({}, state, {
        data: {},
        comics: {
          children: [],
          total: 0,
          page: 1
        },
        events: {
          children: [],
          total: 0,
          page: 1
        },
        series: {
          children: [],
          total: 0,
          page: 1
        },
        stories: {
          children: [],
          total: 0,
          page: 1
        }
      });
    case Hero.SET_HERO:
      return Object.assign({}, state, action.hero);
    case Hero.SET_HERO_COMICS:
      return Object.assign({}, state, action.hero);
    case Hero.SET_HERO_EVENTS:
      return Object.assign({}, state, action.hero);
    case Hero.SET_HERO_SERIES:
      return Object.assign({}, state, action.hero);
    case Hero.SET_HERO_STORIES:
      return Object.assign({}, state, action.hero);
    default:
      return state;
  }
}
