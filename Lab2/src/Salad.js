import inventory from './inventory.ES6';
export default class Salad {
    constructor() {
        this.foundation = [];
        this.protein = [];
        this.extra = [];
        this.dressing = [];
    }

    add(name, ingredient) {

        let ingrObj = {
            name: name,
            ...inventory[name]
        }

        if (ingredient.hasOwnProperty('foundation')) {
            this.foundation.push(ingrObj);
        } else if (ingredient.hasOwnProperty('protein')) {
            this.protein.push(ingrObj);
        } else if (ingredient.hasOwnProperty('extra')) {
            this.extra.push(ingrObj);
        } else if (ingredient.hasOwnProperty('dressing')) {
            this.dressing.push(ingrObj);
        } else {
            console.warn("Provided ingredient type does not exist.")
        }
    }

    remove(ingredient) {

        if (ingredient.hasOwnProperty('foundation')) {
            this.foundation.splice(this.foundation.indexOf(ingredient, 1));
        } else if (ingredient.hasOwnProperty('protein')) {
            this.protein.splice(this.protein.indexOf(ingredient, 1));
        } else if (ingredient.hasOwnProperty('extra')) {
            this.extra.splice(this.extra.indexOf(ingredient, 1));
        } else if (ingredient.hasOwnProperty('dressing')) {
            this.dressing.splice(this.dressing.indexOf(ingredient, 1));
        } else {
            console.warn("Provided ingredient type does not exist.")
        }
    }
    // Task 7
    price() {
        let salad = [].concat(this.foundation, this.protein, this.extra, this.dressing);
        return salad.reduce((sum, ingredient) => sum += ingredient.price, 0);
    }
}