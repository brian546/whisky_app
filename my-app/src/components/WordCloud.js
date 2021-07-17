import React, { Component } from "react";

class WordCloud extends Component {
  render() {
    if (this.props.image) {
      return (
        <div className="wordcloud">
          <h2>Word Cloud</h2>
          <figure
            className="placeholder-center placeholder-center--w-100 placeholder-center--wordcloud"
            data-aos="zoom-in"
          >
            <img
              className="placeholder-center__item"
              src={`data:image/png;base64,${this.props.image}`}
            ></img>
          </figure>
        </div>
      );
    } else {
      return (
        <div className="wordcloud">
          <h2>Word Cloud</h2>
          <figure className="placeholder-center placeholder-center--w-100 placeholder-center--wordcloud">
            <img className="placeholder-center__item"></img>
          </figure>
        </div>
      );
    }
  }
}

export default WordCloud;
