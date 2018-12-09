import React from "react";

import footer_module from "scss/footer.module.scss";

/**
 * Components/Base/Footer
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 *
 * @returns {*}
 * @constructor
 */
const Footer = () => {
  return (
    <footer
      id={"header"}
      className={footer_module["mm-footer"]}>
      <div className={"py-4"}>
        <div className={"container text-center"}>
          <p className="m-0">
            Developed with React <i className="fab fa-react"></i> by <a className={"text-muted"} rel={"noopener noreferrer"} href={"mailto:lab@yuiti.com.br"}>Fabio Y. Goto</a>. Source code @ <a href={"https://github.com/yuigoto/marvel-api-testing"} className={"text-muted"} target={"_blank"} rel={"noopener noreferrer"}><i className={"fab fa-github"}/> Github</a>
          </p>

          <p className={"m-0"}>
            <small>
              Data provided by Marvel. ©2014. Get your own API key at <a href={"https://developer.marvel.com"} className={"text-muted"} rel={"noopener noreferrer"} target={"_blank"}>
              https://developer.marvel.com
            </a>
            </small>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
