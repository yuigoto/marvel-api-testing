import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";

import LoaderPortal from "components/loader/LoaderPortal";
import loader_module from "scss/loader.module.scss";

/**
 * Components/Loader/Loader
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
let Loader = ({visible}) => {
  let _cls = {};
  _cls[`${loader_module.visible}`] = visible;

  return (
    <LoaderPortal>
      <div
        className={classnames(loader_module["mm-loader"], _cls)}>
        <i className="fa fa-6x fa-circle-notch fa-spin"></i>
      </div>
    </LoaderPortal>
  );
};

const mapStateToProps = (state) => ({
  visible: state.loader.visible
});

const mapDispatchToProps = (dispatch) => ({
});

Loader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Loader);

export default Loader;
