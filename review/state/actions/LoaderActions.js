import { Loader } from "review/state/Types";

/**
 * State/Actions/LoaderActions
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
const LoaderActions = {};

LoaderActions.hideLoader = () => {
  return {
    loader: {
      visible: false,
    },
    type: Loader.HIDE_LOADER
  };
};

LoaderActions.showLoader = () => {
  return {
    loader: {
      visible: true,
    },
    type: Loader.SHOW_LOADER
  };
};

export default LoaderActions;
