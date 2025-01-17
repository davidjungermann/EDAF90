'use strict';
const imported = require("./inventory.js");

// Task 4
let ingrType = {
    foundation: 'Foundations: ',
    extra: 'Extras: ',
    protein: 'Proteins: ',
    dressing: 'Dressings: '
}

let ingredients = imported.inventory;

Object.keys(ingredients).forEach(ingredient => {
    if (ingredients[ingredient].hasOwnProperty('foundation')) {
        ingrType.foundation += ingredient + ','
    } else if (ingredients[ingredient].hasOwnProperty('extra')) {
        ingrType.extra += ingredient + ','
    } else if (ingredients[ingredient].hasOwnProperty('protein')) {
        ingrType.protein += ingredient + ','
    } else if (ingredients[ingredient].hasOwnProperty('dressing')) {
        ingrType.dressing += ingredient + ','
    }
});

//console.log(ingrType.foundation + "\n" + ingrType.extra + "\n" + ingrType.protein + "\n" + ingrType.dressing);

class Salad {
    constructor() {
        this.foundation = [];
        this.protein = [];
        this.extras = [];
        this.dressing = [];
    }

    add(name, ingredient) {

        let ingrObj = {
            name: name,
            ...ingredients[name]
        }

        if (ingredient.hasOwnProperty('foundation')) {
            this.foundation.push(ingrObj);
        } else if (ingredient.hasOwnProperty('protein')) {
            this.protein.push(ingrObj);
        } else if (ingredient.hasOwnProperty('extra')) {
            this.extras.push(ingrObj);
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
            this.extras.splice(this.extras.indexOf(ingredient, 1));
        } else if (ingredient.hasOwnProperty('dressing')) {
            this.dressing.splice(this.dressing.indexOf(ingredient, 1));
        } else {
            console.warn("Provided ingredient type does not exist.")
        }
    }
    // Task 7
    price() {
        let salad = [].concat(this.foundation, this.protein, this.extras, this.dressing);
        return salad.reduce((sum, ingredient) => sum += ingredient.price, 0);
    }
}

class ExtraGreenSalad extends Salad {

    price() {
        let salad = [].concat(this.foundation, this.protein, this.extras, this.dressing);
        return salad.reduce((sum, ingredient) => {
            if (ingredient.hasOwnProperty('foundation'))
                return sum += ingredient.price * 1.3
            return sum += ingredient.price * 0.5
        }, 0);
    }
}

// myCaesarSalad{}: Salad => Prototype{add: [Function], remove: [Function], price: [Function]} =>  myGreenSalad{}: ExtraGreenSalad => Prototype{price: [Function]} => Object {} => null 


class GourmetSalad extends Salad {
    add(name, ingredient, scaling = 1) {

        let ingrObj = {
            name: name,
            scaling: scaling,
            ...ingredients[name]
        }

        if (ingredient.hasOwnProperty('foundation')) {
            this.foundation.push(ingrObj);
        } else if (ingredient.hasOwnProperty('protein')) {
            this.protein.push(ingrObj);
        } else if (ingredient.hasOwnProperty('extra')) {
            this.extras.push(ingrObj);
        } else if (ingredient.hasOwnProperty('dressing')) {
            this.dressing.push(ingrObj);
        } else {
            console.warn("Provided ingredient type does not exist.")
        }
    }
    price() {
        let salad = [].concat(this.foundation, this.protein, this.extras, this.dressing);
        return salad.reduce((sum, ingredient) => sum += ingredient.price * ingredient.scaling, 0);
    }
}

// ----------------------------------------------------------------------------------- // 

class ShoppingBasket {
    constructor() {
        this.salads = [];
    }

    add(salad) {
        this.salads.push(salad);
    }

    remove(salad) {
        let index = this.salads.indexOf(salad);
        this.salads.splice(index, 1);
    }

    price() {
        let sum = 0;
        this.salads.forEach(salad => sum += salad.price());
        return sum;
    }
}

// ------------------------------------------------ //

let mySalad = new Salad();
mySalad.add("Bacon", ingredients.Bacon)
mySalad.add("Avocado", ingredients.Avocado)
mySalad.add("Avocado", ingredients.Avocado)
mySalad.add("Sallad", ingredients.Sallad)
mySalad.remove(ingredients.Avocado);
console.log(mySalad)

let myGreenSalad = new ExtraGreenSalad();
myGreenSalad.add("Bacon", ingredients.Bacon)
myGreenSalad.add("Avocado", ingredients.Avocado)
myGreenSalad.add("Avocado", ingredients.Avocado)
myGreenSalad.add("Sallad", ingredients.Sallad)
myGreenSalad.remove(ingredients.Avocado);
console.log(myGreenSalad)

let myLyxSalad = new GourmetSalad();
myLyxSalad.add("Bacon", ingredients.Bacon, 100)
myLyxSalad.add("Avocado", ingredients.Avocado)
myLyxSalad.add("Avocado", ingredients.Avocado)
myLyxSalad.add("Sallad", ingredients.Sallad)
myLyxSalad.remove(ingredients.Avocado);
console.log(myLyxSalad)

let myBasket = new ShoppingBasket();
myBasket.add(mySalad);
myBasket.add(myGreenSalad);
myBasket.add(myLyxSalad);
console.log(myBasket.price());