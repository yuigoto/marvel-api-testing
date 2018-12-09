import { Component } from "react";
import ReactDOM from "react-dom";

const parent = document.getElementById("main");

/**
 * Components/Loader/LoaderPortal
 * ----------------------------------------------------------------------
 * @author    Fabio Y. Goto <lab@yuiti.com.br>
 * @since     0.0.1
 */
class LoaderPortal extends Component {
  constructor(props) {
    super(props);

    this.element = document.createElement("div");
    this.element.id = "loader";
  }

  componentDidMount() {
    parent.appendChild(this.element);
  }

  componentWillUnmount() {
    parent.removeChild(this.element);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.element
    );
  }
}

export default LoaderPortal;
