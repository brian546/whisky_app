import React, { Component } from "react";
import "../scss/price-info.scss";

class PriceInfo extends Component {
  render() {
    let items = [];
    let data = this.props.price_table;
    let count = 0;

    for (let item in data) {
      items.push(
        <ShopItem
          shop={data[item]["Shop"]}
          address={data[item]["Address"]}
          price={data[item]["Price"]}
          key={count}
        ></ShopItem>
      );
      count++;
    }

    return (
      <div className="price-info">
        {/* <figure className="placeholder-center placeholder-center--w-100 placeholder-center--wordcloud">
          <img
            className="placeholder-center__item"
            src={`data:image/png;base64,${this.props.image}`}
          ></img>
        </figure> */}
        <h2>Shops</h2>
        <div className="price-info__shops">{items}</div>
      </div>
    );
  }
}

function ShopItem(props) {
  return (
    <div className="price-info__shop-item" data-aos="fade-up">
      <div className="price-info__shop-item-info">
        <h3 className="price-info__shop-item-shop">{props.shop}</h3>
        <p className="price-info__shop-item-address">{props.address}</p>
      </div>
      <p className="price-info__shop-item-price">${props.price}</p>
    </div>
  );
}

export default PriceInfo;
