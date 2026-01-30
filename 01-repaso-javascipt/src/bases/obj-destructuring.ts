const person = {
  name: "Tony",
  age: 45,
  kay: "Iroman",
};

// const name = person.name;
const { age, kay, name: ironmanName } = person;
console.log({ age, ironmanName, kay });

interface Hero {
  name: string;
  age: number;
  key: string;
  rank?: string;
}

const useContext = (hero: Hero) => {
  const { name, key, age, rank } = hero;

  return {
    keyName: key,
    user: {
      name,
      age,
    },
    rank,
  };
};

const {
  keyName,
  user: { name },
  rank = "sin rango",
} = useContext({
  age: 10,
  key: "hola",
  name: "Ramses",
});

console.log({
  keyName,
  rank,
  name,
});
