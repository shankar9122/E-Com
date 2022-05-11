import React, { Component } from "react";
import { connect } from "react-redux";
import {
  sortProducts,
  sortProductsByCatogary,
  wildCartSearch,
} from "../actions/productActions";

class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
    };
  }
  handleClear = (id) => {
    if (id === "clear") {
      this.setState(
        {
          category: "",
        },
        () => {
          let reqData = {
            search: this.state.search,
            category: "all",
          };
          this.props.sortProductsByCatogary(
            this.props.filteredProducts,
            reqData
          );
        }
      );
    }
  };
  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        let reqData = {
          search: this.state.search,
          category: this.state.category,
        };
        if (name === "search") {
          this.props.wildCartSearch(reqData);
        } else {
          this.props.sortProductsByCatogary(
            this.props.filteredProducts,
            reqData
          );
        }
      }
    );
  };

  componentDidMount() {}

  render() {
    const { search, category } = this.state;
    return !this.props.filteredProducts ? (
      <div>Loading...</div>
    ) : (
      <>
        <div className="wildcard">
          <input
            className="searchboc"
            placeholder="Search..."
            type="text"
            value={search}
            name="search"
            onChange={this.handleChange}
          />
        </div>
        <div className="filter">
          <div className="filter-result">
            {this.props.filteredProducts.length} Products
          </div>
          <div className="filter-sort">
            Order{" "}
            <select
              value={this.props.sort}
              onChange={(e) =>
                this.props.sortProducts(
                  this.props.filteredProducts,
                  e.target.value
                )
              }
            >
              <option value="latest">Latest</option>
              <option value="lowest">Lowest</option>
              <option value="highest">Highest</option>
            </select>
          </div>
          <div className="filter-sort">
            Category{" "}
            <select
              value={category}
              name="category"
              onChange={this.handleChange}
            >
              <option value="all" selected>
                Select...
              </option>
              <option value="dairy">Dairy</option>
              <option value="fruit">Fruit</option>
              <option value="vegetable">Vegetable</option>
              <option value="bakery">Bakery</option>
              <option value="vegan">Vegan</option>
              <option value="meat">Meat</option>
            </select>
            {category !== "" ? (
              <span className="clear" onClick={() => this.handleClear("clear")}>
                Clear
              </span>
            ) : null}
          </div>
        </div>
      </>
    );
  }
}
export default connect(
  (state) => ({
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
  }),
  {
    sortProducts,
    sortProductsByCatogary,
    wildCartSearch,
  }
)(Filter);
