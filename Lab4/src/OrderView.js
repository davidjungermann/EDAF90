import React, { Component } from 'react';

class OrderView extends Component {

  render() {
    return (
      <div className="container w-50">
        <div className="list-group">
          <ol id="orders">
            {this.props.order.map(salad =>
              <li key={salad.id} className="list-group-item py-0 list-group-item-success container d-flex h-100" style={{
                marginTop: 10
              }}>
                <span style={{
                  display: "block",
                  width: 500
                }}>{salad.print()}
                </span>
                <button type='button' className='btn btn-danger' onClick={() => this.props.saladRemove(salad)}>Ta bort sallad</button>
              </li>)}
          </ol>
        </div>
        <button type='button' className="btn btn-success float-right row justify-content-center align-self-center" onClick={() => this.props.postOrder()}>Beställ sallader</button>
      </div>
    )
  }
}

export default OrderView;