import bodyParser from "body-parser";
import express from "express";
import swaggerJSdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import router from "./router";
import swaggerOptions from "./swagger/options";

const app = express();
const swaggerSpecs = swaggerJSdoc(swaggerOptions);

app.use(bodyParser.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use("/api", router);

export default app;
