const getDate = () => {
  return new Date().toISOString().replace("T", " ").substring(0, 19);
};

module.exports = {
  getDate,
};
