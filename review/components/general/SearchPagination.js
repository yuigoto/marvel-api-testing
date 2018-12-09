import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { NavLink } from "react-router-dom";

/***
 * Components/General/SearchReducer
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
class SearchPagination extends Component {
  constructor(props) {
    super(props);

    this.renderPaginationLinks = this.renderPaginationLinks.bind(this);
  }

  renderPaginationLinks() {
    const { props } = this;

    let term = props.term || "";
    let page = parseInt(props.current);
    let total = parseInt(props.total);
    let total_pages = Math.ceil(total / props.per_page);
    let range = 4;
    let ceil = Math.ceil(range / 2);
    let min, max, list;

    // Define range min/max
    if (total_pages > range) {
      if (page <= ceil) {
        min = 1;
        max = range + 1;
      } else if (page >= (total_pages - ceil)) {
        min = total_pages - range;
        max = total_pages;
      } else {
        min = page - ceil;
        max = page + ceil;
      }
    } else {
      min = 1;
      max = total_pages;
    }

    list = [];

    for (let i = min; i <= max; i++) {
      let active = (page === i);
      let path = "/search/";
      if (term !== "") path += term + "/";
      path += "page/" + i;

      list.push(
        <li className={classnames("page-item",{"active": active})} key={i}>
          <NavLink
            exact
            to={path}
            className={"page-link"}
            onClick={props.callable}>
            {i}
          </NavLink>
        </li>
      );
    }

    return list;
  }

  render() {
    return (
      <nav className={"mm-pagination"}>
        <ul className="pagination justify-content-center pagination-lg">
          {this.renderPaginationLinks()}
        </ul>
      </nav>
    );
  }
}

SearchPagination.propTypes = {
  term: PropTypes.string,
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  per_page: PropTypes.number.isRequired,
  callable: PropTypes.func.isRequired
};

export default SearchPagination;
