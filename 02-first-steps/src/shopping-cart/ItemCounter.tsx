import { useState } from "react";

interface Props {
  productName: string;
}

export const ItemCounter = ({ productName }: Props) => {
  const [counter, setCounter] = useState<number>(1);

  const increment = () => setCounter((prev) => prev - 1);
  const decrement = () => setCounter((prev) => prev + 1);

  function nameOfTheFunction() {}

  nameOfTheFunction();

  return (
    <section
      style={{
        width: "200px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
      }}
    >
      <span>{productName}</span>
      <div
        style={{
          display: "flex",
          gap: 3,
        }}
      >
        <button onClick={decrement}>-</button>
        <span>{counter}</span>
        <button onClick={increment}>+</button>
      </div>
    </section>
  );
};
