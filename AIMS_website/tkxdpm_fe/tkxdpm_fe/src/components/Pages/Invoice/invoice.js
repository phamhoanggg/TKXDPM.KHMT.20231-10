import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header';
import Footer from '../../Footer';
import { AddContext } from '../../../App';
import { useContext } from 'react';
import createUserOrders from "../../../api/createOrderAPI";
import Pay from "../../../api/VNPay";

const Invoice = () => {
  const location = useLocation();

  // Lấy thông tin đơn hàng từ location.state
  const { orderDetails } = location.state || {};

  //const {invoiceCartItems} = orderDetails.invoiceCartItems;
  const { cartItems, setCartItems} = useContext(AddContext);

  const navigate = useNavigate();
  const paymentMethod = orderDetails.invoicePaymentMethod;
  const productPrice = orderDetails.invoiceProductPrice;
  const shippingFee = orderDetails.invoiceShippingFee;
  const totalMoney = (productPrice + productPrice / 10 + shippingFee);
  
  let paymentDescription;
  if (paymentMethod == "vnpay" || paymentMethod == "normal") {
    paymentDescription = "Thanh toán qua VNPay";
  }
  else {
    paymentDescription = "Thanh toán khi nhận hàng"
  }

  // Kiểm tra xem có thông tin đơn hàng hay không
  if (!orderDetails) {
    return <div>Không có thông tin đơn hàng.</div>;
  }

  const handlePayment = async () => {
    if (paymentMethod === "vnpay" || paymentMethod === "normal") {
      await Pay(totalMoney*1000);
      //setCartItems([]);
    }
    if (paymentMethod === "cash") {
      await createUserOrders(orderDetails.invoiceAddress, paymentMethod, shippingFee);
      setCartItems([]);
      navigate("/ReturnPageCash")
    }

    if(localStorage){
      localStorage.removeItem('paymentData');
      localStorage.setItem('paymentData', JSON.stringify({orderDetails}));
    }
    else{
      localStorage.setItem('paymentData', JSON.stringify({orderDetails}));
    }
  }

  function currencyFormatter(price) {
    price = Math.floor(price);
    if (price == 0) {
      return '0';
    } else {
      if (price > 1000) {
        var hundred = '';
        if (price % 1000 < 10) {
          hundred = '00' + (price % 1000).toString();
        } else if (price % 1000 < 100) {
          hundred = '0' + (price % 1000).toString();
        }
        else {
          hundred = (price % 1000).toString();
        }
        return (Math.floor(price / 1000)).toString() + '.' + hundred + '.000';
      } else return price.toString() + '.000';
    }
  }

  return (

    <>
      <Header />
      <div className='pt-32'>
        <h1 className='text-5xl font-bold m-auto ml-20 text-primary border-b-2'>Invoice</h1>

        <div className='basis-1/3 flex flex-col items-left md:mr-16 px-2 flex ml-20 border-b'>
          <h2 className='text-2xl font-bold'>Thông tin khách hàng</h2>
          <p className='font-semibold text-xl mx-4 mt-4 ml-20'>Họ và tên: {orderDetails.invoiceName}</p>
          <p className='font-semibold text-xl mx-4 mt-4 ml-20'>Thành phố: {orderDetails.invoiceCity}</p>
          <p className='font-semibold text-xl mx-4 mt-4 ml-20'>Địa chỉ cụ thể: {orderDetails.invoiceAddress}</p>
          <p className='font-semibold text-xl mx-4 mt-4 ml-20'>Ghi chú: {orderDetails.invoiceNote}</p>
        </div>

        <div className='ml-20 border-b-2'>
          <h2 className='text-2xl font-bold m-auto'>Thông tin sản phẩm</h2>
          {cartItems.map((cart, index) => (
            <div key={index} className='md:w-2/5 items-center justify-center flex flex-col md:flex-row flex-wrap 
          bg-gray-100 rounded-2xl pl-2 border-green-400 border-2 shadow-lg ml-20'>
              <img src={cart.image} alt="" className="w-28 h-28 p-2 "></img>
              <p>
                {cart.name} - Số lượng: {cart.quantity} - Thành tiền: {currencyFormatter(cart.price * cart.quantity)} VNĐ
              </p>
            </div>
          ))}
        </div>

        <div className='ml-20 border-b-2'>
          <h2 className='text-2xl font-bold m-auto'>Thông tin thanh toán</h2>
          <p className="font-semibold text-xl mx-4 mt-4 ml-20">Tổng giá sản phẩm: {currencyFormatter(productPrice)} VNĐ </p>
          <p className="font-semibold text-xl mx-4 mt-4 ml-20">VAT (10%): {currencyFormatter(productPrice / 10)} VNĐ</p>
          <p className="font-semibold text-xl mx-4 mt-4 ml-20">Phí vận chuyển: {currencyFormatter(shippingFee)} VNĐ</p>
          <p className="font-semibold text-xl mx-4 mt-4 ml-20">Tổng thanh toán: {currencyFormatter(productPrice + productPrice / 10 + shippingFee)} VNĐ</p>
          <p className="font-semibold text-xl mx-4 mt-4 ml-20">Phương thức thanh toán: {paymentDescription}</p>
        </div>

        <button className="mt-8 ml-96 whitespace-nowrap w-32 inline-flex items-center justify-center 
                  px-4 py-2 border border-transparent rounded-3xl shadow-sm text-base font-medium text-white bg-blue-400 hover:bg-blue-600"
          onClick={handlePayment}
        >
          {" "}
          Thanh toán
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Invoice;
