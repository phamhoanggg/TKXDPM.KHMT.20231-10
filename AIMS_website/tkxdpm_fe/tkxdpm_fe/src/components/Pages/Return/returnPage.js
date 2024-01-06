import Footer from "../../Footer/";
import Header from "../../Header";
import { useContext, useEffect, useLayoutEffect } from "react";
import createUserOrders from "../../../api/createOrderAPI";
import { useLocation } from "react-router-dom";
import { AddContext } from "../../../App";

const backToHome = () => {
    window.location.href = "/"
}

const ReturnPage = () => {
    const { cartItems, setCartItems } = useContext(AddContext);

    let shippingAddress;
    const paymentMethod = "Thanh toán qua VNPay";
    let success;
    let shippingPrice;
    var paymentDescription;

    const storedData = localStorage.getItem('paymentData');
    if (storedData) {
        const { orderDetails } = JSON.parse(storedData);
        shippingAddress = orderDetails.invoiceAddress;
        shippingPrice = orderDetails.invoiceShippingFee;
    }

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const transactionStatus = queryParams.get("vnp_TransactionStatus");
    if (transactionStatus === "00") {
        paymentDescription = "thành công";
        success = 1;
    }
    else {
        paymentDescription = "thất bại"
        success = 0;
    }

    useEffect(() => {
        const createOrder = async () => {
            try {
                await createUserOrders(shippingAddress, paymentMethod, shippingPrice);
                //setCartItems([]);
            } catch (err) {
                console.log(err);
            }
        }
        
        if (success) {
            if(cartItems){
                setCartItems([]);
            }
            createOrder();
            localStorage.removeItem('paymentData');
        }
    });

    return (
        <>
            <Header></Header>
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h1 className="mt-40 text-green-500 text-4xl font-bold mb-4">Đặt hàng {paymentDescription}!</h1>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={backToHome}>
                        Trở về trang chủ
                    </button>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default ReturnPage;