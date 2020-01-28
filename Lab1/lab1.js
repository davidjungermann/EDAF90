'use strict';
const imported = require("./inventory.js");

// Task 4
var ingrType = {
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


// Task 5
class Salad { 
    constructor() {
        this.foundation = [];
        this.protein = [];
        this.extras = [];
        this.dressing = [];
    }

    add(ingrType, ingredient) {

        if (ingrType == 'foundation') {
            this.foundation.push(ingredient);
        } else if (ingrType == 'protein') {
            this.protein.push(ingredient);
        } else if (ingrType == 'extras') {
            this.extras.push(ingredient);
        } else if (ingrType == 'dressing') {
            this.dressing.push(ingredient);
        } else {
            console.warn("Provided ingredient type does not exist.")
        }
    }

    remove(ingrType, ingredient) {

        if (ingrType == 'foundation') {
            this.foundation.splice(this.foundation.indexOf(ingredient, 1));
        } else if (ingrType == 'protein') {
            this.protein.splice(this.protein.indexOf(ingredient, 1));
        } else if (ingrType == 'extras') {
            this.extras.splice(this.extras.indexOf(ingredient, 1));
        } else if (ingrType == 'dressing') {
            this.dressing.splice(this.dressing.indexOf(ingredient, 1));
        } else {
            console.warn("Provided ingredient type does not exist.")
        }
    }
    // Task 7
    price() {
        var salad = [].concat(this.foundation, this.protein, this.extras, this.dressing);
        return salad.reduce((sum, ingredient) => sum += ingredients[ingredient].price, 0);
    }
}
// Task 6

let myCaesarSalad = new Salad();
myCaesarSalad.add('foundation', 'Sallad + Pasta'); // 10
myCaesarSalad.add('protein', 'Kycklingfilé'); // 10
myCaesarSalad.add('extras', 'Bacon'); // 10
myCaesarSalad.add('extras', 'Krutonger'); // 5
myCaesarSalad.add('extras', 'Körsbärstomater'); // 5
myCaesarSalad.add('extras', 'Parmesan'); // 5
myCaesarSalad.add('dressing', 'Caesardressing'); // 5 
myCaesarSalad.add('extras', 'Banan');
myCaesarSalad.remove('extras', 'Banan');

console.log(myCaesarSalad.price())

// Task 8

class ExtraGreenSalad extends Salad {

    price() {
        var salad = [].concat(this.foundation, this.protein, this.extras, this.dressing);
        return salad.reduce((sum, ingredient) => {
            if ("foundation" in ingredients[ingredient])
                return sum += ingredients[ingredient].price * 1.3
            return sum += ingredients[ingredient].price * 0.5
        }, 0);
    }
}

let myGreenSalad = new ExtraGreenSalad();
myGreenSalad.add('foundation', 'Sallad + Pasta'); // 10
myGreenSalad.add('protein', 'Kycklingfilé'); // 10
myGreenSalad.add('extras', 'Bacon'); // 10
myGreenSalad.add('extras', 'Krutonger'); // 5
myGreenSalad.add('extras', 'Körsbärstomater'); // 5
myGreenSalad.add('extras', 'Parmesan'); // 5
myGreenSalad.add('dressing', 'Caesardressing'); // 5 
myGreenSalad.add('extras', 'Banan');
myGreenSalad.remove('extras', 'Banan');

console.log(myGreenSalad.price())

// Task 9 

// myCaesarSalad{}: Salad => Prototype{add: [Function], remove: [Function], price: [Function]} =>  myGreenSalad{}: ExtraGreenSalad => Prototype{price: [Function]} => Object {} => null 

// Task 10

class GourmetSalad extends Salad {

    // Scaling to 1 by default. 
    add(ingrType, ingredient, scaling = 1) {

        if (ingrType == 'foundation') {
            this.foundation.push({
                ingredient: ingredient,
                scaling: scaling
            });
        } else if (ingrType == 'protein') {
            this.protein.push({
                ingredient: ingredient,
                scaling: scaling
            });
        } else if (ingrType == 'extras') {
            this.extras.push({
                ingredient: ingredient,
                scaling: scaling
            });
        } else if (ingrType == 'dressing') {
            this.dressing.push({
                ingredient: ingredient,
                scaling: scaling
            });
        } else {
            console.warn("Provided ingredient type does not exist.")
        }
    }
    price() {
        var salad = [].concat(this.foundation, this.protein, this.extras, this.dressing);
        return salad.reduce((sum, ingredient) => sum += ingredients[ingredient.ingredient].price * ingredient.scaling, 0);
    }
}

let myGourmetSalad = new GourmetSalad();
myGourmetSalad.add('foundation', 'Sallad + Pasta'); // 10
myGourmetSalad.add('protein', 'Kycklingfilé'); // 10
myGourmetSalad.add('extras', 'Bacon'); // 10
myGourmetSalad.add('extras', 'Krutonger'); // 5
myGourmetSalad.add('extras', 'Körsbärstomater'); // 5
myGourmetSalad.add('extras', 'Parmesan'); // 5
myGourmetSalad.add('dressing', 'Caesardressing'); // 5 
myGourmetSalad.add('extras', 'Parmesan');
myGourmetSalad.remove('extras', 'Parmesan');
console.log(myGourmetSalad.price());

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

let basket = new ShoppingBasket();
basket.add(myCaesarSalad);
basket.add(myGreenSalad);
basket.add(myGourmetSalad);
basket.remove(myGourmetSalad);
console.log(basket.price());