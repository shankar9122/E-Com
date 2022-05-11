import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
export class Header extends Component {
  render() {
    const { cartTotal } = this.props;

    return (
      <header>
        <Link to="/">Ugam</Link>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Cart">
              Cart {cartTotal > 0 ? <span>{cartTotal}</span> : null}
            </Link>
          </li>
        </ul>
      </header>
    );
  }
}

export default connect((state) => ({
  cartTotal: state.cart.cartTotal,
}))(Header);
