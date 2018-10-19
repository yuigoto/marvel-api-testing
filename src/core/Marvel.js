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
   * Base path to the Marvel public API.
   */
  basePath = "https://gateway.marvel.com/v1/public";

  /**
   * Public API key.
   *
   * Must be declared on the `.env` file at the application root.
   */
  _publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;

  /**
   * Private API key.
   *
   * Must be declared on the `.env` file at the application root.
   */
  _privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;

  // Methods
  // --------------------------------------------------------------------

  /**
   * @param {string} url
   * @returns {any}
   */
  getHeroResourceType(url) {
    const regex = /https?:\/\/([^/]+\/)+([^/?&]+)/g;
    let matches = regex.exec(url);
    return (matches[2] !== null && matches[2] !== undefined)
      ? matches[2]
      : null;
  }

  /**
   * @param {string} url
   * @returns {string|boolean}
   */
  setResourceUrlQuery(
    url,
    results = 10,
    page = 1
  ) {
    if (
      url === null
      || url === undefined
      || url === ""
    ) {
      return false;
    }

    return url
      + "?"
      + this._buildQueryStringFromParams(
        this._setResourceQueryParams(results, page)
      );
  }

  /**
   * @param {Number} heroId
   * @returns {string|boolean}
   */
  singleHeroQuery(heroId)
  {
    if (
      heroId === null
      || heroId === undefined
      || heroId === ""
    ) {
      return false;
    }

    return this.basePath
      + Endpoints.characters.base
      + "/"
      + heroId
      + "?"
      + this._buildQueryStringFromParams(
        this._setQueryHashParams()
      );
  }

  /**
   * @param {Number} results
   *    Results per page
   * @param {Number} page
   *    Current page being requested
   * @param {String} startsWith
   *    The hero's name must start with this string, leave it blank to ignore
   * @param {String} orderBy
   *    Must be either "name" or "modified"
   * @param {Boolean} orderByDesc
   *    Reverses the order
   * @returns {string}
   */
  heroesListQuery(
    results = 10,
    page = 1,
    startsWith = null,
    orderBy = "name",
    orderByDesc = false
  ) {
    // Set base values
    if (orderBy !== "name" && orderBy !== "modified") orderBy = "name";
    if (orderByDesc) orderBy = "-" + orderBy;

    // Query params
    let params = this._setSearchQueryParams(
      results,
      page,
      startsWith,
      orderBy
    );

    if (process.env.NODE_ENV === "development") {
      console.log(params);
    }

    return this.basePath
      + Endpoints.characters.base
      + "?"
      + this._buildQueryStringFromParams(params);
  }

  /**
   * @param {Object} params
   * @private
   */
  _buildQueryStringFromParams(params) {
    let keys = Object.keys(params);

    if (keys.length > 0) {
      let query = [];

      for (let key of keys) {
        query.push(key + "=" + params[key]);
      }

      if (process.env.NODE_ENV === "development") {
        console.log(query);
      }

      return query.join("&");
    }

    return null;
  }

  /**
   * Returns an object containing the public API key, the API hash and a
   * timestamp used to authenticate the request.
   *
   * @returns {
   *    {
   *      apikey: string,
   *      hash: string,
   *      ts: string
   *    }
   * }
   * @private
   */
  _setQueryHashParams() {
    // Set query parameter object
    let query = {
      apikey: this._publicKey
    };

    // Timestamp for the hash
    let ts = Date.now();
    query["ts"] = ts;
    if (process.env.NODE_ENV === "development") {
      console.log(ts.toString());
    }

    // Set hash
    query["hash"] = md5(
      ts.toString() + this._privateKey + this._publicKey
    );

    return query;
  }

  /**
   * @param {Number} results
   * @param {Number} page
   * @param {String} startsWith
   * @param {String} orderBy
   * @param {Boolean} orderByDesc
   * @returns {
   *    {
   *      offset: number,
   *      limit: number,
   *      startsWith: string,
   *      orderBy: string,
   *      orderByDesc: boolean
   *    }
   * }
   * @private
   */
  _setResourceQueryParams(results, page) {
    // Set offset and limit based on results + page
    let offset = (results * page) - results;
    let limit = results;

    // Set query parameter object
    let query = {
      offset,
      limit
    };

    return Object.assign(query, this._setQueryHashParams());
  }

  /**
   * @param {Number} results
   * @param {Number} page
   * @param {String} startsWith
   * @param {String} orderBy
   * @param {Boolean} orderByDesc
   * @returns {
   *    {
   *      offset: number,
   *      limit: number,
   *      startsWith: string,
   *      orderBy: string,
   *      orderByDesc: boolean
   *    }
   * }
   * @private
   */
  _setSearchQueryParams(results, page, startsWith, orderBy) {
    // Set offset and limit based on results + page
    let offset = (results * page) - results;
    let limit = results;

    // Set query parameter object
    let query = {
      offset,
      limit,
      orderBy
    };

    // Is startsWith empty?
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
