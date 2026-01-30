const [goku, , hulk] = ["Goku", "Vegeta", "Hulk"];

console.log({
  goku,
  hulk,
});

//interesante el poner as const porque al destructurar sale
const returnArrayFn = () => {
  return ["ABC", 123] as const;
};

const [letters, numbers] = returnArrayFn();

let suma = numbers + 1;
