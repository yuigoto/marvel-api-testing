import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { ReactComponent as SVGLogo } from "assets/svg/MarvelLogo.svg";

const Logo = ({is_animated, inline, mini, hero, className}) => {
  let _cls = {
    "animated": (is_animated === true),
    "inline": (inline === true),
    "mini": (mini === true),
    "hero": (hero === true)
  };

  return (
    <SVGLogo className={classnames("marvel-logo", _cls, className)}/>
  );
};

Logo.defaultProps = {
  is_animated: false,
  inline: false,
  mini: false,
  hero: false
};

Logo.propTypes = {
  is_animated: PropTypes.bool,
  inline: PropTypes.bool,
  mini: PropTypes.bool,
  hero: PropTypes.bool
};

export default Logo;
