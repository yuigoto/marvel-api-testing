import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Marvel from "core/Marvel";
import Actions from "state/Actions";

class HeroResource extends Component {
  constructor(props) {
    super(props);

    this.state = {
      has_error: false,
      has_loaded: false,
      type: null
    };
  }

  componentDidMount() {
    console.log("Mounted");

    const { props } = this;

    let url = Marvel.setResourceUrlQuery(props.resource);
    let type = Marvel.getHeroResourceType(url);

    this.setState({
      has_error: false,
      has_loaded: false,
      type: null
    });

    axios.get(
      url
    ).then(
      res => {
        const { data } = res;

        let resource = {
          children: data.data.results,
          total: data.data.total,
          page: 1
        };

        switch (type) {
          case "comics":
            props.setComics(resource);
            break;
          case "events":
            props.setEvents(resource);
            break;
          case "series":
            props.setSeries(resource);
            break;
          case "stories":
            props.setStories(resource);
            break;
        }

        this.setState({
          type: type,
          has_error: false,
          has_loaded: true
        });
      }
    ).catch(
      err => {
        console.log(err);

        this.setState({
          type: null,
          has_error: true,
          has_loaded: false
        });
      }
    );
  }

  componentDidUpdate() {
    console.log("Update");
  }

  render() {
    const { state, props } = this;

    if (state.has_error === true) {
      return (
        <div>
          <h3>😭</h3>
        </div>
      );
    }

    if (state.has_loaded === false) {
      return (
        <div>
          Loaderising ...
        </div>
      );
    }

    return (
      <div>
        <h3>Resource</h3>

        {(() => {
          let resource;
          switch (state.type) {
            case "comics":
              resource = props.hero.comics;
              break;
            case "events":
              resource = props.hero.events;
              break;
            case "series":
              resource = props.hero.series;
              break;
            case "stories":
              resource = props.hero.stories;
              break;
          }

          if (resource !== undefined) {
            return resource.children.map((item, index) => {
              return (
                <div key={index}>
                  <h5>{item.title}</h5>
                </div>
              );
            });
          } else {
            console.log("NÃO DEFINIDO");
          }
        })()}

        <p>🎮 🎮 🎮</p>

        <button onClick={(() => {
          this.setState({
            has_error: true
          });
        })}>
          🍬
        </button>
      </div>
    );
  }
}

// Set default props
HeroResource.defaultProps = {
  className: "",
  resource: ""
};

// Validation
HeroResource.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  resource: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  hero: state.hero
});

const mapDispatchToProps = (dispatch) => ({
  setComics: (comics) => {
    dispatch(Actions.hero.setHeroComics(comics));
  },
  setSeries: (series) => {
    dispatch(Actions.hero.setHeroSeries(series));
  },
  setEvents: (events) => {
    dispatch(Actions.hero.setHeroEvents(events));
  },
  setStories: (stories) => {
    dispatch(Actions.hero.setHeroStories(stories));
  }
});

HeroResource = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeroResource);

export default HeroResource;
