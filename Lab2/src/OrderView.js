import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css'
import React from "react";
const shortid = require('shortid');

class OrderView extends React.Component {
    render() {
        return (
            <ul class="list-group" id="salads">
                {this.props.orderList.map(salad =>
                    <li key={shortid.generate()} class='list-group-item'>{salad.price()}<button type='button' className='btn btn-danger' onClick={() => this.props.saladRemove(salad)}>Ta bort sallad</button></li>)}
            </ul>

        );
    }
}
export default OrderView;