import React, { Component } from 'react';

class OrderView extends Component {

  render() {
    return (
      <div className="container">
        <div className="list-group">
          <ol id="orders">
            {this.props.inputSalad.map(salad =>
              <li key={this.props.inputSalad.indexOf(salad)} className='list-group-item clearfix' >{salad.print()}
                <button type='button' className='btn btn-danger' onClick={() => this.props.handleSaladRemove(salad)}>Ta bort sallad</button>
              </li>)}
          </ol>
        </div>
        <div>
          <button type='button' className='btn btn-success' onClick={() => this.props.submitOrder()}>Beställ sallader</button>
        </div>
      </div>
    )
  }
}

export default OrderView;