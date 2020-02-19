import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'mdbreact/dist/css/mdb.css'

import OrderView from "./OrderView";
import ComposeSalad from './ComposeSalad';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Salad from './Salad';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { order: [], inventory: {} };
    this.saladSubmit = this.saladSubmit.bind(this);
    this.saladRemove = this.saladRemove.bind(this);
    this.postOrder = this.postOrder.bind(this);
  }

  postOrder() {
    fetch("http://localhost:8080/orders/", {
      crossDomain: true,
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.order)
    })
      .then(response => response.json())
      .then(data => alert(JSON.stringify(data)));

    this.setState({ order: [] });
    window.localStorage.clear();
  }

  fetchInventory() {
    let tempInventory = {};
    let params = ["foundations", "proteins", "extras", "dressings"];
    let url = 'http://localhost:8080/';

    Promise.all(
      params.map(async param => {
        const response = await fetch(url + param, {
          method: "GET",
          mode: "cors",
          cache: "default"
        });

        const response_1 = await response.json();
        Promise.all(response_1.map(async ingredient => {
          const response_2 = await fetch((url + param + '/' + ingredient), {
            method: "GET",
            mode: "cors",
            cache: "default"
          });
          const response_3 = await response_2.json();
          tempInventory = { ...tempInventory, [ingredient]: response_3 };
        })).then(() => {
          this.setState({ inventory: tempInventory });
        });
      })
    );
  }

  componentDidMount() {
    let order = JSON.parse(window.localStorage.getItem('salads'));
    if (order != null) {
      order.forEach(salad => Object.setPrototypeOf(salad, Salad.prototype));
      this.setState({ order: order });
      console.log(order);
    }
    this.fetchInventory();
  }

  saladSubmit(salad) {
    let tempSalads = [...this.state.order]
    tempSalads.push(salad);
    this.setState({ order: tempSalads })
    window.localStorage.setItem('salads', JSON.stringify(tempSalads));
  }

  saladRemove(salad) {
    let tempSalads = [...this.state.order];
    let index = tempSalads.indexOf(salad);
    tempSalads.splice(index, 1);
    this.setState({ order: tempSalads });
    window.localStorage.setItem('salads', JSON.stringify(this.state.order));
  }

  render() {
    const compose = (params) => <ComposeSalad {...params} inventory={this.state.inventory} saladSubmit={this.saladSubmit} />;
    const order = (params) => <OrderView {...params} order={this.state.order} saladRemove={this.saladRemove} postOrder={this.postOrder} />;

    return (
      <Router>
        <div className="jumbotron text-center" style={{ "marginTop": "-50px" }}>
          <h1 className="display-4">🌱 PLANTS 🌱</h1>
          <p className="lead">Lunds äckligaste sallad</p>
          <ul className="nav nav-pills" style={{ "marginBottom": "-60px" }}>
            <li>
              <Link className="nav-link" to="/compose-salad" style={{ "color": "green" }}>Komponera din sallad</Link>
            </li>
            <li>
              <Link className="nav-link" to="/order-view" style={{ "color": "green" }}>Beställning</Link>
            </li>
          </ul>
        </div>
        <div className="container w-25">
          <Route path="/compose-salad" render={compose}></Route>
        </div>
        <div>
          <Route path="/order-view" render={order}></Route>
        </div>
        <div>
          <Route path="/ingredient-view/:ingredient" ></Route>
        </div>
      </Router>
    );
  }
}

export default App;
