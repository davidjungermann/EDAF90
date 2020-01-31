import React from "react";
import Salad from "./Salad";
class ComposeSalad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foundation: [],
            protein: [],
            extras: [],
            dressing: [],
            price: 0
        };
        this.handleFoundationChange = this.handleFoundationChange.bind(this);
        this.handleDressingChange = this.handleDressingChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFoundationChange(event) {
        this.setState({ foundation: event.target.value });
    }

    handleProteinChange(event) {

    }

    handleExtraChange(event) {

    }


    handleDressingChange(event) {
        this.setState({ dressing: event.target.value });
    }

    handleSubmit(event) {
        alert('Basen är: ' + this.state.foundation + 'Dressingen är: ' + this.state.dressing);
        event.preventDefault();
    }

    render() {
        const inventory = this.props.inventory;

        if (!inventory) {
            alert("inventory is undefined in ComposeSalad");
        }

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
                    <select value={this.state.foundation} onChange={this.handleFoundationChange}>
                        <option value="" selected disabled hidden>Välj salladsbas</option>
                        {foundations.map(ingredient => <option key={ingredient} value={ingredient}>
                            {ingredient + ' (' + inventory[ingredient].price + 'kr' + ')'}</option>)}
                    </select>
                    <p></p>

                    <h4>Protein:</h4>
                    <input
                        name="extras"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleExtraChange} />
                    <p></p>

                    <h4>Extraingredienser:</h4>
                    <input
                        name="extras"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleExtraChange} />
                    <p></p>

                    <h4>Dressing:</h4>
                    <select value={this.state.dressings} onChange={this.handleDressingChange}>
                        <option value="" selected disabled hidden>Välj salladsdressing</option>
                        {dressings.map(ingredient => <option key={ingredient} value={ingredient}>
                            {ingredient + ' (' + inventory[ingredient].price + 'kr' + ')'}</option>)}
                    </select>
                    <p></p>

                    <input type="submit" value="Lägg till sallad" />
                </form>
            </div>
        );
    }
}

export default ComposeSalad;
