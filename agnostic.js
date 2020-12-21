// Given an array of integers, implement a method that reorders them in ascending direction,
// without using the sorting methods provided by the chosen language (such as #sort and #sort_by on ruby),
// and describe their operation and complexity.
const sortMe = (numbers) => {
  let newArray = [];
  if (Array.isArray(numbers)) {
    for (let i = 0; i < numbers.length; i++) {  // looping through each element of the array
      for (let j = 0; j < numbers.length; j++) { // looping through each element of the array within the first loop
        if (numbers[i] < numbers[j]) { // comparing if numbers[i] is less than numbers[j]
          newArray = numbers[j]; // saving numbers[j] into newArray to keep the element
          numbers[j] = numbers[i]; // then overrides numbers[j] with numbers[i] so the smaller number goes down an index -- this is where part 1 of the switch happens
          numbers[i] = newArray; // then saves newArray which is number[j] in the bigger index -- SWITCHED!
        }
      }
    }
    return numbers;
  }
};

// Given an array of ordered strings, implement a #search (item) function that returns
// the position of the searched element, without using the search methods of the standard library of the
// language in use (e.g. #filter on node or #detect on ruby).
const findIndex = (array, word) => {
  let numIndex;
  for (let element in array ) {
    if (array[element] === word) {
      return numIndex = element;
    }
  }
}

// Given an array with various levels of nesting, implement a method that flattens the array without using
// utility libraries such as lodash or underscore.
// Example: for the array [1,[4,5],[2,[3,4]]] the result is [1,4,5,2,3,4].
const flattenMe = (array) => {
  let result = [];
  let rest = array, first;
  while(rest.length > 0) {
    first = rest[0];
    if(Array.isArray(first)) {
    Array.prototype.splice.apply(rest, [0, 1].concat(first));
  } else {
    result.push(first);
    rest.splice(0, 1);
  }
}
  return result;
}




let numbers = [1, 9, 5, 2, 0, 8, 2, 3];
let orderedStrings = ["snickers", "is", "the", "best", "puppy", "in", "the", "world"];
let fluffyArray = ["unicorns", ["rainbowBryte", "teddybears"], ["fairies", "mermaids"], "sirens"];

console.log(sortMe(numbers));
console.log(findIndex(orderedStrings, "snickers"));
console.log(flattenMe(fluffyArray))
