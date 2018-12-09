import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

import Logo from "components/base/Logo";
import header_module from "scss/header.module.scss";

/**
 * Components/Base/Header
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 *
 * @param is_home
 * @param match
 * @param location
 * @returns {*}
 * @constructor
 */
const Header = ({is_home, match, location}) => {
  // !Home
  if (location.pathname && location.pathname !== "/") {
    return (
      <header
        id={"header"}
        className={classnames(header_module["mm-header"], header_module.page)}>
        <div className={header_module["mm-header__back"]}/>
        <div className={header_module["mm-header__fore"]}>
          <Link
            to={"/"}
            className={
              classnames(header_module["mm-header__link"], header_module.small)
            }>
            <Logo mini={true} className={"m-0"}/>
          </Link>

          <h5 className="mm-header__title mb-0">
            Marvel's Marvels
          </h5>
        </div>
      </header>
    );
  }

  return (
    <header
      id={"header"}
      className={header_module["mm-header"]}>
      <div className={header_module["mm-header__back"]}/>
      <div className={header_module["mm-header__fore"]}>
        <Link to={"/"} className={header_module["mm-header__link"]}>
          <Logo is_animated={true} hero={true} className={"mb-3"}/>
        </Link>

        <h1 className={"display-4"}>
          Marvel's Marvels
        </h1>
        <p>
          A (very) simple Marvel heroes database search app + browser (no pun intended, ever).
        </p>
      </div>
    </header>
  );
};

export default Header;
