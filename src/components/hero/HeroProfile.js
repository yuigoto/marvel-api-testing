import React, { Component } from "react";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import Actions from "state/Actions";
import HeroResource from "components/hero/HeroResource";
import AsyncImage from "components/general/AsyncImage";

class HeroProfile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const { props } = this;
    const { hero } = props;

    if (
      hero.data.name === undefined || hero.data.name === null || hero.data.name === undefined
    ) {
      return (
        <div>
          <h3>Hero Not Set</h3>
          <h1>GTFO! 😩</h1>
        </div>
      );
    }

    return (
      <div>
        <h2>{hero.data.name}</h2>
        <h1>
          <i className="fa fa-truck"></i>
        </h1>

        <div className="container">
          <div className="row">
            <div className="col-4">
              <AsyncImage source={hero.data.thumbnail.path + "." + hero.data.thumbnail.extension}/>
            </div>
            <div className="col-4">
              <AsyncImage source={hero.data.thumbnail.path + "." + hero.data.thumbnail.extension}/>
            </div>
            <div className="col-4">
              <AsyncImage source={hero.data.thumbnail.path + "." + hero.data.thumbnail.extension}/>
            </div>
          </div>
        </div>

        <hr/>

        <h4>Series</h4>

        <HeroResource resource={hero.data.series.collectionURI}/>

        <hr/>

        <h4>Stories</h4>

        <HeroResource resource={hero.data.stories.collectionURI}/>

        <hr/>

        <h4>Events</h4>

        <HeroResource resource={hero.data.events.collectionURI}/>

        <hr/>

        <h4>Comics</h4>

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
});

HeroProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeroProfile);

export default HeroProfile;
