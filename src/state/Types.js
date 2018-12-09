/**
 * State/Types
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */

/**
 * @type {
 *    {
 *      CLEAR: string,
 *      CLEAR_COMICS: string,
 *      CLEAR_EVENTS: string,
 *      CLEAR_SERIES: string,
 *      CLEAR_STORIES: string,
 *      LOAD: string,
 *      LOAD_STATUS: string,
 *      SET: string,
 *      SET_COMICS: string,
 *      SET_EVENTS: string,
 *      SET_SERIES: string,
 *      SET_STORIES: string
 *    }
 * }
 */
export const Hero = {
  CLEAR:                "HERO/CLEAR",
  CLEAR_COMICS:         "HERO/CLEAR/COMICS",
  CLEAR_EVENTS:         "HERO/CLEAR/EVENTS",
  CLEAR_SERIES:         "HERO/CLEAR/SERIES",
  CLEAR_STORIES:        "HERO/CLEAR/STORIES",
  LOAD:                 "HERO/LOAD",
  LOAD_STATUS:          "HERO/LOAD/STATUS",
  RESET:                "HERO/RESET",
  SET:                  "HERO/SET",
  SET_COMICS:           "HERO/SET/COMICS",
  SET_EVENTS:           "HERO/SET/EVENTS",
  SET_SERIES:           "HERO/SET/SERIES",
  SET_STORIES:          "HERO/SET/STORIES",
};

/**
 * @type {
 *    {
 *      HIDE: string,
 *      SHOW: string
 *    }
 * }
 */
export const Loader = {
  HIDE: "LOADER/HIDE",
  SHOW: "LOADER/SHOW"
};

/**
 * @type {
 *    {
 *      CLEAR: string,
 *      CLEAR_HEROES: string,
 *      LOAD: string,
 *      LOAD_STATUS: string,
 *      SET: string,
 *      SET: string,
 *      SET_ERROR: boolean,
 *      SET_ORDER_DIRECTION: string,
 *      SET_PAGE: string,
 *      SET_RESULTS: string,
 *      SET_TERM: string,
 *      SET_TOTAL: string,
 *      TRIGGER: string,
 *      UNTRIGGER: string
 *    }
 * }
 */
export const Search = {
  CLEAR:                "SEARCH/CLEAR",
  CLEAR_HEROES:         "SEARCH/HEROES",
  LOAD:                 "SEARCH/LOAD",
  LOAD_STATUS:          "SEARCH/LOAD/STATUS",
  SET:                  "SEARCH/SET",
  SET_ERROR:            "SEARCH/SET/ERROR",
  SET_ORDER:            "SEARCH/SET/ORDER",
  SET_ORDER_DIRECTION:  "SEARCH/SET/DIRECTION",
  SET_PAGE:             "SEARCH/SET/PAGE",
  SET_RESULTS:          "SEARCH/SET/RESULTS",
  SET_TERM:             "SEARCH/SET/TERM",
  SET_TOTAL:            "SEARCH/SET/TOTAL",
  TRIGGER:              "SEARCH/TRIGGER",
  UNTRIGGER:            "SEARCH/UNTRIGGER"
};
