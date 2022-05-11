import React, { Component } from "react";
import formatCurrency from "../util";
import { connect } from "react-redux";
import { fetchProducts, addRemoveFromCart } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";
import { Table } from "react-bootstrap";
import AddRemove from "./AddRemove";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      indexData: 0,
      qtyitem: {},
      products: [],
    };
  }
  async componentDidMount() {
    await this.props.fetchProducts();
    this.setState({
      products: this.props.products,
    });
  }

  openModal = (item, i) => {
    this.setState({ item, indexData: i });
  };
  closeModal = () => {
    this.setState({ item: null });
  };
  handleChange = (type, i, item) => {
    let { products } = this.state;

    this.setState({
      products: products,
    });
    this.props.addRemoveFromCart(type, i, item);
    this.props.addToCart(item);
  };

  render() {
    return (
      <div>
        {!this.props.products ? (
          <div></div>
        ) : (
          <Table className="tbldata" striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Add/Remove Item</th>
              </tr>
            </thead>
            <tbody>
              {this.props.products.map((item, i) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{formatCurrency(item.price)}</td>
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
        )}
      </div>
    );
  }
}
export default connect(
  (state) => ({ products: state.products.filteredItems }),
  {
    fetchProducts,
    addToCart,
    addRemoveFromCart,
  }
)(Products);
