import axios from "axios";

export const login = async (email: string, password: string) => {

  const payload = {
    email,
    password
  };

  console.log("URL:", "http://localhost:8080/api/auth/login");
  console.log("Payload:", payload);

  return axios.post(
    "http://localhost:8080/api/auth/login",
    payload
  );
};

export const register = async (email: string, password: string, mobile: string) => {

  const payload = {
    email,
    mobile,
    password
  };

  console.log("URL:", "http://localhost:8080/api/auth/register");
  console.log("Payload:", payload);

  return axios.post(
    "http://localhost:8080/api/auth/register", payload
  );
};
