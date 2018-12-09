/**
 * State/InitialState
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
const InitialState = {};

/**
 * @returns {{hero: {}, comics: {children: Array, total: number, page: number}, events: {children: Array, total: number, page: number}, series: {children: Array, total: number, page: number}, stories: {children: Array, total: number, page: number}}}
 */
InitialState.hero = () => {
  return {
    hero: {},
    load: false,
    has_loaded: false,
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
  };
};

/**
 * @returns {{children: Array, total: number, page: number}}
 */
InitialState.heroResource = () => {
  return {
    children: [],
    total: 0,
    page: 1
  };
};

/**
 * @returns {{visible: boolean}}
 */
InitialState.loader = () => {
  return {
    visible: false
  };
};

/**
 * @returns {{term: string, orderBy: string, orderByDesc: boolean, children: Array, total: null, per_page: number, page: number, has_loaded: boolean, triggered: boolean}}
 */
InitialState.search = () => {
  return {
    term: "",
    orderBy: "name",
    orderByDesc: false,
    children: [],
    total: null,
    per_page: 12,
    page: 1,
    has_loaded: false,
    load: false,
    error: false,
    triggered: false
  };
};

/**
 * @returns {{hero: *, loader: *, search: *}}
 */
InitialState.clearState = () => {
  return {
    hero: InitialState.hero(),
    loader: InitialState.loader(),
    search: InitialState.search()
  };
};

export default InitialState;
