export const getDate = () => {
  return new Date().toISOString().replace("T", " ").substring(0, 19);
};

export const dataTemplate = (results) => {
  return {
    ok: true,
    results,
  };
};
