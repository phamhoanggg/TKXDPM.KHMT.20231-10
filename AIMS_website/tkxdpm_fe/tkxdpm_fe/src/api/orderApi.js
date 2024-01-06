import axios from "../setup/CustomAxios";

const getUserOrders = async () => {
  try {
    const response = await axios.get("users/orders");
    return response;
  } catch (error) {
    console.error(error);
  }
};

export {getUserOrders}
