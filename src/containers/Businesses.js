import React, { Component } from "react";
import Business from "../components/Business";
import { getIceCreamBusinessesFromAlpharetta } from "../services/business";

class Businesses extends Component {
  state = {
    businesses: [],
  };

  async componentDidMount() {
    const businesses = await getIceCreamBusinessesFromAlpharetta();
    this.setState({ businesses });
  }

  render() {
    return (
      <div>
        <h1>Top 5 Ice Cream Shops In Alpharetta</h1>
        {this.state.businesses.map((business) => (
          <Business
            key={business.id}
            name={business.name}
            address={business.address}
            imageUrl={business.imageUrl}
            review={business.review}
          />
        ))}
      </div>
    );
  }
}

export default Businesses;
