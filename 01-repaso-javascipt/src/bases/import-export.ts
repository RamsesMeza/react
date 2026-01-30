import { heroes, type Hero, type Owner } from "../data/heroes.data";

const getHeroById = (id: number): Hero | null => {
  return heroes.find((hero) => hero.id === id) ?? null;
};

const getHeroByOwner = (owner: Owner): Hero[] => {
  return heroes.filter((hero) => hero.owner === owner);
};

let hero = getHeroById(6);

const heroesFiltered = getHeroByOwner("Marvel");

console.log(heroesFiltered);

if (hero) {
  console.log(hero);
} else {
  console.log("There is not a hero");
}
