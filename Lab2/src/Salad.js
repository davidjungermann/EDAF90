'use strict';
const ingredients = require("./inventory.ES6.js");

export default class Salad {
    constructor() {
        this.foundation = [];
        this.protein = [];
        this.extra = [];
        this.dressing = [];
    }

    add(ingrType, ingredient) {

        if (ingrType === 'foundation') {
            this.foundation.push(ingredient);
        } else if (ingrType === 'protein') {
            this.protein.push(ingredient);
        } else if (ingrType === 'extra') {
            this.extra.push(ingredient);
        } else if (ingrType === 'dressing') {
            this.dressing.push(ingredient);
        } else {
            console.warn("Provided ingredient type does not exist.")
        }
    }

    remove(ingrType, ingredient) {

        if (ingrType === 'foundation') {
            this.foundation.splice(this.foundation.indexOf(ingredient, 1));
        } else if (ingrType === 'protein') {
            this.protein.splice(this.protein.indexOf(ingredient, 1));
        } else if (ingrType === 'extra') {
            this.extra.splice(this.extra.indexOf(ingredient, 1));
        } else if (ingrType === 'dressing') {
            this.dressing.splice(this.dressing.indexOf(ingredient, 1));
        } else {
            console.warn("Provided ingredient type does not exist.")
        }
    }

    price() {
        let salad = [].concat(this.foundation, this.protein, this.extra, this.dressing);
        return salad.reduce((sum, ingredient) => sum += ingredients[ingredient].price, 0);
    }
}