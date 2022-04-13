import { API_URL } from "../common/constants";

const cors = (req, res, next) => {
  const isProduction = process.env.NODE_ENV === "production";
  const accessControls = [
    {
      key: "Access-Control-Allow-Origin",
      value: isProduction ? API_URL(process.env.PORT) : "*",
    },
    {
      key: "Access-Control-Allow-Methods",
      value: isProduction ? API_URL(process.env.PORT) : "*",
    },
  ];
  accessControls.forEach((control) => {
    const { key, value } = control;
    res.setHeader(key, value);
  });
  next();
};

export default cors;
