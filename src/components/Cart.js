import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import { removeFromCart } from "../actions/cartActions";
import AddRemove from "./AddRemove";
import { addToCart } from "../actions/cartActions";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null,
    };
  }
  openModal = (product) => {
    this.setState({ product });
  };
  closeModal = () => {
    this.setState({ product: null });
  };

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChange = (type, i, item) => {
    this.props.removeFromCart(type, i, item);
    // if(item.qty===0){
    this.props.addToCart(item);
    // }
  };

  render() {
    const { cartItems, cartTotal } = this.props;
    const { product } = this.state;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have
            <span> {cartTotal} </span>
            item in the cart{" "}
          </div>
        )}

        <div>
          {cartItems.length !== 0 ? (
            <div className="cart">
              <Fade left cascade>
                <Table className="tbldata" striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Unit Price</th>
                      <th>Item Total Price</th>
                      <th>Quantity</th>
                      <th>Add/Remove Item</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, i) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{formatCurrency(item.price)}</td>
                        <td>{formatCurrency(item.total * item.qty)}</td>
                        <td>{item.qty}</td>
                        <td>
                          <AddRemove
                            onClick={() => this.handleChange("-", i, item)}
                            qty={item.qty}
                            addonClick={() => this.handleChange("+", i, item)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Fade>
            </div>
          ) : null}

          {cartItems.length !== 0 && (
            <div>
              <div className="cart">
                <div className="total">
                  <div>
                    Total:{" "}
                    {formatCurrency(
                      cartItems.reduce((a, c) => a + c.price * c.qty, 0)
                    )}
                  </div>
                  <button
                    className="btndata"
                    onClick={() => this.openModal(cartItems)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {product && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
              <div className="product-details">
                <div className="product-details-description">
                  <p>You have purchased {cartTotal} items.</p>

                  <div className="total">
                    <div>
                      Total:{" "}
                      {formatCurrency(
                        cartItems.reduce((a, c) => a + c.price * c.qty, 0)
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
    cartTotal: state.cart.cartTotal,
  }),
  { removeFromCart, addToCart }
)(Cart);
