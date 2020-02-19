import nextId from "react-id-generator";
import inventory from "./inventory.ES6"
export default class Salad {
    constructor() {
        Object.defineProperty(this, "id", { value: nextId(), writable: false });
        
        this.ingredients = {
            foundation: [],
            protein: [],
            extra: [],
            dressing: []
        }
    }

    addFoundation(ingredient) {
        this.ingredients.foundation.push(ingredient);
    }
    addProtein(ingredient) {
        this.ingredients.protein.push(ingredient);
    }
    addExtra(ingredient) {
        this.ingredients.extra.push(ingredient);
    }
    addDressing(ingredient) {
        this.ingredients.dressing.push(ingredient);
    }


    remove(ingredient) {
        if (ingredient.foundation) {
            this.ingredients.foundation = [];
        }
        if (ingredient.protein) {
            this.ingredients.protein = [];
        }
        if (ingredient.extra) {
            this.ingredients.extra = [];
        }
        if (ingredient.dressing) {
            this.ingredients.dressing = [];
        }
    }

    price() {
        let salad = [].concat(this.ingredients.foundation, this.ingredients.protein, this.ingredients.extra, this.ingredients.dressing);
        return salad.reduce((sum, ingredient) => sum += inventory[ingredient].price, 0);
    }

    print() {
        return (
            " Bas: " +
            this.ingredients.foundation +
            " Protein: " +
            this.ingredients.protein +
            " Extra: " +
            this.ingredients.extra +
            " Dressing: " +
            this.ingredients.dressing
            + " "
        );
    }

}
