import React, { Component } from "react";
import "../scss/bottle.scss";

class Bottle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.url != null) {
      return (
        <div className="bottle">
          <figure className="placeholder-center placeholder-center--1-to-1">
            <img
              className="placeholder-center__item"
              src={this.props.url}
              alt="whisky bottle"
            ></img>
          </figure>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Bottle;
