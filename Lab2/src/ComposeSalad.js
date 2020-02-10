import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css'
import React from "react";
import Salad from "./Salad";

class ComposeSalad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foundation: '',
            protein: [],
            extra: [],
            dressing: ''
        };
        this.handleFoundation = this.handleFoundation.bind(this);
        this.handleProtein = this.handleProtein.bind(this);
        this.handleExtra = this.handleExtra.bind(this);
        this.handleDressing = this.handleDressing.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    getInventory() {
        const inventory = this.props.inventory;

        if (!inventory) {
            alert("inventory is undefined in ComposeSalad");
        }
        return inventory;
    }

    handleFoundation(event) {
        this.setState({ foundation: event.target.value });
    }

    handleProtein(event) {
        let proteins = [...this.state.protein]

        if (event.target.checked) {
            proteins.push(event.target.value)
        } else {
            proteins.splice(proteins.indexOf(event.target.value, 1));
        }
        this.setState({ protein: proteins })
    }

    handleExtra(event) {
        let extras = [...this.state.extra]

        if (event.target.checked) {
            extras.push(event.target.value)
        } else {
            proteins = proteins.filter(name => (name !== event.target.value));
        }
        this.setState({ extra: extras })
    }

    handleDressing(event) {
        this.setState({ dressing: event.target.value });
    }

    createSalad() {
        let inventory = this.getInventory();
        let salad = new Salad();
        salad.add(this.state.foundation, inventory[this.state.foundation]);
        this.state.protein.forEach(e => salad.add(e, inventory[e]));
        this.state.extra.forEach(e => salad.add(e, inventory[e]));
        salad.add(this.state.dressing, inventory[this.state.dressing]);
        return salad;
    }

    clearState() {
        this.setState({
            foundation: '',
            protein: [],
            extra: [],
            dressing: ''
        })
    }

    handleSubmit(event) {
        this.props.saladSubmit(this.createSalad());
        this.clearState();
        event.preventDefault();
    }

    render() {

        const inventory = this.getInventory();

        let foundations = Object.keys(inventory).filter(
            name => inventory[name].foundation
        );

        let proteins = Object.keys(inventory).filter(
            name => inventory[name].protein
        );

        let extras = Object.keys(inventory).filter(
            name => inventory[name].extra
        );

        let dressings = Object.keys(inventory).filter(
            name => inventory[name].dressing
        );

        return (
            <div className="container" onSubmit={this.handleSubmit}>
                <form>
                    <h4>Bas:</h4>
                    <select className="browser-default custom-select" value={this.state.foundation} onChange={this.handleFoundation}>
                        <option value="" disabled hidden>Välj salladsbas</option>
                        {foundations.map(ingredient => <option key={ingredient} value={ingredient}>
                            {ingredient + ' +' + inventory[ingredient].price + 'kr'}</option>)}
                    </select>
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
                            {" " + ingredient + " +" + inventory[ingredient].price + " kr"}</div>
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
                            {" " + ingredient + " +" + inventory[ingredient].price + " kr"}</div>
                    ))}
                    <p></p>

                    <h4>Dressing:</h4>
                    <select className="browser-default custom-select" value={this.state.dressing} onChange={this.handleDressing}>
                        <option value="" disabled hidden>Välj salladsdressing</option>
                        {dressings.map(ingredient => <option key={ingredient} value={ingredient}>
                            {ingredient + ' +' + inventory[ingredient].price + 'kr'}</option>)}
                    </select>
                    <p></p>
                    <button
                        type="submit"
                        className="btn btn-success"
                        data-target="./ComposeSalad">
                        Lägg till sallad
                    </button>
                </form>
            </div>
        );
    }
}

export default ComposeSalad;
