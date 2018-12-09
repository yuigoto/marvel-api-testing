/**
 * State/Types
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */

/**
 * @type {
 *    {
 *      CLEAR_HERO: string,
 *      SELECT_HERO: string
 *    }
 * }
 */
export const Hero = {
  CLEAR_HERO: "CLEAR_HERO",
  CLEAR_HERO_COMICS: "CLEAR_HERO_COMICS",
  CLEAR_HERO_EVENTS: "CLEAR_HERO_EVENTS",
  CLEAR_HERO_SERIES: "CLEAR_HERO_SERIES",
  CLEAR_HERO_STORIES: "CLEAR_HERO_STORIES",
  RESET_HERO: "RESET_HERO",
  SET_HERO: "SET_HERO",
  SET_HERO_COMICS: "SET_HERO_COMICS",
  SET_HERO_EVENTS: "SET_HERO_EVENTS",
  SET_HERO_SERIES: "SET_HERO_SERIES",
  SET_HERO_STORIES: "SET_HERO_STORIES"
};

/**
 * @type {
 *    {
 *      HIDE_LOADER: string,
 *      SHOW_LOADER: string
 *    }
 * }
 */
export const Loader = {
  HIDE_LOADER: "HIDE_LOADER",
  SHOW_LOADER: "SHOW_LOADER"
};

/**
 * @type {
 *    {
 *      CLEAR_HEROES: string,
 *      FETCH_HEROES: string
 *    }
 * }
 */
export const Search = {
  SEARCH_CLEAR: "SEARCH_CLEAR",
  SEARCH_HEROES_CLEAR: "SEARCH_HEROES_CLEAR",
  SEARCH_HEROES_LOAD: "SEARCH_HEROES_LOAD",
  SET_ORDER: "SET_ORDER",
  SET_ORDER_BY_DESC: "SET_ORDER_BY_DESC",
  SET_PAGE: "SET_PAGE",
  SET_RESULTS: "SET_RESULTS",
  SET_SEARCH: "SET_SEARCH",
  SET_TERM: "SET_TERM",
  SET_TOTAL: "SET_TOTAL",
  TRIGGER: "TRIGGER",
  UNTRIGGER: "UNTRIGGER"
};
