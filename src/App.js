// feature  1
import React from "react";
// import data from "./data.json";
import Filter from "./components/Filter";
import Products from "./components/Products";
import Cart from "./components/Cart";
import store from "./store";
import { Provider } from "react-redux";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // products: data.products,
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : []
      // size: "",
      // sort: ""
    };
  }
  createOrder = order => {
    alert("Need to save order for " + order.name);
  };
  removeFromCart = product => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter(x => x._id !== product._id)
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter(x => x._id !== product._id))
    );
  };

  addToCart = product => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach(item => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  /*
//  -------------------------------------------------------------------------
 //productAction.js ma lakhyu 6 ---------------------------------------------
//  -------------------------------------------------------------------------
sortProducts = event => {
  // implement
  const sort = event.target.value;
  console.log(event.target.value);
  this.setState(state => ({
    sort: sort,
    products: this.state.products.slice().sort(
      (a, b) =>
      sort === "lowest"
      ? a.price > b.price
      ? 1
      : -1
      : sort === "highest"
      ? a.price < b.price
      ? 1
      : -1
      : a._id < b._id
      ? 1
      : -1
      
      //   (sort==="lowest"? ((a.price < b.price)? 1:-1):
      //   sort==="highest"? ((a.price > b.price)? 1:-1):
      //   ((a._id > b._id)? 1:-1): )
      )
      // products: state.products
    }));
  };
  
  //  -------------------------------------------------------------------------
  //productAction.js ma lakhyu 6 ----------------------------------------------
  //  -------------------------------------------------------------------------
  filterProducts = event => {
    // implement
    console.log(event.target.value);
    if (event.target.value === "") {
      this.setState({ size: event.target.value, products: data.products });
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          product => product.availableSizes.indexOf(event.target.value) >= 0
          )
        });
      }
    };*/

  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <a href="/">Pizzeria Express </a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter></Filter>
                {/* /*
                //  ----------------------------------------------------------------
                // redux - Sort mathi mali jase-------------------------------------
                //  ----------------------------------------------------------------
                
                  count={this.state.products.length}
                  size={this.state.size}
                  sort={this.state.sort}
                  filterProducts={this.filterProducts}
                  sortProducts={this.sortProducts}
                  * */}
                <Products
                  addToCart={this.addToCart}
                  // products={this.state.products}//redux store mathi aavse
                ></Products>
              </div>
              <div className="sidebar">
                <Cart
                  cartItems={this.state.cartItems}
                  removeFromCart={this.removeFromCart}
                  createOrder={this.createOrder}
                ></Cart>
              </div>
            </div>
          </main>
          <footer>All Right is reserved.</footer>
        </div>
      </Provider>
    );
  }
}

export default App;
