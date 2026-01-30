interface SuperHero {
  firstName: string;
  lastName: string;
  age: 10;
  address: {
    city: string;
    postalCode: number;
  };
}

const ironman: SuperHero = {
  firstName: "Ramses",
  lastName: "Meza",
  age: 10,
  address: {
    city: "Aguascalientes",
    postalCode: 1900,
  },
};

const spiderman: SuperHero = {
  firstName: "Piter",
  lastName: "Parker",
  age: 10,
  address: {
    city: "Clavillo",
    postalCode: 0,
  },
};

const postalCode = 19;

// const spiderman = structuredClone(ironman);

// ironman.firstName = "Peter";
// ironman.lastName = "Parker";
// ironman.address.city = "Mexico";

// console.log(ironman, spiderman);

/*
A ver interesante, al parecer si se hace la
copia con spredad separator, no se rompe 
la referencia con objetos anidados
y se pueden modificar. lo que es peligroson
*/
