import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

import header_styles from "scss/header.module.scss";
import Logo from "components/general/Logo";

const Header = ({children,is_home,match,location}) => {
  if (location.pathname && location.pathname !== "/") {
    return (
      <div
        id={"header"}
        className={classnames(header_styles["mm-header"], header_styles.page)}>
        <div className={header_styles["mm-header__back"]}></div>
        <div className={header_styles["mm-header__fore"]}>
          <Link
            to={"/"}
            className={classnames(header_styles["mm-header__link"], header_styles.smallLink)}>
            <Logo mini={true} className={"m-0"}/>
          </Link>

          <h5 className={"mm-header__title mb-0"}>
            Marvel's Marvels
          </h5>
        </div>
      </div>
    );
  }

  return (
    <div
      id={"header"}
      className={header_styles["mm-header"]}>
      <div className={header_styles["mm-header__back"]}></div>
      <div className={header_styles["mm-header__fore"]}>
        <Link to={"/"} className={header_styles["mm-header__link"]}>
          <Logo is_animated={true} hero={true} className={"mb-3"}/>
        </Link>

        <h1>
          Marvel's Marvels
        </h1>
        <p>
          A (Very) Simple Marvel Heroes Database Search App + Browser
        </p>
      </div>
    </div>
  );
};

export default Header;
