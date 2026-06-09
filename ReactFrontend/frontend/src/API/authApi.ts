import axios from "axios";
const API_URL = "http://localhost:8080/api/auth";

export const login = (
  email: string,
  password: string
) => {

  return axios.post(
    `${API_URL}/login`,
    {
      email,
      password
    }
  );
};

export const register = (
  name: string,
  email: string,
  password: string
) => {
  return axios.post(`${API_URL}/register`, {
    name,
    email,
    password
  });
};


