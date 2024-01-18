import axios from "../setup/CustomAxios";


export default class OrderApi{
  async getUserOrders(){
    try {
      const response = await axios.get("users/orders");
      return response;
    } catch (error) {
      console.error(error);
    }
  };
}

