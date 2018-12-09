import React, { Component } from "react";
import Actions from "state/Actions";
import connect from "react-redux/es/connect/connect";
import SearchBar from "components/search/SearchBar";

class Home extends Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.searchCallable = this.searchCallable.bind(this);
  }

  // Methods
  // --------------------------------------------------------------------

  searchCallable(term) {
    const { props } = this;
    const { history } = props;

    if (history && history !== undefined) {
      let path = "/search";

      props.searchTrigger();
      props.clearChildren(false);
      props.searchLoad(false);
      props.searchStatus(false);

      if (term !== "") {
        path += "/" + term;
      }

      history.push(path);
    }
  }

  // React Lifecycle
  // --------------------------------------------------------------------

  render() {
    return (
      <SearchBar callable={this.searchCallable}/>
    );
  }
}

const mapStateToProps = (state) => ({
  hero: state.hero,
  loader: state.loader,
  search: state.search
});

const mapDispatchToProps = (dispatch) => ({
  clearChildren: () => {
    dispatch(Actions.search.clearHeroes());
  },
  searchLoad: (load) => {
    dispatch(Actions.search.load(load));
  },
  searchTrigger: () => {
    dispatch(Actions.search.trigger());
  },
  searchUntrigger: () => {
    dispatch(Actions.search.untrigger());
  },
  searchStatus: (status) => {
    dispatch(Actions.search.loadStatus(status));
  }
});

Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default Home;
