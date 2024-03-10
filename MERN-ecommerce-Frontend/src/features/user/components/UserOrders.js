import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLoggedInUserOrderAsync,
  selectUserInfo,
  selectUserInfoStatus,
  selectUserOrders,
} from "../userSlice";
import { Grid } from "react-loader-spinner";

export default function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  const status = useSelector(selectUserInfoStatus);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync());
  }, [dispatch]);

  return (
    <div>
      {orders &&
        orders.map((order) => (
          <div key={order.id}>
            <div style={{ display: "flex" }}>
              <div className="mx-auto mt-12 bg-gray-900 rounded-lg max-w-7xl px-4 py-4 lg:px-8 inline-block">
                <h1 className="text-4xl my-5 font-bold tracking-tight text-white">
                  Order # {order.id}
                </h1>
                <div className="lg:flex justify-center">
                  <div className="px-4 py-6 sm:px-6" style={{ width: "23rem" }}>
                    {/* <h1 className="text-4xl my-5 font-bold tracking-tight text-white">
                    Order # {order.id}
                  </h1> */}
                    <h3 className="text-xl my-5 font-bold tracking-tight text-red-500">
                      Order Status : {order.status}
                    </h3>
                    <div className="flow-root">
                      <ul className="">
                        {order.items.map((item) => (
                          <li key={item.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={item.product.thumbnail}
                                alt={item.product.title}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-white">
                                  <h3>
                                    <a href={item.product.id}>
                                      {item.product.title}
                                    </a>
                                  </h3>
                                  <p className="ml-4">
                                    $
                                    {item.product.price -
                                      Math.round(
                                        (item.product.price *
                                          item.product.discountPercentage) /
                                          100
                                      )}
                                  </p>
                                </div>
                                <p className="mt-1 text-sm text-gray-400">
                                  {item.product.brand}
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="text-gray-400">
                                  <label
                                    htmlFor="quantity"
                                    className="inline mr-5 text-sm font-medium leading-6 text-white"
                                  >
                                    Qty :{item.quantity}
                                  </label>
                                </div>

                                <div className="flex"></div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="px-4 py-6 sm:px-6 lg:border-l lg:border-gray-200">
                    <div className="flex justify-between my-2 text-base font-medium text-white">
                      <p>Subtotal</p>
                      <p>$ {order.totalAmount}</p>
                    </div>
                    <div className="flex justify-between my-2 text-base font-medium text-white">
                      <p>Total Items in Cart</p>
                      <p>{order.totalItems} items</p>
                    </div>
                    <p className="my-3 text-sm text-gray-400">
                      Shipping Address :
                    </p>
                    <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 rounded-md border-gray-200">
                      <div className="flex gap-x-4">
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-white">
                            {order.selectedAddress.name}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-400">
                            {order.selectedAddress.street}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-400">
                            {order.selectedAddress.pinCode}
                          </p>
                        </div>
                      </div>
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-white">
                          Phone: {order.selectedAddress.phone}
                        </p>
                        <p className="text-sm leading-6 text-gray-400">
                          {order.selectedAddress.city}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      {status === "loading" ? (
        <div style={{ margin: "5rem" }}>
          <Grid
            height="80"
            width="80"
            color="rgb(79, 70, 229) "
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : null}
    </div>
  );
}
