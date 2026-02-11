const useState = (initialValue: string) => {
  const setValue = (newValue: string) => console.log(newValue);

  return [initialValue, setValue] as const;
};

const [value, setValue] = useState("Ram");

console.log(value);
setValue("XD");
