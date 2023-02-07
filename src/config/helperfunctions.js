const bcrypt = require("bcrypt");

const removeDuplicate = (array) => {
  const pure = [];

  for (let item of array) {
    if (pure.includes(item) == false) {
      pure.push(item);
    }
  }

  return pure;
};

const hashPassword = async (plain_password) => {
  return await bcrypt.hash(plain_password, 4);
};

const comparePassword = async (plain_password, hashed_password) => {
  return await bcrypt.compare(plain_password, hashed_password);
};

module.exports = { removeDuplicate, hashPassword, comparePassword };
