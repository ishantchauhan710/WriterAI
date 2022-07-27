import axios from "axios";
import { BASE_URL } from "../other/Constants";

export const checkUserValidity = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log(`Token Passed: ${token}`);
    const response = await axios.get(`${BASE_URL}/user/getUser`, config);
    return true;
  } catch (e) {
    return false;
  }
};
