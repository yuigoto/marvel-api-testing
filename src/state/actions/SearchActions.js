import { Search } from "state/Types";

/**
 * State/Actions/SearchActions
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
const SearchActions = {};

SearchActions.searchClear = () => {
  return {
    search: {
      term: "",
      orderBy: "name",
      orderByDesc: false,
      children: [],
      total: null,
      per_page: 12,
      current_page: 1
    },
    type: Search.SEARCH_CLEAR
  }
};

SearchActions.searchClearHeroes = () => {
  return {
    search: {
      children: []
    },
    type: Search.SEARCH_HEROES_CLEAR
  };
};

SearchActions.searchLoadHeroes = (heroes) => {
  return {
    search: {
      children: heroes
    },
    type: Search.SEARCH_HEROES_CLEAR
  }
};

SearchActions.setOrder = (order) => {
  return {
    search: {
      order: order
    },
    type: Search.SET_ORDER
  };
};

SearchActions.setOrderByDesc = (orderByDesc) => {
  return {
    search: {
      orderByDesc: orderByDesc
    },
    type: Search.SET_ORDER_BY_DESC
  };
};

SearchActions.setPage = (page) => {
  return {
    search: {
      current_page: page
    },
    type: Search.SET_PAGE
  };
};

SearchActions.setResults = (results) => {
  return {
    search: {
      per_page: results
    },
    type: Search.SET_RESULTS
  };
};

SearchActions.setSearch = (search) => {
  return {
    search,
    type: Search.SET_SEARCH
  };
};

SearchActions.setTerm = (term) => {
  return {
    search: {
      term: term
    },
    type: Search.SET_TERM
  };
};

SearchActions.setTotal = (total) => {
  return {
    search: {
      total: total
    },
    type: Search.SET_TOTAL
  };
};

SearchActions.trigger = () => {
  return {
    search: {
      triggered: true
    },
    type: Search.TRIGGER
  };
};

SearchActions.untrigger = () => {
  return {
    search: {
      triggered: false
    },
    type: Search.UNTRIGGER
  };
};

export default SearchActions;
