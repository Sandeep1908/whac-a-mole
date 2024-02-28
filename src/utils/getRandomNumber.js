const getRandomNumber = () => {
  const randomDecimal = Math.random();
  const randomNumber = Math.floor(randomDecimal * 12);
  return randomNumber;
};

export default getRandomNumber;
