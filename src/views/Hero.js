import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import Actions from "state/Actions";
import SearchBox from "components/general/SearchBox";
import Marvel from "core/Marvel";
import HeroProfile from "components/hero/HeroProfile";

class Hero extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hero_id: null,
      no_hero: false,
      has_loaded: false
    };

    this.searchNavigationCallable = this.searchNavigationCallable.bind(this);
  }

  searchNavigationCallable() {
    this.props.loaderShow();
    this.props.searchTrigger();

    let history = (this.props.search.term !== "")
      ? "/search/" + this.props.search.term : "/search";
    this.props.history.push(history);
  }

  render() {
    const { props } = this;
    let hero_id = (props.match.params.hero_id)
      ? parseInt(props.match.params.hero_id) : null;

    return (
      <div className={"container py-5"}>
        <SearchBox callable={this.searchNavigationCallable}/>

        <hr/>

        <HeroProfile hero_id={hero_id}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loader: state.loader,
    search: state.search,
    hero: state.hero
  };
};

const mapDispatchToProps = (dispatch) => ({
  loaderShow: () => {
    dispatch(Actions.loader.showLoader());
  },
  loaderHide: () => {
    dispatch(Actions.loader.hideLoader());
  },
  heroSet: (hero) => {
    dispatch(Actions.hero.setHero(hero));
  },
  searchSet: (search) => {
    dispatch(Actions.search.setSearch(search))
  },
  searchTrigger: () => {
    dispatch(Actions.search.trigger())
  },
  searchUntrigger: () => {
    dispatch(Actions.search.untrigger())
  }
});

Hero = connect(
  mapStateToProps,
  mapDispatchToProps
)(Hero);

export default Hero;
