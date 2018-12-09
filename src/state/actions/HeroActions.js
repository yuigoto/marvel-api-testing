import { Hero } from "state/Types";

/**
 * State/Actions/HeroActions
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
const HeroActions = {};

/**
 * @returns {{type: string}}
 */
HeroActions.clear = () => {
  return {
    type: Hero.CLEAR
  }
};

/**
 * @returns {{type: string}}
 */
HeroActions.clearComics = () => {
  return {
    type: Hero.CLEAR_COMICS
  }
};

/**
 * @returns {{type: string}}
 */
HeroActions.clearEvents = () => {
  return {
    type: Hero.CLEAR_EVENTS
  }
};

/**
 * @returns {{type: string}}
 */
HeroActions.clearSeries = () => {
  return {
    type: Hero.CLEAR_SERIES
  }
};

/**
 * @returns {{type: string}}
 */
HeroActions.clearStories = () => {
  return {
    type: Hero.CLEAR_STORIES
  }
};

/**
 * @param load
 * @returns {{hero: {load: *}, type: string}}
 */
HeroActions.load = (load) => {
  return {
    hero: {
      load: load
    },
    type: Hero.LOAD
  }
};

/**
 * @param has_loaded
 * @returns {{hero: {has_loaded: *}, type: string}}
 */
HeroActions.loadStatus = (has_loaded) => {
  return {
    hero: {
      has_loaded: has_loaded
    },
    type: Hero.LOAD_STATUS
  }
};

/**
 * @param hero
 * @returns {{hero: {data: *}, type: string}}
 */
HeroActions.set = (hero) => {
  return {
    hero: {
      data: hero
    },
    type: Hero.SET
  }
};

/**
 * @param comics
 * @returns {{hero: {comics: *}, type: string}}
 */
HeroActions.setComics = (comics) => {
  return {
    hero: {
      comics
    },
    type: Hero.SET_COMICS
  }
};

/**
 * @param events
 * @returns {{hero: {events: *}, type: string}}
 */
HeroActions.setEvents = (events) => {
  return {
    hero: {
      events
    },
    type: Hero.SET_EVENTS
  }
};

/**
 * @param series
 * @returns {{hero: {series: *}, type: string}}
 */
HeroActions.setSeries = (series) => {
  return {
    hero: {
      series
    },
    type: Hero.SET_SERIES
  }
};

/**
 * @param stories
 * @returns {{hero: {stories: *}, type: string}}
 */
HeroActions.setStories = (stories) => {
  return {
    hero: {
      stories
    },
    type: Hero.SET_STORIES
  }
};

export default HeroActions;
