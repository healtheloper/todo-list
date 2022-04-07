export const getDate = () => {
  return new Date().toISOString().replace("T", " ").substring(0, 19);
};

export const sendMethodResult = (callback) => {
  return async function (req, res) {
    try {
      const results = await callback(req, res);
      res.send({
        ok: true,
        results,
      });
    } catch (error) {
      res.send({
        ok: false,
        message: error.message,
      });
    }
  };
};
