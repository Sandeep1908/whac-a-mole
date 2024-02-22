const getRandomNumber = () => {
  const randomDecimal = Math.random();
  const randomNumber = Math.floor(randomDecimal * 9);
  return randomNumber;
};

export default getRandomNumber;
