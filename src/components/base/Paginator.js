import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import classnames from "classnames";

import elements_module from "scss/elements.module.scss";

class Paginator extends Component {
  constructor(props) {
    super(props);

    this.renderPaginationLinks = this.renderPaginationLinks.bind(this);
  }

  renderPaginationLinks() {
    const { props } = this;

    // Set base values
    let link = props.baseUrl;
    if (link.match(/\/$/g) === null) link += "/";
    let page = parseInt(props.currentPage);
    let pages = Math.ceil(props.total / props.per_page);
    let range = (parseInt(props.range) > 0) ? parseInt(props.range) : 4;
    let ceil = Math.ceil(range / 2);
    let min, max, list;

    if (pages > range) {
      if (page <= ceil) {
        min = 1;
        max = range + 1;
      } else if (page >= (pages - ceil)) {
        min = pages - range;
        max = pages;
      } else {
        min = page - ceil;
        max = page + ceil;
      }
    } else {
      min = 1;
      max = pages;
    }

    list = [];

    // First Page
    {
      let path = link;
      let disabled = (page < 2);

      list.push(
        <li
          key={"first-page"}
          className={
            classnames(
              "page-item", elements_module["page-item"], {disabled: disabled}
              )
          }>
          {(() => {
            if (page > 1) {
              return (
                <Link
                  to={path}
                  className={
                    classnames("page-link", elements_module["page-link"])
                  }
                  onClick={props.callable || (() => { console.log(false); })}>
                  <i className="fa fa-angle-double-left"/>
                </Link>
              );
            } else {
              return (
                <span
                  className={
                    classnames("page-link", elements_module["page-link"])
                  }
                  aria-disabled={true}>
                  <i className="fa fa-angle-double-left"/>
                </span>
              );
            }
          })()}
        </li>
      );
    }

    // Previous Page
    {
      let path = (page > 2) ? link + "page/" + (page - 1) : link;
      let disabled = (page < 2);

      list.push(
        <li
          key={"prev-page"}
          className={
            classnames(
              "page-item", elements_module["page-item"], {disabled: disabled}
            )
          }>
          {(() => {
            if (page > 1) {
              return (
                <Link
                  to={path}
                  className={
                    classnames("page-link", elements_module["page-link"])
                  }
                  onClick={props.callable || (() => { console.log(false); })}>
                  <i className="fa fa-angle-left"></i>
                </Link>
              );
            } else {
              return (
                <span
                  className={
                    classnames("page-link", elements_module["page-link"])
                  }
                  aria-disabled={true}>
                  <i className="fa fa-angle-left"></i>
                </span>
              );
            }
          })()}
        </li>
      );
    }

    // Numeric Pagination
    for (let i = min; i <= max; i++) {
      let path = (i > 1) ? link + "page/" + i : link;
      let _cls = [elements_module["page-item"]];
      if (page === i) {
        _cls.push(elements_module.active);
      }

      list.push(
        <li
          className={
            classnames(
              "page-item d-none d-md-block",
              _cls
            )
          }
          key={i}>
          <Link
            to={path}
            className={
              classnames("page-link", elements_module["page-link"])
            }
            onClick={props.callable || (() => { console.log(false); })}>
            {i}
          </Link>
        </li>
      );
    }

    list.push(
      <li
        key={"current-page"}
        className={
          classnames(
            "page-item d-block d-md-none",
            elements_module["page-item"],
            elements_module.active
          )
        }>
        <span className={classnames("page-link", elements_module["page-link"])}>
          {page}
        </span>
      </li>
    );

    // Next Page
    {
      let path = link + "page/" + (page + 1);
      let disabled = (page === pages);

      list.push(
        <li
          key={"next-page"}
          className={
            classnames(
              "page-item", elements_module["page-item"], {disabled: disabled}
            )
          }>
          {(() => {
            if (page < pages) {
              return (
                <Link
                  to={path}
                  className={
                    classnames("page-link", elements_module["page-link"])
                  }
                  onClick={props.callable || (() => { console.log(false); })}>
                  <i className="fa fa-angle-right"></i>
                </Link>
              );
            } else {
              return (
                <span
                  className={
                    classnames("page-link", elements_module["page-link"])
                  }
                  aria-disabled={true}>
                  <i className="fa fa-angle-right"></i>
                </span>
              );
            }
          })()}
        </li>
      );
    }

    // Last Page
    {
      let path = link + "page/" + pages;
      let disabled = (page === pages);

      list.push(
        <li
          key={"last-page"}
          className={
            classnames(
              "page-item", elements_module["page-item"], {disabled: disabled}
            )
          }>
          {(() => {
            if (page < pages) {
              return (
                <Link
                  to={path}
                  className={
                    classnames("page-link", elements_module["page-link"])
                  }
                  onClick={props.callable || (() => { console.log(false); })}>
                  <i className="fa fa-angle-double-right"></i>
                </Link>
              );
            } else {
              return (
                <span
                  className={
                    classnames("page-link", elements_module["page-link"])
                  }
                  aria-disabled={true}>
                  <i className="fa fa-angle-double-right"></i>
                </span>
              );
            }
          })()}
        </li>
      );
    }

    return list;
  }

  render() {
    const { props } = this;

    // Set base values=
    let pages = Math.ceil(props.total / props.per_page);
    if (pages < 2) return null;

    if (props.currentPage > pages) {
      let link = props.baseUrl;
      if (link.match(/\/$/g) === null) {
        link += "/page/" + pages;
      } else {
        link += "page/" + pages;
      }

      return (
        <Redirect to={link}/>
      );
    }

    return (
      <nav className={elements_module["mm-pagination"]}>
        <ul className={"pagination pagination-lg justify-content-center"}>
          {this.renderPaginationLinks()}
        </ul>
      </nav>
    );
  }
}

Paginator.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  per_page: PropTypes.number.isRequired,
  callable: PropTypes.func,
  range: PropTypes.number
};

export default Paginator;
