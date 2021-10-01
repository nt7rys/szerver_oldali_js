//to start the tests run 'npm test' in the shell 


//Write a function to check if a given positive number is a multiple of 4 or a multiple of 5 
//the function should return '4', '5', or '4 and 5', 'none' depending  on the divisibility of the number 
//samples
//input: 13, output: 'none'
//input: 20, output: '4 and 5'
//input: 10, output: '5'
function divisible(value) {
  if(value < 0) {
    throw 'not positive';
  }

  const divFive = value % 5 === 0;
  const divFour = value % 4 === 0;

  if(divFour && divFive) {
    return '4 and 5';
  } else if(divFour) {
    return '4';
  } else if(divFive) {
    return '5';
  } else {
    return 'none';
  }
}

//write a function that returns a copy of an array with each element of the original multiplied by 5
//sample input: [3, 11, 5], output: [15, 55, 25]
function multipliedBy5(array) {
  return array.map(num => num * 5);
}

//Write a function to convert a specified positive number to an array of digits
//sapmple input: 123, output [1, 2, 3]
function digitize(val) {
  return Array.from('' + val, Number);
}

//Write a function to convert a csv string to an array of objects
//Property names are the first line of the csv string
//sapmple input:
//`a;b;c
//1;2;4
//4;5;6`
//output: [{a:'1', b:'2', c:'4'}, {a:'4', b:'5', c:'6'}]
function csvToObjArray(csv) {
  const arr = [];
  const csvArr = csv.split('\n');
  const firstRowSplit = csvArr[0].split(';');

  csvArr.forEach((row, index) => {
    if(index !== 0) {
      const rowSplit = row.split(';');
      const rowObj = {};
      rowSplit.forEach((value, i) => {
        rowObj[firstRowSplit[i]] = value;
      });
      arr.push(rowObj);
    }
  });

  return arr;
}

const peopleEndPoint = 'https://swapi.dev/api/people/?page1';

//write a function that sends a request to the above peopleEndPoint
//and returns a promise that resolves with the names of poeple objects returned by the service - the format of the response is json
//the promise resolves with an array like this:
//["Luke Skywalker", "C-3PO", "R2-D2", "Darth Vader"...]

//you can use the globally accessible fetch mehod to send the request
//more info:  https://www.npmjs.com/package/node-fetch#json

function getPeople() {
  return new Promise((resolve, reject) => {
    const response = fetch('https://swapi.dev/api/people/?page1').then(resp => {
      return resp.json();
    })
    .then(data => {
      resolve(data.results.map(character => character.name));
    })
    .catch(err => {
      console.error(err);
    })
  });
}

//write a function that takes a numeric parameter (n) and returns a promise that resolves the nth fibonacci number
//if n < 0 the promise rejects with an error message 

//samples 
//input: 0, output: Promise that resolves with 0
//input: 3, output: Promise that resolves with 2
//input: -11, output: Promise thet reject with an error message 'n has to be larger then -1'
function fibonacci(n) {
  return new Promise((resolve, reject) => {
    if(n < 0) {
      reject('n has to be larger than -1');
    }

    const fib = [0, 1];
    for(let i=fib.length; i<n+1; i++) {
        fib[i] = fib[i-2] + fib[i-1];
    }
    resolve(fib[n]);
  });
}



module.exports = {
  divisible, multipliedBy5, digitize, csvToObjArray, getPeople, fibonacci
}





