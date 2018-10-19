import React, { Component } from "react";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import Actions from "state/Actions";
import HeroResource from "components/hero/HeroResource";
import AsyncImage from "components/general/AsyncImage";
import Marvel from "core/Marvel";
import axios from "axios";
import TestHero from "assets/data/TestHero.json";

class HeroProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hero_id: null,
      has_loaded: false
    };
  }

  componentDidMount() {
    const { props } = this;
    let hero_id = (props.hero_id)
      ? props.hero_id : null;

    let url = Marvel.singleHeroQuery(hero_id);

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

        this.setState({
          hero_id: hero_id,
          has_loaded: true
        });

        props.heroSet(data.results[0]);
        props.loaderHide();
      }
    ).catch(
      err => {
        this.props.heroSet(TestHero);
        props.loaderHide();
      }
    );
  }

  render() {
    const { props } = this;
    const { hero } = props;

    if (
      hero.data.name === undefined || hero.data.name === null || hero.data.name === undefined
    ) {
      return (
        <div className={"row justify-content-center"}>
          <div className="col-12 text-center">
            <i className="fa fa-circle-notch fa-4x fa-spin"></i><br/>Loading...
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className={"row align-items-center"}>
          <div className="col-12 col-md-3 text-center">
            <div className="w-75 mx-auto mb-3 mb-md-0">
              <AsyncImage id={Date.now()} source={hero.data.thumbnail.path + "." + hero.data.thumbnail.extension}/>
            </div>
          </div>
          <hr/>
          <div className="col-12 col-md-9">
            <h2 className="display-5 font-weight-bold text-center">
              {hero.data.name}
            </h2>
            <p className={"lead text-center"}>
              {(() => {
                return hero.data.urls.map((item, index) => {
                  switch (item.type) {
                    case "wiki":
                      return (
                        <a href={item.url} className={"mx-2 mm-wiki-link"} target={"_blank"} key={index + Date.now()}>
                          <i className="fa fa-globe"></i> Wiki
                        </a>
                      );
                    case "detail":
                      return (
                        <a href={item.url} className={"mx-2 mm-wiki-link"} target={"_blank"} key={index + Date.now()}>
                          <i className="fa fa-user"></i> Details
                        </a>
                      );
                    default:
                      return (
                        <a href={item.url} className={"mx-2 mm-wiki-link"} target={"_blank"} key={index + Date.now()}>
                          <i className="fa fa-book"></i> Comics
                        </a>
                      );
                  }
                });
              })()}
            </p>
          </div>
          {(() => {
            if (hero.data.description) {
              return (
                <div className="col-12">
                  <p className="lead">
                    {hero.data.description}
                  </p>
                </div>
              );
            }
          })()}
        </div>
        <hr/>
        <HeroResource resource={hero.data.series.collectionURI}/>
        <hr/>
        <HeroResource resource={hero.data.stories.collectionURI}/>
        <hr/>
        <HeroResource resource={hero.data.events.collectionURI}/>
        <hr/>
        <HeroResource resource={hero.data.comics.collectionURI}/>
      </div>
    );
  }
}

// Set default props
HeroProfile.defaultProps = {
  className: ""
};

// Validation
HeroProfile.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
};

const mapStateToProps = (state) => ({
  hero: state.hero
});

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
  searchUntrigger: () => {
    dispatch(Actions.search.untrigger())
  }
});

HeroProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeroProfile);

export default HeroProfile;
