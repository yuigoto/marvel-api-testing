import axios from "axios";
import md5 from "md5";
import Endpoints from "core/Endpoints";

/**
 * Core/Marvel
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
class Marvel {
  // Properties
  // --------------------------------------------------------------------

  /**
   * Axios instance.
   *
   * @type {*}
   */
  _API;

  /**
   * API root path.
   *
   * @type {string}
   */
  _basePath = "https://gateway.marvel.com/v1/public/";

  /**
   * Public API key.
   *
   * Must be declared on the `.env` file at the application root.
   *
   * @type {String}
   */
  _publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;

  /**
   * Private API key.
   *
   * Must be declared on the `.env` file at the application root.
   *
   * @type {String}
   */
  _privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;

  // Constructor
  // --------------------------------------------------------------------

  /**
   * Constructor.
   */
  constructor() {
    this._API = axios.create({
      baseURL: this._basePath,
      responseType: "json"
    });
  }

  // Public Methods
  // --------------------------------------------------------------------

  /**
   * @param urlOrPath
   * @returns {Promise<*>}
   */
  async fetchFromUrlOrPath(urlOrPath) {
    return await this._API.get(
      urlOrPath
    );
  }

  /**
   * @param {string} url
   * @returns {string}
   */
  getHeroResourceTypeFromUrl(url) {
    const regex = /https?:\/\/([^/]+\/)+([^/?&]+)/g;
    let matches = regex.exec(url);
    return (matches[2] !== null && matches[2] !== undefined)
      ? matches[2]
      : null;
  }

  /**
   * @param {String} url
   * @param {Number} results
   * @param {Number} page
   * @returns {*}
   */
  setResourceQuery(url, results = 10, page = 1) {
    if (url === null || url === undefined || url === "") return false;

    return url.trim()
      + "?"
      + this._buildQueryStringFromParams(
        this._setResourceQueryParams(results, page)
      );
  }

  /**
   * @param {Number} heroId
   * @returns {*}
   */
  setHeroQuery(heroId) {
    if (heroId === null || heroId === undefined || heroId === "") return false;

    return Endpoints.characters.base
      + `/${heroId}?`
      + this._buildQueryStringFromParams(
        this._setQueryHashParams()
      );
  }

  /**
   * @param {Number} results
   * @param {Number} page
   * @param {String} startsWith
   * @param {Number} orderBy
   * @param {Boolean} orderByDesc
   * @returns {*}
   */
  setSearchQuery(
    results = 10,
    page = 1,
    startsWith = null,
    orderBy = "name",
    orderByDesc = false
  ) {
    if (orderBy !== "name" && orderBy !== "modified") orderBy = "name";
    if (orderByDesc) orderBy = "-" + orderBy;

    let params = this._setSearchQueryParams(
      results,
      page,
      startsWith,
      orderBy
    );

    return Endpoints.characters.base
      + `?${this._buildQueryStringFromParams(params)}`;
  }

  // Private Methods
  // --------------------------------------------------------------------

  /**
   * @param params
   * @returns {*}
   * @private
   */
  _buildQueryStringFromParams(params) {
    let keys = Object.keys(params);

    if (keys.length > 0) {
      let query = [];

      for (let key of keys) {
        query.push(`${key}=${params[key]}`);
      }

      return query.join("&");
    }

    return null;
  }

  /**
   * @returns {*}
   * @private
   */
  _setQueryHashParams() {
    let queryParams = {
      apikey: this._publicKey
    };

    let timestamp = Date.now();
    queryParams["ts"] = timestamp;
    queryParams["hash"] = md5(
      timestamp.toString() + this._privateKey + this._publicKey
    );

    return queryParams;
  }

  /**
   * @param results
   * @param page
   * @returns {*}
   * @private
   */
  _setResourceQueryParams(results, page) {
    let offset = (results * page) - results;
    let query = {
      offset,
      limit: results
    };

    return Object.assign(query, this._setQueryHashParams());
  }

  /**
   * @param {Number} results
   * @param {Number} page
   * @param {String} startsWith
   * @param {String} orderBy
   * @returns {*}
   * @private
   */
  _setSearchQueryParams(results, page, startsWith, orderBy) {
    let offset = (results * page) - results;
    let query = {
      offset,
      orderBy,
      limit: results
    };

    if (
      startsWith !== null
      && startsWith !== undefined
      && startsWith.trim() !== ""
    ) {
      query["nameStartsWith"] = startsWith.trim();
    }

    return Object.assign(query, this._setQueryHashParams());
  }
}

export default (new Marvel());
