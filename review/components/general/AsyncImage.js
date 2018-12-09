import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import classnames from "classnames";

import elements_module from "review/scss/elements.module.scss";

/**
 * Components/General/AsyncImage
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
class AsyncImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      source: null,
      has_loaded: false,
      has_error: false
    };
  }

  async fetchImageData() {
    try {
      let fetch = await axios.get(
        this.props.source,
        {
          responseType: "arraybuffer"
        }
      );

      if (fetch && fetch.data) {
        let buffer = new Buffer(fetch.data, "binary").toString("base64");
        let mime = fetch.headers["content-type"];
        let data = `data:${mime};base64,${buffer}`;

        this.setState({
          has_loaded: true,
          source: data
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  componentDidMount() {
    this.fetchImageData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.source !== prevProps.source) {
      this.setState({
        has_loaded: false
      });

      axios.get(
        this.props.source,
        {
          responseType: "arraybuffer"
        }
      ).then(
        res => {
          let buffer = new Buffer(res.data, "binary").toString("base64");
          let mime = res.headers["content-type"];
          let data = `data:${mime};base64,${buffer}`;

          this.setState({
            has_loaded: true,
            source: data
          });
        }
      ).catch(
        err => {
          this.setState({
            has_loaded: true,
            has_error: true
          });
          console.error(err);
        }
      );
    }
  }

  render() {
    const { props, state } = this;

    let _cls = {};
    _cls[elements_module.visible] = !state.has_loaded;

    return (
      <div className={classnames(elements_module["mm-asyncimage"], props.className)}>
        {(() => {
          if (state.has_error) {
            return (
              <div className={elements_module["mm-asyncimage-error"]}>
                <i className="fa fa-times fa-3x"></i>
              </div>
            );
          }
        })()}

        <div
          className={classnames(elements_module["mm-asyncimage-spin"],_cls)}>

          <i className="fa fa-circle-notch fa-3x fa-spin"></i>
        </div>
        {(() => {
          if (state.has_loaded === true && state.has_error === false) {
            return (
              <img
                className={classnames(elements_module["mm-asyncimage-img"])}
                src={this.state.source}
                alt={props.alt} />
            );
          }
        })()}
      </div>
    );
  }
}

AsyncImage.defaultProps = {
  className: "",
  alt: ""
};

AsyncImage.propTypes = {
  alt: PropTypes.string,
  source: PropTypes.string.isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ])
};

export default AsyncImage;
