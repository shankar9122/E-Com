import React, { Component } from "react";

export class AddRemove extends Component {
  render() {
    const { onClick, addonClick, qty } = this.props;
    return (
      <div>
        <button onClick={onClick} className="button primary cartItem">
          -
        </button>
        <span className="qtydata">{qty} </span>
        <button onClick={addonClick} className="button primary cartItem">
          +
        </button>
      </div>
    );
  }
}

export default AddRemove;
