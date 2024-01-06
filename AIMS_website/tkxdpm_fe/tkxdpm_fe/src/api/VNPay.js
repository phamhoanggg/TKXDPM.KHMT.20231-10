import axios from "../setup/CustomAxios"

const Pay = async (amountMoney) => {
  try {
    const response = await axios.post('/user/order/pay',{
      amount_money: amountMoney,
    });
    if (response) {
      window.location.href = response;
    } 
  } catch (error) {
    return error.response;
  }
};

export default Pay;