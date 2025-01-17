/* eslint-disable */
import { showAlert } from "./alerts";

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === "password"
        ? `http://localhost:3000/api/v1/users/updateMyPassword`
        : `http://localhost:3000/api/v1/users/updateMe`;

    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(data)),
      // body: JSON.stringify(data),
    });

    const responseData = await res.json();

    if (res.ok && responseData.status === "success") {
      showAlert("success", `${type.toUpperCase()} updated successfully!`);
    } else {
      throw new Error(
        responseData.message || "An error occurred while updating."
      );
    }
  } catch (err) {
    showAlert("error", err.message);
  }
};
