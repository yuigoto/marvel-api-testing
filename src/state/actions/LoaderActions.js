import { Loader } from "state/Types";

/**
 * State/Actions/LoaderActions
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
const LoaderActions = {};

/**
 * @returns {{loader: {visible: boolean}, type: string}}
 */
LoaderActions.hide = () => {
  return {
    loader: {
      visible: false
    },
    type: Loader.HIDE
  }
};

/**
 * @returns {{loader: {visible: boolean}, type: string}}
 */
LoaderActions.show = () => {
  return {
    loader: {
      visible: true
    },
    type: Loader.SHOW
  }
};

export default LoaderActions;
