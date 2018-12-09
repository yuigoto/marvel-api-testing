import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

import Actions from "state/Actions";
import search_module from "scss/search.module.scss";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ""
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  // Methods
  // --------------------------------------------------------------------

  onInputChange(event) {
    const { props } = this;
    const { currentTarget } = event;

    if ( currentTarget !== undefined && currentTarget.value ) {
      props.searchSetTerm(currentTarget.value);
      this.setState({
        term: currentTarget.value
      });
    }
  }

  onSubmitForm(event) {
    const { props } = this;

    event.preventDefault();

    this.props.clearChildren();
    this.props.searchLoad(true);
    this.props.searchStatus(false);
    this.props.loaderShow();
    this.props.searchError(false);

    if (props.callable && typeof(props.callable) === "function") {
      this.props.callable(this.state.term);
    }
  }

  // React Lifecycle
  // --------------------------------------------------------------------

  render() {
    const { props } = this;

    let _cls = ["container", "py-5"];
    if (props.className) _cls.push(props.className);

    return (
      <div className={classnames(_cls)}>
        <h4 className={"w-75 m-auto display-6 px-5 text-center"}>
          Type your hero's full name or just a part of it then <strong>Go Go Heroes! <i className={"fa fa-fist"}/></strong>
        </h4>

        <form
          className={classnames(search_module["mm-search"], "py-4")}
          onSubmit={this.onSubmitForm}>
          <div className={classnames(search_module["mm-search__input-wrap"])}>
            <input
              type="text"
              onChange={this.onInputChange}
              className={classnames(search_module["mm-search__input"])}
              placeholder={"Your hero name..."}/>
            <span/>
          </div>
          <button
            type={"submit"}
            className={search_module["mm-search__btn"]}>
            <span className={"fas fa-bolt"}/>&nbsp;&nbsp;Shazam!
          </button>
        </form>
      </div>
    );
  }
}


SearchBar.defaultProps = {
  callable: null
};

SearchBar.propTypes = {
  callable: PropTypes.func
};

const mapStatetoProps = (state) => {
  return {
    search: state.search
  };
};

const mapDispatchToProps = (dispatch) => ({
  searchSetTerm: (term) => {
    dispatch(Actions.search.setTerm(term));
  },
  searchSet: (search) => {
    dispatch(Actions.search.set(search));
  },
  clearChildren: () => {
    dispatch(Actions.search.clearHeroes());
  },
  searchResults: (per_page) => {
    dispatch(Actions.search.setResults(per_page));
  },
  searchError: (error) => {
    dispatch(Actions.search.setError(error));
  },
  searchLoad: (load) => {
    dispatch(Actions.search.load(load));
  },
  searchStatus: (status) => {
    dispatch(Actions.search.loadStatus(status));
  },
  searchTerm: (term) => {
    dispatch(Actions.search.setTerm(term));
  },
  loaderHide: () => {
    dispatch(Actions.loader.hide());
  },
  loaderShow: () => {
    dispatch(Actions.loader.show());
  }
});

SearchBar = connect(
  mapStatetoProps,
  mapDispatchToProps
)(SearchBar);

export default SearchBar;
