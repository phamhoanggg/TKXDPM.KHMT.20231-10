import Footer from "../../Footer";
import Header from "../../Header";
import { useEffect, useState } from "react";
import OrderApi from "../../../api/orderApi";
import ModalViewOrder from "../../ModalViewOrder";
import axios from '../../../setup/CustomAxios'

export function navigateOrder(navigate) {
  navigate("/ListOrdersUser");
}
function ProductItem({ product }) {
  return (
    <div>
      <ul className="divide-y divide-gray-100">
        <li className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              src={product.image}
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {product.name}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {`Số lượng: ${product.quantity}`}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{`Thể loại: ${product.cateName}`}</p>
            <p className="mt-1 text-xs leading-5 text-gray-500">
              {`Tổng: ${product.totalPrice}.000 VNĐ`}
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
}
const ItemUser = ({ item, index }) => {
  const [showModal, setShowModal] = useState(false);
  const viewOrder = () => {
    setShowModal(true);
  };
  return (
    <div>
      <div className="flex justify-between">
        <div className="px-4 py-1 bg-red-300 w-fit">
          <h3 className="leading-7 text-gray-900 font-bold text-xl">
            {`# ${index}`}
          </h3>
        </div>
        <button
          onClick={() => viewOrder()}
          className="focus:outline-black text-white text-sm py-2.5 px-4 border-b-4 border-green-600 bg-green-500 hover:bg-green-400"
        >
          Xem chi tiết
        </button>
      </div>
      <div className=" border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Trạng thái
            </dt>
            <dd className="mt-1 text-lg  leading-6 text-red-400 sm:col-span-2 sm:mt-0">
              {item.isAccepted ? "Đã được duyệt" : "Chưa được duyệt"}
            </dd>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Sản phẩm
            </dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {item.products.map((product, index) => (
                <ProductItem key={index} product={product} />
              ))}
            </dd>
          </div>
          <div className="px-4 py-2 mb-14 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Giá</dt>
            <dd className="mt-1 text-lg  leading-6 text-red-400 sm:col-span-2 sm:mt-0">
              {item.totalPrice}.000 VNĐ
            </dd>
          </div>
        </dl>
      </div>
      {showModal && <ModalViewOrder setShow={setShowModal} item={item} />}
    </div>
  );
};
const ListOrdersUser = () => {
  const [data, setData] = useState([]);
  const orderApi = new OrderApi();
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await axios.get("users/orders");
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  return (
    <>
      <Header />
      <main>
        <div>
          <div className="max-w-screen-xl px-4 mx-auto md:w-1/2 pt-32">
            <div className="mt-4">
              {data.map((order, index) => (
                <ItemUser key={index} item={order} index={index + 1} />
              ))}
              {data.length === 0 && (
                <div className="h-96 flex items-center justify-center">
                  <h2 className="font-bold text-2xl">Đơn hàng đang trống</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
export default ListOrdersUser;
