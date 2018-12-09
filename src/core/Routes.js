/**
 * Core/Routes
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
import Home from "views/Home";
import Search from "views/Search";

export default [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/search",
    exact: true,
    component: Search
  },
  {
    path: "/search/page/:page(\\d+)",
    exact: true,
    component: Search
  },
  {
    path: "/search/:term",
    exact: true,
    component: Search
  },
  {
    path: "/search/:term/page/:page(\\d+)",
    exact: true,
    component: Search
  }
];
