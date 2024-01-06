import axios from "../setup/CustomAxios";

const createUserOrders = async (shippingAddress, paymentMethod, shippingPrice) => {
    try {
        const response = await axios.post("/users/orders", {
            shippingAddress,
            paymentMethod,
            shippingPrice,
            isAccepted: true
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export default createUserOrders;
