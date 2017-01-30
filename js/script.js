function galvanizeDelivers() {
// declaring my variables for getting items from the DOM
  const burger = document.getElementById('burgerOrder');
  const pizza = document.getElementById('pizzaOrder');
  const iceCream = document.getElementById('iceCreamOrder');
  const ribs = document.getElementById('ribsOrder');
  const orderTable = document.getElementById('orderForm');
  const subTotal = document.getElementById('subTotal');
  const taxTotal = document.getElementById('taxTotal');
  const grandTotal = document.getElementById('grandTotal');
  const orderButton = document.getElementById('order');
  const name = document.getElementById('name');
  const tel = document.getElementById('phone');
  const address = document.getElementById('address');
  const foodOrder = document.getElementsByClassName('orderedFood');
  const resetCart = document.getElementById('reset');
  const storage = localStorage.getItem('table');

// declaring my changing variables
  let foodRows = '';
  let sum = 0;
  let tax = 0;
  let finalTot = 0;

// function for validating numbers. Some people use dashes when writing their
// numbers so I didn't want numbers with dashes to not be validated
  function telDashRemove(number) {
    const noDash = [];
    for (let i = 0; i < number.length; i++) {
      if (number[i] !== '-') {
        noDash.push(number[i]);
      }
    }
    return noDash.join('');
  }

// prints all the food in the order into a string to be used in the toast at the end
  function foodPrinter() {
    const wholeOrder = [];
    let foodString = '';
    for (let i = 0; i < foodOrder.length; i++) {
      wholeOrder.push(foodOrder[i].innerText);
    }
    if (wholeOrder.length === 1) {
      return wholeOrder[0];
    }
    else if (wholeOrder.length === 2){
      return `${wholeOrder[0]} and ${wholeOrder[1]}`;
    }
    else {
      for (let x = 0; x < wholeOrder.length; x++) {
        if (x !== wholeOrder.length - 1) {
          foodString += ` ${wholeOrder[x]},`;
        }
        else {
          foodString += ` and ${wholeOrder[x]}`;
        }
      }
      return foodString;
    }
  }

// localStorage - if localStorage is null nothing is added but if localStorage
// is populated then it will fill in everything
if (storage !== null) {
  orderTable.innerHTML = storage;
  subTotal.innerHTML = `$${localStorage.sum}`;
  taxTotal.innerHTML = `$${localStorage.tax}`;
  grandTotal.innerHTML = `$${localStorage.total}`;
  foodRows = localStorage.table;
  sum = Number(localStorage.sum);
  tax = Number(localStorage.tax);
  finalTot = Number(localStorage.total);
}

// one master function for clicking on the items to prevent DRY
function itemCreator(item, description, cost) {
  item.addEventListener('click', function() {
// creating rows with data for every click
    const row = document.createElement('tr');
    const food = document.createElement('td');
    const price = document.createElement('td');

// setting the attributes and data within rows
    row.setAttribute('class', 'foodRow');
    food.setAttribute('class', 'orderedFood');
    price.setAttribute('class', 'right');
    food.innerHTML = description;
    price.innerHTML = `$${cost}`;
    row.append(food);
    row.append(price);
    orderTable.append(row);

// setting all the variables based on the clicks for pricing
    sum += cost;
    tax = sum * 0.15;
    finalTot = sum + tax;
    subTotal.innerHTML = `$${sum.toFixed(2)}`;
    taxTotal.innerHTML = `$${tax.toFixed(2)}`;
    grandTotal.innerHTML = `$${finalTot.toFixed(2)}`;
// setting all of the conditions for localStorage
    foodRows += `<tr><td class='orderedFood'>${description}</td><td class='right'>$${cost}</td></tr>`;
    localStorage.setItem('table', foodRows);
    localStorage.setItem('sum', sum.toFixed(2));
    localStorage.setItem('tax', tax.toFixed(2));
    localStorage.setItem('total', finalTot.toFixed(2));
  });
}

// calling all functions with the proper items
  itemCreator(burger, 'Royale with Cheese', 8.99);
  itemCreator(pizza, 'Arugala Pie', 11.99);
  itemCreator(iceCream, 'Ice Cream Biscuit', 7.99);
  itemCreator(ribs, 'Smoked Swine', 14.99);

// order button and validation
  orderButton.addEventListener('click', function() {
// Form validates to make sure it has at least 1 value. Adding in a validator to
// put in atleast 2 letters into their name also making sure it is not numbers
    event.preventDefault()
    if (name.value.length < 2 || isNaN(name.value) === false) {
      Materialize.toast('Please enter a valid name!', 4000);
  }
// Checking for if its all numbers and the number is 7 characters long
    else if (isNaN(telDashRemove(tel.value)) === true || telDashRemove(tel.value).length < 10) {
      Materialize.toast('Please enter a valid Phone Number with area code!', 4000);
    }
// Checking to make sure the first spot in the address value is a number and more than 5 characters
    else if (isNaN(address.value[0]) === true || address.value.length < 5) {
      Materialize.toast('Please enter a valid Address! Addresses must start with numbers', 4000);
    }
// Validating theres an order.
    else if (foodOrder.length === 0) {
      Materialize.toast('Please order some food!!!', 4000);
    }
// If everything is successfully validated show success toast for 10 seconds and
// clear localStorage upon reload
    else {
      Materialize.toast(`Thank you ${name.value} for your order from Galvanize Delivers!
        Your food will be delivered to ${address.value}. If we have any issues we will call you at
        ${tel.value}. Your order is ${foodPrinter()}. Your total today is $${finalTot.toFixed(2)}.
        If you have any questions please call us at 415-805-1888`, 10000);
      localStorage.clear();
    // reloads page after 11 seconds
      setTimeout(function() { location.reload() }, 11000);
    }

  });

  resetCart.addEventListener('click', function() {
    localStorage.clear();
  });

}

galvanizeDelivers();
