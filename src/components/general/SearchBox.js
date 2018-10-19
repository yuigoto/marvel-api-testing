import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

import search_module from "scss/search.module.scss";
import Actions from "state/Actions";

class SearchBox extends Component {
  /**
   * Constructor.
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {};

    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmitThisForm = this.onSubmitThisForm.bind(this);
  }

  onChangeInput(evt) {
    const { props } = this;
    const { currentTarget } = evt;

    props.searchSetTerm(currentTarget.value);
  }

  onSubmitThisForm(evt) {
    evt.preventDefault();

    if (this.props.callable) this.props.callable();
  }

  render() {
    const { props } = this;

    return (
      <div className={classnames("container py-5", props.className)}>
        <h4 className="w-75 m-auto display-5 px-5 d-none d-lg-block text-center">
          Type your hero's full name or just a part of it then <strong>Go Go Heroes! <i className={"fa fa-fist"}/></strong>
        </h4>
        <form
          className={classnames(search_module["mm-search"], "py-4")}
          onSubmit={this.onSubmitThisForm}>
          <div className={classnames(search_module["mm-search__input-wrap"])}>
            <input
              type="text"
              value={props.term}
              onChange={this.onChangeInput}
              className={classnames(search_module["mm-search__input"])}
              placeholder={"My hero is..."}/>
            <span/>
          </div>
          <button
            type="submit"
            className={classnames(search_module["mm-search__btn"])}>
            <span className="fas fa-bolt"/>&nbsp;&nbsp;Shazam!
          </button>
        </form>
      </div>
    );
  }
}

// Set default props
SearchBox.defaultProps = {
  callable: null
};

// Validation
SearchBox.propTypes = {
  callable: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    term: state.search.term
  };
};

const mapDispatchToProps = (dispatch) => ({
  searchSetTerm: (term) => {
    dispatch(Actions.search.setTerm(term))
  }
});

// Connects to react-redux
SearchBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox);

export default SearchBox;
