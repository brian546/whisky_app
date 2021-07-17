import React, { Component } from "react";
import Slider from "@material-ui/core/Slider";
import axios from "axios";
import "../scss/filterlist.scss";

class FilterSliderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Body: 2,
      Sweetness: 2,
      Smoky: 2,
      Medicinal: 2,
      Tobacco: 2,
      Honey: 2,
      Spicy: 2,
      Winey: 2,
      Nutty: 2,
      Malty: 2,
      Fruity: 2,
      Floral: 2,
    };

    this.ChildChange = this.ChildChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  ChildChange(name) {
    return (e, val) => {
      this.setState({
        [name]: val,
      });
    };
  }

  handleClick() {
    axios
      .post("http://127.0.0.1:5000/searchFlavour", this.state)
      .then((res) => {});
  }

  render() {
    let flavours = [
      "Body",
      "Sweetness",
      "Smoky",
      "Medicinal",
      "Tobacco",
      "Honey",
      "Spicy",
      "Winey",
      "Nutty",
      "Malty",
      "Fruity",
      "Floral",
    ];
    let items = [];

    for (let item in flavours) {
      items.push(
        <FilterSlider
          flavour={flavours[item]}
          handleChange={this.ChildChange(flavours[item])}
          key={flavours[item]}
        ></FilterSlider>
      );
    }

    return (
      <div className="filter-list-wrap">
        <div className="filter-list">{items}</div>
        <button onClick={this.handleClick}>Search</button>
      </div>
    );
  }
}

class FilterSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flavour: this.props.flavour,
      value: 2,
    };
  }

  render() {
    return (
      <div className="filter-list__item">
        <p>{this.state.flavour}</p>
        <Slider
          defaultValue={2}
          // getAriaValueText={valuetext}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={0.5}
          marks
          min={0}
          max={4}
          onChangeCommitted={this.props.handleChange}
        />
      </div>
    );
  }
}

export default FilterSliderList;
