import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Actions from "review/state/Actions";
import Marvel from "review/core/Marvel";
import TestCollection from "review/assets/data/TestCollection";
import SearchBox from "review/components/general/SearchBox";
import SearchPagination from "review/components/general/SearchPagination";
import AsyncImage from "review/components/general/AsyncImage";
import axios from "axios";

class SearchView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      has_loaded: false,
      term: this.props.match.params.term,
      page: 1
    };

    this.fetchData = this.fetchData.bind(this);
    this.displaySearchResults = this.displaySearchResults.bind(this);
    this.loadHero = this.loadHero.bind(this);
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

  async fetchData() {
    const { props } = this;
    const { match } = props;
    let page = match.params.page || 1;

    this.setState({
      page: parseInt(props.match.params.term),
      term: props.match.params.term
    });

    if (this.props.search.triggered) {
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

        props.searchSet(search_object);
        props.loaderHide();

        console.error(err);
      }
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps.match);
    console.log(this.props.match);

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

SearchView = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchView);

export default SearchView;