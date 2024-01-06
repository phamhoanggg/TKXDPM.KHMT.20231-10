import Footer from "../../Footer";
import Header from "../../Header";
import { getUserOrders } from "../../../api/orderApi";
import { useEffect, useState } from "react";

function ProductItem({ product }) {
  return (
    <ul role="list" className="divide-y divide-gray-100">
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
  );
}
const ItemUser = ({ item, index }) => {
  return (
    <div>
      <div className="px-4 py-1 ">
        <h3 className="leading-7 text-gray-900 font-bold text-xl">
          {`# ${index}`}
        </h3>
      </div>
      <div className=" border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Trạng thái
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {item.isAccepted ? "Đã được duyệt" : "Chưa được duyệt"}
            </dd>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Địa chỉ
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {item.shippingAddress}
            </dd>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Hình thức thanh toán
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {item.paymentMethod}
            </dd>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Phí vận chuyển
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {`${item.shippingPrice}.000 VNĐ`}
            </dd>
          </div>
          <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Giá</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {item.totalPrice}.000 VNĐ
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
        </dl>
      </div>
    </div>
  );
};
const ListOrdersUser = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getUserOrders();
        setData(data);
        console.log(data);
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
          <div className="max-w-screen-xl px-4 mx-auto md:px-8 pt-32">
            <div className="mt-4">
              {data.map((order, index) => (
                <ItemUser key={index} item={order} index={index + 1} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
export default ListOrdersUser;
