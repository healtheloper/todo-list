import app from "./src/app";
import { API_URL } from "./src/common/constants";
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ EXPRESS server is listening on ${API_URL(PORT)}`);
});
