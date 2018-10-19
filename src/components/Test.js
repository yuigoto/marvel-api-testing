import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import axios from "axios";

import Actions from "state/Actions";

import TestHero from "assets/data/TestHero";
import Marvel from "core/Marvel";
import HeroProfile from "components/hero/HeroProfile";
import AsyncImage from "components/general/AsyncImage";

// Component class
class Test extends Component {
  // Properties
  // --------------------------------------------------------------------

  /**
   * Component mounted status.
   *
   * @type {boolean}
   * @private
   */
  _mounted = false;

  // Constructor
  // -------------------------------------------------------------------

  /**
   * Constructor.
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {};

    // Method binding
    this.classNames = this.classNames.bind(this);
    this.componentIsMounted = this.componentIsMounted.bind(this);
    this.searchLoadPage1 = this.searchLoadPage1.bind(this);
    this.searchLoadPage10 = this.searchLoadPage10.bind(this);
    this.displaySearchResults = this.displaySearchResults.bind(this);
    this.searchSetTerm = this.searchSetTerm.bind(this);
    this.searchDoSearch = this.searchDoSearch.bind(this);
  }

  // Methods
  // --------------------------------------------------------------------

  /**
   * Returns the component's classes, use it to join classes from received
   * props with a default one.
   *
   * @returns {string}
   */
  classNames() {
    const { props } = this;
    return classnames(
      "default-class",
      props.className
    );
  }

  /**
   * Returns the component's mounted status.
   *
   * @returns {boolean}
   */
  componentIsMounted() {
    return this._mounted;
  }

  searchLoadPage1() {
    const { props } = this;
    const { search } = props;

    let path = Marvel.heroesListQuery(
      search.per_page,
      1,
      search.term,
      search.orderBy,
      search.orderByDesc
    );

    props.loaderShow();

    axios.get(
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
          children: data.results,
          total: data.total,
          current_page: 10
        };

        props.searchSet(search_object);

        props.loaderHide();
      }
    ).catch(
      err => {
      }
    );
  }

  searchLoadPage10() {
    const { props } = this;
    const { search } = props;

    let path = Marvel.heroesListQuery(
      search.per_page,
      10,
      search.term,
      search.orderBy,
      search.orderByDesc
    );

    props.loaderShow();

    axios.get(
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
          children: data.results,
          total: data.total,
          current_page: 10
        };

        props.searchSet(search_object);

        props.loaderHide();
      }
    ).catch(
      err => {
      }
    );
  }

  displaySearchResults() {
    const { search } = this.props;

    if (search.children.length > 0) {
      return (
        search.children.map((item, index) => {
          return (
            <div key={index}>
              <h4>{item.name}</h4>
              <div className={"w-25"}>
                <AsyncImage source={item.thumbnail.path + "." + item.thumbnail.extension}/>
              </div>
            </div>
          );
        })
      );
    }

    return null;
  }

  searchSetTerm(evt) {
    const { props } = this;

    props.searchSetTerm(evt.currentTarget.value);
  }

  searchDoSearch() {
    const { props } = this;
    const { search } = props;

    let path = Marvel.heroesListQuery(
      search.per_page,
      1,
      search.term,
      search.orderBy,
      search.orderByDesc
    );

    props.loaderShow();

    axios.get(
      path,
      {},
      {
        headers: {
          "Content-type": "application/json"
        }
      }
    ).then(
      res => {
        console.log(res);

        const { data } = res.data;
        console.log(data);

        let search_object = {
          children: data.results,
          total: data.total,
          current_page: 10
        };

        props.searchSet(search_object);

        props.loaderHide();
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }

  // Lifecycle Methods
  // --------------------------------------------------------------------

  /**
   * Renders the component.
   */
  render() {
    const { props, state } = this;

    // If the component is navigation-aware, comment if not needed
    const { match, location, history } = props;

    return (
      <div className={this.classNames()}>
        <button onClick={(() => {
          props.clearHeroComics();
        })}>
          Clear Comics
        </button>
        <button onClick={(() => {

          console.log(props.hero.data.comics);
          props.setHeroComics({
            children: props.hero.data.comics.children,
            available: props.hero.data.comics.available,
            page: props.hero.data.comics.page
          });
        })}>
          Set Comics
        </button>

        <hr/>

        <input type={"text"} name={"term"} onChange={this.searchSetTerm}/>
        <input type="submit" onClick={this.searchDoSearch}/>

        <hr/>

        <HeroProfile/>

        <hr/>

        <button onClick={this.searchLoadPage1}>
          Fetch Heroes (page 1)
        </button>

        <button onClick={this.searchLoadPage10}>
          Fetch Heroes (page 10)
        </button>

        <hr/>

        <button onClick={props.heroClear}>
          Apagar Hero
        </button>

        <button
          onClick={(() => {
            props.heroSet(TestHero)
          })}>
          Definir Hero
        </button>

        <hr/>

        <button onClick={props.loaderShow}>
          Exibir Loader
        </button>

        <button onClick={props.loaderHide}>
          Ocultar Loader
        </button>
      </div>
    );
  }
}

// Prop validation
// ----------------------------------------------------------------------

// Set default props
Test.defaultProps = {
  className: ""
};

// Validation
Test.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
};

// Redux
// ----------------------------------------------------------------------

/**
 * Maps Redux's state to component props.
 *
 * @param {Object} state
 * @returns {Object}
 */
const mapStateToProps = (state) => {
  console.log(state);

  return {
    term: state.search.term,
    orderBy: state.search.orderBy,
    orderByDesc: state.search.orderByDesc,
    children: state.search.children,
    total: state.search.total,
    per_page: state.search.per_page,
    current_page: state.search.current_page,
    hero: state.hero,
    search: state.search
  };
};

/**
 * Maps Redux's dispatch method to props.
 *
 * @param {function} dispatch
 * @returns {Object}
 */
const mapDispatchToProps = (dispatch) => ({
  searchSet: (search) => {
    dispatch(Actions.search.setSearch(search))
  },
  searchSetTerm: (term) => {
    dispatch(Actions.search.setTerm(term))
  },
  heroClear: () => {
    dispatch(Actions.hero.clearHero());
  },
  heroSet: (hero) => {
    dispatch(Actions.hero.setHero(hero));
  },

  loaderShow: () => {
    dispatch(Actions.loader.showLoader());
  },
  loaderHide: () => {
    dispatch(Actions.loader.hideLoader());
  },
  setHeroComics: (comics) => {
    dispatch(Actions.hero.setHeroComics(comics))
  },
  clearHeroComics: () => {
    dispatch(Actions.hero.clearHeroComics())
  }
});

// Connects to react-redux
Test = connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);

// ----------------------------------------------------------------------
export default Test;
