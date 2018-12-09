/**
 * BOOMERANGOO : Core/Routes
 * ----------------------------------------------------------------------
 * Exports the routes array, to be used by the `BrowserRouter`.
 *
 * @author      Fabio Y. Goto <fabio.goto@boomerangoo.com.br>
 * @since       0.0.1
 */

// Import Views
import Search from "review/views/Search";
import Home from "review/views/Home";
import Hero from "review/views/Hero";
import SearchView from "review/views/SearchView";

// Export the routes
export default [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/search",
    exact: true,
    component: SearchView
  },
  {
    path: "/search/page/:page(\\d+)",
    exact: true,
    component: SearchView
  },
  {
    path: "/search/:term",
    exact: true,
    component: SearchView
  },
  {
    path: "/search/:term/page/:page(\\d+)",
    exact: true,
    component: SearchView
  },
  {
    path: "/hero",
    exact: true,
    component: Hero
  },
  /*
  {
    path: "/hero/:hero_id(\\d+)",
    exact: true,
    component: Hero
  }
  */
];
