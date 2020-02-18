import React, { Component } from 'react';
import Salad from "./Salad";
import 'bootstrap/dist/css/bootstrap.css';

class ComposeSalad extends Component {
    constructor(props) {
        super(props);
        this.state = { foundation: '', protein: [], extra: [], dressing: '', salad: new Salad() };

        this.handleFoundation = this.handleFoundation.bind(this);
        this.handleProtein = this.handleProtein.bind(this);
        this.handleExtra = this.handleExtra.bind(this);
        this.handleDressing = this.handleDressing.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFoundation(event) {
        this.setState({ foundation: event.target.value });
    }

    handleProtein(event) {
        let newList = [...this.state.protein]
        if (!event.target.checked) {
            newList = newList.filter(name => (name !== event.target.value));
        } else {
            newList.push(event.target.value);
        }
        this.setState({ protein: newList });
    }

    handleExtra(event) {
        let newList = [...this.state.extra]
        if (!event.target.checked) {
            newList = newList.filter(name => (name !== event.target.value));
        } else {
            newList.push(event.target.value);
        }
        this.setState({ extra: newList });
    }

    handleDressing(event) {
        this.setState({ dressing: event.target.value });
    }

    handleSubmit(event) {
        if (event.target.checkValidity() === true) {
            this.buildSalad();
            this.props.history.push('/order-view');
        }
        event.target.classList.add("was-validated");
        event.preventDefault();
    }

    buildSalad() {
        this.state.salad.addFoundation(this.state.foundation);
        this.state.protein.map(p => this.state.salad.addProtein(p));
        this.state.extra.map(e => this.state.salad.addExtra(e));
        this.state.salad.addDressing(this.state.dressing);

        this.props.handleSaladSubmit(this.state.salad);

        this.setState({
            foundation: '',
            protein: [],
            extra: [],
            dressing: '',
            salad: new Salad()
        });
    }

    render() {
        const inventory = this.props.inventory;
        if (!inventory) {
            alert("inventory is undefined in ComposeSalad");
        }
        let foundations = Object.keys(inventory).filter(name => inventory[name].foundation);
        let proteins = Object.keys(inventory).filter(name => inventory[name].protein);
        let extras = Object.keys(inventory).filter(name => inventory[name].extra);
        let dressings = Object.keys(inventory).filter(name => inventory[name].dressing);

        return (
            <div onSubmit={this.handleSubmit}>
                <form className="form-div" noValidate>
                    <div className="form-group row">
                        <h4>Bas:</h4>
                        <select required className="form-control" value={this.state.foundation} onChange={this.handleFoundation}>
                            <option selected disabled value="">Välj salladsbas</option>
                            {foundations.map(ingredient => <option key={ingredient} value={ingredient}>
                                {ingredient + ' +' + inventory[ingredient].price + 'kr'}</option>)}
                        </select>
                        <div className="invalid-feedback">
                            Välj en bas till din sallad.
                        </div>
                    </div>
                    <p></p>

                    <h4>Protein:</h4>

                    {proteins.map(ingredient => (
                        <div key={ingredient}>
                            <input
                                type="checkbox"
                                name="protein"
                                value={ingredient}
                                checked={this.state.protein.includes(ingredient)}
                                onChange={this.handleProtein}
                            />
                            {" " + ingredient + " +" + inventory[ingredient].price + " kr"}
                        </div>
                    ))}
                    <p></p>

                    <h4>Extraingredienser:</h4>
                    {extras.map(ingredient => (
                        <div key={ingredient}>
                            <input
                                type="checkbox"
                                name="extras"
                                value={ingredient}
                                checked={this.state.extra.includes(ingredient)}
                                onChange={this.handleExtra}
                            />
                            {" " + ingredient + " +" + inventory[ingredient].price + " kr"}
                        </div>
                    ))}
                    <p></p>

                    <div className="form-group row">
                        <h4>Dressing:</h4>
                        <select required className="form-control" value={this.state.dressing} onChange={this.handleDressing}>
                            <option selected disabled value="">Välj salladsdressing</option>
                            {dressings.map(ingredient => <option key={ingredient} value={ingredient}>
                                {ingredient + ' +' + inventory[ingredient].price + 'kr'}</option>)}
                        </select>
                        <div className="invalid-feedback">
                            Välj en dressing till din sallad.
                        </div>
                    </div>
                    <p></p>
                    <button
                        type="submit"
                        className="btn btn-success"
                        data-target="./ComposeSalad">
                        Lägg till sallad och gå till varukorgen
                    </button>
                </form>
            </div>
        );

    }
}

export default ComposeSalad;