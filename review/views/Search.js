import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import Actions from "review/state/Actions";
import Marvel from "review/core/Marvel";
import AsyncImage from "review/components/general/AsyncImage";
import SearchBox from "review/components/general/SearchBox";
import SearchPagination from "review/components/general/SearchPagination";
import TestCollection from "review/assets/data/TestCollection";

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
    this.searchNavigationCallable = this.searchNavigationCallable.bind(this);
    this.loadHero = this.loadHero.bind(this);
    this.fetchSearchData = this.fetchSearchData.bind(this);
  }

  goGoSearch() {
    let history = (this.props.search.term !== "")
      ? "/search/" + this.props.search.term : "/search";
    console.log(history);
    this.props.history.push(history);

    this.props.loaderShow();
    this.props.searchTrigger();
  }

  searchNavigationCallable() {
    this.props.loaderShow();
    this.props.searchTrigger();
    console.log("AA");
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

  async fetchSearchData(event = null) {
    if (event !== undefined && event !== null && event.preventDefault) {
      event.preventDefault();
    }
    const { props } = this;
    const { match } = props;
    let page = match.params.page || 1;

    let path = Marvel.heroesListQuery(
      props.search.per_page,
      page,
      match.params.term || props.search.term,
      props.search.orderBy,
      props.search.orderByDesc
    );

    try {
      const res = await Marvel.API.get(path);

      props.loaderHide();

      console.log("CCCCCCCCCC");
    } catch (err) {
      let search_object = {
        term: match.params.term || props.search.term,
        children: TestCollection.results,
        total: TestCollection.total,
        current_page: page,
        is_offline: true
      };

      if (this.state) {
        this.setState({
          term: props.search.term,
          has_loaded: true
        });
      }
      console.log("ABBBBBBBBB");

      props.searchSet(search_object);
      props.loaderHide();

      console.error(err);
    }
  }

  componentDidMount() {
    // this.fetchDataFromEndpoint();
    const { props } = this;
    const { search } = props;

    if (search.triggered) {
      console.log("YUES");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.search.triggered) {
      this.props.searchUntrigger();
      this.fetchSearchData();
    }
  }

  render() {
    const { props, state } = this;

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

