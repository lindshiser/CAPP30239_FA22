
// in-line comment

/*
this is a
block comment
*/

let num = 100; //integer

// function

function foo() {
    console.log(num);
};
foo(); // call function

// can't go in function, must be outside
let num1 = 200; 

console.log(num1)



// anonymous function

let anonFun = function() {
    console.log("hello");
};

// another way to write a function
(function bar() {
    console.log("Hello named function");
})(); // called an iffy, needs a semicolon

(() => console.log(100))();

// function foo() {
//     console.log(num);
// };
// or 
// let foo = () => console.log(num);

foo = () => console.log(num1)

let bar = 100;
bar = 200;


// arrays

//let arr = ["foo", "bar", "zar"];
let arr = ["foo", 123, ["zar", "car"]];

// set item in array
// arr[1] = "barbar", // re-overwrites

// add item to end of array
// arr.push("par");

//remvoing an item from the array
arr.splice(2, 1); // start at second item, remove 1 item(s)

console.log(arr);



// create new array

let newArr = ["cow", "turtle", "goat"];

for (let item of newArr) {
    console.log(item)
}

for (let i in newArr) {
    console.log(i + " " + newArr[i]);
}

// loop
newArr.forEach((item, i) => console.log(i + " " + item));



// objects

let obj1 = {
    name: "Jill",
    age: 85,
    job: "Cactus Hunter",
};

// to access property
console.log(obj1.job); // to get job
// or, use bracket notation
console.log(obj1["job"]); // to get job

// to change job from Cactus Hunter to Barista
obj1.job = "Barista";

console.log(obj1.job); // to get new job

// loop through all properties
for (let key in obj1) {
    let value = obj1[key];
    console.log(`This pair is ${key}: ${value}`);
};

// let str = "Hello " + key + " more text here " + foo;
// // or
// let str = `Hello ${key} more text here ${foo}`;

// regular for loop
for (let i = 0; i < 10; i++){
    console.log(i);
}

let val = 80;

if(val >= 80){ 
    console.log("good")
} else if (val > 50) {
    console.log("okay")
} else {
    console.log("terrible")
}

// or, a shortcut
let y = (val >= 80) ? console.log("good") : console.log("not good")
// called a turinery (??) statement


// traversing the dom ("document object model")
// means looking for a certain id, class, in dom
// helpful if you want to add things to div
// d3 and j3 makes it easy!

let newVar = document.getElementById("example");

newVar.innerHTML += "Hello world!"

