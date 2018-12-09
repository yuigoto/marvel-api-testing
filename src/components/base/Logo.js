import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { ReactComponent as SvgLogo } from "assets/svg/MarvelLogo.svg";
import "scss/logo.scss";

/**
 * Components/Logo
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 *
 * @param {Boolean} is_animated
 * @param {Boolean} inline
 * @param {Boolean} mini
 * @param {Boolean} hero
 * @param {Array|String} className
 * @returns {*}
 * @constructor
 */
const Logo = ({is_animated, inline, mini, hero, className}) => {
  let _cls = {
    "animated": (is_animated === true),
    "inline": (inline === true),
    "mini": (mini === true),
    "hero": (hero === true)
  };

  return (
    <SvgLogo className={classnames("marvel-logo", _cls, className)}/>
  );
};

// Prop Validation
// ----------------------------------------------------------------------
Logo.defaultProps = {
  hero: false,
  inline: false,
  is_animated: false,
  mini: false
};

Logo.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  hero: PropTypes.bool,
  inline: PropTypes.bool,
  is_animated: PropTypes.bool,
  mini: PropTypes.bool
};

export default Logo;
