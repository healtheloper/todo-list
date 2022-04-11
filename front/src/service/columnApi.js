import axios from "axios";

const baseURL = "http://localhost:3000/column/";
const client = axios.create({
  baseURL,
});

const columnApi = {
  getColumns: async () => {
    const response = await client.get("");
    return response.data;
  },
};

export default columnApi;