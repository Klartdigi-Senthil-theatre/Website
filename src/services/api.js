import axios from "axios";

const api = axios.create({
  baseURL: "https://theatre-app-backend-api-fuarhje3aceffkcu.centralindia-01.azurewebsites.net/api",
});

export default api;