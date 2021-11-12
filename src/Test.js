// short handed
const tameem = (param) => param * param;

// add more code
const ali = (param) => {
  const tameemTesla = true;
  if (tameemTesla) {
     return param * param;
  }
}

// more logic
const beneil = () => {
  const training = true;

  return {
    isTraining: training,
    championBy2022: true
  }
}

//short hand to return object immedieitaly
const beneil2 = () => ({
  championBy2022: true
})


console.log(tameem(2));
console.log(ali(4));