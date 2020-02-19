import React, { Component } from 'react';

class OrderView extends Component {

  render() {
    return (
      <ul className="container w-50">
        {this.props.order.map(salad =>
          <li key={salad.id} className="list-group-item py-0 list-group-item-success container d-flex h-100" style={{
            marginTop: 10
          }}>
            <br></br>
            <span style={{
              display: "block",
              width: 500
            }}>{salad.print(salad)}
            </span>
            <button type='button' className="btn btn-danger float-right row justify-content-center align-self-center" onClick={() => this.props.saladRemove(salad)}>Ta bort</button>
            <span className="badge badge-primary badge-pill row justify-content-center align-self-center" style={{
              position: "absolute",
              right: "40px",
              top: "50"
            }}>{salad.price() + " kr"}</span>
          </li>)
        }
        <div>
          <button type='button' className='btn btn-success float-right' onClick={() => this.props.postOrder()}>Beställ sallader</button>
        </div>
      </ul>
    );
  }
}

export default OrderView;