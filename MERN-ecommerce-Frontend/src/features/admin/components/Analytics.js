import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { Flex } from "antd";
import NavBar from "../../navbar/Navbar";

const Analytics = () => {
  const [products, setProducts] = useState([]);
  const [revenueDetailsPerMonth, setRevenueDetailsPerMonth] = useState([]);
  const [productCount, setProductCount] = useState([]);
  const [orderCountByMonth, setOrderCountByMonth] = useState([]);
  const [orders, setOrders] = useState([]);
  const fetchAllProducts = () => {
    return new Promise(async (resolve) => {
      const response = await fetch("/products");
      const data = await response.json();
      resolve({ data });
    });
  };

  const fetchAllOrders = () => {
    return new Promise(async (resolve) => {
      const response = await fetch("/orders");
      const data = await response.json();
      resolve({ data });
    });
  };
  useEffect(() => {
    fetchAllProducts()
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    fetchAllOrders()
      .then((res) => {
        setOrders(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const temp = {};
    let productCountCategoryWise = [["category", "product count"]];
    for (let index = 0; index < products.length; index++) {
      if (products[index].category in temp) {
        temp[products[index].category] += 1;
      } else {
        temp[products[index].category] = 1;
      }
    }
    for (let key in temp) {
      productCountCategoryWise.push([key, temp[key]]);
    }
    setProductCount(productCountCategoryWise);
  }, [products]);

  useEffect(() => {
    const temp = {};
    const revenueTemp = {};
    const odersCount = [["Month", ""]];
    const revenueDetails = [["Month", ""]];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    for (let index = 0; index < orders.length; index++) {
      const dateString = orders[index].createdAt;
      const date = new Date(dateString);
      const month = monthNames[date.getMonth()];
      if (month in temp) {
        temp[month] += 1;
      } else {
        temp[month] = 1;
      }
      if (month in revenueTemp) {
        if (orders[index]?.totalAmount) {
          revenueTemp[month] += orders[index]?.totalAmount;
        }
      } else {
        if (orders[index]?.totalAmount) {
          revenueTemp[month] = orders[index]?.totalAmount;
        }
      }
    }
    //console.log(revenueTemp);
    for (let key in temp) {
      odersCount.push([key, temp[key]]);
    }
    for (let key in revenueTemp) {
      revenueDetails.push([key, revenueTemp[key]]);
    }
    //console.log(revenueDetails);
    setRevenueDetailsPerMonth(revenueDetails);
    setOrderCountByMonth(odersCount);
  }, [orders]);

  const options = {
    title: "Category wise product count",
    titleTextStyle: { color: "#fff" },
    legend: "none",
    pieSliceText: "label",
    is3D: true,
    slices: {
      4: { offset: 0.2 },
      12: { offset: 0.3 },
      14: { offset: 0.4 },
      15: { offset: 0.5 },
    },
    backgroundColor: "#496989",
  };

  const orderGraphOptions = {
    title: "Orders",
    titleTextStyle: { color: "#fff" },
    hAxis: {
      title: "Month",
      titleTextStyle: { color: "#fff" },
      textStyle: { color: "#fff" },
    },
    vAxis: {
      title: "Order Count",
      minValue: 0,
      titleTextStyle: { color: "#fff" },
      textStyle: { color: "#fff" },
    },
    chartArea: { width: "50%", height: "70%" },
    backgroundColor: "#496989",
    colors: ["white"],
  };
  const revenueGraphOptions = {
    title: "Revenue in $",
    titleTextStyle: { color: "#fff" },
    hAxis: {
      title: "Month",
      titleTextStyle: { color: "#fff" },
      textStyle: { color: "#fff" },
    },
    vAxis: {
      title: "Revenue Amount",
      titleTextStyle: { color: "#fff" },
      textStyle: { color: "#fff" },
      minValue: 0,
    },
    chartArea: { width: "50%", height: "70%" },
    backgroundColor: "#496989",
    colors: ["white"],
    style: { borderRadius: "1rem" },
  };

  return (
    <>
      <div style={{ minHeight: "100vh" }} className="bg-gray-900 pb-4">
        <NavBar />
        <div
          style={{ padding: "0 20px" }}
          className="bg-gray-900"
          color="white"
        >
          <h1
            style={{
              textAlign: "center",
              fontSize: "34px",
              marginBottom: "30px",
              color: "white",
            }}
          >
            Analytics Dashboard
          </h1>
          <div className="lg:flex lg:justify-around lg:items-center lg:flex-wrap lg:flex-row sm:flex-col">
            <div
              className="rounded-lg lg:w-1/2 w-full"
              style={{
                //width: "calc(50% - 20px)",
                marginBottom: "20px",
                boxSizing: "border-box",
              }}
            >
              {orderCountByMonth.length > 0 && (
                <Chart
                  className="chart-item"
                  chartType="AreaChart"
                  height="710px"
                  data={orderCountByMonth}
                  options={orderGraphOptions}
                />
              )}
            </div>
            <div
              className="lg:w-1/2 w-full lg:pl-3 lg:flex lg:flex-col flex justify-around flex-row lg:gap-0 gap-5"
              style={{
                boxSizing: "border-box",
              }}
            >
              <div
                className="rounded-lg w-1/2 lg:w-full"
                style={{
                  //width: "calc(100% - 20px)",
                  marginBottom: "10px",
                  boxSizing: "border-box",
                }}
              >
                {productCount.length > 0 && (
                  <Chart
                    className="chart-item"
                    chartType="PieChart"
                    height="350px"
                    data={productCount}
                    options={options}
                  />
                )}
              </div>
              <div
                className="rounded-lg w-1/2 lg:w-full"
                style={{
                  marginBottom: "20px",
                  boxSizing: "border-box",
                }}
              >
                {revenueDetailsPerMonth.length > 0 && (
                  <Chart
                    className="chart-item"
                    chartType="AreaChart"
                    height="350px"
                    data={revenueDetailsPerMonth}
                    options={revenueGraphOptions}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Analytics;
