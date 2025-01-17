/* eslint-disable */
// import axios from 'axios';
import { showAlert } from "./alerts";
import axios from "axios";

export const login = async (email, password) => {
  try {
    const res = await fetch(
      // "https://natours-node-xh4p.onrender.com/api/v1/users/login",
      "http://localhost:3000/api/v1/users/login",
      // 'http://127.0.0.1:3000/api/v1/users/login',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await res.json();

    if (res.ok && data.status === "success") {
      showAlert("success", "Logged in successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    } else {
      throw new Error(data.message || "An error occurred");
    }
  } catch (err) {
    showAlert("error", err.message);
  }

  //   try {
  //     const res = await axios({
  //       method: 'POST',
  //       url: 'http://localhost:3000/api/v1/users/login',
  //       data: {
  //         email,
  //         password,
  //       },
  //     });

  //     if (res.data.status === 'success') {
  //       showAlert('success', 'Logged in successfully!');
  //       window.setTimeout(() => {
  //         location.assign('/');
  //       }, 1500);
  //     }
  //   } catch (err) {
  //     showAlert('error', err.response.data.message);
  //   }
};

export const logout = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/v1/users/logout", {
      method: "GET",
    });

    const data = await res.json();

    if (res.ok && data.status === "success") {
      location.reload(true);
    } else {
      throw new Error(data.message || "Error logging out! Try again.");
    }
  } catch (err) {
    console.log(err);
    showAlert("error", "Error logging out! Try again.");
  }
};
