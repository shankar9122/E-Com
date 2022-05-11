import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Home/Home";
import Cart from "./components/Cart";
import Header from "./Home/Header";
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <div className="container">
            <main>
              <Route path="/" component={Home} exact />
              <Route path="/Cart" component={Cart} />
            </main>
            <footer>All right is reserved.</footer>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
