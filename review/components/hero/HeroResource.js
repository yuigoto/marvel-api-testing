import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Marvel from "review/core/Marvel";
import Actions from "review/state/Actions";
import AsyncImage from "review/components/general/AsyncImage";

class HeroResource extends Component {
  constructor(props) {
    super(props);

    this.state = {
      has_error: false,
      has_loaded: false,
      type: null,
      hero_id: null
    };

    this.setTitle = this.setTitle.bind(this);
    this.fetchHeroData = this.fetchHeroData.bind(this);
  }

  fetchHeroData() {
    const { props } = this;

    let url = Marvel.setResourceUrlQuery(props.resource);
    let type = Marvel.getHeroResourceType(url);

    this.setState({
      has_error: false,
      has_loaded: false,
      type: null,
      hero_id: props.hero.data.id || null
    });

    switch (type) {
      case "comics":
        props.clearComics();
        break;
      case "events":
        props.clearEvents();
        break;
      case "series":
        props.clearSeries();
        break;
      default:
        props.clearStories();
        break;
    }

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
          default:
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
        this.setState({
          type: null,
          has_error: true,
          has_loaded: false
        });
      }
    );
  }

  componentDidMount() {
    this.fetchHeroData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.resource !== this.props.resource) {
      this.fetchHeroData();
    }
  }

  setTitle() {
    let type = this.props.resource;

    type = Marvel.getHeroResourceType(type);
    let title;

    switch(type) {
      case "series":
        title = "Series";
        break;
      case "stories":
        title = "Stories";
        break;
      case "events":
        title = "Events";
        break;
      default:
        title = "Comics";
        break;
    }

    if (this.props.hero.data[type].available) {
      title += ` (${this.props.hero.data[type].available})`;
    }

    return title;
  }

  render() {
    const { state, props } = this;

    if (state.has_error === true) {
      return (
        <div className={"row justify-content-center"}>
          <div className="col-12 text-center">
            <h5 className="display-5 text-center">{this.setTitle()}</h5>
            <h3 className={"display-6"}>
              Ran out of API calls! <span role={"img"} aria-label={"Crying"}>😭</span>
            </h3>
          </div>
        </div>
      );
    }

    if (state.has_loaded === false) {
      return (
        <div className={"row justify-content-center"}>
          <div className="col-12 text-center">
            <i className="fa fa-circle-notch fa-4x fa-spin"></i><br/>Loading...
          </div>
        </div>
      );
    }

    return (
      <div className={"row"}>
        <div className="col-12">
          <h5 className="display-5 text-center">{this.setTitle()}</h5>
          <p className="text-center textmuted">
            (showing up to 10 results)
          </p>
        </div>
        <div className="col-12">
          <div className="row justify-content-center">
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
                default:
                  resource = props.hero.stories;
                  break;
              }

              if (resource !== undefined) {
                if (resource.children.length < 1) {
                  return (
                    <div className="col-12 py-4">
                      <h3 className="text-center text-muted even-more display-5">
                        Nothing here! <span role={"img"} aria-label={"Crying"}>😭</span>
                      </h3>
                    </div>
                  );
                }

                return resource.children.map((item, index) => {
                  return (
                    <div className={"col-6 col-md-4 col-lg-3 py-3"} key={index}>
                      {(() => {
                        if (item.thumbnail === null) {
                          return (null);
                        }

                        return (
                          <div className={"w-75 mx-auto mb-2"}>
                            <AsyncImage source={item.thumbnail.path + "." + item.thumbnail.extension}/>
                          </div>
                        );
                      })()}
                      <h5 className={"text-center"}>
                        {item.title}
                      </h5>
                    </div>
                  );
                });
              } else {
                // NÃO DEFINIDO
              }
            })()}
          </div>

        </div>
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
  setComics: (comics) => {
    if (comics.children.length < 1) {
      dispatch(Actions.hero.clearHeroComics());
    } else {
      dispatch(Actions.hero.setHeroComics(comics));
    }
  },
  setSeries: (series) => {
    if (series.children.length < 1) {
      dispatch(Actions.hero.clearHeroSeries());
    } else {
      dispatch(Actions.hero.setHeroSeries(series));
    }
  },
  setEvents: (events) => {
    if (events.children.length < 1) {
      dispatch(Actions.hero.clearHeroEvents());
    } else {
      dispatch(Actions.hero.setHeroEvents(events));
    }
  },
  setStories: (stories) => {
    if (stories.children.length < 1) {
      dispatch(Actions.hero.clearHeroStories());
    } else {
      dispatch(Actions.hero.setHeroStories(stories));
    }
  }
});

HeroResource = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeroResource);

export default HeroResource;
