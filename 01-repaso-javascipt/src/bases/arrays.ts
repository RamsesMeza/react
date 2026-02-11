const myArray: number[] = [1, 2, 3, 4];

const myArray2 = structuredClone(myArray);

myArray.push(10);

console.log(myArray, myArray2);

//No sabia que era un forof
for (const number of myArray) {
  console.log(number + 10);
}
