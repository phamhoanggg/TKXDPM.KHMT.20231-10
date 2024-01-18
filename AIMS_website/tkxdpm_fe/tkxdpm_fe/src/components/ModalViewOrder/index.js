const ModalViewOrder = ({ setShow, item }) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={() => setShow(false)}
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div>
                <h3 className="text-center text-xl font-medium text-gray-700 mb-5">
                  Thông tin đơn hàng
                </h3>
              </div>
              <div className=" border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                  <div className="py-2 sm:flex sm:justify-between">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Trạng thái
                    </dt>
                    <dd className="mt-1 text-lg  leading-6 text-red-400 sm:col-span-2 sm:mt-0">
                      {item.isAccepted ? "Đã được duyệt" : "Chưa được duyệt"}
                    </dd>
                  </div>
                  <div className="py-2 sm:flex sm:justify-between">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Địa chỉ
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-1 sm:mt-0">
                      {item.shippingAddress}
                    </dd>
                  </div>
                  <div className="py-2 sm:flex sm:justify-between">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Hình thức thanh toán
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {item.paymentMethod}
                    </dd>
                  </div>
                  <div className="py-2 sm:flex sm:justify-between">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Sản phẩm
                    </dt>
                    <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {item.products.map((product, index) => (
                        <ProductItem key={index} product={product} />
                      ))}
                    </dd>
                  </div>
                  <div className="py-2 sm:flex sm:justify-between">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Phí vận chuyển
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {`${item.shippingPrice}.000 VNĐ`}
                    </dd>
                  </div>
                  <div className="py-2 sm:flex sm:justify-between">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Giá
                    </dt>
                    <dd className="mt-1 text-lg  leading-6 text-red-400 sm:col-span-2 sm:mt-0">
                      {item.totalPrice}.000 VNĐ
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                onClick={() => setShow(false)}
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalViewOrder;

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
