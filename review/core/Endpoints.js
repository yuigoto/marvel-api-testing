/**
 * Core/Endpoints
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
export default {
  characters: {
    base: "characters",
    filters: {
      comics: "/comics",
      events: "/events",
      series: "/series",
      stories: "/stories"
    }
  },
  comics: {
    base: "comics",
    filters: {
      characters: "/characters",
      creators: "/creators",
      events: "/events",
      stories: "/stories"
    }
  },
  creators: {
    base: "creators",
    filters: {
      comics: "/comics",
      events: "/events",
      series: "/series",
      stories: "/stories"
    }
  },
  events: {
    base: "events",
    filters: {
      characters: "/characters",
      comics: "/comics",
      creators: "/creators",
      series: "/series",
      stories: "/stories"
    }
  },
  series: {
    base: "series",
    filters: {
      characters: "/characters",
      comics: "/comics",
      creators: "/creators",
      events: "/events",
      stories: "/stories"
    }
  },
  stories: {
    base: "stories",
    filters: {
      characters: "/characters",
      comics: "/comics",
      creators: "/creators",
      events: "/events",
      series: "/series"
    }
  }
};
