import React from 'react';
import './App.css';
import inventory from './inventory.ES6';
import ComposeSaladModal from "./ComposeSaladModal";
import ComposeSalad from "./ComposeSalad";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.saladSubmit = this.saladSubmit.bind(this);
    this.state = {
      salads: [],
      inventory: []
    };
  }

  saladSubmit(salad) {
    let tempSalads = [...this.state.salads];
    tempSalads.push(salad)
    this.setState({ salads: tempSalads })
    console.log(salad)
  }

  render() {
    return (
      <div>
        <div className="jumbotron text-center">
          <h1 className="display-4">Brunt & Bajs</h1>
          <p className="lead">Lunds äckligaste sallad</p>
          <hr className="my-4" />
          <p>Gör din rövsallad här!</p>
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#ComposeSaladModal"
          >
            Komponera din egen sallad
      </button>
        </div>
        <ComposeSaladModal inventory={inventory} saladSubmit={this.saladSubmit} />
      </div>
    );
  }
}
export default App;
