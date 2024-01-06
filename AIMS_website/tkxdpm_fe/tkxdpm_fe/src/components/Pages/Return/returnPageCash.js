import Footer from "../../Footer/";
import Header from "../../Header";
import { useEffect, useContext, useState } from "react";
import createUserOrders from "../../../api/createOrderAPI";
import { AddContext } from "../../../App";

const backToHome = () => {
    window.location.href = "/"
}

const ReturnPageCash = () => {
    const { cartItems, setCartItems} = useContext(AddContext);
    let shippingAddress;
    const paymentMethod = "Thanh toán khi nhận hàng";
    let shippingPrice;
    const storedData = localStorage.getItem('paymentData');

    if (storedData) {
        const { orderDetails } = JSON.parse(storedData);
        shippingAddress = orderDetails.invoiceAddress;
        shippingPrice = orderDetails.invoiceShippingFee;
    }
    
    useEffect(() => {
        // createUserOrders(shippingAddress, paymentMethod, shippingPrice);
        // console.log(cartItems);
        localStorage.removeItem('paymentData');
    },[])
    
    
    // const createOrder = async () => {
    //     try {
    //         await createUserOrders(shippingAddress, paymentMethod, shippingPrice);
    //         localStorage.removeItem('paymentData');
    //         console.log(cartItems);
    //     } catch (error) {
    //         console.error("Error creating order:", error);
    //     }
    //     // await createUserOrders(shippingAddress, paymentMethod, shippingPrice);
    //     // localStorage.removeItem('paymentData');
    // }
    //createOrder();
    //localStorage.removeItem('paymentData');

    // useEffect(() => {
    //     const createOrder = async () => {
    //         try {
    //             await createUserOrders(shippingAddress, paymentMethod, shippingPrice);
    //             localStorage.removeItem('paymentData');
    //             console.log(cartItems);
    //         } catch (error) {
    //             console.error("Error creating order:", error);
    //             // Xử lý lỗi nếu cần thiết
    //         }
    //         // await createUserOrders(shippingAddress, paymentMethod, shippingPrice);
    //         // localStorage.removeItem('paymentData');
    //     }
    //     createOrder();
    //     //localStorage.removeItem('paymentData');

    // }, [shippingAddress, paymentMethod, shippingPrice]);

    return (
        <>
            <Header></Header>
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h1 className="mt-40 text-green-500 text-4xl font-bold mb-4">Đặt hàng thành công!</h1>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={backToHome}>
                        Trở về trang chủ
                    </button>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default ReturnPageCash;