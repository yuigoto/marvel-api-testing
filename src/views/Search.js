import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import Actions from "state/Actions";
import Marvel from "core/Marvel";
import AsyncImage from "components/general/AsyncImage";
import SearchBox from "components/general/SearchBox";
import SearchPagination from "components/general/SearchPagination";
import TestCollection from "assets/data/TestCollection";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      has_loaded: false,
      term: this.props.match.params.term,
      page: 1
    };

    this.displaySearchResults = this.displaySearchResults.bind(this);
    this.goGoSearch = this.goGoSearch.bind(this);
    this.fetchDataFromEndpoint = this.fetchDataFromEndpoint.bind(this);
    this.searchNavigationCallable = this.searchNavigationCallable.bind(this);
    this.loadHero = this.loadHero.bind(this);
  }

  goGoSearch() {
    let history = (this.props.search.term !== "")
      ? "/search/" + this.props.search.term : "/search";
    this.props.history.push(history);

    this.props.loaderShow();
    this.props.searchTrigger();
  }

  searchNavigationCallable() {
    this.props.loaderShow();
    this.props.searchTrigger();
  }

  loadHero(hero_id) {
    return () => {
      this.props.loaderShow();

      let url = Marvel.singleHeroQuery(hero_id);

      this.props.clearHero();
      this.props.clearComics();
      this.props.clearEvents();
      this.props.clearSeries();
      this.props.clearStories();

      axios
        .get(
          url,
          {},
          {
            headers: {
              "Content-type": "application/json"
            }
          }
        ).then(
        res => {
          const { data } = res.data;

          this.props.heroSet(data.results[0]);
          this.props.loaderHide();
          this.props.history.push("/hero/" + hero_id);
        }
      ).catch(
        err => {
          this.props.loaderHide();
        }
      );
    };
  }

  displaySearchResults() {
    const { search } = this.props;

    if (search.children.length > 0) {
      return (
        search.children.map((item, index) => {
          return (
            <div className={"col-12 col-sm-6 col-md-4 mb-4"} key={index + Date.now()}>
              <Link
                to={"/hero/" + item.id}
                className={"mm-list-link"}
                onClick={this.loadHero(item.id)}>
                <div className="w-50 m-auto">
                  <AsyncImage id={item.id + Date.now()} source={item.thumbnail.path + "." + item.thumbnail.extension}/>
                </div>
                <h4 className={"text-center py-2"}>{item.name}</h4>
              </Link>
            </div>
          );
        })
      );
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

  fetchDataFromEndpoint() {
    const { props } = this;
    const { match, location, history } = props;
    let page = match.params.page || 1;

    props.searchUntrigger();

    if (!props.loader.visible) {
      props.loaderShow();
    }

    this.setState({
      has_loaded: false,
      page: page,
      term: match.params.term || ""
    });

    let path = Marvel.heroesListQuery(
      props.search.per_page,
      page,
      match.params.term || props.search.term,
      props.search.orderBy,
      props.search.orderByDesc
    );

    axios
      .get(
        path,
        {},
        {
          headers: {
            "Content-type": "application/json"
          }
        }
      ).then(
      res => {
        const { data } = res.data;

        let search_object = {
          term: match.params.term || props.search.term,
          children: data.results,
          total: data.total,
          current_page: page,
          is_offline: false
        };

        let top = document.getElementById("main");
        top.scrollTo(0, 0);

        this.setState({
          term: props.search.term,
          has_loaded: true
        });

        props.searchSet(search_object);
        props.loaderHide();
      }
    ).catch(
      err => {
        let search_object = {
          term: match.params.term || props.search.term,
          children: TestCollection.results,
          total: TestCollection.total,
          current_page: page,
          is_offline: true
        };

        this.setState({
          term: props.search.term,
          has_loaded: true
        });

        props.searchSet(search_object);
        props.loaderHide();
      }
    );
  }

  componentDidMount() {
    this.fetchDataFromEndpoint();
  }

  componentDidUpdate(prevProps, prevState) {

    console.log("-------------------------------------------------------------------------------------");
    let prevPage = parseInt(this.state.page);
    let currPage = (this.props.match.params.page)
      ? parseInt(this.props.match.params.page) : 1;
    let prevTerm = this.state.term;
    let currTerm = (this.props.match.params.term)
      ? this.props.match.params.term : "";

      if (
        (prevPage !== currPage || prevTerm !== currTerm)
        || this.props.search.triggered
      ) {
        this.fetchDataFromEndpoint();
      }
  }

  render() {
    const { props, state } = this;
    const { match, location } = props;

    if (state.has_loaded === false) {
      return (
        <div>
          <SearchBox callable={this.goGoSearch}/>
          <div className="container">
            <hr/>
          </div>
          <div className={"container py-5"}>
            <h1 className="text-center">
              Loading...
            </h1>
          </div>
        </div>
      );
    }

    return (
      <div>
        <SearchBox callable={this.goGoSearch}/>
        <div className="container">
          <hr/>
        </div>
        <div className={"container py-5"}>
          {(() => {
            if (props.search.children.length > 0) {
              if (state.term !== "") {
                return (
                  <h4 className="display-4 text-center mb-5">
                    Displaying results for <strong><em>{state.term}</em></strong>
                  </h4>
                );
              } else {
                return (
                  <h4 className="display-4 text-center mb-5">
                    Displaying search results
                  </h4>
                );
              }
            }
          })()}
          <div className="row">
            {this.displaySearchResults()}
          </div>

          <SearchPagination
            current={parseInt(props.search.current_page) || 1}
            term={props.search.term || ""}
            per_page={parseInt(props.search.per_page) || 12}
            total={parseInt(props.search.total) || 0}
            callable={this.searchNavigationCallable}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loader: state.loader,
    search: state.search
  };
};

const mapDispatchToProps = (dispatch) => ({
  clearHero: () => {
    dispatch(Actions.hero.clearHero());
  },
  clearComics: () => {
    dispatch(Actions.hero.clearHeroComics());
  },
  clearSeries: () => {
    dispatch(Actions.hero.clearHeroSeries());
  },
  clearEvents: () => {
    dispatch(Actions.hero.clearHeroEvents());
  },
  clearStories: () => {
    dispatch(Actions.hero.clearHeroStories());
  },
  loaderShow: () => {
    dispatch(Actions.loader.showLoader());
  },
  loaderHide: () => {
    dispatch(Actions.loader.hideLoader());
  },
  searchSet: (search) => {
    dispatch(Actions.search.setSearch(search))
  },
  searchTrigger: () => {
    dispatch(Actions.search.trigger())
  },
  heroSet: (hero) => {
    dispatch(Actions.hero.setHero(hero));
  },
  searchUntrigger: () => {
    dispatch(Actions.search.untrigger())
  }
});

Search = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

export default Search;

