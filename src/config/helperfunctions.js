const removeDuplicate = (array) => {
  const pure = [];

  for (let item of array) {
    if (pure.includes(item) == false) {
      pure.push(item);
    }
  }

  return pure;
};

module.exports = { removeDuplicate };
