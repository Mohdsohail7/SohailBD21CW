let express = require("express");
let app = express();

// define object
let Person = {
  "firstName": "Mohd", 
  "lastName": " Sohail", 
  "gender": "male", 
  "age": 24,
  "isMember": true
}

// Exercise 1: Return the Person Object
app.get('/person', (req, res) => {
  res.json(Person);
})

// function to return fullname
function getFullName(Person) {
  return Person.firstName + " " + Person.lastName;
}

// Exercise 2: Access the Full Name of the Person
app.get('/person/fullname', (req, res) => {
  let fullName = getFullName(Person);
  res.json({
    fullName: fullName
  });
});

// function to return firstName and gender
function getFirstNameGender(Person) {
  return {
    firstname : Person.firstName, 
    gender : Person.gender
  }
}

// Exercise 3: Access Just the First Name and Gender of the Person
app.get('/person/firstname-gender', (req, res) => {
  let firstNameGender = getFirstNameGender(Person);

  res.json(firstNameGender);
});

// function to return updated object and increment age
function getIncrementAgeAndUpdatedObject(Person) {
  Person.age = Person.age + 1;
  return Person;
}
// Exercise 4: Increment the Age of the Person and Return the Updated Object
app.get('/person/increment-age', (req, res) => {
  let updatedObject = getIncrementAgeAndUpdatedObject(Person);
  res.json(updatedObject);
});

// function to return fullname and isMember
function getFullNameAndisMember(Person) {
  return {
    fullName : getFullName(Person), 
    isMember : Person.isMember
  }
}
// Exercise 5: Return the Full Name and Membership Status of the Person
app.get('/person/fullname-membership', (req, res) => {
  let fullnameAndMembership = getFullNameAndisMember(Person);

res.json(fullnameAndMembership);
});

// function to return final price after discount
function getFinalPriceAfterDiscount(cartTotal, isMember) {
  let finalPrice;
  if (isMember === true) {
    finalPrice = cartTotal - (cartTotal * 10 / 100);
  } else {
    finalPrice = cartTotal;
  }

  return {finalPrice : finalPrice.toFixed(2)};
}

// Exercise 6: Get Final Price After Discount for Members
app.get('/person/final-price', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let finalPrice = getFinalPriceAfterDiscount(cartTotal,Person.isMember);

  res.json(finalPrice);
});

// function to return shipping cost and membership
function getShippingCost(cartTotal, isMember) {
  let shippingCost;
  if (cartTotal > 500 && isMember) {
    shippingCost = 0;
  } else {
    shippingCost = 99;
  }
  return {shippingCost: shippingCost.toFixed(2)}
}

// Exercise 7: Get Shipping Cost Based on Cart Total and Membership Status. 
app.get('/person/shipping-cost', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let shippingCost = getShippingCost(cartTotal, Person.isMember);

  res.json(shippingCost);
});

// port number
let port = 8000;
// server start 
app.listen(port, () => {
  console.log("server is running on the port number is: " + port);
});