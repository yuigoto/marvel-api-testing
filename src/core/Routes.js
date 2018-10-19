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
  }
];
