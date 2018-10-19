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
HeroActions.clearHero = () => {
  return {
    type: Hero.CLEAR_HERO
  }
};

/**
 * @returns {{type: string}}
 */
HeroActions.clearHeroComics = () => {
  return {
    type: Hero.CLEAR_HERO_COMICS
  }
};

/**
 * @returns {{type: string}}
 */
HeroActions.clearHeroEvents = () => {
  return {
    type: Hero.CLEAR_HERO_EVENTS
  }
};

/**
 * @returns {{type: string}}
 */
HeroActions.clearHeroSeries = () => {
  return {
    type: Hero.CLEAR_HERO_SERIES
  }
};

/**
 * @returns {{type: string}}
 */
HeroActions.clearHeroStories = () => {
  return {
    type: Hero.CLEAR_HERO_STORIES
  }
};

/**
 * @returns {{type: string}}
 */
HeroActions.resetHero = () => {
  return {
    type: Hero.RESET_HERO
  }
};

/**
 * @param hero
 * @returns {{hero: {data: *}, type: string}}
 */
HeroActions.setHero = (hero) => {
  return {
    hero: {
      data: hero
    },
    type: Hero.SET_HERO
  }
};

/**
 * @param comics
 * @returns {{hero: {comics: *}, type: string}}
 */
HeroActions.setHeroComics = (comics) => {
  return {
    hero: {
      comics
    },
    type: Hero.SET_HERO_COMICS
  };
};

/**
 * @param events
 * @returns {{hero: {events: *}, type: string}}
 */
HeroActions.setHeroEvents = (events) => {
  return {
    hero: {
      events
    },
    type: Hero.SET_HERO_EVENTS
  };
};

/**
 * @param series
 * @returns {{hero: {series: *}, type: string}}
 */
HeroActions.setHeroSeries = (series) => {
  return {
    hero: {
      series
    },
    type: Hero.SET_HERO_SERIES
  };
};

/**
 * @param stories
 * @returns {{hero: {stories: *}, type: string}}
 */
HeroActions.setHeroStories = (stories) => {
  return {
    hero: {
      stories
    },
    type: Hero.SET_HERO_STORIES
  };
};

export default HeroActions;
