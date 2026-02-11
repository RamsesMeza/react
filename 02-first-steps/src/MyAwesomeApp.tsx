const name = "Fernando 2";
const lastName = "Herrera";

const names = ["Ramses", "Fernando", "Maury", "Leonel"];

export const MyAwesomeApp = () => {
  return (
    <>
      <h1>{name} </h1>
      <h2>{lastName}</h2>

      {names.map((values) => (
        <div>{values}</div>
      ))}
    </>
  );
};
