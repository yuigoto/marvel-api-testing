import { Search } from "state/Types";
import InitialState from "state/InitialState";

/**
 * State/Actions/SearchActions
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
const SearchActions = {};

/**
 * @returns {{search: {term: string, orderBy: string, orderByDesc: boolean, children: Array, total: null, per_page: number, page: number, has_loaded: boolean, triggered: boolean}, type: string}}
 */
SearchActions.clear = () => {
  return {
    search: InitialState.search(),
    type: Search.CLEAR
  };
};

/**
 * @returns {{search: {children: Array}, type: string}}
 */
SearchActions.clearHeroes = () => {
  return {
    search: {
      children: []
    },
    type: Search.CLEAR_HEROES
  };
};

/**
 * @param load
 * @returns {{search: {load: *}, type: string}}
 */
SearchActions.load = (load) => {
  return {
    search: {
      load
    },
    type: Search.LOAD
  };
};

/**
 * @param load_status
 * @returns {{search: {load_status: *}, type: string}}
 */
SearchActions.loadStatus = (load_status) => {
  return {
    search: {
      load_status
    },
    type: Search.LOAD_STATUS
  };
};

/**
 * @param search
 * @returns {{search: *, type: string}}
 */
SearchActions.set = (search) => {
  return {
    search,
    type: Search.SET
  };
};

/**
 * @param error
 * @returns {{search: {error: *}, type: string}}
 */
SearchActions.setError = (error) => {
  return {
    search: {
      error
    },
    type: Search.SET_ORDER
  };
};

/**
 * @param order
 * @returns {{search: {order: *}, type: string}}
 */
SearchActions.setOrder = (order) => {
  return {
    search: {
      order
    },
    type: Search.SET_ORDER
  };
};

/**
 * @param orderByDesc
 * @returns {{search: {orderByDesc: *}, type: string}}
 */
SearchActions.setOrderDirection = (orderByDesc) => {
  return {
    search: {
      orderByDesc
    },
    type: Search.SET_ORDER_DIRECTION
  };
};

/**
 * @param page
 * @returns {{search: {page: *}, type: string}}
 */
SearchActions.setPage = (page) => {
  return {
    search: {
      page
    },
    type: Search.SET_PAGE
  };
};

/**
 * @param results
 * @returns {{search: {per_page: *}, type: string}}
 */
SearchActions.setResults = (results) => {
  return {
    search: {
      per_page: results
    },
    type: Search.SET_RESULTS
  };
};

/**
 * @param term
 * @returns {{search: {term: *}, type: string}}
 */
SearchActions.setTerm = (term) => {
  return {
    search: {
      term
    },
    type: Search.SET_TERM
  };
};

/**
 * @param total
 * @returns {{search: {total: *}, type: string}}
 */
SearchActions.setTotal = (total) => {
  return {
    search: {
      total
    },
    type: Search.SET_TOTAL
  };
};

/**
 * @returns {{type: string}}
 */
SearchActions.trigger = () => {
  return {
    type: Search.TRIGGER
  };
};

/**
 * @returns {{type: string}}
 */
SearchActions.untrigger = () => {
  return {
    type: Search.UNTRIGGER
  };
};

export default SearchActions;
