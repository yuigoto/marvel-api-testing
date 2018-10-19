import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import SearchBox from "components/general/SearchBox";
import Actions from "state/Actions";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      triggered: false
    };

    this.goGoSearch = this.goGoSearch.bind(this);
  }

  goGoSearch() {
    this.props.history.push("/search");
  }

  componentDidMount() {
    this.props.loaderHide();
    this.props.searchReset();
    this.props.searchTrigger();
  }

  render() {
    return (
      <SearchBox callable={this.goGoSearch}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    search: state.search
  };
};

const mapDispatchToProps = (dispatch) => ({
  loaderHide: () => {
    dispatch(Actions.loader.hideLoader());
  },
  searchReset: () => {
    dispatch(Actions.search.searchClear())
  },
  searchTrigger: () => {
    dispatch(Actions.search.trigger())
  }
});

Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default Home;
