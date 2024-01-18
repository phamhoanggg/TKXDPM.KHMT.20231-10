import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../Footer";
import Header from "../../Header";
import { AddContext } from "../../../App";
import { updateCart } from "../../../api/cartApi";
import SelectCity from "../../Contents/Select/selectCity";
import { ReactNotifications } from "react-notifications-component";
import { handleNotify } from "../../Notification/notification";
import vnpay_logo from "../../../images/vnpay_logo.png";

export function viewCart(navigate) {
  navigate("/Cart");
}
export default function Cart({ onRemove }) {
  const { cartItems } = useContext(AddContext);
  const [paymentMethod, setPaymentMethod] = useState("normal");
  const [name, setName] = useState("");
  const [phone, setPhoneNum] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [delivery, setDelivery] = useState("");
  const [count, setCount] = useState(false);
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);

  const [shippingFee, setShippingFee] = useState(10);

  var productPrice = 0;
  var weight = 2 * cartItems.length;

  for (var i = 0; i < cartItems.length; i++) {
    productPrice += cartItems[i].price * cartItems[i].quantity;
  }

  const changePaymentMethod = (event) => {
    setPaymentMethod(event.target.value);
  };
  const changeNameValue = (event) => {
    setName(event.target.value);
  };

  const changePhoneValue = (event) => {
    setPhoneNum(event.target.value);
  };
  const changeCityValue = (city) => {
    setCity(city);
    if (delivery == "rush" && city != "Hà Nội") {
      handleNotify(
        "warning",
        "Warning",
        "Địa chỉ của bạn không hỗ trợ giao hàng nhanh! (Chỉ hỗ trợ: Hà Nội)"
      );
    }
    calculateShippingFee();
  };
  const changeAddressValue = (event) => {
    setAddress(event.target.value);
  };
  const changeNoteValue = (event) => {
    setNote(event.target.value);
  };
  const changeDelivery = (event) => {
    setDelivery(event.target.value);
    if (event.target.value == "rush" && (!city || city != "Hà Nội")) {
      handleNotify(
        "warning",
        "Warning",
        "Địa chỉ của bạn không hỗ trợ giao hàng nhanh! (Chỉ hỗ trợ: Hà Nội)"
      );
    }
    calculateShippingFee();
  };
  const handleClickPay = () => {
    if (!name || !city || !address || !phone) {
      handleNotify("warning", "Warning", "Cần nhập đủ thông tin");
    } else if (delivery == "rush" && city != "Hà Nội") {
      handleNotify(
        "warning",
        "Warning",
        "Địa chỉ của bạn không hỗ trợ giao hàng nhanh! (Chỉ hỗ trợ: Hà Nội)"
      );
    } else if (cartItems.length === 0) {
      handleNotify("warning", "Warning", "Giỏ hàng đang trống");
    } else if (!validatePhoneNumber(phone)) {
      handleNotify("warning", "Warning", "Số điện thoại không hợp lệ");
    } else {
      const orderData = {
        invoiceName: name,
        invoiceCity: city,
        invoiceAddress: address,
        invoiceNote: note,
        invoiceProductPrice: productPrice,
        invoiceShippingFee: shippingFee,
        invoiceCartItems: cartItems,
        invoicePaymentMethod: paymentMethod,
      };

      setOrderDetails(orderData);
      if (orderDetails !== null) {
        navigate("/invoice", { state: { orderDetails } });
      } else {
        handleNotify(
          "warning",
          "Warning",
          'Vui lòng bấm "Thanh toán" thêm lần nữa'
        );
      }
    }
  };

  // Tính phí vận chuyển
  const calculateShippingFee = () => {
    var tmp = 0;
    productPrice = 0;
    for (var i = 0; i < cartItems.length; i++) {
      productPrice += cartItems[i].price * cartItems[i].quantity;
    }

    if (city) {
      if (productPrice > 100) {
        tmp = 0;
      } else {
        if (city == "Hà Nội" || city == "Hồ Chí Minh") {
          if (weight < 3) {
            tmp = 20;
          } else {
            tmp = 20 + Math.ceil((weight - 3) / 0.5) * 2.5;
          }
        } else {
          if (weight < 0.5) {
            tmp = 30;
          } else {
            tmp = 30 + Math.ceil((weight - 0.5) / 0.5) * 2.5;
          }
        }
      }

      if (delivery == "rush") {
        tmp += cartItems.length * 10;
      }

      setShippingFee(tmp);
    } else setShippingFee(0);
  };

  function currencyFormatter(price) {
    price = Math.floor(price);
    if (price == 0) {
      return "0";
    } else {
      if (price > 1000) {
        var hundred = "";
        if (price % 1000 < 10) {
          hundred = "00" + (price % 1000).toString();
        } else if (price % 1000 < 100) {
          hundred = "0" + (price % 1000).toString();
        } else {
          hundred = (price % 1000).toString();
        }
        return Math.floor(price / 1000).toString() + "." + hundred + ".000";
      } else return price.toString() + ".000";
    }
  }

  function validatePhoneNumber(input_str) {
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

    return re.test(input_str);
  }
  const increaseProduct=(cart)=>{
    setCount(!count);
    if(cart.quantity + 1 <= cart.countInStock){
      cart.quantity = cart.quantity + 1;
      updateCart(cart.id, cart.quantity);
      calculateShippingFee();
    }
    else {
      handleNotify('danger','Thông báo','Số lượng sản phẩm trong kho không đủ')
    }
  }
  const reduceProduct =(cart) =>{
    setCount(!count);
    cart.quantity = cart.quantity - 1;
    if (cart.quantity < 1) cart.quantity = 1;
    updateCart(cart.id, cart.quantity);
    calculateShippingFee();
  }
  const deleteProduct = (cart) =>{
    onRemove(cart);
    updateCart(cart.id, 0);
    setCount(!count);
  }
  return (
    <>
      <ReactNotifications />
      <Header />
      <p className="text-xl font-bold ml-32 pb-8 pt-32">Giỏ hàng</p>
      <div className="flex flex-col flex-wrap lg:flex-row items-center justify-center space-y-8">
        {/* cart items */}
        <div className="basis-1/2 flex flex-col flex-wrap items-center space-y-8 lg:pl-32">
          {cartItems.length === 0 && (
            <div className="text-2xl font-bold m-auto ml-20 h-96 flex items-center justify-center">
              <p> Giỏ hàng đang trống</p>
            </div>
          )}
          {cartItems.map((cart, index) => (
            <div
              key={index}
              className="md:w-5/6 items-center justify-center flex flex-col md:flex-row flex-wrap 
            bg-gray-100 rounded-2xl pl-2 border-green-400 border-2 shadow-lg hover:bg-white"
            >
              <div className="flex">
                <img src={cart.image} alt="" className="w-28 h-28 p-2 "></img>
                <p className="m-auto font-semibold ml-4 mr-4 text-lg">
                  {cart.name}
                </p>
              </div>

              <div className="flex ">
                <button
                  className=" mt-12 mb-12  rounded-xl m-auto bg-green-300"
                  onClick={() => {
                    reduceProduct(cart);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18 12H6"
                    />
                  </svg>
                </button>

                <div className=" m-auto rounded-2xl px-2">{cart.quantity}</div>

                <button
                  className="mt-12 mb-12  rounded-xl m-auto bg-green-300"
                  onClick={() => {
                    increaseProduct(cart)
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>

                <p className="m-auto ml-8 text-2xl font-semibold">
                  {currencyFormatter(+cart.price * +cart.quantity)} VNĐ
                </p>

                <button
                  className="bg-red-300 rounded-2xl m-auto ml-12 mr-4"
                  onClick={() => {
                    deleteProduct(cart)
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/*cart info */}
        {cartItems.length > 0 && (
          <div className="basis-1/3 flex flex-col items-left md:mr-16 px-2">
            <div className="bg-gray-100  rounded-2xl pb-8">
              <p className="text-xl font-semibold mx-8 mt-8">Thanh toán</p>

              <div>
                <p className="mx-8 mt-4">Phương thức thanh toán</p>

                <div className="mx-4 mt-4 items-center flex">
                  <div className="flex items-center mb-4 border-green-500 border-2 bg-white rounded-xl mx-8 mt-4 w-40">
                    <input
                      id="payment-option-1"
                      type="radio"
                      name="payments"
                      value="vnpay"
                      className=" ml-4 w-6 h-6 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 
                  dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                      defaultChecked="true"
                      onChange={changePaymentMethod}
                    />

                    <label
                      htmlFor="payment-option-1"
                      className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-center"
                    >
                      <img
                        className="w-8 md:w-16 mx-4 mr-6 my-2"
                        src={vnpay_logo}
                      ></img>
                      Thanh toán qua VN Pay
                    </label>
                  </div>

                  <div className="mb-4 border-green-500 border-2 bg-white rounded-xl mx-8 mt-4 items-center flex w-40">
                    <input
                      id="payment-option-2"
                      type="radio"
                      name="payments"
                      value="cash"
                      className=" ml-4 w-6 h-6 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 
                  dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                      onChange={changePaymentMethod}
                    />

                    <label
                      htmlFor="payment-option-2"
                      className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 md:w-16 mx-4 mr-6 my-2 fill-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                      Thanh toán khi nhận hàng
                    </label>
                  </div>
                </div>

                <div className="mb-6 mx-4">
                  <label
                    htmlFor="large-input"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Họ và tên
                  </label>
                  <input
                    onChange={changeNameValue}
                    type="text"
                    id="large-input"
                    className="bg-gray-50  border-blue-400 text-gray-900 border-2
              text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
              block w-full p-2.5 "
                  />
                </div>

                <div className="mb-6 mx-4">
                  <label
                    htmlFor="large-input"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Số điện thoại
                  </label>
                  <input
                    onChange={changePhoneValue}
                    type="text"
                    id="large-input"
                    className="bg-gray-50 border-blue-400 text-gray-900 border-2
              text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
              block w-full p-2.5 "
                  />
                </div>

                <div className="mb-6 mx-4">
                  <label
                    htmlFor="base-input"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Thành phố
                  </label>
                  <SelectCity onSelectCity={changeCityValue} />
                </div>

                <div className="mb-6 mx-4">
                  <label
                    htmlFor="base-input"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Địa chỉ cụ thể
                  </label>
                  <input
                    onChange={changeAddressValue}
                    type="text"
                    id="base-input"
                    className="bg-gray-50 border-blue-400 text-gray-900 border-2
              text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
              block w-full p-2.5"
                  />
                </div>

                <div className="mx-4">
                  <label
                    htmlFor="small-input"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Phương thức vận chuyển
                  </label>

                  <div className=" mb-4 border-green-500 border-2 bg-white rounded-xl mx-8 mt-4 items-center flex w-30 h-10">
                    <input
                      id="delivery-option-1"
                      type="radio"
                      name="delivery"
                      value="normal"
                      className=" ml-4 w-6 h-6 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 
                  dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                      defaultChecked="true"
                      onChange={changeDelivery}
                    />

                    <label
                      htmlFor="delivery-option-1"
                      className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Đặt hàng thường
                    </label>
                  </div>

                  <div className="mb-4 border-green-500 border-2 bg-white rounded-xl mx-8 mt-4 items-center flex w-30 h-10">
                    <input
                      id="delivery-option-2"
                      type="radio"
                      name="delivery"
                      value="rush"
                      className=" ml-4 w-6 h-6 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 
                  dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                      onChange={changeDelivery}
                    />

                    <label
                      htmlFor="delivery-option-2"
                      className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Đặt hàng nhanh
                    </label>
                  </div>
                </div>

                <div className="mx-4">
                  <label
                    htmlFor="small-input"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Ghi chú
                  </label>
                  <input
                    onChange={changeNoteValue}
                    type="text"
                    id="small-input"
                    className="bg-gray-50 border-blue-400 text-gray-900 border-2
              text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
              block w-full p-2.5"
                  />
                </div>

                <p className="font-semibold text-xl mx-4 mt-4">
                  Tổng giá sản phẩm: {currencyFormatter(productPrice)} VNĐ
                </p>

                <p className="font-semibold text-xl mx-4 mt-4">
                  VAT (10%): {currencyFormatter(productPrice / 10)} VNĐ
                </p>

                <p className="font-semibold text-xl mx-4 mt-4">
                  Phí vận chuyển: {currencyFormatter(shippingFee)} VNĐ
                </p>

                <p className="font-semibold text-xl mx-4 mt-4">
                  Tổng thanh toán:{" "}
                  {currencyFormatter(
                    productPrice + productPrice / 10 + shippingFee
                  )}{" "}
                  VNĐ
                </p>

                <button
                  onClick={handleClickPay}
                  className="mt-8 ml-4 whitespace-nowrap w-32 inline-flex items-center justify-center 
                  px-4 py-2 border border-transparent rounded-3xl shadow-sm text-base font-medium text-white bg-blue-400 hover:bg-blue-600"
                >
                  {" "}
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
