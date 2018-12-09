import { createStore } from "redux";

import Reducers from "review/state/Reducers";

/**
 * State/Store
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */

// Initial store state
const initialState = {
  hero: {
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
  },
  loader: {
    visible: false
  },
  search: {
    term: "",
    orderBy: "name",
    orderByDesc: false,
    children: [],
    total: null,
    per_page: 12,
    current_page: 1,
    triggered: true
  }
};

// Store
const Store = createStore(
  Reducers,
  initialState
);

export default Store;
