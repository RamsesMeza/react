function saludar(name: string): string {
  return `Hola ${name}`;
}

//No se puede cambiar, y algo de objeto this
const saludar2 = (name: string): string => `Hola ${name}`;

const msg = saludar("Ramses");
const msg2 = saludar2("Ramses");

console.log(msg2);
console.log(msg);

//Parametros son los que la funcion deblara que va resicir
//Argumentos son los valores que se pasan

interface User {
  id: number;
  username: string;
}

//Se pueden simplificar el return
function getUser(): User {
  return {
    id: 1,
    username: "RamsesMeza",
  };
}

const getUser2 = (): User => ({
  id: 1,
  username: "RamsesMeza",
});

const user = getUser();
const user2 = getUser2();
console.log(user2);
console.log(user);

//Callbacks
