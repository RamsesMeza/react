const myPromise = new Promise<number>((resolve, reject) => {
  setTimeout(() => {
    resolve(100);
    // reject("No me devolvieron mi dinero");
  }, 3000);
});

myPromise
  .then((money) => {
    console.log(money);
  })
  .catch((reason) => console.log(reason))
  .finally(() => console.log("termine"));
