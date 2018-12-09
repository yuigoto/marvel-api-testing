import React, { Component } from "react";
import { connect } from "react-redux";
import Actions from "state/Actions";
import Marvel from "core/Marvel";
import InitialState from "state/InitialState";
import Paginator from "components/base/Paginator";
import SearchBar from "components/search/SearchBar";

class Test extends Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.callableTest = this.callableTest.bind(this);
    this.isLoading = this.isLoading.bind(this);
    this.logState = this.logState.bind(this);
    this.loadHeroes = this.loadHeroes.bind(this);
    this.toggleLoader = this.toggleLoader.bind(this);
    this.searchStatus = this.searchStatus.bind(this);
  }

  // Methods
  // --------------------------------------------------------------------

  callableTest() {
    const { props } = this;
    const { history } = props;

    if (history && history !== undefined) {
      let path = "/search";

      this.props.searchLoad(false);
      this.props.searchStatus(false);

      if (props.search.term !== "") {
        path += "/" + props.search.term;
      }

      history.push(path);
    }
  }

  toggleLoader() {
    this.props.loaderShow();

    setTimeout(() => {
      this.props.loaderHide();
    }, 3000);
  }

  logState() {
    console.log(
      this.props.hero,
      this.props.loader,
      this.props.search
    );
  }

  loadHeroes() {
    let url = Marvel.setSearchQuery(
      10,
      this.props.match.params.page || 1,
      this.props.search.term || this.props.match.params.term || "",
      this.props.search.prderBy,
      this.props.search.orderByDesc
    );

    let get = Marvel.fetchFromUrlOrPath(url);

    this.props.clearChildren();
    this.props.searchLoad(true);
    this.props.searchStatus(false);
    this.props.loaderShow();
    this.props.searchError(false);
    this.props.searchTrigger();

    get
      .then(res => {
        let search = InitialState.search();
        search.children = res.data.data.results;
        search.total = res.data.data.total;

        this.props.searchSet(search);
        this.props.searchLoad(false);
        this.props.searchStatus(true);
        this.props.searchUntrigger();
        this.props.loaderHide();
      })
      .catch(err => {
        console.log(
          "Error loading your request"
        );

        this.props.searchLoad(false);
        this.props.searchError(true);
        this.props.searchStatus(false);
        this.props.searchUntrigger();
        this.props.loaderHide();
      });
  }

  isLoading() {
    const { props } = this;

    if (props.loader.visible) {
      return (
        <div className={"alert alert-primary"}>
          Loader is Visible
        </div>
      );
    }

    return (
      <div className={"alert alert-secondary"}>
        Loader is NOT Visible
      </div>
    );
  }

  searchStatus() {
    const { props } = this;
    const { load, load_status, children, error } = props.search;

    if (load === false && load_status === false && error === true) {
      return (
        <div className={"alert alert-danger"}>
          Could Not Load Data
        </div>
      );
    }

    if (!load_status && !load && children.length < 1) {
      return (
        <div className={"alert alert-warning"}>
          Data not yet loaded
        </div>
      );
    }

    if (
      !load_status && load
    ) {
      return (
        <div className={"alert alert-warning"}>
          Data is Loading
        </div>
      );
    }

    return (
      <div className={"alert alert-primary"}>
        Loaded Data
      </div>
    );
  }

  // React Lifecycle
  // --------------------------------------------------------------------

  componentDidMount() {
    this.loadHeroes();

    console.log("MOUNT");
  }

  componentDidUpdate(prevProps, prevState) {
    const { props } = this;
    const { match } = props;

    console.log("UPDATE");
    console.log(props.match.params.term !== prevProps.match.params.term);

    if (
      match.params.page !== prevProps.match.params.page
      || (
        props.match.params.term !== prevProps.match.params.term
      )
    ) {
      console.log("TRIGGER");
      this.loadHeroes();
    }
  }

  render() {
    const { props } = this;
    const { match } = props;

    // Get page
    let link = "/search/";
    if (match.params.term !== undefined && match.params.term !== "") {
      link += match.params.term + "/";
    }

    return (
      <div className={"container py-4"}>
        <SearchBar callable={this.callableTest}/>

        <hr/>

        <div className={"btn-group btn-group-sm"}>
          <button className={"btn btn-success"} onClick={this.loadHeroes}>
            Load Heroes
          </button>

          <hr/>

          <button className={"btn btn-default"} onClick={this.toggleLoader}>
            Toggle Loader
          </button>
          <button className={"btn btn-dark"} onClick={this.logState}>
            Log All
          </button>
        </div>

        <hr/>

        {this.isLoading()}

        <hr/>

        {this.searchStatus()}

        <hr/>

        <Paginator
          baseUrl={link}
          currentPage={parseInt(match.params.page) || 1}
          total={props.search.total || 1}
          per_page={10}/>

        <hr/>

        {(() => {
          if (this.props.search.children.length > 0) {
            return this.props.search.children.map((item, index) => {
              return (
                <span className={"badge badge-success"} key={index}>
                    {item.name}
                  </span>
              );
            });
          }
        })()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hero: state.hero,
  loader: state.loader,
  search: state.search
});

const mapDispatchToProps = (dispatch) => ({
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
  searchTrigger: () => {
    dispatch(Actions.search.trigger());
  },
  searchUntrigger: () => {
    dispatch(Actions.search.untrigger());
  },
  loaderHide: () => {
    dispatch(Actions.loader.hide());
  },
  loaderShow: () => {
    dispatch(Actions.loader.show());
  }
});

Test = connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);

export default Test;
