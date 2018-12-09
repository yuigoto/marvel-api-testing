import React, { Component } from "react";
import SearchBar from "components/search/SearchBar";
import Actions from "state/Actions";
import connect from "react-redux/es/connect/connect";
import Marvel from "core/Marvel";
import InitialState from "state/InitialState";
import { AsyncImage } from "@yuigoto/async-image";
import Paginator from "components/base/Paginator";
import { Link } from "react-router-dom";

class Search extends Component {
  constructor(props) {
    super(props);

    this.displaySearchResults = this.displaySearchResults.bind(this);
    this.displaySearchTitle = this.displaySearchTitle.bind(this);
    this.loadHeroes = this.loadHeroes.bind(this);
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

  loadHeroes() {
    const { props } = this;

    let url = Marvel.setSearchQuery(
      10,
      props.match.params.page || 1,
      props.search.term || props.match.params.term || "",
      props.search.prderBy,
      props.search.orderByDesc
    );

    let get = Marvel.fetchFromUrlOrPath(url);

    props.clearChildren();
    props.searchLoad(true);
    props.searchStatus(false);
    props.loaderShow();
    props.searchError(false);

    get
      .then(res => {
        let search = InitialState.search();
        search.term = props.match.params.term;
        search.children = res.data.data.results;
        search.page = props.match.params.page || 1;
        search.total = res.data.data.total;

        props.searchSet(search);
        props.searchLoad(false);
        props.searchStatus(true);
        props.searchUntrigger();
        props.loaderHide();
      })
      .catch(err => {
        console.log(
          "Error loading your request"
        );

        props.searchLoad(false);
        props.searchError(true);
        props.searchStatus(false);
        props.searchUntrigger();
        props.loaderHide();
      });
  }

  displaySearchTitle() {
    const { props } = this;

    if (props.search.children.length > 0) {
      if (props.search.term !== "" && props.search.term !== undefined) {
        return (
          <h4 className={"display-4 text-center mb-5"}>
            Displaying results for <strong><em>{props.search.term}</em></strong>
          </h4>
        );
      } else {
        return (
          <div className={"mb-5"}>
            <h4 className={"display-4 text-center"}>
              Just displaying search results
            </h4>
            <p className="text-center text-muted even-more font-weight-bold">
              (Could not decide on a search term, huh?)
            </p>
          </div>
        );
      }
    }
  }

  displaySearchResults() {
    const { search } = this.props;

    if (search.children.length > 0) {
      return search.children.map((item, index) => {
        return (
          <div className={"col-12 col-sm-6 col-md-4 mb-4"} key={index + Date.now()}>
            <Link
              to={"/hero/" + item.id}
              className={"mm-list-link"}>
              <div className="w-50 m-auto">
                <AsyncImage
                  id={item.id + Date.now()}
                  src={item.thumbnail.path + "." + item.thumbnail.extension}
                  className={"async-image"}
                  imageClass={"async-image-item"}
                  loaderClass={"async-image-loading"}
                  placeholderClass={"async-image-placeholder"}/>
              </div>
              <h4 className={"text-center py-2"}>{item.name}</h4>
            </Link>
          </div>
        );
      })
    }

    return (
      <div className={"col-12"}>
        <h1 className={"display-2 text-muted text-center"}>
          No (More) Heroes! <span role={"img"} aria-label={"Crying"}>😭</span>
        </h1>
        <p className={"lead text-muted text-center"}>
          Or maybe they're hiding somewhere, who knows? Did you try Wakanda?
        </p>
      </div>
    );
  }

  // React Lifecycle
  // --------------------------------------------------------------------

  componentDidMount() {
    this.loadHeroes();
  }

  componentDidUpdate(prevProps, prevState) {
    const { props } = this;
    const { match } = props;

    if (
      match.params.page !== prevProps.match.params.page
      || (
        props.match.params.term !== prevProps.match.params.term
      )
      || (
        props.search.triggered
        && !props.search.load
      )
    ) {
      this.loadHeroes();
    }
  }

  render() {
    const { props } = this;
    const { match } = props;

    // Get page URI
    let link = "/search/";
    if (match.params.term !== undefined && match.params.term !== "") {
      link += match.params.term + "/";
    }

    return (
      <div>
        <SearchBar callable={this.searchCallable}/>
        <div className="container">
          <hr/>
        </div>
        <div className="container py-5">
          {this.displaySearchTitle()}

          <div className="row">
            {this.displaySearchResults()}
          </div>

          <Paginator
            baseUrl={link}
            currentPage={parseInt(match.params.page) || 1}
            total={props.search.total || 1}
            per_page={10}/>
        </div>
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
  searchTerm: (term) => {
    dispatch(Actions.search.setTerm(term));
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

Search = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

export default Search;