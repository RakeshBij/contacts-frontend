import axios from "axios";
import Cookies from "js-cookie";

const apiUrl = `https://contacts-backend-production.up.railway.app/api`;

export const signup = async function (payload) {
  let message = "";
  let err = "";
  try {
    const response = await axios.post(`${apiUrl}/auth/signup`, payload);
    const data = response.data;
    const token = data.token;
    const user = data.user;
    localStorage.setItem("user", JSON.stringify(user));
    Cookies.set("token", token);
    message = "Signed up";
  } catch (error) {
    err = error.response.data.message;
  }
  return { message, err };
};

export const login = async function (payload) {
  let message = "";
  let err = "";
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, payload);
    const data = response.data;
    const token = data.token;
    const user = data.user;
    localStorage.setItem("user", JSON.stringify(user));
    Cookies.set("token", token);
    message = "Logged In";
  } catch (error) {
    err = error.response.data.message;
  }
  return { message, err };
};

export async function createContact(payload) {
  let message = "";
  let err = "";
  try {
    const tokenz = Cookies.get("token");
    const response = await axios.post(`${apiUrl}/contacts`, payload, {
      headers: {
        Authorization: `Bearer ${tokenz}`,
      },
    });
    const data = response.data;
    message = "Contact is created";
  } catch (error) {
    err = error.response.data.message;
  }
  return { message, err };
}

export async function getContacts() {
  let message = "";
  let err = "";
  let data = {};
  try {
    const tokenz = Cookies.get("token");
    const response = await axios.get(`${apiUrl}/contacts`, {
      headers: {
        Authorization: `Bearer ${tokenz}`,
      },
    });
    data = response.data;
    message = "Contact is created";
  } catch (error) {
    err = error.response.data.message;
  }
  return { message, err, data };
}

export async function updateContact(id, payload) {
  let message = "";
  let err = "";
  try {
    const tokenz = Cookies.get("token");
    const response = await axios.put(`${apiUrl}/contacts/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${tokenz}`,
      },
    });
    const data = response.data;
    message = "Contact is updated";
  } catch (error) {
    err = error.response.data.message;
  }
  return { message, err };
}

export async function deleteContact(id) {
  let message = "";
  let err = "";
  try {
    const tokenz = Cookies.get("token");
    const response = await axios.delete(`${apiUrl}/contacts/${id}`, {
      headers: {
        Authorization: `Bearer ${tokenz}`,
      },
    });
    const data = response.data;
    message = "Deleted";
  } catch (error) {
    err = error.response.data.message;
  }
  return { message, err };
}
