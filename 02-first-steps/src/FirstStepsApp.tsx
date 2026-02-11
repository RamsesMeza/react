import { MyAwesomeApp } from "./MyAwesomeApp";
import { ItemCounter } from "./shopping-cart/ItemCounter";

export const FirstStepsApp = () => {
  return (
    <div>
      <MyAwesomeApp />
      <ItemCounter productName={"Pokemon"} />
      <ItemCounter productName={"Xbox"} />
      <ItemCounter productName={"Mexico"} />
    </div>
  );
};
