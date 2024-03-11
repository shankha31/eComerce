import { useEffect, useState } from "react";
import { fetchProductById } from "../../product/productAPI";
import { Button } from "antd";

const AdminBargainRequests = () => {
  const [bargainRequests, setBargainRequest] = useState([]);
  const [bargainProductData, setBargainProductData] = useState([]);

  const fetchBargainRequests = () => {
    return new Promise(async (resolve) => {
      const response = await fetch("/bargains");
      const data = await response.json();
      resolve({ data });
    });
  };

  useEffect(() => {
    fetchBargainRequests()
      .then((result) => {
        setBargainRequest(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handelAccept = (id) => {
    return new Promise(async (resolve) => {
      const response = await fetch("/bargains/accept" + id, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
      });
    });
  };

  useEffect(() => {
    var temp = [];
    const promises = bargainRequests.map((request) =>
      fetchProductById(request.product)
        .then((result) => ({
          ...result.data,
          bargainPrice: request.price,
          bargainId: request._id,
        }))
        .catch((error) => {
          console.error(error);
          return null;
        })
    );
    Promise.all(promises)
      .then((products) => {
        const validProducts = products.filter((product) => product !== null);
        temp = [...temp, ...validProducts];
        setBargainProductData(temp);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [bargainRequests]);

  return (
    <>
      <div className="p-10">
        <h1 className="mb-10 text-2xl">Bargain Requests</h1>
        <ul
          className="-my-6 divide-y divide-gray-200 px-5 rounded-lg"
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          {bargainProductData.map((item) => (
            <li key={item.id} className="flex py-6">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <a href={item.id}>{item.title}</a>
                    </h3>
                    <p className="ml-4">
                      Original Price - $
                      {item.price -
                        Math.round(
                          (item.price * item.discountPercentage) / 100
                        )}
                      <p className="ml-4">Asked Price - ${item.bargainPrice}</p>
                    </p>
                    <div className="flex flex-col gap-2">
                      <Button className="bg-green-600 text-white">
                        Accept
                      </Button>
                      <Button
                        onClick={handelAccept}
                        className="bg-red-600 text-white"
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm"></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AdminBargainRequests;