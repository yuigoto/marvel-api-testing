/**
 * BOOMERANGOO : Core/Routes
 * ----------------------------------------------------------------------
 * Exports the routes array, to be used by the `BrowserRouter`.
 *
 * @author      Fabio Y. Goto <fabio.goto@boomerangoo.com.br>
 * @since       0.0.1
 */

// Import Views
import Search from "views/Search";
import Home from "views/Home";
import Hero from "views/Hero";

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
  },
  {
    path: "/hero",
    exact: true,
    component: Hero
  },
  {
    path: "/hero/:hero_id(\\d+)",
    exact: true,
    component: Hero
  }
];
